import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { GlobalContext } from '../ContextProvider';
// import { useContext } from "react";

const Login = () => {
//   let { state, dispatch } = useContext(GlobalContext);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value)

    setUserDetails({ ...userDetails, [name]: value });
    console.log(name, value);
  };

  const validateForm = () => {
    let err = {};

    if (userDetails.email === "") {
      err.email = "Email is required.";
    }

    if (userDetails.password === "") {
      err.password = "Password is required";
    }

    setFormError({ ...err });
    return Object.keys(err).length < 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let isValid = validateForm();

    if (isValid) {
      // ------------INTEGRATING LOGIN API-------------
      let result = await fetch("https://lazy-red-chicken-suit.cyclic.app/login", {
        method: "post",
        body: JSON.stringify(userDetails),
        headers: {
          "Content-Type": "application/json",
          // authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        },
      });
      result = await result.json();
      console.warn(result);

    //   dispatch ({ type: "USER_LOGIN", payload: result.user})
      console.log("-------------" + JSON.stringify(result.user) )
      if (result.message === "Invalid username or password") {
        alert(result.message);
      } else {
        // navigate("/adminpage");
        localStorage.setItem(
          "userLogin",
          JSON.stringify(result.user.fullname)
        );

        localStorage.setItem(
          "isUser",
          JSON.stringify(result.user.isUser)
        );

        localStorage.setItem(
          "details",
          JSON.stringify(result.user)
        );

        localStorage.setItem("token", JSON.stringify(result.auth));
        
        if (result.user.role === "admin") {
          navigate("/adminpage");
        } 
        
        if (result.user.role === "buyer") {
          navigate("/home");
        }
        
        if (result.user.role === "seller") {
          navigate("/seller");
        }
        
      }
    }
  };

  return (
    <>
      <div className="container mt-5 ">
        <div className="row ">
          <div className="col-md-10 px-5 ">
            <h3
              style={{ fontSize: "30px", color: "#072A47", fontWeight: "700" }}
            >
              Sign In
            </h3>

            <form action="" onSubmit={handleSubmit} className="mt-3 mb-5">
              <div class="mb-3">
                <label for="email" class="form-label">
                  Email Address:
                </label>
                <input
                  type="email"
                  autoComplete="off"
                  name="email"
                  class="form-control"
                  value={userDetails.email}
                  onChange={handleChange}
                  id="email"
                  placeholder="Enter Your Email Here"
                />
                <span>{formError.email}</span>
              </div>

              <div class="mb-3">
                <label for="password" class="form-label">
                  Password:
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  name="password"
                  class="form-control"
                  value={userDetails.password}
                  onChange={handleChange}
                  id="password"
                  placeholder="Enter Your Password Here"
                />
                <span>{formError.password}</span>
              </div>

              <button type="submit" class="btn btn-primary m-3">
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
