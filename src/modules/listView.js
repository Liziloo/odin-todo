
import { initiateListsCollection, List } from "./list";
import { openListModal } from "./listModal";
import { storeItem } from "./localStorage";
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
    contentDiv.append(newListDiv, listsDiv);
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
}
