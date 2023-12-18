import { useContext } from "react"
import { Button, Container, Row, Col } from "reactstrap"
import img from '../../Assets/logo.gif'
import MenuItem from "./MenuItems"
import { useHistory } from "react-router-dom"
import ExpenseContext from "../../Store/ExpenseContext"


const Header=(props)=>{

  const history=useHistory();
  const authCtx=useContext(ExpenseContext)  
  const isLoggedIn=authCtx.isLoggedIn;
  console.log('isloggedin',isLoggedIn)

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