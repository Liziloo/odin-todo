import { toggler } from "./commonMethods";
export { task, hasTasks };

const task = (name, description, duedate, priority, notes, list) => {
    let state = {
        name,
        description,
        duedate,
        priority,
        notes,
        list,
        done: false
    }
    return Object.assign(state, toggler(state));
}

const hasTasks = {
    
}