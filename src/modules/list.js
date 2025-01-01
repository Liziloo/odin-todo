import { toggler } from "./commonMethods";
import { Task } from "./task";
export { List };


class List {
    constructor(name, description) {
        this.name = name,
        this.description = description,
        this.tasks = [],
        this.done = false
    }

    addTask(name, description = '', duedate, priority = 3, notes = '') {
        const newTask = new Task(name, description, duedate, priority, notes);
        this.tasks.push(newTask);
    }
}

Object.assign(List.prototype, toggler);

const createListsCollection