
import { initiateListsCollection, List } from "./listClass";
import { openListModal } from "./newListModal";
import { storeItem } from "./localStorage";
import { openTaskModal } from "./newTaskModal";
export { listView };


const contentDiv = document.querySelector('#content');

// Check if user already has lists in local storage, if not, create default list
const lists = initiateListsCollection();

function listView(selectedListName) {
    const selectedList = lists.find(selectedList => selectedList.name === selectedListName);
    
    contentDiv.textContent = '';

    const newListDiv = document.createElement('div');
    const newListButton = document.createElement('button');
    newListButton.classList.add('new-list-button');
    newListButton.textContent = 'New list';
    newListDiv.appendChild(newListButton);
    newListButton.addEventListener('click', clickHandlerNewList);

    const listSelectDiv = document.createElement('div');
    const listSelect = document.createElement('select');
    listSelect.setAttribute('name', 'list');
    const allOption = document.createElement('option');
    allOption.textContent = 'All tasks';
    allOption.value = 'all';
    listSelect.appendChild(allOption);
    for (let list of lists) {
        const listOption = document.createElement('option');
        listOption.setAttribute('value', list.name);
        listOption.textContent = list.name;
        if (list.name === selectedListName) {
            listOption.selected = true;
        }
        listSelect.append(listOption);
    }
    listSelectDiv.appendChild(listSelect);
    listSelect.addEventListener('change', (e) => {changeHandlerListSelect(e)});

    const listDiv = document.createElement('div');
    if (selectedListName !== 'all') {
        console.log('triggered');
        const taskButton = document.createElement('button');
        taskButton.classList.add('.new-task-button');
        taskButton.textContent = 'Add task';
        taskButton.dataset.list = selectedListName;
        taskButton.addEventListener('click', (e) => {clickHandlerNewTask(e)});
        listDiv.appendChild(taskButton);
    }
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('tasks-div');
    const taskUl = document.createElement('ul');
    taskUl.classList.add('task-ul');
    if (selectedListName === 'all') {
        for (let list of lists) {
            const tasks = []
            for (let task of list.tasks) {
                tasks.push(task);
            }
            populateTaskList(tasks);
        }
    } else {
        populateTaskList(selectedList.tasks);
    }
   
    taskDiv.appendChild(taskUl);
    listDiv.appendChild(taskDiv);
    contentDiv.append(newListDiv, listSelectDiv, listDiv, taskDiv);

    function clickHandlerNewTask(e) {
        e.preventDefault();
        openTaskModal();
        const submitButton = document.querySelector('.task-submit-button');
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            const taskForm = document.querySelector('.task-form');
            const formData = new FormData(taskForm);
            const taskName = formData.get('task-name');
            const taskDescription = formData.get('task-description');
            const taskDuedate = new Date(formData.get('task-duedate'));
            const taskPriority = formData.get('task-priority');
            const taskNotes = formData.get('task-notes');
            selectedList.addTask(taskName, taskDescription, taskDuedate, taskPriority, taskNotes, false);
            storeItem('lists', lists);
            const modal = document.querySelector('.modal-background');
            modal.remove();
            listView(selectedListName);
        })
    }

    function clickHandlerTaskCheckbox(e) {
        const checkedTask = selectedList.tasks.find(checkedTask => checkedTask.name === e.target.dataset.taskName);
        if (e.target.checked === true) {
            checkedTask.done = true;
        } else {
            checkedTask.done = false;
        }
        storeItem('lists', lists);
    }

    function clickHandlerNewList(e) {
        e.preventDefault();
        openListModal();
        const submitButton = document.querySelector('.list-submit-button');
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            const listForm = document.querySelector('.list-form');
            const formData = new FormData(listForm);
            const listName = formData.get('list-name');
            const listDescription = formData.get('list-description');
            const newList = new List(listName, listDescription ? listDescription : '');
            lists.push(newList);
            storeItem('lists', lists);
            const modal = document.querySelector('.modal-background');
            modal.remove();
            listView(listName);
        })
    }

    function changeHandlerListSelect(e) {
        const newSelectedListName = e.target.value;
        taskUl.textContent = '';
        listView(newSelectedListName);
    }

    function populateTaskList(tasks) {
        for (let task of tasks) {
            const taskLi = document.createElement('li');
            const taskCheckbox = document.createElement('input');
            taskCheckbox.setAttribute('type', 'checkbox');
            taskCheckbox.dataset.taskName = task.name;
            if (task.done) {
                taskCheckbox.checked = true;
            }
            const checkboxLabel = document.createElement('label');
            checkboxLabel.textContent = task.name;
            taskLi.append(taskCheckbox, checkboxLabel);
            taskUl.appendChild(taskLi);
            taskCheckbox.addEventListener('click', (e) => {clickHandlerTaskCheckbox(e)});
        }
    }
    console.log(lists);
}
