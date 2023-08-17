
import React from 'react'
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions
} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { formatDate } from '../helpers/index'

import SaveIcon from '../assets/img/save-icon.svg'
import ExpensesIcon from '../assets/img/expenses-icon.svg'
import FoodIcon from '../assets/img/food-icon.svg'
import FunIcon from '../assets/img/fun-icon.svg'
import HomeIcon from '../assets/img/home-icon.svg'
import HealthIcon from '../assets/img/health-icon.svg'

const iconOptions = {
    saving: SaveIcon,
    food: FoodIcon,
    home: HomeIcon,
    health: HealthIcon,
    fun: FunIcon,
    others: ExpensesIcon
}



const Expense = ({ expense, setEditExpense, deleteExpense }) => {

    const { category, name, amount, id, date } = expense;

    const leadingActions = () => (    /* Encerrarlo en parentesis nos permite tener un return implicito */
        <LeadingActions>
            <SwipeAction onClick={() => setEditExpense(expense)}>
                Edit
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction onClick={() => deleteExpense(id)}
                destructive={true}
            >
                Delete
            </SwipeAction>
        </TrailingActions>
    )

    return (
        <SwipeableList>
            <SwipeableListItem
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}>

                <div className='expense shadow'>
                    <div className="expense-content">
                        <img
                            src={iconOptions[category]}
                            alt='expense-icon'
                        />
                        <div className="expense-description">
                            <p className="category">{category}</p>
                            <p className="expense-name">{name}</p>
                            <p className="expense-date">
                                Added at: {''}
                                <span>{formatDate(date)}</span>
                            </p>
                        </div>
                    </div>
                    <p className="expense-amount">${amount}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}

export default Expense