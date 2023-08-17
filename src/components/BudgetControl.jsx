import { Children, useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

export const BudgetControl = ({
    budget,
    setBudget,
    expenses,
    setExpenses,
    setValidBudget }) => {

    const [available, setAvailable] = useState(0);
    const [spent, setSpent] = useState(0);
    const [percentage, setPercentage] = useState(0)


    useEffect(() => {
        const totalSpent = expenses.reduce((total, expense) => expense.amount + total, 0)

        const totalAvailable = budget - totalSpent;

        const newPercengate = (((budget - totalAvailable) / budget) * 100).toFixed(2)  /* toFixed() nos permite obtener la cantidad de numeros decimales q le coloquemos */
        setTimeout(() => {
            setPercentage(newPercengate)

        }, 1000);

        setAvailable(totalAvailable)
        setSpent(totalSpent)
    }
        , [expenses])


    const formatAmount = (amount) => {   /* Esta  */
        return amount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const result = confirm('Do yo want reset the app?');

        if (result) {
            setBudget([])
            setExpenses(0)
            setValidBudget(false)
        }
    }

    return (

        <div className="budget-container container shadow two-columns">
            <div>
                <CircularProgressbar
                    value={percentage}
                    text={`Spent: ${percentage}%`}
                    styles={buildStyles({
                        pathColor: percentage > 100 ? '#B50000' : '',
                        trailColor: '#E8E8E8',
                        textColor: percentage > 100 ? '#B50000' : ''
                    })}
                />
            </div>

            <div className="budget-content">
                <button className='reset-app'
                    type='button'
                    onClick={handleResetApp}
                >
                    Reset App
                </button>
                <p>
                    <span>Budget:</span> {formatAmount(budget)}
                </p>

                <p className={`${available < 0 ? 'negative' : ''}`}>
                    <span>Avalaible:</span> {formatAmount(available)}
                </p>

                <p>
                    <span>Spent:</span> {formatAmount(spent)}
                </p>
            </div>
        </div>

    )
}
