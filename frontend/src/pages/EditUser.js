import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const [userDetails, setUserDetails] = useState({
    fullname: "",
    username: "",
    email: "",
    isBlocked: "",
    phonenumber: "",
    role: "",
  });

  const [formError, setFormError] = useState({});

  const [data, setData] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  const loadUser = async () => {
    const result = await axios.get(`https://lazy-red-chicken-suit.cyclic.app/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    console.log(result.data);
    setUserDetails(result.data);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value)

    setUserDetails({ ...userDetails, [name]: value });
    //   console.log(name, value)
  };

  const validateForm = () => {
    let err = {};
    let nameregex = /^[a-zA-Z\s]+$/;
    let usernameregex = /^[a-zA-Z0-9]+$/;
    let emailregex = /^[a-zA-Z0-9]+@(gmail|yahoo|outlook)\.com$/;

    if (userDetails.fullname === "") {
      err.fullname = "Full Name is required";
    }

    if (userDetails.fullname.length < 3 || userDetails.fullname.length > 20) {
      err.fullname =
        "Full Name must contain atleast 3 and maximum 20 characters.";
    }

    if (!nameregex.test(userDetails.fullname)) {
      err.fullname = "Full Name  can only have alphabets.";
    }

    if (userDetails.username === "") {
      err.username = "Username is required";
    }

    if (userDetails.username.length < 3 || userDetails.username.length > 20) {
      err.username =
        "Username must contain atleast 3 and maximum 20 characters.";
    }

    if (!usernameregex.test(userDetails.username)) {
      err.username = "Username can only contain alpha numeric characters.";
    }

    if (userDetails.email === "") {
      err.email = "Email is required.";
    } else if (!emailregex.test(userDetails.email)) {
      err.email =
        "Email format is not correct.You can only use gmail, yahoo and outlook.";
    } else if (userDetails.email.indexOf("@") <= 0) {
      err.email = "*Invalid @ position";
    } else if (
      userDetails.email.charAt(userDetails.email.length - 4) != "." &&
      userDetails.email.charAt(userDetails.email.length - 3) != "."
    ) {
      err.email = "*Invalid . position";
    }

    if (userDetails.phonenumber === "") {
      err.phonenumber = "Phone Number is required";
    }

    if (userDetails.phonenumber.length < 11) {
      err.phonenumber = "*Phone Number should be of atleast 11 digits";
    }

    setFormError({ ...err });
    return Object.keys(err).length < 1;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = { ...userDetails, id: new Date().getTime().toString() };

    let isValid = validateForm();

    if (isValid) {
      setData(true);

      // --------SENDING DATA TO MONGO DB-----------
      let result = await fetch(`https://lazy-red-chicken-suit.cyclic.app/user/${id}`, {
        method: "put",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      console.warn(result);
      navigate("/users");
    }

    if (isValid) {
      setUserDetails({
        fullname: "",
        fullname: "",
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        phonenumber: "",
      });
    }
  };

  useEffect(() => {
    const getUsers = JSON.parse(localStorage.getItem("listOfUsers"));
    setData(getUsers);

    loadUser();
  }, []);
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-7 px-5">
            <h3
              style={{ fontSize: "30px", color: "#072A47", fontWeight: "700" }}
            >
              Registration Form
            </h3>
            <span style={{ color: "red" }}>
              Kindly fill the the form carefully
            </span>

            <form action="" onSubmit={handleSubmit} className="mt-3 mb-5">
              <div class="mb-3">
                <label for="fullname" class="form-label">
                  Full Name:
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  name="fullname"
                  class="form-control"
                  value={userDetails.fullname}
                  onChange={handleChange}
                  id="fullname"
                  placeholder="Enter Your FullName Here"
                />
                <span style={{ color: "red", fontSize: "12px" }}>
                  {formError.fullname}
                </span>
              </div>

              <div class="mb-3">
                <label for="username" class="form-label">
                  Username:
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  name="username"
                  class="form-control"
                  value={userDetails.username}
                  onChange={handleChange}
                  id="username"
                  placeholder="Enter Your Username Here"
                />
                <span style={{ color: "red", fontSize: "12px" }}>
                  {formError.username}
                </span>
              </div>

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
                <span style={{ color: "red", fontSize: "12px" }}>
                  {formError.email}
                </span>
              </div>

              <div class="mb-3">
                <label for="isBlocked" class="form-label">
                  isBlocked:
                </label>
                <input
                  type="test"
                  autoComplete="off"
                  name="isBlocked"
                  class="form-control"
                  value={userDetails.isBlocked}
                  onChange={handleChange}
                  id="isBlocked"
                  placeholder="Enter Status here True or False"
                />
                <span style={{ color: "red", fontSize: "12px" }}>
                  {formError.isBlocked}
                </span>
              </div>

              <div class="mb-3">
                <label for="phonenumber" class="form-label">
                  Phone Number:
                </label>
                <input
                  type="number"
                  autoComplete="off"
                  name="phonenumber"
                  class="form-control"
                  value={userDetails.phonenumber}
                  onChange={handleChange}
                  id="phonenumber"
                  placeholder="Enter Your Phone Number Here"
                />
                <span style={{ color: "red", fontSize: "12px" }}>
                  {formError.phonenumber}
                </span>
              </div>

              <div class="mb-3">
                <label for="role" class="form-label">
                  Role:
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  name="role"
                  class="form-control"
                  value={userDetails.role}
                  onChange={handleChange}
                  id="role"
                  placeholder="Enter Your Role Here either Buyer or Seller"
                />
                <span style={{ color: "red", fontSize: "12px" }}>
                  {formError.role}
                </span>
              </div>

              <button type="submit" className="register-btn mt-3">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUser;
