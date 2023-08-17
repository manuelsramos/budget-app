import { useState, useEffect } from 'react'
import CloseModal from '../assets/img/close.svg'
import Message from '../components/Message'



export const Modal = ({ setModal,
    animateModal,
    setAnimateModal,
    saveExpense,
    editExpense,
    setEditExpense,

}) => {

    const [message, setMessage] = useState('');

    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [id, setId] = useState('');

    useEffect(() => {
        if (Object.keys(editExpense).length > 0) {
            setName(editExpense.name);
            setAmount(editExpense.amount);
            setCategory(editExpense.category);
            setId(editExpense.id);
            setDate(editExpense.date);
        }
    }, []);

    const hideModal = () => {
        setAnimateModal(false)
        setEditExpense({})
        setTimeout(() => {
            setModal(false)
        }, 600);
    }

    const handleSubmit = e => {
        e.preventDefault();

        if ([name, amount, category].includes('')) { /* En este caso indicamos que todas las secciones del formulario deben ser validos. De lo contrario no se podra avanzar en la app. EL metodo includes() verifica que todos los campos tengan un valor. De lo contrario, aunque a uno le falte algo no validara. */
            setMessage('ERROR: All camps are MANDATORY')

            setTimeout(() => {
                setMessage('')
            }, 1800);
            return
        }

        saveExpense({ name, amount, category, id, date })

        setAnimateModal(false)

        setTimeout(() => {
            setModal(false)
        }, 600);
    }


    return (
        <div className='modal'>
            <div className="close-modal">
                <img
                    src={CloseModal}
                    alt="Close modal icon"
                    onClick={hideModal}
                />
            </div>

            <form
                onSubmit={handleSubmit}
                className={`budget-form ${animateModal ? 'animate' : 'close'}`}>  {/* Colocando los `` y ${} podemos agregar y quitar clases de manera dinamica en base al state, usando el condicional ternario. Usando JS */}
                <legend>{editExpense.name ? 'Edit Expense' : 'New Expense'}</legend>

                <div className="camp">
                    <label htmlFor="name">Expense Name</label>

                    <input
                        id='name'
                        type="text"
                        placeholder='Add expense name'
                        value={name}  /* Si no le colocamos value no se va a asociar al useState (Linea 8) */
                        onChange={e => setName(e.target.value)} /* Colocamos e para tener acceso a e.target.value para que vaya cambiando la variable cada vez que el usuario escriba sobre el value*/
                    />


                </div>

                <div className="camp">
                    <label htmlFor="name">Amount</label>

                    <input
                        id='amount'
                        type="number"
                        placeholder='Add amount'
                        value={amount}
                        onChange={e => setAmount(Number(e.target.value))} /* Recuerda que colocando Number(), hacemos que el valor del state no sea string, sino un numero */
                    />


                </div>

                <div className="camp">
                    <label htmlFor="category">Category</label>

                    <select
                        id="category"
                        value={category}
                        onChange={e => setCategory(e.target.value)} /* En este caso, radica la importancia de colocarle value a cada option, para que pueda cambiar el state de nuestra categoria. Sin esto, no se produce. No lee los labels */

                    >
                        <option value=""> -- Select</option>
                        <option value="saving">Saving</option>
                        <option value="food">Food</option>
                        <option value="home">Home</option>
                        <option value="health">Health</option>
                        <option value="fun">Fun</option>
                        <option value="others">Others</option>
                    </select>
                </div>

                <input
                    type="submit"
                    value={editExpense.name ? 'Save changes' : 'Add Expense'}
                />
            </form>
            {message && <Message type='error'>{message}</Message>}
        </div>
    )
}
