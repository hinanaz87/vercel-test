import React from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../images/Logo.png';


const Splash = () => {
    const navigate = useNavigate()
    
   function gotoHome(){
        navigate("/login")
    }
  return (
    <>
      <div className='container-fluid'>
    <div className='row'>
    <div className='col text-center mt-5'>
        <img src={logo} alt="errorImage" style={{width:"400px"}}></img>
        <h2 className='mt-5 text-center' style={{fontSize:"30px", color:"#072A47", fontWeight:"700"}}>Welcome to Saylani Online Store</h2>
        <button onClick={gotoHome} type="button" class="btn btn-primary m-5">
             Get Started
            </button>
    </div>
   
    </div>    
    </div> 
    </>
  )
}

export default Splash
