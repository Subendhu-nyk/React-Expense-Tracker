import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState={totalAmount:0}

const expenseSlice=createSlice({
    name:'expense',
    initialState:initialExpenseState,
    reducers:{
        totalAmount(state,action){
            state.totalAmount=action.payload
        },
        resetTotalAmount(state) {
            state.totalAmount = 0; 
        },
    }
})
export const expenseActions=expenseSlice.actions;

export default expenseSlice.reducer;