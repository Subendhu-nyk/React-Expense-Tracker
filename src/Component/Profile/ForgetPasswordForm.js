import React, { Fragment, useRef,useState } from 'react'
import classes from './ProfileForm.module.css'
import { useHistory } from 'react-router-dom/'
import { Container,Row,Col } from 'reactstrap'


const ForgetPasswordForm = () => {
    const history=useHistory()   
    const newEmailInputRef=useRef()
   
    const [isLoading, setIsLoading] = useState(false);

    const submitHandler=(event)=>{
        event.preventDefault();
        const enteredNewEmail = newEmailInputRef.current.value;
        setIsLoading(true)
           fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB5Z4JytlQAizqhLj-UJaM2ypdJUZHt4s0',{
            method:'POST',
            body:JSON.stringify({
                "requestType":"PASSWORD_RESET",
                "email":enteredNewEmail
            }),
            headers:{
                'Content-Type':'application/json' 
            }
           })
           .then((res) => {
            setIsLoading(false); // Stoping loading regardless of the response
            if (res.ok) {
              return res.json();
            } else {
              // If the server response was not ok, throw an error
              return res.json().then(data => {
                let errorMessage = 'Password reset failed!';
                // Extracting Firebase error message 
                if (data && data.error && data.error.message) {
                  errorMessage = data.error.message;
                }
                throw new Error(errorMessage);
              });
            }
          })
          .then((data) => {
            // Handling the successful response here
            alert('Password reset email sent. Please check your inbox.');
            history.replace('/'); // Redirect to login  page
          })
          .catch((err) => {
            // Handling errors here
            alert(err.message);
          }); 
    }
    return (
      <Fragment>
      <Container>
        <Row>
          <Col lg='4' className={`${classes.form} bg-dark my-5 py-2 px-4 border rounded text-center`}>
        <h2 style={{ fontFamily: "'Playfair Display', serif",color:'white' }} className='my-4'>Reset Your Password</h2>
        <form  onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Enter Your Email</label>
          <input type="email" id="email" minLength="7" ref={newEmailInputRef} />
        </div>
        <div className={`${classes.action} mb-4 text-center`}>
        {!isLoading && <button>Change Password</button>}
          {isLoading && <p className='text-white'>Sending request...</p>}
        </div>
      </form> 
      </Col>
      </Row>
      </Container>
      </Fragment>  
      )
      
}

export default ForgetPasswordForm;

