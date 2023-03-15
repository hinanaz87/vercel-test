import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productCategory: "",
    shopName: "",
    
  });
const [id, setId] = useState("")
  
  const [formError, setFormError] = useState({});

  const [data, setData] = useState([]);

  const userDetails = JSON.parse(localStorage.getItem("details"));

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.log(name, value)

    setProduct({ ...product, [name]: value });
    //   console.log(name, value)
  };

  const validateForm = () => {
    let err = {};

    if (product.productName === "") {
      err.productName = "Student Name is required";
    }

    if (product.productDescription === "") {
      err.productDescription = "Father's Name is required";
    }

    if (product.productPrice === "") {
      err.productPrice = "Roll Number is required";
    }

    if (product.productCategory === "") {
      err.productCategory = "Section Name is required";
    }

   
    if (product.shopName === "") {
      err.shopName = "Course Name is required";
    }

    setFormError({ ...err });
    return Object.keys(err).length < 1;
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    var profilePictureInput = document.getElementById("productPicture");
    console.log("fileInput: ", profilePictureInput.files); // local url
// letid = "6408457bedbedf55262146c1"
    let formData = new FormData();
    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/append#syntax


    formData.append("productName", product.productName); // this is how you add some text data along with file
    formData.append("productDescription", product.productDescription); // this is how you add some text data along with file
    formData.append("productPrice", product.productPrice); // this is how you add some text data along with file
    formData.append("productCategory", product.productCategory); // this is how you add some text data along with file
    // formData.append("isFreeShipping", product.isFreeShipping); // this is how you add some text data along with file
    formData.append("shopName", product.shopName); // this is how you add some text data along with file
    formData.append("userId", id); // this is how you add some text data along with file
   
    formData.append("productImage", profilePictureInput.files[0]); // file input is for browser only, use fs to read file in nodejs client

  
    axios({
      method: 'post',
      url: "https://lazy-red-chicken-suit.cyclic.app/newproduct",
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
      //  withCredentials: true
    })
      .then(res => {
        console.log(`upload Success` + res.data.data);
      
        alert(res.data.message)
        navigate('/seller')
      })
      .catch(err => {
        console.log(err);
      })

    
  }


  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("details"));

    
    setId (userDetails.userId) 

  }, []);
  return (
    <>
    <div className="container mt-5">
      <div className="row">
        
        
        <div className="col-md-2">
        <button type="button" class="btn btn-primary" onClick={() => navigate("/seller")}>Visit Home</button>

        </div>

      </div>
    </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-7 px-5">
            <h3
              style={{ fontSize: "30px", color: "#072A47", fontWeight: "700" }}
            >
              Adding Product
            </h3>
            <span style={{ color: "red" }}>
              Kindly fill the the Product details carefully
            </span>

            <form action="" onSubmit={handleSubmit} className="mt-3 mb-5">
              <div class="mb-3">
                <label for="productName" class="form-label">
                  Product Name:
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  name="productName"
                  class="form-control"
                  value={product.productName}
                  onChange={handleChange}
                  id="productName"
                  placeholder="Enter Product Name Here"
                />
                <span style={{ color: "red", fontSize: "12px" }}>
                  {formError.productName}
                </span>
              </div>

              <div class="mb-3">
                <label for="productDescription" class="form-label">
                  Product Description:
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  name="productDescription"
                  class="form-control"
                  value={product.productDescription}
                  onChange={handleChange}
                  id="productDescription"
                  placeholder="Enter Product Description Here"
                />
                <span style={{ color: "red", fontSize: "12px" }}>
                  {formError.productDescription}
                </span>
              </div>

              <div class="mb-3">
                <label for="productPrice" class="form-label">
                  Product Price:
                </label>
                <input
                  type="number"
                  autoComplete="off"
                  name="productPrice"
                  class="form-control"
                  value={product.productPrice}
                  onChange={handleChange}
                  id="productPrice"
                  placeholder="Enter Product Price Here"
                />
                <span style={{ color: "red", fontSize: "12px" }}>
                  {formError.productPrice}
                </span>
              </div>

              <div class="mb-3">
                <label for="productCategory" class="form-label">
                Product Category:
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  name="productCategory"
                  class="form-control"
                  value={product.productCategory}
                  onChange={handleChange}
                  id="productCategory"
                  placeholder="Enter productCategory Here"
                />
                <span style={{ color: "red", fontSize: "12px" }}>
                  {formError.productCategory}
                </span>
              </div>


             
               <div class="mb-3">
              <label for="productPicture" class="form-label">productPicture:</label>
              <input type="file" id="productPicture" accept='image/*'/>
             
          
          </div>
             

              <div class="mb-3">
                <label for="shopName" class="form-label">
                  Shop Name:
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  name="shopName"
                  class="form-control"
                  value={product.shopName}
                  onChange={handleChange}
                  id="shopName"
                  placeholder="Enter Shop Name Here"
                />
                <span style={{ color: "red", fontSize: "12px" }}>
                  {formError.shopName}
                </span>
              </div>

              <div class="mb-3">
                <label for="userId" class="form-label">
                  User Id:
                </label>
                <input
                  type="text"
                  autoComplete="off"
                  name="userId"
                  class="form-control"
                  value={id}
                  onChange={handleChange}
                  id="userId"
                  // placeholder="Enter Class Name Here"
                />
                <span style={{ color: "red", fontSize: "12px" }}>
                  {formError.userId}
                </span>
              </div>

              <button type="submit" className="register-btn mt-3">
                Add
              </button>
              <br />
              <br />
              
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
