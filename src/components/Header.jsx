import React from 'react'
import NewBudget from './NewBudget'
import { BudgetControl } from './BudgetControl'

const Header = ({
    expenses,
    setExpenses,
    budget,
    setBudget,
    validBudget,
    setValidBudget,
}) => {
    return (
        <>
            <header>
                <h1>Expense Planner</h1>
                {validBudget ? (
                    <BudgetControl
                        budget={budget}
                        setBudget={setBudget}
                        expenses={expenses}
                        setExpenses={setExpenses}
                        setValidBudget={setValidBudget}
                    />
                ) : (
                    <NewBudget
                        budget={budget}
                        setBudget={setBudget}
                        setValidBudget={setValidBudget}
                    />

                )}
            </header>
        </>
    )
}

export default Header