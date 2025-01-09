import { storeItem } from "./localStorage";
import { openTaskModal } from "./taskModal";
import { isValidDate } from "./dateTime";
import { toggleTask } from "./taskClass";
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

    const listDiv = document.createElement('div');
    const taskButton = document.createElement('button');
    if (selectedListName !== 'all') {
        taskButton.classList.add('new-task-button');
        taskButton.textContent = 'Add task';
        taskButton.dataset.listName = selectedListName;
        taskButton.addEventListener('click', (e) => {clickHandlerNewTask(e)});
        listDiv.appendChild(taskButton);
    }
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('tasks-div');
    const taskUl = document.createElement('ul');
    taskUl.classList.add('task-ul');
    if (selectedListName === 'all') {
        for (let list of listsCollection.lists) {
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
    contentDiv.append(listSelectDiv, listDiv, taskDiv);

    function clickHandlerNewTask(e) {
        e.preventDefault();
        openTaskModal(null, listsCollection);
    }

    function clickHandlerTaskCheckbox(e) {
        listsCollection.toggleTask(e, selectedList);
    }

    function changeHandlerListSelect(e) {
        const newSelectedListName = e.target.value;
        taskUl.textContent = '';
        tasksView(newSelectedListName, listsCollection);
    }

    function populateTaskList(tasks) {
        for (let task of tasks) {
            const taskLi = document.createElement('li');
            const taskCheckbox = document.createElement('input');
            taskCheckbox.setAttribute('type', 'checkbox');
            taskCheckbox.id = task.name;
            taskCheckbox.dataset.taskName = task.name;
            console.log(task);
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
                const targetList = listsCollection.lists.find((list) => list.name === targetListName);
                targetList.deleteTask(task);
                storeItem('lists-collection', listsCollection);
                tasksView(selectedListName, listsCollection);
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
            openTaskModal(selectedTask, listsCollection);
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
                    selectedTask.move(editedTaskListName, listsCollection);
                }
                storeItem('lists-collection', listsCollection);
                const modal = document.querySelector('.modal-background');
                modal.remove();
                tasksView(selectedListName, listsCollection);
            })
        })
    }
    console.log('tasks-view listsCollection', listsCollection);
}
