import './styles/comeau-reset.css';
import './styles/styles.css';
import { tasksView } from './modules/tasksView';
import { listsView } from './modules/listsView';
import { ListsCollection } from './modules/listsCollectionClass';


(function() {
    // Always begin on tasks page of default list
    // Load existing collection or create new one with predefined default list
    const listsCollection = new ListsCollection();
    listsCollection.initiateListsCollection();
    tasksView(listsCollection.default, listsCollection)
    

    const tasksButton = document.querySelector('#tasks-button');
    tasksButton.addEventListener('click', () => {tasksView('all', listsCollection)});
    const listsButton = document.querySelector('#projects-button');
    listsButton.addEventListener('click', () => {listsView(listsCollection)})
}) ();

