import banner1 from '../../assets/images/banner_project_1.webp'
import banner2 from '../../assets/images/banner_project_2.webp'
import banner3 from '../../assets/images/banner_project_3.webp'
import banner4 from '../../assets/images/banner_project_4.webp'
import banner5 from '../../assets/images/banner_project_5.webp'

const Banner = () => {
  return (
    <div className='w-full  flex flex-wrap gap-[17px] justify-center custom:justify-between  mt-[30px] mb-[38px]'>
        <div className="h-[271px] relative flex justify-center">
          <img src={banner1} alt='banner' className='h-full overflow-hidden '/>
          <div className='absolute text-white bottom-[50px] font-bold'>
            <span className='text-[30px] hover:text-[#ff2d37] cursor-pointer'>Giày Nike Jordan</span>
            <p className='text-[16px] text-center normal-case font-[400]'>8 Sản phẩm</p>
          </div>
        </div>
        <div className="h-[271px] relative flex justify-center">
          <img src={banner2} alt='banner' className=' h-full overflow-hidden'/>
          <div className='absolute text-white bottom-[50px] font-bold'>
            <span className='text-[30px] hover:text-[#ff2d37] cursor-pointer'>Giày Nike Jordan</span>
            <p className='text-[16px] text-center normal-case font-[400]'>8 Sản phẩm</p>
          </div>
        </div>
        <div className="h-[271px] relative flex justify-center">
          <img src={banner3} alt='banner' className=' h-full overflow-hidden'/>
          <div className='absolute text-white bottom-[50px] font-bold'>
            <span className='text-[30px] hover:text-[#ff2d37] cursor-pointer'>Giày Nike Jordan</span>
            <p className='text-[16px] text-center normal-case font-[400]'>8 Sản phẩm</p>
          </div>
        </div>
        <div className="h-[271px] relative flex justify-center">
          <img src={banner4} alt='banner' className=' h-full overflow-hidden'/>
          <div className='absolute text-white bottom-[50px] font-bold'>
            <span className='text-[30px] hover:text-[#ff2d37] cursor-pointer'>Giày Nike Jordan</span>
            <p className='text-[16px] text-center normal-case font-[400]'>8 Sản phẩm</p>
          </div>
        </div>
        <div className="h-[271px] relative flex justify-center">
          <img src={banner5} alt='banner' className=' h-full overflow-hidden'/>
          <div className='absolute text-white bottom-[50px] font-bold'>
            <span className='text-[30px] hover:text-[#ff2d37] cursor-pointer'>Giày Nike Jordan</span>
            <p className='text-[16px] text-center normal-case font-[400]'>8 Sản phẩm</p>
          </div>
        </div>
    </div>
    
  )
}

export default Banner