console.log("The version 1 js file for Trains is connected.")

// Initialize Firebase
var config = {
	apiKey: "AIzaSyA07rB0i1_CaykBeZCxAyDy1VlzMQ-0X4U",
	authDomain: "test-project-e2b2b.firebaseapp.com",
	databaseURL: "https://test-project-e2b2b.firebaseio.com",
	projectId: "test-project-e2b2b",
	storageBucket: "test-project-e2b2b.appspot.com",
	messagingSenderId: "86122413164"
};

firebase.initializeApp(config);

var database = firebase.database();

//Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  	event.preventDefault();

  	// Grabs user input
  	var trainName = $("#train-input").val().trim();
  	var destinationName = $("#destination-input").val().trim();
  	var timeStart = moment($("#time-input").val().trim(), "HH:mm").format("X");
  	var frequencyRate = $("#frequency-input").val().trim();

  	// Creates local "temporary" object for holding train data
  	var newTrain = {
    	name: trainName,
    	destination: destinationName,
    	start: timeStart,
    	frequency: frequencyRate
  	};

	// Uploads train data to the database
	database.ref().push(newTrain);

	// Logs train data to console
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(newTrain.start);
	console.log(newTrain.frequency);

	// Alert
	alert("Train successfully added");

	// Clears all of the text-boxes
	$("#train-input").val("");
	$("#destination-input").val("");
	$("#time-input").val("");
	$("#frequency-input").val("");
});

//Firebase event for adding train to the database and a row in the html
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	console.log(childSnapshot.val());

	// Store train info into a variable.
	var trainName = childSnapshot.val().name;
	var destinationName = childSnapshot.val().destination;
	var timeStart = childSnapshot.val().start;
	var frequencyRate = childSnapshot.val().frequency;

	// Train Info
	console.log(trainName);
	console.log(destinationName);
	console.log(timeStart);
	console.log(frequencyRate);

	// Prettify the train time start
	//var trainStartPretty = moment.unix(timeStart).format("HH:mm");

	// Calculate the months worked using hardcore math
	// To calculate the months worked
	//var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
	//console.log(empMonths);

	// Calculate the total billed rate
	//var empBilled = empMonths * empRate;
	//console.log(empBilled);

	// Add each train's data into the table
	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationName + "</td><td>" +
frequencyRate + "</td><td>" + "Next Arrival Math" + "</td><td>" + "Minutes Away Math" + "</td><td>");
});