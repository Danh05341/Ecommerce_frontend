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
                            <div key={index} className="h-[271px] overflow-hidden relative flex justify-center   group/banner">
                                <img src={banner.image_url} alt='banner' className='h-full transition ease-in-out duration-[300ms] group-hover/banner:scale-[1.12]' />
                                <div className='absolute text-white bottom-[35px] font-bold'>
                                    <span className='text-[30px] hover:text-[#ff2d37] inline-block cursor-pointer translate-y-[5px] transition duration-[400ms] group-hover/banner:translate-y-0'>{banner.name}</span>
                                    <p className='text-[16px] text-center normal-case font-[400] transition ease-in-out duration-[400ms] translate-y-[50px] opacity-0 group-hover/banner:translate-y-0 group-hover/banner:opacity-100'>8 Sản phẩm</p>
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