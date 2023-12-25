import React, { Fragment, useContext, useEffect } from 'react'
import { Container, Row,Col } from 'reactstrap'
import classes from './ExpenseForm.module.css'
import ExpenseItem from './ExpenseItem'
import ExpenseContext from '../../Store/ExpenseContext'

const ExpenseList = () => {
 const expenseCtx=useContext(ExpenseContext)

 useEffect(() => {
  fetch('https://expense-tracker-2beae-default-rtdb.firebaseio.com/Expense.json', {
      method: 'GET'
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to fetch data');
      }
      return response.json();
  })
  .then(data => {
      console.log('Fetched data:', data);
      console.log('Fetched data:', data.name);
      for (const key in data) {
        expenseCtx.addItem({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
          category: data[key].category
        });
      }
      
  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });
}, []);

const onRemove=(id)=>{
expenseCtx.removeItem(id)
}

console.log("expense item",expenseCtx.items)
  return (
    <Fragment>
        <Container>         
        {expenseCtx.items.length>0 && (<Row>
            <Col lg='6' className={`${classes.form} bg-dark  py-2 px-4 border rounded text-center`}>
            <Row>
             <h2 style={{ fontFamily: "'Playfair Display', serif",color:'white' }} className='my-2'>Expense Details</h2>
            </Row>
            <div className={classes.control}> 
            <Row className='d-flex py-2 bg-warning rounded'>                         
            <Col lg='3'>Expense Item</Col>
            <Col lg='3'>Expense Amount</Col>
            <Col lg='3'>Expense Category</Col>
            <Col lg='3'>Action</Col>          
            </Row> 
            <Row>
              {expenseCtx.items.map((expense,id)=>(
              <ExpenseItem key={id} id={expense.id} title={expense.title} amount={expense.amount} category={expense.category} onRemove={()=>onRemove(expense.id)}/>
              ))}
            </Row>           
            </div>            
           </Col>
        </Row>)}
        </Container>
    </Fragment>
  )
}

export default ExpenseList