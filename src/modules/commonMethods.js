export { toggler };

const toggler = (state) => ({
    toggle: () => state.done === false ? true: false
})