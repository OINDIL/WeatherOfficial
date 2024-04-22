import React from 'react'
import './CSS/popup.css'
import {Link} from 'react-router-dom'
function Popup() {
    const links = [
        {route:'/login',name:'Login'},
        {route:'/signup',name:'Sign Up'},
        {route:'/profile',name:'Profile'},
    ]
  return (
    <div>
        <div className="popup-container">
            {links.map((item,index)=>(
                <div key={index}>
                    <Link className='text-decoration' to={item.route}>{item.name}</Link>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Popup