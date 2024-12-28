
import { addList, lists } from "./list";
export default taskView;


const contentDiv = document.querySelector('#content');


function taskView() {
    
    addList("default", "I'm a tasklist");
    addList("personal");
    for (let list of lists) {
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
        listDiv.append(listName, taskUl);
        contentDiv.appendChild(listDiv);
    }

}