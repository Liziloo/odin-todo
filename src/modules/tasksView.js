import { openListModal } from "./newListModal";
import { storeItem } from "./localStorage";
import { openTaskModal } from "./taskModal";
import { isValidDate } from "./dateTime";
import { allTasksDone } from "./listClass";
export { tasksView };


const tasksView = (selectedListName, lists) => {
    const contentDiv = document.querySelector('#content');
    
    // Check if user already has lists in local storage, if not, create default list
    const selectedList = lists.find(list => list.name === selectedListName);
    
    contentDiv.textContent = '';

    const newListDiv = document.createElement('div');
    const newListButton = document.createElement('button');
    newListButton.classList.add('new-list-button');
    newListButton.textContent = 'New list';
    newListDiv.appendChild(newListButton);
    newListButton.addEventListener('click', clickHandlerNewList);

    const listSelectDiv = document.createElement('div');
    const listSelect = document.createElement('select');
    listSelect.setAttribute('name', 'list');
    const allOption = document.createElement('option');
    allOption.textContent = 'All tasks';
    allOption.value = 'all';
    listSelect.appendChild(allOption);
    for (let list of lists) {
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

    const listDiv = document.createElement('div');
    if (selectedListName !== 'all') {
        const taskButton = document.createElement('button');
        taskButton.classList.add('.new-task-button');
        taskButton.textContent = 'Add task';
        taskButton.dataset.list = selectedListName;
        taskButton.addEventListener('click', (e) => {clickHandlerNewTask(e)});
        listDiv.appendChild(taskButton);
    }
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('tasks-div');
    const taskUl = document.createElement('ul');
    taskUl.classList.add('task-ul');
    if (selectedListName === 'all') {
        for (let list of lists) {
            const tasks = []
            for (let task of list.tasks) {
                tasks.push(task);
            }
            populateTaskList(tasks);
        }
    } else {
        populateTaskList(selectedList.tasks);
    }
   
    taskDiv.appendChild(taskUl);
    listDiv.appendChild(taskDiv);
    contentDiv.append(newListDiv, listSelectDiv, listDiv, taskDiv);

    function clickHandlerNewTask(e) {
        e.preventDefault();
        openTaskModal(null, lists);
        const submitButton = document.querySelector('.task-submit-button');
        submitButton.addEventListener('click', (e) => {
            e.preventDefault();
            const taskForm = document.querySelector('.task-form');
            const formData = new FormData(taskForm);
            const taskName = formData.get('task-name');
            const taskDescription = formData.get('task-description');
            const formDueDate = new Date(formData.get('task-duedate'));
            const taskDuedate = isValidDate(formDueDate) ? formDueDate : 'None';
            const taskPriority = formData.get('task-priority');
            const taskNotes = formData.get('task-notes');
            const taskDone = formData.get('task-done');
            selectedList.addTask(taskName, taskDescription, taskDuedate, taskPriority, taskNotes, taskDone);
            storeItem('lists', lists);
            const modal = document.querySelector('.modal-background');
            modal.remove();
            tasksView(selectedListName, lists);
        })
    }

    function clickHandlerTaskCheckbox(e) {
        const checkedTask = selectedList.tasks.find(checkedTask => checkedTask.name === e.target.dataset.taskName);
        if (e.target.checked === true) {
            checkedTask.done = true;
        } else {
            checkedTask.done = false;
        }
        if (allTasksDone(selectedList)) {
            selectedList.done = true;
        }
        storeItem('lists', lists);
        tasksView(selectedListName, lists);
    }

    function clickHandlerNewList(e) {
        e.preventDefault();
        openListModal(null, lists);
    }

    function changeHandlerListSelect(e) {
        const newSelectedListName = e.target.value;
        taskUl.textContent = '';
        tasksView(newSelectedListName, lists);
    }

    function populateTaskList(tasks) {
        for (let task of tasks) {
            const taskLi = document.createElement('li');
            const taskCheckbox = document.createElement('input');
            taskCheckbox.setAttribute('type', 'checkbox');
            taskCheckbox.id = task.name;
            taskCheckbox.dataset.taskName = task.name;
            if (task.done) {
                taskCheckbox.checked = true;
            }
            const checkboxLabel = document.createElement('label');
            checkboxLabel.textContent = `${task.name} Due: ${task.duedate.toLocaleString()}`;
            checkboxLabel.setAttribute('for', task.name);
            checkboxLabel.dataset.taskName = task.name;
            checkboxLabel.addEventListener('click', (e) => {e.preventDefault();})
            taskLi.append(taskCheckbox, checkboxLabel);
            const taskDeleteButton = document.createElement('button');
            taskDeleteButton.textContent = 'x';
            taskDeleteButton.dataset.listName = task.list;
            taskDeleteButton.addEventListener('click', (e) => {
                e.preventDefault();
                const targetListName = e.target.dataset.listName;
                const targetList = lists.filter((list) => list.name === targetListName)
                targetList[0].deleteTask(task.name);
                storeItem('lists', lists);
                tasksView(selectedListName, lists);
            });
            taskLi.appendChild(taskDeleteButton);
            taskUl.appendChild(taskLi);
            taskCheckbox.addEventListener('click', (e) => {clickHandlerTaskCheckbox(e)});
            
        }
        taskUl.addEventListener('click', (e) => {
            const selectedTaskName = e.target.dataset.taskName;
            if (!selectedTaskName || e.target.tagName !== 'LABEL') {return};
            const selectedTaskArray = tasks.filter((task) => task.name === selectedTaskName);
            const selectedTask = selectedTaskArray[0];
            openTaskModal(selectedTask, lists);
            const submitButton = document.querySelector('.task-submit-button');
            submitButton.addEventListener('click', (e) => {
                e.preventDefault();
                const taskForm = document.querySelector('.task-form');
                const formData = new FormData(taskForm);
                const editedTaskName = formData.get('task-name');
                const editedTaskListName = formData.get('task-list-name');
                
                const taskDescription = formData.get('task-description');
                const formDueDate = new Date(formData.get('task-duedate'));
                const taskDuedate = isValidDate(formDueDate) ? formDueDate : 'None';
                const taskPriority = formData.get('task-priority');
                const taskNotes = formData.get('task-notes');
                const taskDone = formData.get('task-done');
                selectedList.editTask(selectedTaskName, editedTaskName, taskDescription, taskDuedate, taskPriority, taskNotes, taskDone);
                if (editedTaskListName !== selectedTask.list) {
                    selectedTask.move(editedTaskListName, lists);
                }
                storeItem('lists', lists);
                const modal = document.querySelector('.modal-background');
                modal.remove();
                tasksView(selectedListName, lists);
            })
        })
    }
    console.log('tasks-view lists', lists);
}
