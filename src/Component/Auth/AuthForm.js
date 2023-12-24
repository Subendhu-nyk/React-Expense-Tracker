import { useState, useRef, useContext, Fragment } from "react";
import classes from "./AuthForm.module.css";
import ExpenseContext from "../../Store/ExpenseContext";
import { useHistory } from "react-router-dom";


const AuthForm = () => {
    const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const authCtx=useContext(ExpenseContext)
  const history=useHistory()
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verify,setVerify]=useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler=(event)=>{
    event.preventDefault();
    const enteredEmail=emailInputRef.current.value
    const enteredPassword=passwordInputRef.current.value
    const token=localStorage.getItem('ExpenseToken')
    if(enteredPassword.length===0){
      alert("Enter a valid Password"); 
      return
    }
    if(enteredEmail.length===0){
      alert("Enter a valid Email"); 
      return
    }
    if (!isLogin && passwordInputRef.current.value !== confirmPasswordInputRef.current.value) {
      alert("Password mismatch"); 
      return; 
    }
    setIsLoading(true)
    let url   
    if(isLogin){
      url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB5Z4JytlQAizqhLj-UJaM2ypdJUZHt4s0'

    }else{
      url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB5Z4JytlQAizqhLj-UJaM2ypdJUZHt4s0'
    }
      fetch(url,
      {
        method:'POST',
        body:JSON.stringify({
          email:enteredEmail,
          password:enteredPassword,
          returnSecureToken:true
        }),
        headers:{
          'Content-Type':'application/json'
        }
      }
      ).then((res)=>{
        setIsLoading(false)
        
        if(res.ok){
          return res.json();
        }else{
         return res.json().then(data=>{
          let errorMessage ='Authentication Failed!';
          if(data && data.error && data.error.message){
            errorMessage=data.error.message  
          } 
          alert(errorMessage)   
          throw new Error(errorMessage);                
          })
        }
      }).then(data=>{
        console.log(data)  
        console.log("data.idToken",data.idToken)     
                
        if (!isLogin) {
          setIsLogin(true)          
          emailInputRef.current.value = "";
          passwordInputRef.current.value = "";
          confirmPasswordInputRef.current.value = "";
          
      } else {
        console.log("data.idToken2",data.idToken)
        authCtx.login(data.idToken)
        setVerify(true);
       
        // history.replace('/expense');
      }
      })
      .catch((err)=>{
        alert(err.message)
      })
    };

    const verifyHandler = (event) => {
      event.preventDefault();
      const token = localStorage.getItem('ExpenseToken'); // Retrieve the token
    
      if (!token) {
        alert("You must be logged in to verify your email.");
        return;
      }
    
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB5Z4JytlQAizqhLj-UJaM2ypdJUZHt4s0', {
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
          requestType:"VERIFY_EMAIL",
          emailVerified: true 
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(data => {
            let errorMessage = 'Failed to verify email.';
            
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            alert(errorMessage);
            throw new Error(errorMessage);
          });
        }
      })
      .then(data => {
        console.log("verified data",data)
        alert('Email verified successfully.');
        history.replace('/expense'); 
      })
      .catch((err) => {
        console.error(err);
      });
    };    


  return (
    <div className={classes.containerRelative}>
      <div className={classes.blueDesign}></div>
      <section className={`${classes.auth} bg-dark`}>
  
        {verify ? (
          // Display the verification message when verify is true
          <Fragment>
            <h2 style={{ fontFamily: "'Playfair Display', serif" }}>
              Congratulations on signing up!
            </h2>
            <p className="pt-2">To complete your registration and activate your account, we've sent a verification link to your email address. Please check your inbox (and the spam folder, just in case) for an email from us and click on the link provided to verify your email address.
            This step is crucial for ensuring the security of your account and gaining full access to our features and services.</p>
           
            <div className={classes.actions}>              
              <button className="my-3" onClick={verifyHandler}>Verify</button>  
            </div>
            <h5>Didn't receive the email?</h5>
            <p>Resend verification email again in timer</p>
          </Fragment>
        ) : (
          // Display the login/signup form when verify is false
          <Fragment>
            <h1 style={{ fontFamily: "'Playfair Display', serif" }}>
              {isLogin ? "Login" : "Sign Up"}
            </h1>
            <form onSubmit={submitHandler}>
              <div className={classes.control}>
                <label htmlFor="email">Your Email</label>
                <input type="email" id="email" required ref={emailInputRef} />
              </div>
              <div className={classes.control}>
                <label htmlFor="password">Your Password</label>
                <input
                  type="password"
                  id="password"
                  required
                  ref={passwordInputRef}
                />
              </div>
              {!isLogin && (
                <div className={classes.control}>
                  <label htmlFor="cpassword">Confirm Password</label>
                  <input
                    type="password"
                    id="cpassword"
                    required
                    ref={confirmPasswordInputRef}
                  />
                </div>
              )}
              <div className={classes.actions}>
                {!isLoading && (
                  <button>{isLogin ? "Login" : "Create Account"}</button>
                )}
                {isLoading && <p>Sending request...</p>}
                <button
                  type="button"
                  className={classes.toggle}
                  onClick={switchAuthModeHandler}
                >
                  {isLogin ? "Create new account" : "Login with existing account"}
                </button>
                {isLogin && (
                  <button
                    type="button"
                    className={classes.toggle}
                  >
                    Forgot Password
                  </button>
                )}
              </div>
            </form>
          </Fragment>
        )}
  
      </section> 
    </div>     
  )
  

}

export default AuthForm