import { format } from 'date-fns';
import { isValidDate } from './dateTime';
export { openTaskModal };

// Set the number of priority options available
const priorityNumber = 5;

const openTaskModal = (e, listsCollection) => {
    const chosenList = listsCollection.lists.find((list) => list.name === e.target.dataset.listName);
    const chosenTask = chosenList.tasks.find((task) => task.name === e.target.dataset.taskName);

    const taskButton = document.querySelector('.new-task-button');

    const contentDiv = document.querySelector('#content');
    const modalBackgroundDiv = document.createElement('div');
    modalBackgroundDiv.classList.add('modal-background');
    const modalDiv = document.createElement('div');
    modalDiv.classList.add('modal');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');
    const modalTitle = document.createElement('h3');
    modalTitle.classList.add('modal-title');
    if (!chosenTask) {
        modalTitle.textContent = 'Add new task';
    } else {
        modalTitle.textContent = chosenTask.name;
    }
    
    const closeButton = document.createElement('button');
    closeButton.classList.add('modal-close');
    closeButton.textContent = 'Close';
    modalHeader.append(modalTitle, closeButton);

    const taskForm = document.createElement('form');
    taskForm.classList.add('task-form');

    const newOrUpdateInput = document.createElement('input');
    newOrUpdateInput.hidden = true;
    newOrUpdateInput.name = 'new-or-update';
    if (chosenTask) {
        newOrUpdateInput.value = 'update';
    } else {
        newOrUpdateInput.value = 'new';
    }

    const originalListInput = document.createElement('input');
    originalListInput.hidden = true;
    originalListInput.name = 'original-list';
    originalListInput.value = chosenList.name;

    const taskDoneInput = document.createElement('input');
    taskDoneInput.hidden = true;
    taskDoneInput.name = 'task-done';
    if (chosenTask) {
        taskDoneInput.value = chosenTask.done;
    } else {
        taskDoneInput.value = false;
    }

    const nameDiv = document.createElement('div');
    nameDiv.classList.add('task-name');
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Task name:';
    const nameInput = document.createElement('input');
    nameInput.required = true;
    nameInput.setAttribute('name', 'task-name');
    nameInput.value = chosenTask ? chosenTask.name : null;
    nameDiv.append(nameLabel, nameInput);

    const listsDiv = document.createElement('div');
    const listsSelectLabel = document.createElement('label');
    listsSelectLabel.textContent = 'Add to List:';
    listsSelectLabel.setAttribute('for', 'task-list-name');
    const listsSelect = document.createElement('select');
    listsSelect.setAttribute('name', 'task-list-name');
    listsSelect.id = 'task-list';
    for (let list of listsCollection.lists) {
        const listOption = document.createElement('option');
        listOption.value = list.name;
        listOption.textContent = list.name;
        if (list.name === chosenList.name) {
            listOption.selected = true;
        }
        listsSelect.appendChild(listOption);
    }
    listsDiv.append(listsSelectLabel, listsSelect);


    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('task-description');
    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description:';
    const descriptionInput = document.createElement('input');
    descriptionInput.setAttribute('name', 'task-description');
    descriptionInput.value = chosenTask ? chosenTask.description : null;
    descriptionDiv.append(descriptionLabel, descriptionInput);

    const duedateDiv = document.createElement('div');
    duedateDiv.classList.add('task-duedate');
    const duedateLabel = document.createElement('label');
    duedateLabel.textContent = 'Due date:';
    const duedateInput = document.createElement('input');
    duedateInput.setAttribute('name', 'task-duedate');
    duedateInput.setAttribute('type', 'datetime-local');
    duedateInput.value = chosenTask && isValidDate(chosenTask.duedate) ? format(chosenTask.duedate, "yyyy-MM-dd'T'HH:mm") : null;
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
        if (chosenTask) {
            priorityOption.selected = i === chosenTask.priority ? true : false;
        }
        prioritySelect.appendChild(priorityOption);
    }
    priorityDiv.append(priorityLabel, prioritySelect);

    const notesDiv = document.createElement('div');
    notesDiv.classList.add('task-notes');
    const notesLabel = document.createElement('label');
    notesLabel.textContent = 'Notes:';
    const notesInput = document.createElement('textarea');
    notesInput.setAttribute('name', 'task-notes');
    notesInput.value = chosenTask ? chosenTask.notes : null;
    notesDiv.append(notesLabel, notesInput);

    const submitButton = document.createElement('button');
    submitButton.classList.add('task-submit-button');
    submitButton.textContent = chosenTask? 'Save edits' : 'Add task';
    submitButton.addEventListener('click', (e) => {
        e.preventDefault();
        const taskForm = document.querySelector('.task-form');
        const formData = new FormData(taskForm);
        listsCollection.handleTaskSubmit(formData);
    })

    taskForm.append(taskDoneInput, originalListInput, newOrUpdateInput, nameDiv, listsDiv, descriptionDiv, duedateDiv, priorityDiv, notesDiv, submitButton);

    modalDiv.append(modalHeader, taskForm);
    modalBackgroundDiv.appendChild(modalDiv);
    contentDiv.appendChild(modalBackgroundDiv);

    closeButton.addEventListener('click', handleCloseModal);

    function handleCloseModal() {
        modalBackgroundDiv.remove();
    }
}