import Task from "./tastk.js";

class Tasks {
  _list = {};

  get listArr() {
    const list = [];
    Object.keys(this._list).forEach((key) => {
      list.push(this._list[key]);
    });
    return list;
  }

  constructor() {
    this._list = {};
  }

  toggleCompleted(ids = []) {
    ids.forEach((id) => {
      const task = this._list[id];
      if (!task.completeOn) {
        task.completeOn = new Date().toISOString();
      }
    });

    this.listArr.forEach((task) => {
      if (!ids.includes(task.id)) {
        this._list[task.id].completeOn = null;
      }
    });
  }
  deleteTask(id) {
    if (this._list[id]) {
      delete this._list[id];
    }
  }
  uploadTasksFromArray(tasks = []) {
    tasks.forEach((task) => {
      this._list[task.id] = task;
    });
  }

  createTask(desc) {
    const task = new Task(desc);
    this._list[task.id] = task;
  }

  listTasks() {
    for (let i = 0; i < this.listArr.length; i++) {
      const index = `${i + 1}.`.green;
      const { description, completeOn } = this.listArr[i];
      const status = completeOn ? completeOn.green : "Pending".red;
      this.viewMessage(index, description, status);
    }
  }

  listTasksCompleteOrPending(complete = true) {
    let tasksByStatus = [];
    if (complete)
      tasksByStatus = this.listArr.filter((task) => task.completeOn !== null);
    else
      tasksByStatus = this.listArr.filter((task) => task.completeOn === null);

    tasksByStatus.forEach((task, i) => {
      const index = `${i + 1}.`.green;
      const { description, completeOn } = task;
      const status = completeOn ? completeOn.green : "Pending".red;
      this.viewMessage(index, description, status);
    });
  }

  viewMessage(index, description, status) {
    console.log(`${index} ${description} :: ${status}`);
  }
}

export default Tasks;
