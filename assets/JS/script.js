//Create our doc ready function to make sure nothing runs before we load the page
// $(document).ready(function(){

// }
    
 //Moment JS to get Today's date
 var today = moment();
 $("#currentDay").text("Today is " + (today.format("MMM Do, YYYY")));

 //function to listen for click events on the page
     //grab the saved event options
        //create var to save user input and time 
        //save to local storage

