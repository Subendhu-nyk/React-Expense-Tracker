import { createSlice } from "@reduxjs/toolkit";

const initialAuthState={isAuthenticated:localStorage.getItem('isReducerAuthenticated') === 'true',  token: localStorage.getItem('reducerToken'),
userId: localStorage.getItem('reducerUserId')}

const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        login(state,action){
            state.isAuthenticated=true
            localStorage.setItem('isReducerAuthenticated', 'true');
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            localStorage.setItem('reducerToken', action.payload.token);
            localStorage.setItem('reducerUserId', action.payload.userId);
        },
        logout(state){
            state.isAuthenticated=false
            localStorage.setItem('isReducerAuthenticated', 'false');
            state.token = null;
            state.userId = null;
            localStorage.removeItem('reducerToken');
            localStorage.removeItem('reducerUserId');
        }
    }
})
export const authActions=authSlice.actions;

export default authSlice.reducer;