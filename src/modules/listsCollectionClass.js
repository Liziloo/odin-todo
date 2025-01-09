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

    toggleTask(e, selectedList) {
        const checkedTask = selectedList.tasks.find(checkedTask => checkedTask.name === e.target.dataset.taskName);
        if (e.target.checked === true) {
            checkedTask.done = true;
        } else {
            checkedTask.done = false;
        }
        if (selectedList.allTasksDone) {
            selectedList.done = true;
        }
        this.store();
        tasksView(selectedList.name, this);
        return
    }

    store() {
        storeItem('lists-collection', this);
    }
}