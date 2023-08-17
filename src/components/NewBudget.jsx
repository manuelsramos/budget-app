import React, { useState } from 'react'
import Message from './Message';


const NewBudget = ({
    budget,
    setBudget,
    setValidBudget }) => {

    const [message, setMessage] = useState('')

    const handleBudget = (e) => {
        e.preventDefault();

        if (!budget || budget < 0) {
            setMessage('Not valid')

            return /* Colocamos un return para detener el ciclo de esta funcion, y no se ejecuten las lineas siguientes. Cuando el valor sea valido las siguientes lineas se ejecutaran */
        }
        setMessage('')
        setValidBudget(true)

    }

    return (
        <div className='container-budget container shadow'>

            <form onSubmit={handleBudget} className='budget-form'>
                <div className="camp">
                    <label>New Budget</label>
                    <input
                        className='new-budget'
                        type='number'
                        placeholder='Put your Budget'
                        value={budget}
                        onChange={e => setBudget(Number(e.target.value))}
                    />
                </div>
                <input
                    type="submit"
                    value='Submit'
                />

                {message && <Message type='error'>{message}</Message>} {/* Aqui recibimos children */}
            </form>
        </div>

    )
}


export default NewBudget