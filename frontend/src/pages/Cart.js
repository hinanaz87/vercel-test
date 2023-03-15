import React, { useEffect, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Cart = ({ updateCartFunction }) => {
  // const itemsPrice = cart.reduce((a,c) => a + c.quantity * c.price, 0);
  // ---------------------------ADD QUANTITY IN CART-------------------------

  const getCart = JSON.parse(localStorage.getItem("cart"));

  const [cart, setCart] = useState(getCart || []);

  const navigate = useNavigate();
  const onClickCheckout = () => navigate(`/Checkout`);

  const itemsPrice = cart.reduce((a, c) => a + c.quantity * c.productPrice, 0);

  console.log(`itemsprice=${itemsPrice}`);

  return (
    <>
      {cart == 0 ? (
        <h2 className="text-center mt-5" style={{ color: "red" }}>
          * Your Cart is Empty.
        </h2>
      ) : null}

      <div className="container">
        <div className="row ">
          <table className="table table-striped table-hover table-responsive mt-5">
            {cart != 0 ? (
              <thead>
                <tr>
                  <th scope="col">Image</th>
                  <th scope="col" style={{ width: "500px" }}>
                    Title
                  </th>
                  <th scope="col" style={{ minWidth: "150px" }}>
                    Quantity
                  </th>
                  <th scope="col" style={{ width: "100px" }}>
                    Price
                  </th>
                  <th scope="col" style={{ width: "100px" }}>
                    Total
                  </th>
                </tr>
              </thead>
            ) : null}

            <tbody>
              {cart.map((cartItem, cartindex) => {
                return (
                  <tr key={cartindex}>
                    <td>
                      <img
                        src={cartItem.productImage}
                        style={{ width: "50px" }}
                      />
                    </td>
                    <td>{cartItem.productName}</td>

                    <td>{cartItem.productPrice}</td>
                    <td>$ {cartItem.quantity * cartItem.productPrice}</td>
                  </tr>
                );
              })}
            </tbody>

            {cart != 0 ? (
              <tfoot>
                <tr
                  style={{
                    backgroundColor: "lightgray",
                    color: "#ff6b00",
                    fontSize: "18px",
                    fontWeight: "500",
                  }}
                >
                  <td style={{ fontWeight: "800" }}>
                    <strong>Cart Total:</strong>
                  </td>
                  <td colSpan={3}></td>
                  <td style={{ fontWeight: "800" }}>
                    ${itemsPrice.toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            ) : null}
          </table>
        </div>
      </div>

      <div className="col-md-12 text-center">
        {cart.length !== 0 && (
          <button className="check-btn mt-5" onClick={onClickCheckout}>
            {" "}
            Proceed To Checkout
          </button>
        )}
      </div>
    </>
  );
};

export default Cart;
