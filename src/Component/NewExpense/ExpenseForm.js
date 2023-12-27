import React, { Fragment,useContext,useState,useEffect } from 'react'
import classes from  './ExpenseForm.module.css'
import { Col, Container,Row } from 'reactstrap'
import Dropdown from 'react-bootstrap/Dropdown';
import ExpenseContext from '../../Store/ExpenseContext';



const ExpenseForm = (props) => {
    const expenseCtx=useContext(ExpenseContext)
    const[formVisible,setFormVisible]=useState(false)
    const[title,setTitle]=useState('')    
    const [amount,setAmount]=useState('')
    const [category,setCategory]=useState('') 
    const [isEditing, setIsEditing] = useState(false); 
    const [currentId, setCurrentId] = useState(null); 
    
    const addExpenseHandler=()=>{
       setFormVisible(true)
    }

    const onclickHandler1=(event)=>{
        setTitle(event.target.value)
        
    }
   
    const onclickHandler2=(event)=>{
        setAmount(event.target.value)
       
    }
    const onclickHandler3=(value)=>{        
        setCategory(value)
    }    


    
    useEffect(() => {
        if (expenseCtx.editedItem && expenseCtx.editedItem.length > 0) {
            setFormVisible(true);
            setIsEditing(true);
            const editedExpense = expenseCtx.editedItem[0];
            setTitle(editedExpense.title);
            setAmount(editedExpense.amount);
            setCategory(editedExpense.category);
            setCurrentId(editedExpense.id);
        }
    }, [expenseCtx.editedItem]);


    const submitForm=(event)=>{
        event.preventDefault();
        if(title.trim().length===0||amount.trim().length===0||category.trim().length===0){
        alert("Please enter a valid inputs (non-empty values)")
        return
         }

         if(+amount<1){
            alert("Please enter a valid amount (non-empty values)")
             return
         }
        
        const expenseData={
           title,amount,category
        }

        const url=isEditing? `https://expense-tracker-2beae-default-rtdb.firebaseio.com/Expense/${currentId}.json` // PUT URL with ID
        : 'https://expense-tracker-2beae-default-rtdb.firebaseio.com/Expense.json'; // POST URL

        const method = isEditing ? 'PUT' : 'POST';

        fetch(url,{
            method:method,
            body:JSON.stringify(expenseData),       
             headers:{
            'Content-Type':'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to send data');
            }
            return response.json();
        })
        .then(data => {
            console.log('Successfully added expense:', data);
            // expenseCtx.addItem(expenseData); // Update context/state only after successful response
            if (isEditing) {
                expenseCtx.updateItem(currentId, expenseData); // Update the item in the context
            } else {
                expenseCtx.addItem(expenseData); // Add the item to the context
            }
           
            setTitle('');
            setCategory('');
            setAmount('');
            setFormVisible(false);
            setIsEditing(false); 
            setCurrentId(null);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while saving the expense.');
        });  
        
               
    }    


  

  return (
   <Fragment>
    <Container>
    <Row>
          {!formVisible &&  (<Col lg='6' className={`${classes.form} bg-dark mt-4 py-2 px-4 border rounded text-center`}>
            <h2 style={{ fontFamily: "'Playfair Display', serif",color:'white' }} className='my-4'>Daily Expenses </h2>
            <div className={classes.control}>           
             <div className={`${classes.action} mb-4 text-center`}>
             <button onClick={addExpenseHandler}> + Add Expense</button>         
            </div>
            </div>           
           </Col>)
        }
        </Row>
    <Row>
    {formVisible &&  (    <Col lg='6' className={`${classes.form} bg-dark mt-4 py-2 px-4 border rounded text-center`}>
            <h2 style={{ fontFamily: "'Playfair Display', serif",color:'white' }} className='my-4'>Daily Expenses </h2>
            <form onSubmit={submitForm}>
            <div className={classes.control}> 
            <Row className='d-flex'>                         
                <Col lg='4'>                     
                <label htmlFor="title">Expense Item</label>
                <input value={title} id='title' onChange={onclickHandler1} type="text"/>            
                </Col>
                <Col lg='4'>
                <label htmlFor="amount">Expense Amount</label>
                <input value={amount} id='amount' onChange={onclickHandler2} type="text"/>
                </Col>  
                <Col lg='4' className='mt-4'>                     
                <Dropdown className='mt-1'>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Select Category
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => onclickHandler3('Petrol')}>Petrol</Dropdown.Item>
                        <Dropdown.Item onClick={() => onclickHandler3('Food')}>Food</Dropdown.Item>
                        <Dropdown.Item onClick={() => onclickHandler3('Grocery')}>Grocery</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>       
                </Col>             
            </Row> 
             <div className={`${classes.action} mb-4 text-center`}>
             <button>Submit</button>         
            </div>
            </div>
            </form>
           </Col>)}
        </Row>
       
    </Container> 
   </Fragment>
  )
}

export default ExpenseForm