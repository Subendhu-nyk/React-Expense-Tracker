import React ,{ useState } from "react";
import ExpenseContext from "./ExpenseContext";

export const ExpenseContextProvider = (props) => {
  const initialToken=localStorage.getItem('ExpenseToken')
  const [token, setToken] = useState(initialToken);
    const userIsLoggedIn = !!token;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [items,updateItems]=useState([]) 
  const [editedItem, setEditedItem] = useState(null);

  
    const loginHandler = (token) => {
      setToken(token);
      localStorage.setItem('ExpenseToken',token)
    };
  
    const logoutHandler = () => {
      setToken(null);
      localStorage.removeItem('ExpenseToken')
    };

    const addItemToCartHandler=item=>{
      if(Array.isArray(item)){
        updateItems([...items,...item])
      }else{
      updateItems([...items,item])     
      }       
      
  }

  const removeItemFromHandler=id=>{
    // alert(id)   
    const updatedItems=items.filter((item)=>item.id!==id)
    updateItems(updatedItems)     
    // removeItem(id)
  }
  const editItemFromHandler=id=>{     
    const updatedItems=items.filter((item)=>item.id===id)    
    console.log("edited",updatedItems)
    setEditedItem(updatedItems)
    
  }

  const updateItemHandler = (id, updatedItem) => {
    const updatedItems = items.map(item => 
        item.id === id ? { ...item, ...updatedItem } : item
    );
    updateItems(updatedItems);
};
 
const clearItemHandler=()=>{
  updateItems([])
}
    
  
    const contextValue = {
      token: token,
      isLoggedIn: userIsLoggedIn,
      login: loginHandler,
      logout: logoutHandler,
      completionPercentage,
       setCompletionPercentage,
       items:items,
       addItem:addItemToCartHandler,
      removeItem:removeItemFromHandler,
      editItem:editItemFromHandler,
      editedItem:editedItem,
      updateItem: updateItemHandler,
      clearItems:clearItemHandler    

    };
  
    return (
      <ExpenseContext.Provider value={contextValue}>
        {props.children}
      </ExpenseContext.Provider>
    );
  };
  
  
  export default ExpenseContextProvider;