import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    productCategory: "",
    isApproved: "",
    shopName: "",
  });
  const [userId, setUserId] = useState("");

  const [formError, setFormError] = useState({});

  const [data, setData] = useState([]);
  const { id } = useParams();

  const userDetails = JSON.parse(localStorage.getItem("details"));

  const navigate = useNavigate();

  const loadProduct = async () => {
    const result = await axios.get(`https://lazy-red-chicken-suit.cyclic.app/product/${id}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    console.log(result.data.data);
    setProduct(result.data.data);
  };
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
    const newData = { ...product, id: new Date().getTime().toString() };

    let isValid = validateForm();

    if (isValid) {
      setData(true);

      // --------SENDING DATA TO MONGO DB-----------
      let result = await fetch(`https://odd-gold-squid-robe.cyclic.app/editproduct/${id}`, {
        method: "put",
        body: JSON.stringify(newData),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      console.warn(result);
      navigate("/adminpage");
    }
  };

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("details"));

    setUserId(userDetails.userId);
    loadProduct();
  }, []);
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-2">
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => navigate("/products")}
            >
              All Products
            </button>
          </div>
          <div className="col-md-2">
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => navigate("/seller")}
            >
              Visit Home
            </button>
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
                <label for="isApproved" class="form-label">
                  isApproved:
                </label>
                <input
                  type="test"
                  autoComplete="off"
                  name="isApproved"
                  class="form-control"
                  value={product.isApproved}
                  onChange={handleChange}
                  id="isApproved"
                  placeholder="Enter Status here True or False"
                />
                <span style={{ color: "red", fontSize: "12px" }}>
                  {formError.isApproved}
                </span>
              </div>

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
                Approve
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
