import { toggler } from "./commonMethods";
export { lists, addList };

const lists = [];

class List{
    constructor(name, description) {
        let state = {
            tasks: [],
            name,
            description,
            done: false
        }
        return Object.assign(
            {},
            toggler(state)
        )
    }
}

function addList(name, description = '') {
    const newList = new List(name, description);
    lists.push(newList);
}