import React from 'react'
import Expense from './Expense'

const ExpensesList = ({
    expenses,
    setEditExpense,
    deleteExpense,
    filter,
    filterSpent
}) => {

    return (
        <div className='expenses-list container'>
            {
                filter ? (
                    <>
                        <h2 className='expenses-exist'> {filterSpent.length ? 'Expenses' : 'No expenses'} </h2>
                        {filterSpent.map(expense => (
                            <Expense
                                key={expense.id}
                                expense={expense}
                                setEditExpense={setEditExpense}
                                deleteExpense={deleteExpense}
                            />
                        ))}
                    </>
                ) : (
                    <>
                        <h2 className='expenses-exist'> {expenses.length ? 'Expenses' : 'No expenses'} </h2>
                        {expenses.map(expense => (
                            <Expense
                                key={expense.id}
                                expense={expense}
                                setEditExpense={setEditExpense}
                                deleteExpense={deleteExpense}
                            />
                        ))}
                    </>
                )
            }

        </div>
    )
}

export default ExpensesList