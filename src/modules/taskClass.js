export { Task };

class Task {
    constructor(list, name, description, duedate, priority, notes, done) {
        this.list = list,
        this.name = name,
        this.description = description,
        this.duedate = duedate,
        this.priority = priority,
        this.notes = notes,
        this.done = done
    }
}