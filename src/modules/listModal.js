import { format } from "date-fns";
import { isValidDate } from "./dateTime";
export { openListModal };


const openListModal = (list, listsCollection) => {
    const contentDiv = document.querySelector('#content');
    const modalBackgroundDiv = document.createElement('div');
    modalBackgroundDiv.classList.add('modal-background');
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    const modalTitle = document.createElement('h3');
    modalTitle.classList.add('modal-title');
    modalTitle.textContent = 'Add new list';
    const closeButton = document.createElement('button');
    closeButton.classList.add('modal-close');
    closeButton.textContent = 'Close';
    modalHeader.append(modalTitle, closeButton);

    const listForm = document.createElement('form');
    listForm.classList.add('list-form');

    const newOrUpdate = document.createElement('input');
    newOrUpdate.name = 'new-or-update';
    newOrUpdate.hidden = true;
    if (!list) {
        newOrUpdate.value = 'new';
    } else {
        newOrUpdate.value = 'update';
    }

    const originalListNameInput = document.createElement('input')
    originalListNameInput.hidden = true;
    originalListNameInput.name = 'original-list-name';
    if (list) {
        originalListNameInput.value = list.name;
    }

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name-div');
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'List name:';
    nameLabel.htmlFor = 'list-name';
    const nameInput = document.createElement('input');
    nameInput.id = 'list-name';
    nameInput.required = true;
    nameInput.setAttribute('name', 'list-name');
    nameInput.value = list ? list.name : '';
    nameDiv.append(nameLabel, nameInput);

    const duedateDiv = document.createElement('div');
    duedateDiv.classList.add('duedate-div');
    const duedateLabel = document.createElement('label');
    duedateLabel.textContent = 'Complete list by:';
    duedateLabel.htmlFor = 'list-duedate';
    const duedateInput = document.createElement('input');
    duedateInput.id = 'list-duedate';
    duedateInput.setAttribute('type', 'datetime-local');
    duedateInput.setAttribute('name', 'list-duedate');
    duedateInput.value = list && isValidDate(list.duedate) ? format(list.duedate, "yyyy-MM-dd'T'HH:mm") : '';
    duedateDiv.append(duedateLabel, duedateInput);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('list-description');
    const descriptionLabel = document.createElement('label');
    descriptionLabel.htmlFor = 'list-description';
    descriptionLabel.textContent = 'Description:';
    const descriptionInput = document.createElement('input');
    descriptionInput.id = 'list-description';
    descriptionInput.setAttribute('name', 'list-description');
    descriptionInput.value = list ? list.description : '';
    descriptionDiv.append(descriptionLabel, descriptionInput);

    const submitButton = document.createElement('button');
    submitButton.classList.add('list-submit-button');
    if (list) {
        submitButton.textContent = 'Edit list';
    } else {
        submitButton.textContent = 'Add list';
    }

    listForm.append(newOrUpdate, originalListNameInput, nameDiv, duedateDiv, descriptionDiv, submitButton);

    modalDiv.append(modalHeader, listForm);
    modalBackgroundDiv.appendChild(modalDiv);
    contentDiv.appendChild(modalBackgroundDiv);
    
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        const listForm = document.querySelector('.list-form');
        const formData = new FormData(listForm);
        listsCollection.handleListSubmit(formData);
        modalBackgroundDiv.remove();
    })

    closeButton.addEventListener('click', handleCloseModal);

    function handleCloseModal() {
        const listModal = document.querySelector('.modal-background');
        listModal.remove();
    }

}