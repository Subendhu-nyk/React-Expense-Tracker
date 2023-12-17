import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './MenuItem.module.css'

const MenuItem = (props) => {
  return (
    <header className={`${classes.header} ${classes.list}`}>
    <NavLink  to="/home" activeClassName={`${classes.active}`}>Home</NavLink>     
    <NavLink to="/products" activeClassName={`${classes.active}`}>Products</NavLink>    
    <NavLink to="/about" activeClassName={`${classes.active}`}>About Us</NavLink> 
  </header>
  )
}

export default MenuItem