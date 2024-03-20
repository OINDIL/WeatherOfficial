import React from 'react'
import './CSS/SearchBar.css'
function SearchBar() {
    return (
        <>
        <div className="container" id='search-container'>
            <div className="input-group mb-3" id='search-main'>
                <input type="text" className="form-control" placeholder="Search For a Location" aria-label="Recipient's username" aria-describedby="button-addon2"/>
                    <button className="btn btn-primary" type="button" id="button-addon2">Search</button>
            </div>
        </div>
        </>
    )
}

export default SearchBar