import React from "react";

const ExpenseContext=React.createContext({
    token: "",
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {}, 
    completionPercentage: 0,
    setCompletionPercentage: (percentage) => {},
    items:[],
    addItem:(item)=>{},
    removeItem:(id)=>{},

})

export default ExpenseContext