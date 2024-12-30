
import { addList } from "./list";
import { addTask } from "./task";
import { openTaskModal } from "./taskModal";
export { listView };


const contentDiv = document.querySelector('#content');

function listView() {

    const lists = [];
    
    addList("default");
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
        for (let task in listTasks) {
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
        openTaskModal(selectedList);

        const closeButton = document.querySelector('.modal-close');
        const submitButton = document.querySelector('.task-submit-button');
        closeButton.addEventListener('click', handleCloseModal);
        submitButton.addEventListener('click', function(event) {handleTaskSubmit(event)});
    }
}

function handleCloseModal() {
    const taskModal = document.querySelector('.modal-background');
    taskModal.remove();
}

function handleTaskSubmit(event) {
    event.preventDefault();
    const taskForm = document.querySelector('form');
    const formData = new FormData(taskForm);
    const taskList = formData.get('task-list');
    const name = formData.get('task-name');
    const description = formData.get('task-description');
    const duedate = formData.get('task-duedate');
    const notes = formData.get('task-notes');
    const priority = formData.get('task-priority');
    addTask(lists, name, description, duedate, priority, notes, taskList);
    const taskModal = document.querySelector('.modal-background');
    taskModal.remove();
}