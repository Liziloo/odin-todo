export { openTaskModal };

// Set the number of priority options available
const priorityNumber = 5;

const openTaskModal = (selectedList) => {
    const contentDiv = document.querySelector('#content');
    const modalBackgroundDiv = document.createElement('div');
    modalBackgroundDiv.classList.add('modal-background');
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal');

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
    listInput.setAttribute('name', 'task-list');
    listInput.hidden = true;
    listInput.value = selectedList;

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('task-name');
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Task name:';
    const nameInput = document.createElement('input');
    nameInput.required = true;
    nameInput.setAttribute('name', 'task-name');
    nameDiv.append(nameLabel, nameInput);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('task-description');
    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description:';
    const descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('name', 'task-description');
    descriptionDiv.append(descriptionLabel, descriptionInput);

    const duedateDiv = document.createElement('div');
    duedateDiv.classList.add('task-duedate');
    const duedateLabel = document.createElement('label');
    duedateLabel.textContent = 'Due date:';
    const duedateInput = document.createElement('input');
    duedateInput.setAttribute('name', 'task-duedate');
    duedateDiv.append(duedateLabel, duedateInput);

    const priorityDiv = document.createElement('div');
    priorityDiv.classList.add('task-priority');
    const priorityLabel = document.createElement('label');
    priorityLabel.textContent = 'Priority:';
    const prioritySelect = document.createElement('select');
    prioritySelect.classList.add('task-priority-select');
    prioritySelect.setAttribute('name', 'task-priority');
    prioritySelect.required = true;
    for (let i = 1; i <= priorityNumber; i++) {
        const priorityOption = document.createElement('option');
        priorityOption.value = i;
        priorityOption.textContent = i;
        prioritySelect.appendChild(priorityOption);
    }
    priorityDiv.append(priorityLabel, prioritySelect);

    const notesDiv = document.createElement('div');
    notesDiv.classList.add('task-notes');
    const notesLabel = document.createElement('label');
    notesLabel.textContent = 'Notes:';
    const notesInput = document.createElement('textarea');
    notesInput.setAttribute('name', 'task-notes');
    notesDiv.append(notesLabel, notesInput);

    const submitButton = document.createElement('button');
    submitButton.classList.add('task-submit-button');
    submitButton.textContent = 'Add task';

    taskForm.append(nameDiv, descriptionDiv, duedateDiv, priorityDiv, notesDiv, submitButton);

    modalDiv.append(modalHeader, taskForm);
    modalBackgroundDiv.appendChild(modalDiv);
    contentDiv.appendChild(modalBackgroundDiv);

}