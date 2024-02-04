import { FaTrash } from 'react-icons/fa'
import { FaEdit } from 'react-icons/fa'
import { Expense } from '../Interfaces'
import { useState } from 'react'

interface DisplayExpense {
  expenseList: Expense[]
  handleDeleteExpense: (id: string) => void
  setEditId: (id: string) => void
}

const DisplayExpense = ({
  expenseList,
  handleDeleteExpense,
  setEditId,
}: DisplayExpense) => {
  const [filter, setFilter] = useState<string>('all')

  const expenseFiltered =
    filter === 'all'
      ? expenseList
      : expenseList.filter(expense => expense.category === filter)
  const totalAmount = expenseFiltered.reduce((acc, cur) => acc + cur.amount, 0)
  const categories = [...new Set(expenseList.map(expense => expense.category))]
  return (
    <main className='wrapper mt-8'>
      <h2>Filter by category</h2>
      <select
        onChange={e => setFilter(e.target.value)}
        className='shadow-sm mt-4  border rounded w-full md:max-w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      >
        <option value='all'>All Categories</option>
        {categories.map(categories => (
          <option value={categories} key={categories}>
            {categories}
          </option>
        ))}
      </select>
      <section className='mt-8'>
        {expenseFiltered.length > 0 ? (
          <table className='border w-full text-center md:max-w-[600px]'>
            <thead>
              <tr className='border'>
                <th>Name</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenseFiltered.map(
                ({ name, category, amount, id }: Expense) => (
                  <tr className='border' key={id}>
                    <td>{name.charAt(0).toUpperCase() + name.slice(1)}</td>
                    <td>${amount}</td>
                    <td>{category}</td>
                    <td>
                      <div className='flex gap-4 justify-center'>
                        <button onClick={() => setEditId(id)}>
                          <FaEdit className='text-green-500 cursor-pointer' />
                        </button>
                        <button onClick={() => handleDeleteExpense(id)}>
                          <FaTrash className='text-red-500 cursor-pointer' />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
            <tfoot>
              <tr>
                <td className='font-bold text-center' colSpan={4}>
                  Total Amount : ${totalAmount}
                </td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p>There is no expense to display</p>
        )}
      </section>
    </main>
  )
}
export default DisplayExpense
