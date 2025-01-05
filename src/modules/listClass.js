import { Task } from "./taskClass";
import { storeItem } from "./localStorage";
import { isValidDate } from "./dateTime";
export { List, initiateListsCollection, handleListChange };


class List {
    constructor(name, description, duedate, isDefault) {
        this.name = name,
        this.description = description,
        this.tasks = [],
        this.duedate = duedate,
        this.done = false,
        this.isDefault = isDefault ? isDefault : false;
    }

    addTask(taskName, description, duedate, priority, notes, done) {
        const newTask = new Task(this.name, taskName, description, duedate, priority, notes, done);
        this.tasks.push(newTask);
    }

    deleteTask(task) {
        this.tasks = this.tasks.filter(existingTask => existingTask !== task);
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

const initiateListsCollection = () => {
    const lists = [];
    if (!localStorage.getItem('lists')) {
        const defaultList = new List('My list', '', 'None', true);
        lists.push(defaultList);
        storeItem('lists', lists);
    } else {
        const jsonLists = JSON.parse(localStorage.getItem('lists'));
        for (let item of jsonLists) {
            const listDuedate = item.duedate === 'None' ? 'None' : new Date(item.duedate);
            const newInstance = new List(item.name, item.description, listDuedate, item.isDefault);
            for (let task of item.tasks) {
                const taskDuedate = task.duedate === 'None' ? 'None' : new Date(task.duedate)
                newInstance.addTask(task.name, task.description, taskDuedate, task.priority, task.notes, task.done);
            }
            lists.push(newInstance);
        }
    }
    return lists;
}

const handleListChange = (formData, list, lists) => {
    const listName = formData.get('list-name');
    const formDuedate = new Date(formData.get('list-duedate'));
    const listDuedate = isValidDate(formDuedate) ? formDuedate : 'None';
    const listDescription = formData.get('list-description');
    if (list) {
        list.name = listName;
        list.duedate = listDuedate;
        list.description = listDescription;
    } else {
        const newList = new List(listName, listDescription ? listDescription : '', listDuedate);
        lists.push(newList);
    }
    storeItem('lists', lists);
    return listName;
}