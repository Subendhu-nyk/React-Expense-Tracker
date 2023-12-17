import React from "react";

const ExpenseContext=React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}, 
})

export default ExpenseContext