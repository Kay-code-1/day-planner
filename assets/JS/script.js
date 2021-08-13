var schedule = [];
//Scheduled time starts from 9 AM to 5 PM
const start_time = ["9", "10", "11", "12", "13", "14", "15", "16"];
var today = null;
var scheduleLocalStorage = null;

function init() {
  //Moment JS to get Today's date
  today = moment();
  $("#currentDay").text("Today is " + today.format("MMM Do, YYYY"));

  scheduleLocalStorage = localStorage.getItem("dailySchedule");
  scheduleHighlight();
}

function scheduleHighlight() {
  start_time.forEach((t) => {
    let txtarea = $(`#eventRow${t}`);
    let currentHour = parseInt(today.format("HH"), 10) + 1;
    if (currentHour === parseInt(t, 10)) {
        txtarea.addClass("present");
    } else if (currentHour < parseInt(t, 10)) {
        txtarea.addClass("future");
    } else {
        txtarea.addClass("past");
    }
  });
}

function saveEvent(id) {
  let eventObj = {
    time: id,
    event: $(`#event${id}`).val(),
  };
  //   schedule.push(eventObj);
  //   alert(JSON.stringify(schedule));

  if (scheduleLocalStorage === null || scheduleLocalStorage === "") {
    let scheduleData = [
      {
        date: today.format("MM/DD/yyyy"),
        schedule: [eventObj],
      },
    ];
    localStorage.setItem("dailySchedule", JSON.stringify(scheduleData));
  }
}

$(document).ready(function () {
  init();
});

//function to listen for click events on the page
//grab the saved event options
//create var to save user input and time
//save to local storage
