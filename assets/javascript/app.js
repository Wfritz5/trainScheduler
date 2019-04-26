$( document ).ready(function() {
    console.log( "ready!" );

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCb3aVYwnL-rZOrz3eOZt-uOjtbRnCwhDw",
    authDomain: "trainscheduler-will.firebaseapp.com",
    databaseURL: "https://trainscheduler-will.firebaseio.com",
    projectId: "trainscheduler-will",
    storageBucket: "trainscheduler-will.appspot.com",
    messagingSenderId: "441043984134"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  // on click event and storing value of inputs

$("#submit").on("click", function(event) {
    event.preventDefault();
    console.log("buttonClicked");

//setting values for inputs
    var trainName = $("#trainName").val().trim();
    var destination =$("#destination").val().trim();
    var trainTime = $("#trainTime").val().trim();
    var frequency =$("#frequency").val().trim();

   //creating object with variables
    var train = {
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,

    };
//test
    console.log(train);
    //pushing the "train" object to the firebase database
    database.ref().push(train);
    //clearing the values
    $("#trainName").val("");
    $("#frequency").val("");
    $("#minutesAway").val("");
    $("#destination").val("");
    $("#trainTime").val("");

    return false;
  });
  //firebase adding train to database
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val().trainName);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().frequency);
  console.log(childSnapshot.val().trainTime);


//storing info
  var trainName = (childSnapshot.val().trainName);
  var destination = (childSnapshot.val().destination);
  var trainTime = (childSnapshot.val().trainTime);
  var frequency = (childSnapshot.val().frequency);
//first time
  var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);
//current time
  var currentTime = moment();
  console.log("current time: " + moment(currentTime).format("HH:mm"));
  //difference between first and current times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("Difference in time: " + diffTime);
//time apart untl next train
  var tRemainder = diffTime % frequency;
  console.log(tRemainder);
//minutes until train
  var tMinutesTillTrain = frequency - tRemainder;
  console.log("minutes till train: " + tMinutesTillTrain);
//minutes until next train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("arrival time: " + moment(nextTrain).format("HH:mm"));
  var formatTime = moment(nextTrain).format("HH:mm");
//appending train data into table
  $("#trainSchedule > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>"
  + formatTime + "</td><td>" + tMinutesTillTrain + "</td>");
//safety fail switch
},function(errorObject) {
  console.log("Errors handled: " +errorObject.code);

  

});



});