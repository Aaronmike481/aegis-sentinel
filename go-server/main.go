package main

import (
	"context"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/google/uuid"
	pyproc "github.com/YuminosukeSato/pyproc/pkg/pyproc"
)

var pool *pyproc.Pool

type JobStore struct {
	sync.RWMutex
	Statuses map[string]string
	Results  map[string]map[string]string
}

var store = &JobStore{
	Statuses: make(map[string]string),
	Results:  make(map[string]map[string]string),
}

type Attack struct {
	TargetURL string `json:"target_url"`
	Payload   string `json:"payload"`
	Mode      string `json:"mode"`
}

type Defense struct {
	Status string `json:"status"`
	Layer  string `json:"layer"`
	Reason string `json:"reason"`
}

func creat_pool() {
	var err error
	pool, err = pyproc.NewPool(pyproc.PoolOptions{
		Config: pyproc.PoolConfig{
			Workers:     8,
			MaxInFlight: 100,
		},
		WorkerConfig: pyproc.WorkerConfig{
			SocketPath:   "/tmp/worker.socket",
			PythonExec:   "/home/pcmike/master-env/bin/python",
			WorkerScript: "../python-worker/worker.py", 
		},
	}, nil)

	if err != nil {
		log.Fatalf("failed to create worker pool: %v", err)
	}

	err = pool.Start(context.Background())
	if err != nil {
		log.Fatalf("failed to start worker pool: %v", err)
	}
	log.Println("Worker pool was successfully created")
}

func handlecore(w http.ResponseWriter, r *http.Request) {
	var req Attack
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	requestID := uuid.New().String()
	log.Println("created user requestId", requestID)

	store.Lock()
	store.Statuses[requestID] = "QUEUED"
	store.Unlock()

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(map[string]string{
		"request_id": requestID,
		"status":     "QUEUED",
	})

	go BackgroundJob(requestID, req)
}

func BackgroundJob(id string, req Attack) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	input := map[string]interface{}{
		"target":  req.TargetURL,
		"payload": req.Payload,
		"mode":    req.Mode,
	}

	var result Defense
	err := pool.Call(ctx, "process_attack", input, &result)

	
	store.Lock()
	if err != nil {
		store.Statuses[id] = "FAILED"
		store.Unlock()
		log.Printf("[JOB %s] FAILED", id)
		return
	}
	store.Statuses[id] = result.Status
	store.Results[id] = map[string]string{
		"status": result.Status,
		"layer":  result.Layer,
		"reason": result.Reason,
	}
	store.Unlock()

	
	if result.Status == "ALLOWED" {
		log.Printf(" [JOB %s] ALLOWED. Forwarding to Target AI: %s", id, req.TargetURL)

		targetReq, err := http.NewRequestWithContext(ctx, "POST", req.TargetURL, strings.NewReader(req.Payload))
		if err != nil {
			log.Printf("[JOB %s] Bad Target URL", id)
			return
		}
		targetReq.Header.Set("Content-Type", "application/json")

		client := &http.Client{}
		targetRes, err := client.Do(targetReq)
		
		if err == nil {
			defer targetRes.Body.Close()
			body, _ := io.ReadAll(targetRes.Body)
			
			
			store.Lock()
			store.Results[id]["target_response"] = string(body)
			store.Unlock()
			
			log.Printf(" [JOB %s] Target AI replied: %s", id, string(body))
		}
	} else {
		log.Printf("[JOB %s] BLOCKED by %s", id, result.Layer)
	}
}

func checkstatus(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")

	store.RLock()
	status, exists := store.Statuses[id]
	result := store.Results[id]
	store.RUnlock()

	if !exists {
		http.Error(w, "Request ID Not Found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"request_id": id,
		"status":     status,
		"result":     result,
	})
}

func main() {
	creat_pool()
	defer pool.Shutdown(context.Background())

	http.HandleFunc("/api/attack", handlecore)
	http.HandleFunc("/api/status", checkstatus)

	log.Println("AEGRIS Async Gateway running on port 8080...")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}