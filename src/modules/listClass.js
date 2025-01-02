import { toggler } from "./commonMethods";
import { Task } from "./taskClass";
import { storeItem } from "./localStorage";
export { List, initiateListsCollection };


class List {
    constructor(name, description) {
        this.name = name,
        this.description = description,
        this.tasks = [],
        this.done = false
    }

    addTask(name, description, duedate, priority, notes, done) {
        const newTask = new Task(name, description, duedate, priority, notes, done);
        this.tasks.push(newTask);
    }

    deleteTask(taskName) {
        this.tasks = this.tasks.filter(task => task.name !== taskName);
    }

    editTask(taskName, editedTaskName, description, duedate, priority, notes, done) {
        const taskToEditArray = this.tasks.filter((task) => task.name === taskName);
        const taskToEdit = taskToEditArray[0];
        taskToEdit.name = editedTaskName;
        taskToEdit.description = description;
        taskToEdit.duedate = duedate;
        taskToEdit.priority = priority;
        taskToEdit.notes = notes;
        taskToEdit.done = done; 
    }
}
Object.assign(List.prototype, toggler);

const initiateListsCollection = () => {
    if (!localStorage.getItem('lists')) {
        const defaultList = new List('Default');
        const newLists = [];
        newLists.push(defaultList);
        storeItem('lists', newLists);
        return newLists;
    } else {
        const existingLists = [];
        const jsonLists = JSON.parse(localStorage.getItem('lists'));
        for (let item of jsonLists) {
            const newInstance = new List(item.name, item.description);
            for (let task of item.tasks) {
                const taskDuedate = new Date(task.duedate)
                newInstance.addTask(task.name, task.description, taskDuedate, task.priority, task.notes, task.done);
            }
            existingLists.push(newInstance);
        }
        return existingLists;
    }
}