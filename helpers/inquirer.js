import inquirer from "inquirer";
import colors from "colors";

const menuOptions = [
  {
    type: "list",
    name: "option",
    message: "What would you like to do?",
    choices: [
      { value: "1", name: "1.Add a new task".green },
      { value: "2", name: "2.List all tasks".green },
      { value: "3", name: "3.List completed tasks".green },
      { value: "4", name: "4.List pending tasks".green },
      { value: "5", name: "5.Mark a task as completed".green },
      { value: "6", name: "6.Delete a task".green },
      { value: "0", name: "Exit".green },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("=======================".green);
  console.log("  Select an option:  ".white);
  console.log("======================= \n".green);

  const { option } = await inquirer.prompt(menuOptions);
  return option;
};

const pause = async () => {
  const option = await inquirer.prompt({
    type: "input",
    name: "continue",
    message: "Press Enter to continue...".cyan,
  });
  return option.continue;
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "description",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Please enter a valid value".red;
        }
        return true;
      },
    },
  ];
  const { description } = await inquirer.prompt(question);
  return description;
};

const listDeleteTasks = async (tasks) => {
  const choices = tasks.map((task, index) => {
    const number = `${index + 1}. `.green;
    return {
      value: task.id,
      name: `${number}${task.description}`,
    };
  });
  choices.unshift({ value: "0", name: "0. ".green + "Cancel" });
  const { id } = await inquirer.prompt({
    type: "list",
    name: "id",
    message: "Select the task to delete",
    choices,
  });
  return id;
};

const viewCheckList = async (tasks) => {
  const choices = tasks.map((task) => {
    return {
      value: task.id,
      name: `${task.description}`,
      checked: task.completeOn ? true : false,
    };
  });

  const { ids } = await inquirer.prompt({
    type: "checkbox",
    name: "ids",
    message: "Select the tasks to mark as completed",
    choices,
  });
  return ids;
};

const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "confirm",
      message,
    },
  ];
  const { confirm } = await inquirer.prompt(question);
  return confirm;
};

export {
  inquirerMenu,
  pause,
  readInput,
  listDeleteTasks,
  confirm,
  viewCheckList,
};
