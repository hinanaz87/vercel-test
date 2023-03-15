import React, { useEffect, useState } from 'react'
// import Card from './Card'
import axios from 'axios';

const ProductList = ({updateCartFunction}) => {
     const MyCart = JSON.parse(localStorage.getItem("cart"))
    const [products, setProducts] = useState([]);
     const [cart, setCart] = useState(MyCart || []);

    function fetchProducts(){
        axios('https://lazy-red-chicken-suit.cyclic.app//displayproducts')
        .then(res=>{
            console.log(res.data)
            setProducts(res.data)
        })
    }

    useEffect(()=>{
        fetchProducts()
    },[])


    const addToCart = (product) => {
       console.log(product);
      console.log("Cart is", cart);
      
     
      if (cart !== null) {
        const isLargeNumber = (element) => element.id == product.id;
        const indeX = cart.findIndex(isLargeNumber);
        if (indeX > -1) {
          console.log("------", indeX);
          // const tempData = cart;
          cart[indeX].quantity = parseInt(cart[indeX].quantity) + 1;
          setCart([...cart]);
          localStorage.setItem(
            "cart",
            JSON.stringify([...cart])
            );
          } else {
          console.log("------11111--", indeX);
          setCart([...cart, { ...product, quantity: 1 }]);
          localStorage.setItem(
            "cart",
            JSON.stringify([...cart, { ...product, quantity: 1 }])
          );
        }
      } else {
        setCart([{ ...product, quantity: 1 }]);
        localStorage.setItem("cart", JSON.stringify([{ ...product, quantity: 1 }]));

      }
      
    }; 
  
const searchHandle = async (e) =>{
  let key = e.target.value;
  
  if(key){
    let result =await fetch (`https://lazy-red-chicken-suit.cyclic.app/search/${key}`);
    result = await result.json();
    if(result){
      setProducts(result)
    }
  }else {
    fetchProducts();
  }
  
}

  return (
    <>

<div className='col text-center mt-5'>
        <h2 className='mt-5 text-center' style={{fontSize:"30px", color:"#072A47", fontWeight:"700"}}>Search By Category</h2>
        <input type="text" placeholder='Search Product by Category' className='search-input'onChange={searchHandle}/>
    </div>


    <div className='container-fluid mt-5'>
        <div className='row  d-flex justify-content-center flex-wrap'>
        
        
        { products.length > 0 ? 
            products.map((product, ind)=>{
              return   <div className=" col-md-3 card " key={ind} >
       
              {/* <img src={props.data.image} class="card-img-top img-fluid mx-auto" alt="..." /> */}
             
              <div className="card-body text-center">
              <img src={product.productImage} style={{width:"250px"}} />
                <h5 className="card-title">  {product.productName}</h5>
                <h5 className="card-title">{product.currencyCode} {product.productPrice}</h5>
                <p className="card-text">{product.productDescription.slice(0, 60)}</p>
                

                {/* <NavLink to={props.to} className="btn btn-primary m-1">
                  View Details
                </NavLink> */}
                <button className="btn btn-primary m-1" onClick={() => addToCart(product)}>
                  Add to Cart
                </button>
                
                
              </div>
            </div>
            }) : <h2>No Result Found</h2>
            } 
        </div>
    </div>
      
    </>
  )
}

export default ProductList
