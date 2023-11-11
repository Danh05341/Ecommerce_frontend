import { useState } from 'react';
import './ProductDetails.scss'

function WrapperImage(props) {
    const imageContent = document.querySelector('.zoom-image');
    const content = document.querySelector('.zoom-image.image');

    const [mouseSquare, setMouseSquare] = useState({})
    const [zoomImage, setZoomImage] = useState({})
    const [image, setImage] = useState({})

    const handleOnMouseMove = (e) => {
        const containerRect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - containerRect.left;
        const mouseY = e.clientY - containerRect.top;

        const squareWidth = 100;
        const squareHeight = 100;

        const x = Math.min(containerRect.width - squareWidth / 2, Math.max(squareWidth / 2, mouseX));
        const y = Math.min(containerRect.height - squareHeight / 2, Math.max(squareHeight / 2, mouseY));
        setMouseSquare({ left: `${x}px`, top: `${y}px` })

        const transformOrigin = ((e.clientX - containerRect.left) / containerRect.width) * 100 + '% ' + ((e.clientY - containerRect.top) / containerRect.height) * 100 + '%'

        setZoomImage({ display: 'block' })
        setImage({
            backgroundImage: `url('${props.src}')`,

            transformOrigin: transformOrigin,
            transform: `scale(2)`,
        })
    };
    const handleOnMouseLeave = (e) => {
        setZoomImage({display: 'none'})
        setImage({
            transform: `scale(1)`
        })
    }
    return (
        <div className="wrapper-image" >
            <img className='image' onMouseMove={handleOnMouseMove} onMouseLeave={handleOnMouseLeave} src={props.src} alt={props.alt}></img>
            <div className="mouse-square" style={mouseSquare}></div>
            <div className="zoom-image" style={zoomImage} >
                <div className="image" style={image}></div>
            </div>
        </div>
    );
}

export default WrapperImage;