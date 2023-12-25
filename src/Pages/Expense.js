import React, { Fragment } from 'react'
import ExpenseForm from '../Component/NewExpense/ExpenseForm'
import ExpenseDeatils from '../Component/NewExpense/ExpenseDeatils'

const Expense = () => {
  return (
    <Fragment>
    {/* <h1 className='text-center my-3' style={{fontSize:'50px',fontFamily: "'Crimson Text', serif"}}>Welcome to Expense Tracker</h1> */}
    <ExpenseForm/>
    <ExpenseDeatils/>
    </Fragment>
  
    )
}

export default Expense