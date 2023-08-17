
export const generateID = () => {
    const random = Math.random().toString(32).substring(2)
    const date = Date.now().toString(32)
    return random + date
}


export const formatDate = date => {
    const newDate = new Date(date);
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }

    return newDate.toLocaleDateString('en-US', options)  /* toLocaleDateString nos permite crear un formato de fecha, sin que esta mute. Es bien soportada por la mayoria de los navegadores. Investigar todas las opciones disponibles. */
}