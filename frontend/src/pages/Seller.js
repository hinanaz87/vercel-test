import React, { useEffect, useState } from "react";
import addProduct from "../images/box.png";
import allProduct from "../images/box1.webp";
import avatar from "../images/profile.webp";
import { useNavigate } from "react-router-dom";

const Seller = () => {
  const navigate = useNavigate();

  const [ userId, setUserId] = useState("")

  useEffect(()=>{

    const userDetails = JSON.parse(localStorage.getItem("details"));
    

    if ( userDetails == null ||
      userDetails.isUser == true 
     
      // userDetails.isUser == undefined
    ) {
      navigate("/");
      // alert("You are not authorized to visit this page");
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
              src={addProduct}
              alt="Card"
              width="250"
              height="250"
            />
            <div className="card-body">
              <h5 className="card-title">Add Product</h5>
              <button type="button" class="btn btn-primary mt-3" onClick={() => navigate("/addproduct")}>
                Add Product
              </button>
              {/* <a href="#" className="btn btn-card">Add</a> */}
            </div>
          </div>

          <div className="card mt-5 text-center" style={{ width: "18rem" }}>
            <img
              className="card-img-top"
              src={allProduct}
              alt="Card"
              width="250"
              height="250"
            />
            <div className="card-body">
              <h5 className="card-title">All Products</h5>
              <button type="button" class="btn btn-primary mt-3" onClick={() => navigate(`/products/${userId}`)}>
                All Products
              </button>
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default Seller;
