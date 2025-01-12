import { openTaskModal } from "./taskModal";
export { tasksView };


const tasksView = (selectedListName, listsCollection) => {
    const contentDiv = document.querySelector('#content');
    
    const selectedList = listsCollection.lists.find(list => list.name === selectedListName);
    
    contentDiv.textContent = '';

    const listSelectDiv = document.createElement('div');
    const listSelect = document.createElement('select');
    listSelect.setAttribute('name', 'list');
    const allOption = document.createElement('option');
    allOption.textContent = 'All tasks';
    allOption.value = 'all';
    listSelect.appendChild(allOption);
    for (let list of listsCollection.lists) {
        const listOption = document.createElement('option');
        listOption.setAttribute('value', list.name);
        listOption.textContent = list.name;
        if (list.name === selectedListName) {
            listOption.selected = true;
        }
        listSelect.append(listOption);
    }
    listSelectDiv.appendChild(listSelect);
    listSelect.addEventListener('change', (e) => {changeHandlerListSelect(e)});

    const buttonDiv = document.createElement('div');
    const taskButton = document.createElement('button');
    if (selectedListName !== 'all') {
        taskButton.classList.add('new-task-button');
        taskButton.textContent = 'Add task';
        taskButton.dataset.listName = selectedListName;
        taskButton.addEventListener('click', (e) => {clickHandlerNewTask(e)});
        buttonDiv.appendChild(taskButton);
    }

    const taskDiv = document.createElement('div');
    taskDiv.classList.add('tasks-div');

    const checkBoxColumn = document.createElement('div');
    checkBoxColumn.classList.add('col');
    checkBoxColumn.appendChild(listSelectDiv);

    const checkboxColumnHeader = document.createElement('div');
    checkboxColumnHeader.textContent = 'Complete';
    checkBoxColumn.appendChild(checkboxColumnHeader);

    const taskColumn = document.createElement('div');
    taskColumn.classList.add('col');
    const taskColumnHeader = document.createElement('div');
    taskColumnHeader.textContent = 'Task';
    taskColumn.append(buttonDiv, taskColumnHeader);

    const duedateColumn = document.createElement('div');
    duedateColumn.classList.add('col');
    const duedateColumnHeader = document.createElement('div');
    duedateColumnHeader.textContent = 'Duedate';
    const columnSpacer = document.createElement('div');
    duedateColumn.append(columnSpacer, duedateColumnHeader);

    taskDiv.append(checkBoxColumn, taskColumn, duedateColumn);
    
    if (selectedListName === 'all') {
        for (let list of listsCollection.lists) {
            const tasks = []
            for (let task of list.tasks) {
                tasks.push(task);
            }
            populateTaskList(list.name, tasks);
        }
    } else {
        populateTaskList(selectedListName, selectedList.tasks);
    }
   
    contentDiv.appendChild(taskDiv);

    function clickHandlerNewTask(e) {
        e.preventDefault();
        openTaskModal(e, listsCollection);
    }

    function clickHandlerTaskCheckbox(e) {
        listsCollection.toggleTask(e);
    }

    function changeHandlerListSelect(e) {
        const newSelectedListName = e.target.value;
        tasksView(newSelectedListName, listsCollection);
    }

    function populateTaskList(listName, tasks) {
        for (let task of tasks) {
            const taskCheckboxDiv = document.createElement('div');
            const taskCheckbox = document.createElement('input');
            taskCheckbox.setAttribute('type', 'checkbox');
            taskCheckbox.id = task.name;
            taskCheckbox.dataset.taskName = task.name;
            taskCheckbox.dataset.listName = listName;
            if (task.done) {
                taskCheckbox.checked = true;
            }
            taskCheckboxDiv.appendChild(taskCheckbox);
            checkBoxColumn.appendChild(taskCheckboxDiv);

            const taskNameLabelDiv = document.createElement('div');
            const checkboxLabel = document.createElement('label');
            checkboxLabel.textContent = `${task.name}`;
            checkboxLabel.classList.add('task-name-label');
            checkboxLabel.setAttribute('for', task.name);
            checkboxLabel.dataset.taskName = task.name;
            checkboxLabel.dataset.listName = listName;
            checkboxLabel.addEventListener('click', (e) => {e.preventDefault();})
            taskNameLabelDiv.appendChild(checkboxLabel)
            taskColumn.appendChild(taskNameLabelDiv);

            const dueDateDiv = document.createElement('div');
            dueDateDiv.textContent = `Due: ${task.duedate.toLocaleString()}`;
            duedateColumn.appendChild(dueDateDiv);

            const taskDeleteButton = document.createElement('button');
            taskDeleteButton.textContent = 'x';
            taskDeleteButton.addEventListener('click', (e) => {
                e.preventDefault();
                listsCollection.deleteTask(listName, task);
            });
            taskCheckbox.addEventListener('click', (e) => {clickHandlerTaskCheckbox(e)});
            
        }

        taskColumn.addEventListener('click', (e) => {
            const selectedTaskName = e.target.dataset.taskName;
            if (!selectedTaskName || e.target.tagName !== 'LABEL') {return};
            openTaskModal(e, listsCollection);
        })
        
    }
}
