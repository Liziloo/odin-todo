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

    addTask(formData) {
        const taskName = formData.get('task-name');
        for (let task of this.tasks) {
            if (taskName === task.name) {
                alert('A task with that name already exists.')
                return
            }
        }
        const taskDescription = formData.get('task-description');
        const formDuedate = new Date(formData.get('task-duedate'));
        const taskDuedate = isValidDate(formDuedate) ? formDuedate : 'None';
        const taskPriority = formData.get('task-priority');
        const taskNotes = formData.get('task-notes');
        const taskDone = formData.get('task-done') === 'true' ? true : false;
        const newTask = new Task(taskName, taskDescription, taskDuedate, taskPriority, taskNotes, taskDone);
        this.tasks.push(newTask);
    }

    updateTask(formData) {
        const taskName = formData.get('task-name');
        for (let task of this.tasks) {
            if (task.name === taskName) {
                const submittedDueDate = formData.get('task-duedate');
                const taskDuedate = new Date(submittedDueDate);
                const taskDone = formData.get('task-done') === 'false' ? false : true;
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

    deleteTask(task) {
        this.tasks = this.tasks.filter(existingTask => existingTask !== task);
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