import { List } from "./listClass";
import { Task } from "./taskClass";
import { isValidDate } from "./dateTime";
import { storeItem } from "./localStorage";
import { tasksView } from "./tasksView";
import { listsView } from "./listsView";
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
            this.default = jsonLists.default;
            for (let list of jsonLists.lists) {
                const listDuedate = list.duedate === 'None' ? 'None' : new Date(list.duedate);
                const listDone = list.done === false || list.done === 'false' ? false : true;
                const newInstance = new List(list.name, list.description, listDuedate, listDone);
                for (let task of list.tasks) {
                    const taskDuedate = task.duedate === 'None' ? 'None' : new Date(task.duedate);
                    const taskDone = task.done === 'true' || task.done === true ? true : false;
                    const newTask = new Task(task.name, task.description, taskDuedate, task.priority, task.notes, taskDone);
                    newInstance.tasks.push(newTask)
                }
                lists.push(newInstance);
            }
        }
        return lists
    }

    handleDefaultChange(listName) {
        this.default = listName;
        this.store();
        listsView(this);
    }

    handleListSubmit(formData) {
        const newOrUpdate = formData.get('new-or-update');
        const listName = formData.get('list-name')
        if (newOrUpdate === 'new') {
            this.addList(formData, listName);
        } else {
            this.updateList(formData, listName);
        }
        this.store();
        listsView(this);
    }

    addList(formData, listName) {
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
        this.store();
        listsView(this);
    }

    updateList(formData, listName) {
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
        this.store();
        listsView(this);
    }

    moveTask(formData, newListName, oldListName) {
        const newList = this.lists.find((list) => list.name === newListName);
        const oldList = this.lists.find((list) => list.name === oldListName);
        const task = oldList.tasks.find((task) => task.name === formData.get('task-name'));
        oldList.deleteTask(task);
        newList.addTask(formData);
    }

    handleTaskSubmit(formData) {
        const newOrUpdate = formData.get('new-or-update');
        const oldListName = formData.get('original-list');
        const newListName = formData.get('task-list-name');
        if (newOrUpdate === 'new') {
            this.addTask(formData, newListName);
        } else if (oldListName === newListName) {
            this.updateTask(formData, oldListName);
        } else {
            this.moveTask(formData, newListName, oldListName);
        }
        this.store();
        tasksView(newListName, this);
    }

    addTask(formData, listName) {
        console.log('triggered');
        const list = this.lists.find((list) => list.name === listName);
        list.addTask(formData);
    }

    deleteTask(listName, task) {
        const targetList = this.lists.find((list) => list.name === listName);
        targetList.deleteTask(task);
        this.store();
        tasksView(listName, this);
    }

    updateTask(formData, listName) {
        const list = this.lists.find((list) => list.name === listName);
        list.updateTask(formData);
    }

    toggleTask(e) {
        const fromList = this.lists.find((list) => list.name === e.target.dataset.listName);
        const checkedTask = fromList.tasks.find(task => task.name === e.target.dataset.taskName);
        if (e.target.checked === true) {
            checkedTask.done = true;
        } else {
            checkedTask.done = false;
        }
        if (fromList.allTasksDone) {
            fromList.done = true;
        }
        this.store();
        tasksView(fromList.name, this);
        return
    }

    store() {
        storeItem('lists-collection', this);
    }
}