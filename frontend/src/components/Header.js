import React from 'react'
// import headerimage from '../images/headerimage.jpg'
// import Button from './Button'
import CommonSection from './CommonSection'

const Header = () => {
  return (
    <>
       <div className="container-fluid main-div">
        <div className="row">
          <div className="col-md-12">
            <CommonSection
              // mainclass=" main-div"
              tagline1="Trusted Shopping Partner"
              title="Welcome To"
              span="Our Store"
              tagline2="It is more than just a shop"
              visit="/products"
              btname="Shop Now"
              class="btn-get-started"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
