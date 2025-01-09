import { storeItem } from "./localStorage";
export { Task, toggleTask };

class Task {
    constructor(name, description, duedate, priority, notes, done) {
        this.name = name,
        this.description = description,
        this.duedate = duedate,
        this.priority = priority,
        this.notes = notes,
        this.done = done
    }

    getDistance() {
        return this.duedate - new Date.now();
    }
}

const toggleTask = (e, selectedList, lists) => {
    const checkedTask = selectedList.tasks.find(checkedTask => checkedTask.name === e.target.dataset.taskName);
    if (e.target.checked === true) {
        checkedTask.done = true;
    } else {
        checkedTask.done = false;
    }
    if (selectedList.done) {
        selectedList.done = true;
    }
    storeItem('lists', lists);
    return lists;
}