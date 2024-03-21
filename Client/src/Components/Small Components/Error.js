import React from 'react'
import './CSS/Error.css'
function Error({setErrorState , setButtonClick}) {

    const handleEvents = () =>{
        setErrorState(false)
        setButtonClick(true)
    }
    return (
        <>
        <div id='error-card'>
            <div className="card" style={{width:'30rem'}} id="error-card-main">
                <div className="card-body d-flex flex-column gap-1">
                    <h5 className="card-title">Invalid Location</h5>
                    <p className="card-text">Try a different location.</p>
                    <button className='btn btn-primary' onClick={handleEvents}>Search Again</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Error