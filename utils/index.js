const player = require('play-sound')(/* opts */);

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

const playAlarm = () => {
    return Promise.resolve(player.play("./media/alarm.mp3", (err) => {
        if (err) {
            console.error("Error playing sound:", err);
        }
    }));
};

const userPrompts = {
    type: 'list',
    name: 'action',
    message: 'Welcome User!',
    choices: ['Show Current Time', 'Show All Alarms', 'Add alarm(Format: MMMM DD YYYY, h:mm:ss am/pm)', 'Delete Alarm (Enter Index)', 'Snooze Alarm']
}

const mainMenuQuestions = [
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: ["Start Clock", "Set Alarm", "Snooze Alarm", "Delete Alarm", "Exit"],
    },
  ];
  
  const alarmQuestions = [
    {
      type: "input",
      name: "alarmTime",
      message: "Enter alarm time (MMMM Do YYYY, h:mm:ss a format):",
    },
  ];
  
  const snoozeQuestions = [
    {
      type: "number",
      name: "alarmIndex",
      message: "Enter the index of the alarm to snooze:",
    },
  ];
  
  const deleteQuestions = [
    {
      type: "number",
      name: "alarmIndex",
      message: "Enter the index of the alarm to delete:",
    },
  ];


// Export the functions for use in other modules
module.exports = {
    sleep,
    playAlarm,
    userPrompts,
    mainMenuQuestions,
    alarmQuestions,
    snoozeQuestions,
    deleteQuestions
};
