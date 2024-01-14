import React, { Fragment, useContext, useEffect } from 'react'
import { Container, Row,Col } from 'reactstrap'
import classes from './ExpenseForm.module.css'
import ExpenseItem from './ExpenseItem'
import ExpenseContext from '../../Store/ExpenseContext'
import { useDispatch, useSelector } from 'react-redux'
import { expenseActions } from '../../Store/Expense'

const ExpenseList = () => {
 const expenseCtx=useContext(ExpenseContext)
 const dispatch=useDispatch()
 const totalExpense=useSelector((state)=>state.expense.totalAmount)
 const reducerUserId = useSelector((state) => state.auth.userId);


 useEffect(() => {

  fetch(`https://expense-tracker-2beae-default-rtdb.firebaseio.com/Expense/${reducerUserId}.json`, {
      method: 'GET'
  })  
  .then(response => {
      if (!response.ok) {
          throw new Error('Failed to fetch data');
      }
      return response.json();
  })
  .then(data => {
                  
      const fetchedItems = [];
      for (const key in data) {          
        fetchedItems.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
          category: data[key].category
        });
      }
      expenseCtx.addItem(fetchedItems);
      
  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });
},[reducerUserId]);

const onRemove=(id)=>{

fetch(`https://expense-tracker-2beae-default-rtdb.firebaseio.com/Expense/${reducerUserId}/${id}.json`,{
  method:'DELETE',
  headers:{
    'Content-Type':'application/json'
    }
})
.then((res)=>{
  if (!res.ok) {
    throw new Error('Failed to send data');
}
return res.json();
})
.then((data) => {
  console.log('Successfully deleted expense:');
  expenseCtx.removeItem(id)
})
.catch(error => {
  console.error('Error:', error);
  alert('An error occurred while deleting the expense.');
});

}

const onEdit=(id)=>{  
  expenseCtx.editItem(id)
  }

  useEffect(() => {
    const totalAmount = expenseCtx.items.reduce((sum, item) => {
      return sum + parseFloat(item.amount); // Ensure item.amount is a number
    }, 0);  
    dispatch(expenseActions.totalAmount({payload:totalAmount}));
  }, [expenseCtx.items, dispatch]);
  
 
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
            <Col lg='2'>Item</Col>
            <Col lg='2'>Amount</Col>
            <Col lg='2'>Category</Col>
            <Col lg='3'>Edit</Col>    
            <Col lg='3'>Delete</Col>       
            </Row> 
            <Row>
              {expenseCtx.items.map((expense)=>(
              <ExpenseItem key={expense.id} id={expense.id} title={expense.title} amount={expense.amount} category={expense.category} onRemove={()=>onRemove(expense.id)} onEdit={()=>onEdit(expense.id)}/>
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