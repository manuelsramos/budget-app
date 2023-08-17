import { useState, useEffect } from 'react'

import Header from './components/Header'
import ExpensesList from './components/ExpensesList'
import { Modal } from './components/Modal'
import { generateID } from './helpers'
import NewExpense from './assets/img/new-expense.svg'
import Filter from './components/Filter'


function App() {

  const [budget, setBudget] = useState(
    Number(localStorage.getItem('budget')) ?? 0
  );
  const [validBudget, setValidBudget] = useState(false); /* Inicia el false ya que al iniciar la pagina esta en 0 el presupuesto, no es valido. */

  const [modal, setModal] = useState(false); /* Colocamos false para que al inicio no se muestre nada hasta darle click */

  const [animateModal, setAnimateModal] = useState(false);

  const [expenses, setExpenses] = useState(    /* Cambiamos el [] vacio, por lo que colocamos para que localstorage pueda almacenar la informacion de expenses */
    localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : []
  );

  const [editExpense, setEditExpense] = useState({});

  const [filter, setFilter] = useState('');  /* Iniciamos con un string vacio ya que solo se escogera una opcion. De lo contrario iniciamos con un arreglo [] */

  const [filterSpent, setFilterSpent] = useState([]);


  useEffect(() => {
    if (Object.keys(editExpense).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimateModal(true)
      }, 600);
    }
  }, [editExpense]);


  useEffect(() => {
    Number(localStorage.setItem('budget', budget ?? 0))
  }, [budget])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses) ?? []) /* Usamos JSON Stringify porque localstorage solo puede almacenar strings */
  }, [expenses])


  useEffect(() => {
    if (filter) {
      const filterSpent = expenses.filter(expense => expense.category ===
        filter);
      setFilterSpent(filterSpent)
    }
  }, [filter]);

  useEffect(() => {
    const budgetLS = Number(localStorage.getItem('budget')) ?? 0;
    if (budgetLS > 0) {
      setValidBudget(true)
    }
  }, []) /* Colocamos el array de dependencia vacio para que se ejecute una sola vez */


  const handleNewExpense = () => {
    setModal(true)
    setEditExpense({})

    setTimeout(() => {
      setAnimateModal(true)
    }, 600);
  }

  const saveExpense = expense => {
    if (expense.id) {
      const actExpense = expenses.map(expenseState => expenseState.id ===
        expense.id ? expense : expenseState)
      setExpenses(actExpense);
      setEditExpense({})
    } else {
      expense.id = generateID();
      expense.date = Date.now();
      setExpenses([...expenses, expense])
    }
  };

  const deleteExpense = id => {
    const actExpenses = expenses.filter(expense => expense.id !== id);
    setExpenses(actExpenses);
  }

  return (
    <div className={modal ? 'fix' : ''}>
      <Header
        budget={budget}
        setBudget={setBudget}
        validBudget={validBudget}
        setValidBudget={setValidBudget}
        expenses={expenses}
        setExpenses={setExpenses}
      />

      {validBudget && (
        <>
          <main>
            <Filter
              filter={filter}
              setFilter={setFilter} />
            <ExpensesList
              expenses={expenses}
              setEditExpense={setEditExpense}
              deleteExpense={deleteExpense}
              filter={filter}
              filterSpent={filterSpent}
            />
          </main>
          <div className="new-expense">
            <img
              src={NewExpense}
              alt='New expense icon'
              onClick={handleNewExpense}
            />
          </div>
        </>
      )}
      {modal &&
        <Modal setModal={setModal}
          animateModal={animateModal}
          setAnimateModal={setAnimateModal}
          saveExpense={saveExpense}
          editExpense={editExpense}
          setEditExpense={setEditExpense}
        />}
    </div>


  )
}

export default App
