import { toggler } from "./commonMethods";
export { Task };

class Task {
    constructor(name, description, duedate, priority, notes) {
        this.name = name,
        this.description = description,
        this.duedate = duedate,
        this.priority = priority,
        this.notes = notes,
        this.done = false
    }
}

Object.assign(Task.prototype, toggler)