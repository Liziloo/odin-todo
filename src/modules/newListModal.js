export { openListModal };


const openListModal = () => {
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
    nameDiv.classList.add('list-name');
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'List name:';
    const nameInput = document.createElement('input');
    nameInput.required = true;
    nameInput.setAttribute('name', 'list-name');
    nameDiv.append(nameLabel, nameInput);

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

    listForm.append(nameDiv, descriptionDiv, submitButton);

    modalDiv.append(modalHeader, listForm);
    modalBackgroundDiv.appendChild(modalDiv);
    contentDiv.appendChild(modalBackgroundDiv);

    closeButton.addEventListener('click', handleCloseModal);

    function handleCloseModal() {
        const listModal = document.querySelector('.modal-background');
        listModal.remove();
    }
    
    

}