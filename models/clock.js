const moment = require('moment');
const { playAlarm } = require("../utils/index.js")

class Clock {
  constructor() {
    this.alarms = [];
  }

  showCurrentTime() {
    console.log(`\n\n\n${moment().format("MMMM Do YYYY, h:mm:ss a")}\n\n\n`)
  }

  addAlarm(time, callback) {
    const alarm = {
      time,
      callback,
      active: true,
      snoozeCount: 0,
      maxSnoozes: 3,
      snoozeInterval: 5 * 60 * 1000, //5 seconds timer
    };
    this.alarms.push(alarm);
  }

  startAlarmChecker() {
    setInterval(() => {
      const currentTime = moment().format("MMMM Do YYYY, h:mm:ss a");
      this.alarms.forEach((alarm, index) => {
        if (alarm.active && currentTime === alarm.time) {
          alarm.callback();
          alarm.active = false; // deactivate alarm
          this.handleAlarm(alarm);
        }
      });
    }, 1000);
  }

  handleAlarm() {
    playAlarm();
  }

  snoozeAlarm(index) {
    const alarm = this.alarms[index];
    if (!alarm) {
      console.log(`No alarm found!!`);
      return;
    }

    if (alarm.snoozeCount < alarm.maxSnoozes) {
      alarm.snoozeCount++;
      const newAlarmTime = moment().add(5, 'minutes').format("MMMM Do YYYY, h:mm:ss a");
      alarm.time = newAlarmTime;
      console.log(`Alarm snoozed!!!`);
      alarm.active = true;
    } else {
      console.log("Maximum snooze limit reached.");
    }
  }

  deleteAlarm(index) {
    if (index < 0 || index >= this.alarms.length) {
      console.log(`Invalid alarm index: ${index}`);
      return;
    }
    this.alarms.splice(index, 1);
    console.log(`Alarm at index ${index} deleted.`);
  }
}

module.exports = Clock;
