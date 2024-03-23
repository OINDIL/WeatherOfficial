import React from 'react'
import './CSS/grid.css'
import ProgressBar from './ProgressBar'

function Grid(props) {
  const { name, icon, data, unit,data_f,id} = props.data

  const uvIndex = (value) =>{
    if(value >= 0 && value <= 2) return 'Low'
    else if(value >= 3 && value <= 5) return 'Moderate'
    else if(value >= 6 && value <= 7) return 'High'
    else return 'High'
    
  } 
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
        {id !== 'uv' ? <ProgressBar data={data} data_f={data_f} active={props.active}/> : <p style={{fontSize:'85%'}}>{uvIndex(data)}</p>}
      </div>
    </>
  )
}

export default Grid