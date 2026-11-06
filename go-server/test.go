type Attack struct{
	target_ai string `json:"target_ai"`
	base_input string `json:"base_input"`
	mode string  `json:"mode"`
}

type Defense struct{
	layer string `json:"layer"`
	status string `json:"status"`
	reason string `json:"reason"`
}

type JobStore struct{
	sync.RWMutex
	status map[string]string
	result map[string]map[string]string
}

var boad &JobStore{
	status: make(map[string]string)
	result: make(map[string]map[string]string)
}

func handlecore(w http.ResponseWriter, r *http.Request){
	var req Attack

	json.NewDecoder(r.Body).Decode(req)
	if err != nil{
		http.Error(w, "BadRequest", http.StatusBadRequest)
	}

	requestID = uuid.New().String()

	boad.Lock()
	boad.Status[requestID] = "Queued"
	boad.Unlock()

	

	#send ok message to ui

	w.Header.Set("content-type": "application/json")
	w.WriteHeader(http.StatusAccepted)
	json.NewEncoder(w).Encode(map[string]map[string]string{
		"request_id": requestID
		"status": "queued"
	})

	go Backgroundaction(requestID, req)
}

func Backgroundaction(id string, req Attack){
	input := map[string]interface{
		"Target": req.target_ai,
		"Payload": req.payload
		"Mode"   : req.mode
	}

	ctx, cancel := context.WithTimeout(context.Background())
	defer cancel

	var gets Defense


	_, err := pool.Call(ctx, "input proceesing", input, &gets)

	boad.Lock()
	defer boad.Unlock()

	boad.Status[id] = gets.Status
	boad.Result[id] = map[string]string{
		"request_id": ID,
		"layer": gets.layer,
		"reason": gets.reason,
		"status": gets.status
	}

	

}