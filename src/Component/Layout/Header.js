import { useContext,useState,useEffect } from "react"
import { Button, Container, Row, Col,Badge } from "reactstrap"
import img from '../../Assets/logo.gif'
import MenuItem from "./MenuItems"
import { useHistory } from "react-router-dom"
import ExpenseContext from "../../Store/ExpenseContext"
import { NavLink, useLocation } from "react-router-dom"


const Header=(props)=>{

  const history=useHistory();
  const authCtx=useContext(ExpenseContext)  
  const isLoggedIn=authCtx.isLoggedIn;
  const completionPercentage=authCtx.completionPercentage
  const location=useLocation()
  const [showProfileBadge, setShowProfileBadge] = useState(true);
  console.log('isloggedin',isLoggedIn)

  useEffect(() => {
    setShowProfileBadge(location.pathname !== "/profile");
  }, [location]);

  const logoutHandler=()=>{
    authCtx.logout();
    history.replace('/')
  }


    return(
      <Container fluid className="py-2 ps-5 bg-dark" >
        <Container>
          <Row>
          <Col lg={7}>
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
          <Col lg={5} >
            <Row>
              <Col lg={8} className="mt-4">
              {!isLoggedIn && (<MenuItem/>)}
              {isLoggedIn && showProfileBadge && ( <NavLink to="/profile"><Badge color="light" className="text-dark text-decoration-none">Your profile is Incomplete. Complete now</Badge></NavLink>)}
              {isLoggedIn && !showProfileBadge && (
              <Badge color="light" className="text-dark text-decoration-none">Your
                Profile  is {completionPercentage.toFixed(0)}% Completed.A complete profile <br/> will give  you  access to all features .{completionPercentage.toFixed(0)<100 ?'Complete now':'' }
              </Badge>
            )}
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