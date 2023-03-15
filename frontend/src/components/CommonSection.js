import React from 'react'
// import Button from './Button'
import { NavLink } from 'react-router-dom'

const CommonSection = (props) => {
  return (
    <>
      
            <div >
            <h4>{props.tagline1}</h4>
            <h2>{props.title} <span>{props.span}</span></h2>
            <h3>{props.tagline2}</h3>
           
            </div>
            <div className='mt-3'>
              <NavLink 
              to={props.visit} 
              className={props.class}>
              {props.btname}
               
              </NavLink>
            </div> 

      
    </>
  )
}

export default CommonSection
