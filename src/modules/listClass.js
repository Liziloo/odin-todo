import { Task } from "./taskClass";
import { storeItem } from "./localStorage";
import { isValidDate } from "./dateTime";
import { listsView } from "./listsView";
export { List, initiateListsCollection, handleListChange, allTasksDone, deleteList };


class List {
    constructor(name, description, duedate, isDefault, isDone) {
        this.name = name,
        this.description = description,
        this.tasks = [],
        this.duedate = duedate,
        this.done = isDone ? isDone : false,
        this.isDefault = isDefault ? isDefault : false;
    }

    addTask(taskName, description, duedate, priority, notes, done) {
        const newTask = new Task(this.name, taskName, description, duedate, priority, notes, done);
        this.tasks.push(newTask);
    }

    deleteTask(task) {
        this.tasks = this.tasks.filter(existingTask => existingTask !== task);
    }

    sortedByDate() {
        return this.tasks.toSorted((a, b) => a.getDistance() - b.getDistance());
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
            const listDone = item.done === false || item.done === 'false' ? false : true;
            const newInstance = new List(item.name, item.description, listDuedate, item.isDefault, listDone);
            for (let task of item.tasks) {
                const taskDuedate = task.duedate === 'None' ? 'None' : new Date(task.duedate);
                const taskDone = task.done === 'true' || task.done === true ? true : false;
                newInstance.addTask(task.name, task.description, taskDuedate, task.priority, task.notes, taskDone);
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

const allTasksDone = (list) => {
    for (let task of list.tasks) {
        if (!task.done) {
            return false;
        } else {
            continue
        }
    }
    return true;
}

const deleteList = (listName, lists) => {
    const newLists = lists.filter(list => list.name !== listName);
    storeItem('lists', newLists);
    return newLists;
}