import { toggler } from "./commonMethods";
import { Task } from "./task";
import { storeItem } from "./localStorage";
export { List, initiateListsCollection };


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

const initiateListsCollection = () => {
    if (!localStorage.getItem('lists')) {
        const defaultList = new List('default');
        const newLists = [];
        newLists.push(defaultList);
        storeItem('lists', JSON.stringify(newLists));
        console.log('newlists', newLists);
        return newLists;
    } else {
        return JSON.parse(localStorage.getItem('lists'));
    }
}