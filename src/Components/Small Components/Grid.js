import React from 'react'
import './CSS/grid.css'
function Grid(props) {
  const { name, icon, data } = props.data
  // console.log(icon);
  return (
    <>
    <div className="grids-container">
      <div className="grid-heading">
        <h6>{name}</h6>
        <i className={`${icon}`}></i>
      </div>
      <div className="grids-data">
          <p>{data}</p>
        </div>
    </div>
    </>
  )
}

export default Grid