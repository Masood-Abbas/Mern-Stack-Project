import { NavLink } from "react-router-dom";
import "../../public/css/navBar.css"
import { useAuth } from "../store/Auth";

export const Navbar = () => {

  const {isLogin}=useAuth()
  return (
    <>
      <header>
        <div className="container">
          <div className="logo-brand">
            <NavLink to="/">Masood Abbas</NavLink>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/service">Service</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              {isLogin ?(<li>
                <NavLink to="/logout">Logout</NavLink>
              </li>):(<>              <li>
                <NavLink to="/registration">Registration</NavLink>
              </li>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li></>)}
              

            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

// export default Navbar;
