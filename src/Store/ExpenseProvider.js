import React ,{ useState } from "react";
import ExpenseContext from "./ExpenseContext";

export const ExpenseContextProvider = (props) => {
  const initialToken=localStorage.getItem('ExpenseToken')
  const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;
  
    const loginHandler = (token) => {
      setToken(token);
      localStorage.setItem('ExpenseToken',token)
    };
  
    const logoutHandler = () => {
      setToken(null);
      localStorage.removeItem('ExpenseToken')
    };
  
    const contextValue = {
      token: token,
      isLoggedIn: userIsLoggedIn,
      login: loginHandler,
      logout: logoutHandler,
    };
  
    return (
      <ExpenseContext.Provider value={contextValue}>
        {props.children}
      </ExpenseContext.Provider>
    );
  };
  
  
  export default ExpenseContextProvider;