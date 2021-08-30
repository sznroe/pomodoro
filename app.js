var sound = new Audio("https://www.freespecialeffects.co.uk/soundfx/cartoon/twang1.wav");
var breakSound = new Audio("https://www.freespecialeffects.co.uk/soundfx/doors/doorbell2.wav");
var longBreakSound = new Audio("https://www.wavsource.com/snds_2020-10-01_3728627494378403/music/outta_here.wav");

var h2 = document.getElementById('clock');
let globalCounter = 0;
const longBreakCounter = 5;
const shortMinBreak = 5;
const longMinBreak = 30;
const workTime = 25;
const workStatus = "WORK";
const breakStatus = "BREAK";
let status = workStatus;
let statusElm = document.querySelector('.status');

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
    statusElm.textContent = getNextStatus(status);

    setInterval(function() {
        var date = new Date();
        var hours = getHoursFromDate(date)
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var ampm = (date.getHours()) < 12 ? 'AM' : 'PM';
        var currentTime = h2.textContent = addZero(hours) + ":" + addZero(minutes) + ":" + addZero(seconds) + "" + ampm;

        if (alarmTime == currentTime) {
            changeStatus();

            if (isBreakTime()) {
                globalCounter++;
                if (isLongBreak())
                {
                    takeLongBreak();
                }
                else
                {
                    takeShortBreak();
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

function getNextStatus(currentStatus)
{
    return currentStatus == workStatus ? breakStatus : workStatus;
}

function isBreakTime()
{
    return status == breakStatus;
}

function isLongBreak()
{
    return globalCounter == longBreakCounter;
}

function takeLongBreak()
{
    longBreakSound.play();
    alarmSet(longMinBreak)
    globalCounter = 0;
}

function takeShortBreak()
{
    breakSound.play();
    alarmSet(shortMinBreak)
}