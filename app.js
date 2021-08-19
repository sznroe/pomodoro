var sound = new Audio("https://www.freespecialeffects.co.uk/soundfx/cartoon/twang1.wav");
var breakSound = new Audio("https://www.freespecialeffects.co.uk/soundfx/doors/doorbell2.wav");

var h2 = document.getElementById('clock');
let globalCounter = 0;
let longBreakCounter = 5;
let shortMinBreak = 5;
let longMinBreak = 30;
let workTime = 25;
const workStatus = "WORK";
const breakStatus = "BREAK";
let status = workStatus;

var currentTime = setInterval(function() {
    var date = new Date();
    var hours = (12 - (date.getHours()));
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = (date.getHours()) < 12 ? 'AM' : 'PM';

    if (hours < 0) {
        hours = hours * -1;
    } else if (hours == 00) {
        hours = 12;
    } else {
        hours = hours;
    }

    h2.textContent = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + "" + ampm;
}, 1000);

function addZero(time) {
    return (time < 10) ? "0" + time : time;
}


function alarmSet(breakMins) {
    var recentTime = new Date();
    var targetTime = addMinutes(recentTime, breakMins);

    var selectedHour = getHoursFromDate(targetTime)
    var selectedMin = targetTime.getMinutes();
    var selectedSec = targetTime.getSeconds();
    var selectedAP = (targetTime.getHours()) < 12 ? 'AM' : 'PM';

    var alarmTime = addZero(selectedHour) + ":" + addZero(selectedMin) + ":" + addZero(selectedSec) + selectedAP;
    document.getElementById('alarmTime').textContent = alarmTime;

    var h2 = document.getElementById('clock');

    setInterval(function() {
        var date = new Date();
        var hours = getHoursFromDate(date)
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var ampm = (date.getHours()) < 12 ? 'AM' : 'PM';
        var currentTime = h2.textContent = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + "" + ampm;

        if (alarmTime == currentTime) {
            changeStatus();
            globalCounter++;

            if (status == breakStatus) {
                breakSound.play();
                if (globalCounter == longBreakCounter)
                {
                    alarmSet(longMinBreak)
                }
                else
                {
                    alarmSet(shortMinBreak)
                }
            }
            else
            {
                sound.play();
                alarmSet(workTime)
            }
        }
    }, 1000);
}

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

function getHoursFromDate(date)
{
    var selectedHour = (12 - (date.getHours()));
    if (selectedHour < 0) {
        return selectedHour * -1;
    } else if (selectedHour == 00) {
        return 12;
    }
    return selectedHour;
}

function changeStatus()
{
    status = status == workStatus ? breakStatus : workStatus;
}