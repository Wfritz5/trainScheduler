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
    var trainName = $("#trainName").val();
    var destination =$("#destination").val();
    var trainTime =$("#trainTime").val();
    var frequency =$("#frequency").val();
    var train = {
        trainName,
        destination,
        trainTime,
        frequency
    }
//dateAdded: firebase.database.ServerValue.TIMESTAMP


    console.log(train);
    database.ref().push(train);
})








});