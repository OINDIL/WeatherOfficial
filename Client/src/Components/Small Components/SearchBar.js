import React ,{useState} from 'react'
import './CSS/SearchBar.css'
function SearchBar({getData}) {

    const [inputValue,setInputValue] = useState(null)
    const handleEnterKey = (event) =>{
        if(event.key === 'Enter'){
            getData(inputValue)
        }
    }
    return (
        <>
        <div className="container" id='search-container'>
            <div className="input-group mb-3" id='search-main'>
                <input type="text" className="form-control" placeholder="Add a Location" aria-describedby="button-addon2"
                onChange={(e)=>setInputValue(e.target.value)}
                autoFocus
                onKeyDown={handleEnterKey}
                />
                    <button className="btn btn-primary" type="button" id="button-addon2" onClick={()=>getData(inputValue)}>Add</button>
            </div>
        </div>
        </>
    )
}

export default SearchBar