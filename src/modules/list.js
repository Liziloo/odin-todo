import { toggler } from "./commonMethods";
export { lists, addList };

const lists = [];

const list = (name, description = '') => {
    let state = {
        tasks: [],
        name,
        description,
        done: false
    }
    return Object.assign(state, toggler(state));
}

function addList(name, description = '') {
    const newList = list(name, description);
    lists.push(newList);
}