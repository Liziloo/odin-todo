export { person };

const person = (name, email, phone = null, address = null) => {
    let state = {
        name,
        email,
        phone,
        address
    }
    return Object.assign(
        {},
    )
}