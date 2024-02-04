import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Expense } from '../Interfaces'
import { expenseCategories } from '../constants'
import { useEffect } from 'react'

const schema = z.object({
  name: z
    .string()
    .min(3, { message: 'Name must be at least 3 characters' })
    .max(50, { message: 'Name must be max 50 characters' }),
  amount: z
    .number({ invalid_type_error: 'Amount must be in number' })
    .min(10, { message: 'Amount must be at least $5' }),
  category: z.string().min(1, { message: 'Category must be selected' }),
})

type FormData = z.infer<typeof schema>

interface HandleAddExpense {
  handleAddExpense: (expense: Expense) => void
  editId: null | string
  handleUpdateExpense: (id: string, NewExpense: Expense) => void
  expenseList: Expense[]
  setEditId: (id: null | string) => void
}

const AddExpenseForm = ({
  handleAddExpense,
  editId,
  handleUpdateExpense,
  setEditId,
  expenseList,
}: HandleAddExpense) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: {} })

  const onSubmit = (data: FormData) => {
    const expense = { id: editId || crypto.randomUUID(), ...data }
    if (editId) {
      handleUpdateExpense(editId, expense)
      setEditId(null)
    } else {
      handleAddExpense(expense)
    }

    setFocus('name')
    reset()
    }
    
    const cancelEdit = () => {
        setEditId(null)
        reset()
    }

  useEffect(() => {
    if (editId) {
      const foundExpense = expenseList.find(expense => expense.id === editId)
      if (foundExpense) {
        setValue('name', foundExpense.name)
        setValue('amount', foundExpense.amount)
        setValue('category', foundExpense.category)
      }
    }
  }, [editId, setValue, expenseList])
  return (
    <main className='wrapper mt-8'>
      <h2 className='tracking-tight'>
        {editId ? 'Update Expense' : 'Add Expense'}
      </h2>
      <form
        className='mt-6 flex flex-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <input
            {...register('name')}
            className='shadow-sm appearance-none border rounded w-full md:max-w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            placeholder='Expense Name'
          />
          {errors.name && (
            <p className='text-red-500 '>{errors.name.message}</p>
          )}
        </div>
        <div>
          <input
            {...register('amount', { valueAsNumber: true })}
            className='shadow-sm appearance-none border rounded w-full md:max-w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='number'
            placeholder='Amount'
          />
          {errors.amount && (
            <p className='text-red-500 '>{errors.amount.message}</p>
          )}
        </div>
        <div>
          <select
            {...register('category')}
            className='shadow-sm  border rounded w-full md:max-w-96 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          >
            <option value=''>Please select a category</option>
            {expenseCategories.map(categories => (
              <option value={categories} key={categories}>
                {categories}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className='text-red-500 '>{errors.category.message}</p>
          )}
        </div>
        <div className='flex gap-2'>
          <input
            type='submit'
            value={editId ? 'Update Expense' : 'Add Expense'}
            className='w-fit bg-violet-800 px-2 tracking-tight py-1 text-white cursor-pointer rounded'
          />
          {!editId ? (
            <input
              type='reset'
              value='Reset'
              className='w-fit bg-red-600 px-2 tracking-tight py-1 text-white cursor-pointer rounded'
            />
          ) : (
            <button onClick={cancelEdit} className='w-fit bg-red-600 px-2 tracking-tight py-1 text-white cursor-pointer rounded'>
              Cancel
            </button>
          )}
        </div>
      </form>
    </main>
  )
}
export default AddExpenseForm
