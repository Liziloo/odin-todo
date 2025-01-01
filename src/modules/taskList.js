export { taskList }


const taskList = (list) => {
    const taskUl = document.querySelector('.task-ul');
    const listTasks = list.tasks;
    for (let task of listTasks) {
        const taskLi = document.createElement('li');
        taskLi.textContent = task.name;
        taskUl.appendChild(taskLi);
    }
}