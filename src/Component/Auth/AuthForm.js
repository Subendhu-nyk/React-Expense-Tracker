import { useState, useRef, useContext, Fragment,useEffect } from "react";
import classes from "./AuthForm.module.css";
import ExpenseContext from "../../Store/ExpenseContext";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/Auth";



const AuthForm = () => {
    const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();
  const authCtx=useContext(ExpenseContext)
  const history=useHistory()
  const dispatch=useDispatch()
  const isAuth=useSelector(state=>state.auth.isAuthenticated)

  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [verify,setVerify]=useState(true)
  const [token,setToken]=useState(false)
  const isToken=localStorage.getItem('ExpenseToken')
 
  console.log("auth action login",isAuth)
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
           
                
        if (!isLogin) {
          setIsLogin(true)                      
          emailInputRef.current.value = "";
          passwordInputRef.current.value = "";
          confirmPasswordInputRef.current.value = "";
          
      } else {
       
        authCtx.login(data.idToken)
        console.log("auth data",data.localId)
        setToken(true)
        authCtx.clearItems()  
         /////////////
          // reducer
          // dispatch(authActions.login())
          dispatch(authActions.login({ token: data.idToken, userId: data.localId }))  
          ///////////  
        checkEmailVerification();
      
       
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
        console.log("verify handler",res)
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
        // history.replace('/expense'); 
      })
      .catch((err) => {
        console.error(err);
      });      

    };
    
    const checkEmailVerification = () => {
      const token = localStorage.getItem('ExpenseToken');
      if (!token) {
      alert("You must be logged in to check verification.");
      return;
      }
    
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB5Z4JytlQAizqhLj-UJaM2ypdJUZHt4s0', {
        method: 'POST',
        body: JSON.stringify({
          idToken: token,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        if (data.users[0].emailVerified) {
          alert('Email is verified!');
          setVerify(true)
          history.replace('/expense');
        } else {          
          alert('Email is not verified yet. Please check your email and click the verification link.');
          setVerify(false)
        }
      })
      .catch(err => {
        console.error('Error checking email verification:', err);
      });
    };
    
    const forgotPasswordHandler=()=>{
      history.push('/forgot-password')
    }

    console.log("cart logout",authCtx.isLoggedIn)


  return (
    <div className={classes.containerRelative}>
      <div className={classes.blueDesign}></div>
      <section className={`${classes.auth} bg-dark`}>
  
        {!verify && token && authCtx.isLoggedIn && (          
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
        ) }
         
       {(verify || !authCtx.isLoggedIn) && <Fragment>
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
                    onClick={forgotPasswordHandler}
                  >
                    Forgot Password
                  </button>
                )}
              </div>
            </form>
          </Fragment>
          }
  
      </section> 
    </div>     
  )
  

}

export default AuthForm