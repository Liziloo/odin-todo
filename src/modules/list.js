import { toggler } from "./commonMethods";
export { addList };


const list = (name, description = '') => {
    let state = {
        tasks: [],
        name,
        description,
        done: false
    }
    return Object.assign(state, toggler(state));
}

function addList(lists, name, description = '') {
    const newList = list(name, description);
    lists.push(newList);
}