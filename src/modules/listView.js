
import { List } from "./list";
import { storeItem } from "./localStorage";
import { openTaskModal } from "./taskModal";
export { listView };


const contentDiv = document.querySelector('#content');

// Check if user already has lists in local storage, if not, create default list
const lists = () => {
    if (!localStorage.getItem('lists')) {
        const defaultList = new List('default');
        const newLists = [];
        newLists.push(defaultList);
        storeItem('lists', newLists);
        return newLists;
    } else {
        return localStorage.getItem('lists');
    }
}

function listView() {
    contentDiv.textContent = '';
    const listsDiv = document.createElement('div');
    listsDiv.id = 'lists';
    for (let list of lists) {
        const listDiv = document.createElement('div');
        listDiv.classList.add('list');
        const listName = document.createElement('h3');
        listName.textContent = list.name;
        const taskButton = document.createElement('button');
        taskButton.textContent = 'Add task';
        taskButton.dataset.list = list.name;
        const taskUl = document.createElement('ul');
        taskUl.classList.add('tasks');
        const listTasks = list.tasks;
        for (let task of listTasks) {
            const taskLi = document.createElement('li');
            taskLi.textContent = task.name;
            taskUl.appendChild(taskLi);
        }
        listDiv.append(listName, taskButton, taskUl);
        listsDiv.appendChild(listDiv);
    }
    contentDiv.appendChild(listsDiv);
    listsDiv.addEventListener('click', (e) => {clickHandlerListDiv(e)});

    function clickHandlerListDiv(e) {
        const selectedList = e.target.dataset.list;
        openTaskModal();
        const submitButton = document.querySelector('.task-submit-button');
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            const taskForm = document.querySelector('.task-form');
            const formData = new FormData(taskForm);
            const taskName = formData.get('task-name');
            const taskDescription = formData.get('task-description');
            const taskDuedate = formData.get('task-duedate');
            const taskPriority = formData.get('task-priority');
            const taskNotes = formData.get('task-notes');
            for (let list of lists) {
                if (list.name === selectedList) {
                    list.addTask(taskName, taskDescription, taskDuedate, taskPriority, taskNotes);
                }
            }
            const modal = document.querySelector('.modal-background');
            modal.remove();
            listView();
        })
    }
}
