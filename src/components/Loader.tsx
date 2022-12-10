import React from 'react'

function Loader() {
    return (
        <div className="modal-wrapper">
            <div
                className="spinner-grow inline-block w-8 h-8 bg-current rounded-full opacity-0 text-gray-300"
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loader
