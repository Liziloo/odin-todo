
import { storeItem } from "./localStorage";
import { openListModal } from "./newListModal";
export { listsView };


const listsView = (lists) => {
    const contentDiv = document.querySelector('#content');
    contentDiv.textContent = '';

    const listsDiv = document.createElement('div');
    for (let list of lists) {
        const listLi = document.createElement('div');
        listLi.classList.add('list-div');
        const listName = document.createElement('div');
        listName.textContent = list.name;
        const defaultRadio = document.createElement('input');
        defaultRadio.setAttribute('type', 'radio');
        defaultRadio.setAttribute('name', 'default-check');
        defaultRadio.dataset.listName = list.name;
        if (list.isDefault === true) {
            defaultRadio.checked = true;
        }
        const defaultLabel = document.createElement('label');
        defaultLabel.textContent = 'Default list';
        const listDuedate = document.createElement('div');
        listDuedate.textContent = `Due: ${list.duedate.toLocaleString()}`;
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button-div');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', (e) => {
            e.preventDefault();
            openListModal(list, lists);
        })
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.listName = list.name;
        deleteButton.addEventListener('click', (e) => {
            e.preventDefault();
            const deleteListName = e.target.dataset.listName;
            const newLists = lists.filter(list => list.name !== deleteListName);
            storeItem('lists', newLists);
            listsView(newLists);
        })
        buttonDiv.append(editButton, deleteButton);
        listLi.append(listName, defaultRadio, defaultLabel, listDuedate, buttonDiv);
        listsDiv.appendChild(listLi);
    }
    contentDiv.appendChild(listsDiv);

    const currentSelectedRadio = document.querySelector('input[name="default-check"]:checked');
    const defaultRadios = document.querySelectorAll('input[type="radio"]');
    defaultRadios.forEach((radioButton) => {
        radioButton.addEventListener('change', (e) => {
            const newDefaultListName = e.target.dataset.listName;
            for (let list of lists) {
                if (list.name === currentSelectedRadio.dataset.listName) {
                    list.isDefault = false;
                }
                else if (list.name === newDefaultListName) {
                    list.isDefault = true;
                }
            }
            storeItem('lists', lists);
            listsView();
        })
    })
    
}