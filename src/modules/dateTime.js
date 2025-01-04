export { isValidDate };

const isValidDate = (item) => {
    return item instanceof Date && !isNaN(item);
}