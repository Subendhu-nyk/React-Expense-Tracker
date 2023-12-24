import './App.css';
import Header from './Component/Layout/Header';
import { Route,Switch } from "react-router-dom";
import { Fragment } from "react";
import Auth from './Pages/Auth';
import Home from './Pages/Home';
import Product from './Pages/Product';
import About from './Pages/About';
import Expense from './Pages/Expense';
import Profile from './Pages/Profile';
import ForgotPassword from './Pages/ForgotPassword';


function App() {
  
  return (
    <Fragment>
      <Header/>
      <Switch>
    <Route exact path="/">
    <Auth/>
   </Route>  
   <Route path="/home">
    <Home/>
   </Route> 
   <Route path="/products">
    <Product/>
   </Route> 
   <Route path="/about">
   <About/>
   </Route> 
   <Route path="/expense">
   <Expense/>
   </Route>
   <Route path="/profile">
   <Profile/>
   </Route>
   <Route path="/forgot-password">
   <ForgotPassword/>
   </Route>
   </Switch>

 </Fragment>
  );
}

export default App;
