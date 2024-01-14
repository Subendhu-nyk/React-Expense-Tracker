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


const Header=(props)=>{
  const dispatch=useDispatch()
  const totalExpenseObject=useSelector((state)=>state.expense.totalAmount)
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
    ///////////////////
    authCtx.logout();
    history.replace('/')
  }

    

    return(
      <Container fluid className="py-2 ps-5 bg-dark" >
        <Container>
          <Row>
          <Col lg={6}>
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
          <Col lg={6} >
            <Row>
              <Col lg={6} className="mt-4">
              {!isLoggedIn && (<MenuItem/>)}
              {isLoggedIn && showProfileBadge && ( <NavLink to="/profile"><Badge color="light" className="text-dark text-decoration-none">Your profile is Incomplete. Complete now</Badge></NavLink>)}
              {isLoggedIn && !showProfileBadge && (
              <Badge color="light" className="text-dark text-decoration-none">Your
                Profile  is {completionPercentage.toFixed(0)}% Completed.A complete profile <br/> will give  you  access to all features .{completionPercentage.toFixed(0)<100 ?'Complete now':'' }
              </Badge>
            )}
              </Col>
              <Col lg={4} className="mt-3 pt-1">              
              { totalExpense>=10000 && <Button onClick={logoutHandler}  color="success"
              >Activate Premium</Button>}   
              </Col>
              <Col lg={2} className="mt-3 pt-1">
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