import { initiateListsCollection } from "./listClass";
export { listsView };


const contentDiv = document.querySelector('#content');

const lists = initiateListsCollection();

function listsView() {
    contentDiv.textContent = '';

    const listsUl = document.createElement('ul');
    for (let list of lists) {
        const listLi = document.createElement('li');
        const listName = document.createElement('span');
        listName.textContent = list.name;
        const listDuedate = document.createElement('span');
        listDuedate.textContent = `Due: ${list.duedate.toLocaleString()}`;
        listLi.appendChild(listName);
        listsUl.appendChild(listLi);
    }
    contentDiv.appendChild(listsUl);
}