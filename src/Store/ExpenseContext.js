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
    editItem:(id)=>{},
    setItem:()=>{},
    editedItem:[],
    updateItem:(id,item)=>{}

})

export default ExpenseContext