import React ,{ useState } from "react";
import ExpenseContext from "./ExpenseContext";

export const ExpenseContextProvider = (props) => {
    const [token, setToken] = useState(null);
    const userIsLoggedIn = !!token;
  
    const loginHandler = (token) => {
      setToken(token);
    };
  
    const logoutHandler = () => {
      setToken(null);
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