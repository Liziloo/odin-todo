import { List } from "./listClass";
import { isValidDate } from "./dateTime";
import { storeItem } from "./localStorage";
import { tasksView } from "./tasksView";
export { ListsCollection };

class ListsCollection {
    constructor() {
        this.lists = this.initiateListsCollection(),
        this.default = null
    }

    initiateListsCollection() {
        const lists = [];
        if (!localStorage.getItem('lists-collection')) {
            const defaultList = new List('My list', '', 'None', true);
            lists.push(defaultList);
            this.default = defaultList.name;
        } else {
            const jsonLists = JSON.parse(localStorage.getItem('lists-collection'));
            console.log(jsonLists);
            this.default = jsonLists.default;
            for (let list of jsonLists.lists) {
                const listDuedate = list.duedate === 'None' ? 'None' : new Date(list.duedate);
                const listDone = list.done === false || list.done === 'false' ? false : true;
                const newInstance = new List(list.name, list.description, listDuedate, listDone);
                for (let task of list.tasks) {
                    const taskDuedate = task.duedate === 'None' ? 'None' : new Date(task.duedate);
                    const taskDone = task.done === 'true' || task.done === true ? true : false;
                    newInstance.addTask(task.name, task.description, taskDuedate, task.priority, task.notes, taskDone);
                }
                lists.push(newInstance);
            }
        }
        return lists
    }

    addList(formData) {
        const listName = formData.get('list-name');
        for (let list of this.lists) {
            if (listName === list.name) {
                alert('List with that name already exists');
                return
            }
        }
        const formDuedate = new Date(formData.get('list-duedate'));
        const listDuedate = isValidDate(formDuedate) ? formDuedate : 'None';
        const listDescription = formData.get('list-description');
        const newList = new List(listName, listDescription ? listDescription : '', listDuedate);
        this.lists.push(newList);
    }

    changeList(formData) {
        const listName = formData.get('list-name');
        const formDuedate = new Date(formData.get('list-duedate'));
        const listDuedate = isValidDate(formDuedate) ? formDuedate : 'None';
        const listDescription = formData.get('list-description');
        for (let list of this.lists) {
            if (list.name === listName) {
                list.duedate = listDuedate;
                list.description = listDescription;
                return
            }
            alert('Error: No existing list with that name');
        }
    }

    deleteList(listName) {
        this.lists = this.lists.filter(list => list.name !== listName);
    }

    moveTask(taskName, newListName, oldListName) {
        for (let list of this.lists) {
            if (list.name === oldListName) {
                list.deleteTask(taskName);
            }
            if (list.name === newListName) {
                list.tasks.push(taskName);
            }
        }
    }

    handleTaskSubmit(formData) {
        const newOrUpdate = formData.get('new-or-update');
        const listName = formData.get('task-list-name');
        if (newOrUpdate === 'new') {
            this.addTask(formData, listName);
        } else {
            this.updateTask(formData, listName);
        }
        this.store();
        tasksView(listName, this);
    }

    addTask(formData, listName) {
        for (let list of this.lists) {
            if (list.name === listName) {
                list.addTask(formData);
                return
            }
        }
    }

    updateTask(formData, listName) {
        for (let list of this.lists) {
            if (list.name === listName) {
                list.updateTask(formData);
                return
            }
        }
    }

    store() {
        storeItem('lists-collection', this);
    }
}