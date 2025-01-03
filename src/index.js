import './styles/comeau-reset.css';
import './styles/styles.css';
import { tasksView } from './modules/tasksView';
import { listsView } from './modules/listsView';


(function() {
    // Always begin on tasks page
    tasksView('Default');

    const tasksButton = document.querySelector('#tasks-button');
    tasksButton.addEventListener('click', () => {tasksView('Default')});
    const listsButton = document.querySelector('#projects-button');
    listsButton.addEventListener('click', () => {listsView()})
}) ();

