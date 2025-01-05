import { format } from "date-fns";
import { tasksView } from "./tasksView";
import { handleNewList } from "./listClass";
export { openListModal };


const openListModal = (list, lists) => {
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

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name-div');
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'List name:';
    const nameInput = document.createElement('input');
    nameInput.required = true;
    nameInput.setAttribute('name', 'list-name');
    nameDiv.append(nameLabel, nameInput);

    const duedateDiv = document.createElement('div');
    duedateDiv.classList.add('duedate-div');
    const duedateLabel = document.createElement('label');
    duedateLabel.textContent = 'Complete list by:';
    const duedateInput = document.createElement('input');
    duedateInput.setAttribute('type', 'datetime-local');
    duedateInput.setAttribute('name', 'list-duedate');
    duedateInput.value = list ? format(list.duedate, "yyyy-MM-dd'T'HH:mm") : null;
    duedateDiv.append(duedateLabel, duedateInput);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('list-description');
    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description:';
    const descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('name', 'list-description');
    descriptionDiv.append(descriptionLabel, descriptionInput);

    const submitButton = document.createElement('button');
    submitButton.classList.add('list-submit-button');
    submitButton.textContent = 'Add list';

    listForm.append(nameDiv, duedateDiv, descriptionDiv, submitButton);

    modalDiv.append(modalHeader, listForm);
    modalBackgroundDiv.appendChild(modalDiv);
    contentDiv.appendChild(modalBackgroundDiv);

    closeButton.addEventListener('click', handleCloseModal);

    function handleCloseModal() {
        const listModal = document.querySelector('.modal-background');
        listModal.remove();
    }
    
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        const listForm = document.querySelector('.list-form');
        const formData = new FormData(listForm);
        const newListName = handleNewList(formData, lists);
        modalBackgroundDiv.remove();
        tasksView(newListName, lists);
    })

}