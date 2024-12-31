import { toggler } from "./commonMethods";
import { task } from "./task";
export { List };


class List {
    constructor(name, description) {
        this.name = name,
        this.description = description,
        this.tasks = [],
        this.done = false
    }

    addTask(name, description = '', duedate, priority = 3, notes = '') {
        const newTask = task(name, description, duedate, priority, notes);
        this.tasks.push(newTask);
    }
}

Object.assign(List.prototype, toggler);

