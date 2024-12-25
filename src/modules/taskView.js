
import { lists } from "./list";
export default taskView;

const currentLists = lists;

const contentDiv = document.querySelector('#content');

function taskView() {
    for (let list of currentLists) {
        const listDiv = document.createElement('div');
        listDiv.classList.add('list');
        const listName = document.createElement('h3');
        listName.textContent = list.name;
        const taskUl = document.createElement('ul');
        taskUl.classList.add('tasks');
        const listTasks = list.tasks;
        for (let task in listTasks) {
            const taskLi = document.createElement('li');
            taskLi.textContent = task.name;
            taskUl.appendChild(taskLi);
        }
        listDiv.appendChild(taskUl);
        contentDiv.appendChild(listDiv);
    }

}