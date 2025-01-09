import { isValidDate } from "./dateTime";
import { allTasksDone } from "./listClass";
import { storeItem } from "./localStorage";
import { tasksView } from "./tasksView";
export { Task, handleTaskSubmit, toggleTask };

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

const toggleTask = (e, selectedList, lists) => {
    const checkedTask = selectedList.tasks.find(checkedTask => checkedTask.name === e.target.dataset.taskName);
    if (e.target.checked === true) {
        checkedTask.done = true;
    } else {
        checkedTask.done = false;
    }
    if (selectedList.done) {
        selectedList.done = true;
    }
    storeItem('lists', lists);
    return lists;
}