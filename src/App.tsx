import { useState } from 'react'
import AddExpenseForm from './components/AddExpenseForm'
import DisplayExpense from './components/DisplayExpense'
import Header from './components/Header'
import { Expense } from './Interfaces'

const App = () => {
  const [expenseList, setExpenseList] = useState<Expense[]>([])
  const [editId, setEditId] = useState<null | string>(null)
  const handleAddExpense = (expense: Expense) => {
    setExpenseList(prev => [...prev, expense])
  }
  const handleDeleteExpense = (id: string) => {
    setExpenseList(prev => prev.filter(expense => expense.id !== id))
  }
  const handleUpdateExpense = (id: string, newExpense: Expense) => {
    setExpenseList(prev=> prev.map(expense => expense.id === id ? {...expense,...newExpense} : expense))
  }
  return (
    <>
      <Header />
      <AddExpenseForm
        handleAddExpense={handleAddExpense}
        editId={editId}
        setEditId={setEditId}
        handleUpdateExpense={handleUpdateExpense}
        expenseList={expenseList}
      />
      <DisplayExpense
        expenseList={expenseList}
        handleDeleteExpense={handleDeleteExpense}
        setEditId={setEditId}
      />
    </>
  )
}
export default App
