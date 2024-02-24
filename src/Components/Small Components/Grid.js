import React from 'react'
import './CSS/grid.css'
function Grid(props) {
  const { name, icon, data, unit} = props.data
  return (
    <>
      <div className="grids-container">
        <div className="grid-heading">
          <h6>{name}</h6>
          <i className={`${icon}`}></i>
        </div>
        <div className="grids-data">
          <p>{data}</p>
          <div className="units">
            <h6>{unit}</h6>
          </div>
        </div>
      </div>
    </>
  )
}

export default Grid