import { useContext,useState,useEffect } from "react"
import { Button, Container, Row, Col,Badge } from "reactstrap"
import img from '../../Assets/logo.gif'
import MenuItem from "./MenuItems"
import { useHistory } from "react-router-dom"
import ExpenseContext from "../../Store/ExpenseContext"
import { NavLink, useLocation } from "react-router-dom"
import { Dispatch } from "@reduxjs/toolkit"
import { authActions } from "../../Store/Auth"
import { useDispatch, useSelector } from "react-redux"
import { expenseActions } from "../../Store/Expense"
import classes from './Header.module.css'

const Header=(props)=>{
  const dispatch=useDispatch()
  const totalExpenseObject=useSelector((state)=>state.expense.totalAmount)
  const isDarkMode = useSelector((state) => state.expense.darkMode);
  const isPremium=useSelector((state)=>state.expense.isPremium)
  const totalExpense = totalExpenseObject ? totalExpenseObject.payload : 0;
  const history=useHistory();
  const authCtx=useContext(ExpenseContext)  
  const isLoggedIn=authCtx.isLoggedIn;
  const completionPercentage=authCtx.completionPercentage
  const location=useLocation()
  const [showProfileBadge, setShowProfileBadge] = useState(true);
  

  useEffect(() => {
    setShowProfileBadge(location.pathname !== "/profile");
  }, [location]);

  const logoutHandler=()=>{
    /////////////////
    dispatch(authActions.logout())
    dispatch(expenseActions.resetTotalAmount())
    dispatch(expenseActions.deactivatePremium())
    ///////////////////
    authCtx.logout();
    history.replace('/')
  }

  useEffect(() => {
    // Apply the initial theme
    document.body.classList.remove('dark-theme', 'light-theme');
    
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
  } else {
      document.body.classList.add('light-theme');
  }
  }, [isDarkMode]);

  const toggleThemeHandler = () => {   
    dispatch(expenseActions.toggleTheme());    
  };
  console.log(isDarkMode)
    
  const premiumHandler=()=>{
    dispatch(expenseActions.activePremium())
  }
  

    return(
      <Container fluid className="py-2 ps-5 bg-dark" >
        <Container>
          <Row>
          <Col lg={3}>
          <a href="/" style={{ textDecoration: 'none' }}>
          <img
        alt="logo"
        src={img}
        style={{
          height: 80,
          width: 80,
          
        }}
      />
      <span href="/" style={{ fontFamily: "'Playfair Display', serif",letterSpacing:'2px',color:'yellow',fontSize:'23px' }}>TrackMySpends</span>
      </a>
          </Col>
          <Col lg={3} className="mt-4">
          {isLoggedIn && showProfileBadge && ( <NavLink to="/profile"><Badge color="light" className="text-dark text-decoration-none">Your profile is Incomplete. Complete now</Badge></NavLink>)}
              {isLoggedIn && !showProfileBadge && (
              <Badge color="light" className="text-dark text-decoration-none">Your
                Profile  is {completionPercentage.toFixed(0)}% Completed.A complete profile <br/> will give  you  access to all features .{completionPercentage.toFixed(0)<100 ?'Complete now':'' }
              </Badge>
            )}
          </Col>
          <Col lg={6} >
            <Row>
            {!isLoggedIn &&<Col lg={6} className="">
               (<MenuItem/>)           
              </Col>}  
              <Col lg={6} className="mt-3 pt-1 text-end">              
              { totalExpense>=10000 && !isPremium && <Button  color="success" onClick={premiumHandler}
              >Buy Premium</Button>}   
              </Col>
              <Col lg={3} className="text-center mt-4">
             {isPremium && <input type="checkbox" className={isDarkMode ? 'dark-theme' : 'light-theme'}   onChange={toggleThemeHandler}/>}
              </Col>
              <Col lg={3} className="mt-3 pt-1">              
              {isLoggedIn && (<Button onClick={logoutHandler}  color="warning"
    outline>Logout</Button>)}   
              </Col>
            </Row>          
          </Col>
        </Row>
        </Container>        
      </Container>
)}

export default Header;