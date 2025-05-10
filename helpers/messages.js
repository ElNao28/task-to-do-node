require("colors");

const viewMenu = () => {
  return new Promise((resolve) => {
    console.clear();
    console.log("=======================".green);
    console.log("  Select an option:  ".green);
    console.log("======================= \n".green);

    console.log("1. Add a new task".yellow);
    console.log("2. List all tasks".yellow);
    console.log("3. List completed tasks".yellow);
    console.log("4. Lis tasks pending".yellow);
    console.log("5. Mark a task as completed".yellow);
    console.log("6. Delete a task".yellow);
    console.log("0. Exit \n".yellow);

    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Choose an option: ", (option) => {
      readline.close();
      resolve(option);
    });
  });
};

const pause = async () => {
  return new Promise((resolve) => {
    const readline = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question("Pulse ENTER to continue\n", (option) => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  viewMenu,
  pause,
};
