import { useEffect, useState } from 'react'
import slider1 from '../assets/images/slider_1.webp'

const Slider = (props) => {
    const [slider, setSlider] = useState()

    useEffect(() => {
        const fetchApi = async () => {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}slider`)
            const dataRes = await fetchData.json()
            setSlider(dataRes.data[0].image_url)
        }
        fetchApi()
    }, [])
    return (
        <div className='w-full flex'>
            <img src={slider} alt='slider' className='m-auto' />
        </div>
    )
}

export default Slider