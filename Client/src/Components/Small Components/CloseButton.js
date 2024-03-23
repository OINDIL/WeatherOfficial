import React from 'react'

function CloseButton({setButtonClick}) {
  return (
    <div style={{position:'relative'}}>
            <button type="button" className="btn-close" aria-label="Close"
            style={{position:'absolute', zIndex:1, right:'10px',top:'10px'}}
            onClick={()=>setButtonClick(false)}
            ></button>
    </div>
  )
}

export default CloseButton