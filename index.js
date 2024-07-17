const Inquirer = require("inquirer");
const Clock = require("./models/clock.js");
const { mainMenuQuestions, alarmQuestions, snoozeQuestions, deleteQuestions } = require("./utils/index.js");
const Prompt = Inquirer.createPromptModule();

const clock = new Clock();

async function mainMenu() {
  const answers = await Prompt(mainMenuQuestions);
  if (answers.action === "Start Clock") {
    console.log("Clock started:");
    clock.showCurrentTime();
    // return to the main menu
    setTimeout(() => {
      mainMenu();
    }, 1000);
  } else if (answers.action === "Set Alarm") {
    setAlarm();
  } else if (answers.action === "Snooze Alarm") {
    snoozeAlarm();
  } else if (answers.action === "Delete Alarm") {
    deleteAlarm();
  } else if (answers.action === "Exit") {
    console.log("Goodbye!");
    process.exit();
  }
}

async function setAlarm() {
  const answers = await Prompt(alarmQuestions);
  const alarmTime = answers.alarmTime;
  console.log(`Setting alarm for ${alarmTime}`);
  clock.addAlarm(alarmTime, () => {
    console.log(`\nAlarm ringing! It's ${alarmTime}`);
  });
  clock.startAlarmChecker();
  mainMenu();
}

async function snoozeAlarm() {
  const answers = await Prompt(snoozeQuestions);
  const alarmIndex = answers.alarmIndex;
  clock.snoozeAlarm(alarmIndex);
  mainMenu();
}

async function deleteAlarm() {
  const answers = await Prompt(deleteQuestions);
  const alarmIndex = answers.alarmIndex;
  clock.deleteAlarm(alarmIndex);
  mainMenu();
}

// Start the main menu
mainMenu();
