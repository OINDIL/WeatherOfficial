import React from 'react'

function ProgressBar({ data,data_f,active }) {
    return (
        <div>
            <div className="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                <div className="progress-bar bg-primary" style={{width: active ? `${data_f}%` : `${data}%`}}></div>
            </div>
        </div>
    )
}

export default ProgressBar