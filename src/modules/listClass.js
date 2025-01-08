import { isValidDate } from "./dateTime";
import { Task } from "./taskClass";
export { List };


class List {
    constructor(name, description, duedate, isDone) {
        this.name = name,
        this.description = description,
        this.tasks = [],
        this.duedate = duedate,
        this.done = isDone ? isDone : false
    }

    addTask(taskName, description, duedate, priority, notes, done) {
        const newTask = new Task(this.name, taskName, description, duedate, priority, notes, done);
        this.tasks.push(newTask);
    }

    updateTask(formData) {
        const taskName = formData.get('task-name');
        for (let task of this.tasks) {
            if (task.name === taskName) {
                const submittedDueDate = formData.get('task-duedate');
                const taskDuedate = new Date(submittedDueDate);
                const taskDone = formData.get('task-done') === 'false' ? false : true;

                task.name = taskName;
                task.description = formData.get('task-description');
                task.duedate = isValidDate(taskDuedate) ? taskDuedate : 'None';
                task.priority = formData.get('task-priority');
                task.notes = formData.get('task-notes');
                task.done = taskDone;
                return
            }
        }
        alert('No such task');
    }

    deleteTask(taskName) {
        this.tasks = this.tasks.filter(existingTask => existingTask.name !== taskName);
    }

    sortedByDate() {
        return this.tasks.toSorted((a, b) => a.getDistance() - b.getDistance());
    }

    allTasksDone() {
        for (let task of this.tasks) {
            if (!task.done) {
                return false;
            }
        }
        return true;
    }
}