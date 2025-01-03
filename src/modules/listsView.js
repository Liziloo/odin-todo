import { initiateListsCollection } from "./listClass";
import { storeItem } from "./localStorage";
export { listsView };


const contentDiv = document.querySelector('#content');


const listsView = () => {
    contentDiv.textContent = '';
    const lists = initiateListsCollection();

    const listsUl = document.createElement('ul');
    for (let list of lists) {
        const listLi = document.createElement('div');
        listLi.classList.add('list-div');
        const listName = document.createElement('div');
        listName.textContent = list.name;
        const listDuedate = document.createElement('div');
        listDuedate.textContent = `Due: ${list.duedate.toLocaleString()}`;
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button-div');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.listName = list.name;
        deleteButton.addEventListener('click', (e) => {
            const deleteListName = e.target.dataset.listName;
            const newLists = lists.filter(list => list.name !== deleteListName);
            storeItem('lists', newLists);
            listsView();
        })
        buttonDiv.append(editButton, deleteButton);
        listLi.append(listName, listDuedate, buttonDiv);
        listsUl.appendChild(listLi);
    }
    contentDiv.appendChild(listsUl);
}