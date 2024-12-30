export { taskModal };

const taskModal = (selectedList) => {
    const contentDiv = document.querySelector('#content');
    const modalDialogue = document.createElement('dialogue');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    const modalTitle = document.createElement('h3');
    modalTitle.classList.add('modal-title');
    modalTitle.textContent = 'Add new task';
    const closeButton = document.createElement('button');
    closeButton.classList.add('modal-close');
    closeButton.textContent = 'Close';
    modalHeader.append(modalTitle, closeButton);

    const taskForm = document.createElement('form');
    const listInput = document.createElement('input');
    listInput.setAttribute('hidden');
    listInput.value = selectedList;
    const nameDiv = document.createElement('div');
    const nameLabel = document.createElement('label');
    nameLabel.classList.add('task-name');
    const nameInput = document.createElement('input');
    nameDiv.append(nameLabel, nameInput);
    taskForm.append(nameDiv);

    modalDialogue.append(modalHeader, taskForm);
    contentDiv.appendChild(modalDialogue);
}