import './styles/comeau-reset.css';
import './styles/styles.css';
import { tasksView } from './modules/tasksView';
import { listsView } from './modules/listsView';
import { initiateListsCollection } from './modules/listClass';


(function() {
    // Always begin on tasks page of default list
    const initialLists = initiateListsCollection();
    for (let list of initialLists) {
        if (list.isDefault) {
            tasksView(list.name);
            break
        }
    }
    

    const tasksButton = document.querySelector('#tasks-button');
    tasksButton.addEventListener('click', () => {tasksView('all')});
    const listsButton = document.querySelector('#projects-button');
    listsButton.addEventListener('click', () => {listsView()})
}) ();

