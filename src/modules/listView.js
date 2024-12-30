
import { addList, lists } from "./list";
import { taskModal } from "./taskModal";
export default listView;


const contentDiv = document.querySelector('#content');

function listView() {
    
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
        taskModal(selectedList);
    }

}

