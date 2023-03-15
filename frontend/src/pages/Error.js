import React from 'react'
import { useNavigate } from 'react-router-dom';
import error from '../images/error.jpg';


const Error = () => {
    const navigate = useNavigate()
    
   function gotoHome(){
        navigate("/login")
    }
  return (
    <>
      <div className='container-fluid'>
    <div className='row'>
    <div className='col text-center mt-5'>
        <img src={error} alt="errorImage" style={{width:"400px"}}></img>
        <h2 className='mt-5 text-center' style={{fontSize:"30px", color:"#072A47", fontWeight:"700"}}>OPPS! Unable to find the requested Page</h2>
        
    </div>
   
    </div>    
    </div> 
    </>
  )
}

export default Error
