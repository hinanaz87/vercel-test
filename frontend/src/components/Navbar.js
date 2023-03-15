import React from "react";
import logo from '../images/Logo.png';
import { NavLink, useNavigate } from "react-router-dom";
// import { GlobalContext } from "../ContextProvider";
// import { useContext } from "react";

const Navbar = () => {
  // let { state, dispatch } = useContext(GlobalContext);
  const getCart = JSON.parse(localStorage.getItem("cart"));

  const navigate = useNavigate();

  const loginUser = JSON.parse(localStorage.getItem("userLogin"));

  const logout = () => {
    localStorage.removeItem("userLogin");
    localStorage.removeItem("token");
    localStorage.removeItem("details");
    localStorage.removeItem("isUser");
    localStorage.removeItem("cart");
    // dispatch ({ type: "USER_LOGOUT"})

    navigate("/");
  };
  const logIn = () => {
    navigate("/login");
  };
  const cart = () => {
    navigate("/cart");
  };
  const register = () => {
    navigate("/register");
  };
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          <img src={logo} width="50" height="50" className="d-inline-block logo" alt="logo" style={{marginLeft:"30px", marginRight:"30px"}}/>
          Saylani Mass IT Training
        </NavLink>

        {/* --------------PRODUCT LINKS FRO ADMIN ONLY----------- */}
        <div></div>
        <div className="nav-div">
          {loginUser !== null || loginUser != undefined ? (
            <button onClick={logout} type="button" class="btn btn-primary m-3">
              LogOut ({loginUser})
            </button>
          ) : null}

          {loginUser == null || loginUser == undefined ? (
            <button onClick={logIn} type="button" class="btn btn-primary m-3">
              Login
            </button>
          ) : null}

{(getCart != null && getCart.length > 0) ? (
            <button onClick={cart} type="button" class="btn btn-primary m-3" >
              Cart
            </button>
          ) : null}

          {loginUser == null || loginUser == undefined ? (
            <button onClick={register} type="button" class="btn btn-primary m-3">
              Register
            </button>
          ) : null}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
