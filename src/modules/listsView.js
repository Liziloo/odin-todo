import { openListModal } from "./listModal";
export { listsView };


const listsView = (listsCollection) => {
    const contentDiv = document.querySelector('#content');
    contentDiv.textContent = '';

    const newListDiv = document.createElement('div');
    const newListButton = document.createElement('button');
    newListButton.classList.add('new-list-button');
    newListButton.textContent = 'New list';
    newListDiv.appendChild(newListButton);
    newListButton.addEventListener('click', clickHandlerNewList);

    const listsDiv = document.createElement('div');
    for (let list of listsCollection.lists) {
        const listLi = document.createElement('div');
        listLi.classList.add('list-div');

        const listName = document.createElement('div');
        listName.classList.add('list-name');
        listName.textContent = list.name;

        const radioDiv = document.createElement('div');
        const defaultRadio = document.createElement('input');
        defaultRadio.setAttribute('type', 'radio');
        defaultRadio.setAttribute('name', 'default-check');
        defaultRadio.dataset.listName = list.name;
        if (list.name === listsCollection.default) {
            defaultRadio.checked = true;
        }
        const defaultLabel = document.createElement('label');
        defaultLabel.textContent = 'Make default';
        radioDiv.append(defaultRadio, defaultLabel);

        const listDuedate = document.createElement('div');
        listDuedate.textContent = `Duedate: ${list.duedate.toLocaleString()}`;
        const buttonDiv = document.createElement('div');
        buttonDiv.classList.add('button-div');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', (e) => {
            e.preventDefault();
            openListModal(list, listsCollection);
        })
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.listName = list.name;
        deleteButton.addEventListener('click', (e) => {
            e.preventDefault();        
            const deleteListName = e.target.dataset.listName;
            listsCollection.deleteList(deleteListName);
        })
        buttonDiv.append(editButton, deleteButton);
        listLi.append(listName, radioDiv, listDuedate, buttonDiv);
        listsDiv.appendChild(listLi);
    }
    contentDiv.append(newListDiv, listsDiv);

    const defaultRadios = document.querySelectorAll('input[type="radio"]');
    defaultRadios.forEach((radioButton) => {
        radioButton.addEventListener('change', (e) => {
            const newDefaultListName = e.target.dataset.listName;
            listsCollection.handleDefaultChange(newDefaultListName);
        })
    })

    function clickHandlerNewList(e) {
        e.preventDefault();
        openListModal(null, listsCollection);
    }
    
}