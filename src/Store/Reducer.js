import { configureStore } from "@reduxjs/toolkit";
import authReducer from './Auth';
import expenseReducer from './Expense'

const store=configureStore({
    reducer:{auth:authReducer,expense:expenseReducer}
})

export default store;