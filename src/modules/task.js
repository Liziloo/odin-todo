import { toggler } from "./commonMethods";
import { lists } from "./list";
export { addTask };

class Task{
    constructor(name, description, duedate, priority, notes, list) {
        let state = {
            name,
            description,
            duedate,
            priority,
            notes,
            list,
            done: false
        }
        return Object.assign(
            {},
            toggler(state)
        )
    }
}

function addTask(name, description = '', duedate, priority, notes = '', list = 'default') {
    const newTask = new Task(name, description, duedate, priority, notes, list);
    for (list of lists) {
        if (list.name == newTask.list) {
            list.tasks.push(newTask);
        }
    }
}