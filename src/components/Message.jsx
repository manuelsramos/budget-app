import React from 'react'

const Message = ({ children, type }) => {  /* children es una palabra reservada de react que hara referencia a todas las props que le pases a un componente, es decir, lo colocas y luego lo defines */
    return (
        <div className={`alert ${type}`}>{children}</div> /* De esta manera creamos un componente donde podemos pasarle diferentes tipos de mensaje en este caso. */
    )
}

export default Message