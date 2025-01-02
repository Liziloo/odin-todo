export { Task };

class Task {
    constructor(name, description, duedate, priority, notes, done) {
        this.name = name,
        this.description = description,
        this.duedate = duedate,
        this.priority = priority,
        this.notes = notes,
        this.done = done
    }
}