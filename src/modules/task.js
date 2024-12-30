import { toggler } from "./commonMethods";
import { lists } from "./list";
export { addTask };

const task = (name, description, duedate, priority, notes, list) => {
    let state = {
        name,
        description,
        duedate,
        priority,
        notes,
        list,
        done: false
    }
    return Object.assign(state, toggler(state));
}

function addTask(name, description = '', duedate, priority = 3, notes = '', list = 'default') {
    const newTask = task(name, description, duedate, priority, notes, list);
    for (list of lists) {
        if (list.name == newTask.list) {
            list.tasks.push(newTask);
        }
    }
}