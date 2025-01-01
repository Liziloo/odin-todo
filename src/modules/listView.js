
import { initiateListsCollection, List } from "./list";
import { openListModal } from "./listModal";
import { storeItem } from "./localStorage";
import { taskList } from "./taskList";
import { openTaskModal } from "./taskModal";
export { listView };


const contentDiv = document.querySelector('#content');

// Check if user already has lists in local storage, if not, create default list
const lists = initiateListsCollection();

function listView() {
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
    const allListsOption = document.createElement('option');
    allListsOption.setAttribute('value', 'all');
    allListsOption.textContent = 'All tasks';
    for (let list of lists) {
        const listOption = document.createElement('option');
        listOption.setAttribute('value', list.name);
        listOption.textContent = list.name;
        listSelect.append(allListsOption, listOption);
    }
    listSelect.addEventListener('change', (e) => {changeHandlerListSelect(e)});
    listSelectDiv.appendChild(listSelect);

    const listDiv = document.createElement('div');
    const taskButton = document.createElement('button');
    taskButton.classList.add('.new-task-button');
    taskButton.textContent = 'Add task';
    taskButton.dataset.list = 'All';
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('tasks');
    const taskUl = document.createElement('ul');
    taskUl.classList.add('task-ul');
    for (let list of lists) {
        const listTasks = list.tasks;
        for (let task of listTasks) {
            const taskLi = document.createElement('li');
            taskLi.textContent = task.name;
            taskUl.appendChild(taskLi);
        }
    }
    taskDiv.appendChild(taskUl);
    listDiv.append(taskButton, taskDiv);
    contentDiv.append(newListDiv, listSelectDiv, listDiv, taskDiv);
    listDiv.addEventListener('click', (e) => {clickHandlerListDiv(e)});

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
            storeItem('lists', JSON.stringify(lists));
            const modal = document.querySelector('.modal-background');
            modal.remove();
            listView();
        })
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
            const newList = new List(listName, listDescription);
            lists.push(newList);
            storeItem('lists', JSON.stringify(lists));
            const modal = document.querySelector('.modal-background');
            modal.remove();
            listView();
        })
    }

    function changeHandlerListSelect(e) {
        const selectedList = e.target.value;
        taskButton.dataset.list = selectedList;
        taskUl.textContent = '';
        if (selectedList === 'all') {
            for (let list of lists) {
                const listTasks = list.tasks;
                for (let task of listTasks) {
                    const taskLi = document.createElement('li');
                    taskLi.textContent = task.name;
                    taskUl.appendChild(taskLi);
                }
            }
        } else {
            for (let list of lists) {
                if (list.name === selectedList) {
                    taskList(list);
                }
            }
        }
        
    }
}
