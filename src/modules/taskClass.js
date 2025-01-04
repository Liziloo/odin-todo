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

    move(newListName, lists) {
        for (let list of lists) {
            if (list.name === this.list) {
                list.deleteTask(this);
            }
            if (list.name === newListName) {
                list.tasks.push(this);
            }
        }
        this.list = newListName;
    }
}