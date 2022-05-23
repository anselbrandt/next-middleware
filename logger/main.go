package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type LogData struct {
	Data string `json:"data"`
}

var PORT = ":5000"

func main() {
	r := mux.NewRouter()
	postRoute := r.Methods(http.MethodPost).Subrouter()
	postRoute.HandleFunc("/", LogHandler)
	postRoute.HandleFunc("/data", DataHandler)
	http.Handle("/", r)

	fmt.Printf("Listening on port%v...\n", PORT)
	http.ListenAndServe(PORT, r)
}

func DataHandler(w http.ResponseWriter, r *http.Request) {
	var logData map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&logData)
	if err != nil {
		panic(err)
	}
	log.Printf("%v\n", logData)
	fmt.Fprintf(w, "%v\n", logData)
}

func LogHandler(w http.ResponseWriter, r *http.Request) {
	var logData LogData
	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&logData)
	if err != nil {
		panic(err)
	}
	log.Printf("%v\n", logData.Data)
	fmt.Fprintf(w, "%v\n", logData.Data)

}
