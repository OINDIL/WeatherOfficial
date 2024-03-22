import React from 'react'
import './CSS/grid.css'
import ProgressBar from './ProgressBar'

function Grid(props) {
  const { name, icon, data, unit,data_f,id} = props.data
  return (
    <>
      <div className="grids-container">
        <div className="grid-heading">
          <h6>{name}</h6>
          <i className={`${icon}`}></i>
        </div>
        <div className="grids-data">
          <p>{id === 'temp' && props.active ? data_f : data}</p>
          <div className="units">
            <h6>{unit}</h6>
          </div>
        </div>
        <ProgressBar data={data} data_f={data_f} active={props.active}/>
      </div>
    </>
  )
}

export default Grid