import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState={totalAmount:0,darkMode:false,isPremium:false}


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
        toggleTheme(state){
            state.darkMode=!state.darkMode
        },
        activePremium(state){
            state.isPremium=true
        },
        deactivatePremium(state){
            state.isPremium=false
        }

    }
})
export const expenseActions=expenseSlice.actions;

export default expenseSlice.reducer;