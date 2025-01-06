import { isValidDate } from "./dateTime";
import { storeItem } from "./localStorage";
import { tasksView } from "./tasksView";
export { Task, handleTaskSubmit };

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

    getDistance() {
        return this.duedate - new Date.now();
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

const handleTaskSubmit = (formData, task, lists) => {
    const taskName = formData.get('task-name');
    const listName = formData.get('task-list-name');
    const selectedList = lists.find(list => list.name === listName);
    const taskDescription = formData.get('task-description');
    const formDueDate = new Date(formData.get('task-duedate'));
    const taskDuedate = isValidDate(formDueDate) ? formDueDate : 'None';
    const taskPriority = formData.get('task-priority');
    const taskNotes = formData.get('task-notes');
    const taskDone = formData.get('task-done');
    if (!task) {
        selectedList.addTask(taskName, taskDescription, taskDuedate, taskPriority, taskNotes, taskDone);
    } else {
        task.name = taskName;
        task.description = taskDescription;
        task.duedate = taskDuedate;
        task.priority = taskPriority;
        task.notes = taskNotes;
        task.done = taskDone;
        if (task.list !== listName) {
            task.move(listName, lists);
        }
    }
    storeItem('lists', lists);
    tasksView(listName, lists);
}