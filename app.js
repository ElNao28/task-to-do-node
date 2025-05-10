import {
  confirm,
  inquirerMenu,
  listDeleteTasks,
  pause,
  readInput,
  viewCheckList,
} from "./helpers/inquirer.js";
import { saveDB, readDB } from "./helpers/saveFile.js";
import Tasks from "./models/Tasks.js";

const main = async () => {
  let opt = "";
  const tasks = new Tasks();

  const tasksDB = readDB();
  if (tasksDB) {
    tasks.uploadTasksFromArray(tasksDB);
  }

  do {
    try {
      opt = await inquirerMenu();
      switch (opt) {
        case "1":
          const desc = await readInput("Enter the description of the task: ");
          tasks.createTask(desc);
          break;
        case "2":
          tasks.listTasks();
          break;
        case "3":
          tasks.listTasksCompleteOrPending();
          break;
        case "4":
          tasks.listTasksCompleteOrPending(false);
          break;
        case "5":
          const ids = await viewCheckList(tasks.listArr);
          tasks.toggleCompleted(ids);
          break;
        case "6":
          const taskId = await listDeleteTasks(tasks.listArr);
          if (taskId !== "0") {
            const confirmed = await confirm(
              "Are you sure you want to delete this task?"
            );
            if (confirmed) {
              tasks.deleteTask(taskId);
              console.log("Task deleted successfully".green);
            }
          }

          break;
      }

      saveDB(tasks.listArr);

      await pause();
    } catch (error) {
      console.log("Close app with Ctrl + C to exit");
      // console.error(error);
      break;
    }
  } while (opt !== "0");
};

main();
