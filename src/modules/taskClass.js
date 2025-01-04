import { initiateListsCollection } from "./listClass";
import { storeItem } from "./localStorage";

export { Task };

class Task {
    constructor(listName, name, description, duedate, priority, notes, done) {
        this.list = listName,
        this.name = name,
        this.description = description,
        this.duedate = duedate,
        this.priority = priority,
        this.notes = notes,
        this.done = done
    }

    move(newListName) {
        console.log(newListName);
        const lists = initiateListsCollection();
        console.log(lists);
        for (let list of lists) {
            if (list.name === newListName) {
                list.tasks.push(this);
            }
            if (list.name === this.list) {
                list.deleteTask(this.name);
            }
            this.list = newListName;
        }
        storeItem('lists', lists);
    }
}