import { useState, useEffect } from 'react'
import banner1 from '../../assets/images/banner_project_1.webp'
import banner2 from '../../assets/images/banner_project_2.webp'
import banner3 from '../../assets/images/banner_project_3.webp'
import banner4 from '../../assets/images/banner_project_4.webp'
import banner5 from '../../assets/images/banner_project_5.webp'

const Banner = () => {
    const [banners, setBanners] = useState()
    useEffect(() => {
        const fetchApi = async () => {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}banner`)
            const dataRes = await fetchData.json()
            setBanners(dataRes.data)
        }
        fetchApi()
    }, [])
    return (
        <div className='w-full flex flex-wrap gap-[17px] justify-center custom:justify-between  mt-[30px] mb-[38px]'>
            {
                banners ? (
                    banners.map((banner, index) => {
                        return (
                            <div key={index} className="h-[271px] relative flex justify-center">
                                <img src={banner.image_url} alt='banner' className='h-full overflow-hidden ' />
                                <div className='absolute text-white bottom-[50px] font-bold'>
                                    <span className='text-[30px] hover:text-[#ff2d37] cursor-pointer'>{banner.name}</span>
                                    <p className='text-[16px] text-center normal-case font-[400]'>8 Sản phẩm</p>
                                </div>
                            </div>
                        )
                    })
                ) : <></>
            }
        </div>

    )
}

export default Banner