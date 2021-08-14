var schedule = [];
//Scheduled time starts from 9 AM to 5 PM
const start_time = [
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
];
var today = null;

//initiate function to get current date
function init() {
  //Moment JS to get Today's date
  today = moment();
  $("#currentDay").text("Today is " + today.format("MMM Do, YYYY"));
  $("#currentTime").text("Current time is " + today.format("hh:mm:ss A"));
  console.log("Today is " + today.format("MMM Do, YYYY"));

  scheduleHighlight();
}

//Highlight schedule for past, present and current time
function scheduleHighlight() {
  let scheduleLocalStorage = JSON.parse(localStorage.getItem("dailySchedule"));
  start_time.forEach((t) => {
    let row = $(`#eventRow${t}`);
    let currentHour = parseInt(today.format("HH:MM:ss A"), 10);
    if (currentHour === parseInt(t, 10)) {
      row.addClass("present");
    } else if (currentHour < parseInt(t, 10)) {
      row.addClass("future");
    } else {
      row.addClass("past");
      let btnEl = $(`#btn${t}`);
      btnEl.attr("disabled", true);
    }
  });
  
  //Load schedule for from Local Storage
  if (scheduleLocalStorage !== null || scheduleLocalStorage.length) {
    let daily = scheduleLocalStorage.find(
      (s) => s.date === today.format("MM/DD/yyyy")
    );
    if (daily) {
      daily.schedule.forEach((s) => {
        let event = $(`#event${s.time}`);
        event.text(s.event);
      });
    }
  }
}

//Save event details to local storage
function saveEvent(id) {
  let scheduleLocalStorage = JSON.parse(localStorage.getItem("dailySchedule"));
  if (scheduleLocalStorage === null || scheduleLocalStorage.length === 0) {
    let eventObj = {
      time: id,
      event: $(`#event${id}`).val(),
    };
    console.log("ID is" + id);
    let scheduleData = [
      {
        date: today.format("MM/DD/yyyy"),
        schedule: [eventObj],
      },
    ];
    localStorage.setItem("dailySchedule", JSON.stringify(scheduleData));
  } else {
    let daily = scheduleLocalStorage.findIndex(
      (s) => s.date === today.format("MM/DD/yyyy")
    );
    if (daily !== -1) {
      let eventIndex = scheduleLocalStorage[daily].schedule.findIndex(
        (s) => s.time === id
      );

      if (eventIndex !== -1) {
        scheduleLocalStorage[daily].schedule[eventIndex].event = $(
          `#event${id}`
        ).val();
      } else {
        scheduleLocalStorage[daily].schedule.push({
          time: id,
          event: $(`#event${id}`).val(),
        });
      }
    } else {
      let eventObj = {
        time: id,
        event: $(`#event${id}`).val(),
      };
      console.log("ID is" + id);
      let scheduleData = [
        {
          date: today.format("MM/DD/yyyy"),
          schedule: [eventObj],
        },
      ];
      scheduleLocalStorage.push(scheduleData);
    }
    localStorage.setItem("dailySchedule", JSON.stringify(scheduleLocalStorage));
  }
}

//Initiate document ready function to initate values
$(document).ready(function () {
  init();
});
