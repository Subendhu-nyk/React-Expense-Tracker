import React, { Fragment } from 'react'
import ExpenseForm from '../Component/NewExpense/ExpenseForm'
import ExpenseDetails from '../Component/NewExpense/ExpenseDetails'

const Expense = () => {
  return (
    <Fragment>
    {/* <h1 className='text-center my-3' style={{fontSize:'50px',fontFamily: "'Crimson Text', serif"}}>Welcome to Expense Tracker</h1> */}
    <ExpenseForm/>
    <ExpenseDetails/>
    </Fragment>
  
    )
}

export default Expense