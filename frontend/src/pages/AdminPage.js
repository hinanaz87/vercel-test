import React, { useEffect, useState } from "react";

import allseller from "../images/profile.webp";
import allproducts from "../images/box1.webp";
import approveproduct from "../images/box-tick.webp";
import approveseller from "../images/avatar-tick.webp";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();

  const [ userId, setUserId] = useState("")

  useEffect(()=>{

    const userDetails = JSON.parse(localStorage.getItem("details"));
    

    if ( userDetails == null ||
      userDetails.isUser == true 
     
      
    ) {
      navigate("/");

    } else {
      setUserId(userDetails.userId);
      console.log("this is user id " + userDetails.userId)
    }



}, [])

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="card mt-5 text-center" style={{ width: "18rem" }}>
            <img
              className="card-img-top"
              src={allproducts}
              alt="Card"
              width="250"
              height="250"
            />
            <div className="card-body">
              <h5 className="card-title">All Products</h5>
              <button type="button" class="btn btn-primary mt-3" onClick={() => navigate("/products")}>
              All Products
              </button>
              {/* <a href="#" className="btn btn-card">Add</a> */}
            </div>
          </div>

          <div className="card mt-5 text-center" style={{ width: "18rem" }}>
            <img
              className="card-img-top"
              src={allseller}
              alt="Card"
              width="250"
              height="250"
            />
            <div className="card-body">
              <h5 className="card-title">All Users</h5>
              <button type="button" class="btn btn-primary mt-3" onClick={() => navigate("/users")}>
                All Users
              </button>
            </div>
          </div>

          <div className="card mt-5 text-center" style={{ width: "18rem" }}>
             <img
              className="card-img-top"
              src={approveproduct}
              alt="Card"
              width="250"
              height="250"
            /> 
            <div className="card-body">
              <h5 className="card-title">Approve Product</h5>
              <button type="button" class="btn btn-primary mt-3"  onClick={() => navigate(`/approveproduct`)}>
              Approve Product
              </button>
            </div>
          </div>


        </div>
      </div>
    </>
  );
};

export default AdminPage;

