import { useState } from 'react'
import './ProductDetails.scss'

function WrapperModel({ currentImage, index, children, onClick }) {
    const handleOnClick = () => {
        onClick(index)
    }
    return (
        <div
            className={`wrapper-model ${currentImage === index ? 'active' : ''}`}
            data-index={index}
            onClick={handleOnClick}
        >
            {children}
        </div>
    );
}

export default WrapperModel;