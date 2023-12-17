import { Navbar,NavbarBrand } from "reactstrap"
import img from '../../Assets/logo.gif'
import MenuItem from "./MenuItems"
import { useLocation } from "react-router-dom"

const Header=(props)=>{



    return(
<Navbar
className="py-2 ps-5 border border-dark"
color="dark"
    dark
>
<NavbarBrand href="/"className="fw-bolder">
      <img
        alt="logo"
        src={img}
        style={{
          height: 80,
          width: 80,
          
        }}
      />
      TrackMySpends
    </NavbarBrand>
   <MenuItem/>     
  </Navbar>

)}

export default Header;