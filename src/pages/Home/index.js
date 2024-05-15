import Slider from '../../components/Slider';
import slider1 from '../../assets/images/slider_1.webp'
import Category from './Category';
import { BsChevronRight } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
// import { setDataProduct } from '../../redux/productSlice';

import banner1 from '../../assets/images/banner_project_1.webp'
import banner2 from '../../assets/images/banner_project_2.webp'
import ProductCard from './ProductCard';
import sneaker from '../../assets/images/sneaker_section.webp'
import slipon from '../../assets/images/slipon_section.webp'
import category from '../../assets/images/category_section.webp'
import SideBar from '../../components/SideBar';
import { useEffect, useState } from 'react';

const Home = () => {
	// const dispatch = useDispatch()
	const [hotProduct, setHotProduct] = useState()
	
    useEffect(() => {
        const getProductsHot = async() => {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}product/all`)
            const dataRes = await fetchData.json()
			setHotProduct(dataRes)
            // dispatch(setDataProduct(dataRes))
        }
        getProductsHot()
    }, [])
    

	return (
		<div>
			<Slider slider={slider1} />
			{/*Section Category Banner */}
			<Category />
			{/* Sản phẩm bán chạy */}
			<section className='flex w-full '>
				<div className="w-[1200px] m-auto ">
					<div className="mx-[15px] bg-white shadow-lg ">
						<div className='w-full text-center p-[20px]'>
							<span className="text-[28px] text-[#282828] uppercase font-[400] cursor-pointer hover:text-[#ff2d37]">Sản phẩm bán chạy</span>
						</div>
						<div className="flex px-[15px] gap-[15px] pb-[30px]  overflow-auto">
							<ProductCard products={hotProduct?.data?.filter((product)=>product.category !== "Sneaker nổi bật" && product.category !== "Slip-on nổi bật")}/>
						</div>
					</div>
				</div>
			</section>
			{/* Sneaker */}
			<section className='flex w-full mt-[40px] '>
				<div className="w-[1200px] m-auto ">
					<div className="mx-[15px] bg-white flex flex-col shadow-lg">
						{/* top-section */}
						<div className='flex'>
							<img src={sneaker} alt='sneaker' className='max-w-[470px]'></img>
							<div className='pl-[70px] pt-[28px] pr-[40px]'>
								<div className='w-full mb-[27px]'>
									<span className="text-[28px] text-[#282828] uppercase font-[400] cursor-pointer hover:text-[#ff2d37]">Sneaker năng động</span>
								</div>
								<p className='text-[14px] text-[#282828] leading-[24px]'>
									Sneaker đã trở thành một biểu tượng của xã hội, là một sản phẩm của thời đại với những thiết kế cổ điển và những điều đó đều nằm trong những đôi giày Sneaker Delta Shoes. Không lỗi thời với thời gian, mang dấu ấn cá tính khác biệt và tạo mọi sự lôi cuốn từ chính đôi giày Sneaker. Tự tạo cuộc chơi, tự tạo phong cách, đó là Delta Shoes
								</p>
								<div className='inline-block uppercase text-[20px] mt-[15px] cursor-pointer hover:text-[#ff2d37] '>
									<span className=''>Xem tất cả</span>
									<BsChevronRight className='mx-[4px] mb-[4px] inline-block' />
								</div>
							</div>
						</div>
						{/* bot-section */}
						<div className="flex px-[15px] gap-[15px] pb-[30px] mt-[15px]">
							<ProductCard products={hotProduct?.data?.filter((product)=>product.category === "Sneaker nổi bật")}/>
						</div>
					</div>
				</div>
			</section>
			{/* Slip on thanh lịch */}
			<section className='flex w-full mt-[40px]'>
				<div className="w-[1200px] m-auto ">
					<div className="mx-[15px] bg-white flex flex-col shadow-lg">
						{/* top-seaction */}
						<div className='flex'>
							<div className='pr-[70px] pt-[28px] pl-[40px]'>
								<div className='w-full mb-[27px]'>
									<span className="text-[28px] text-[#282828] uppercase font-[400] cursor-pointer hover:text-[#ff2d37]">SLIP-ON THANH LỊCH</span>
								</div>
								<p className='text-[14px] text-[#282828] leading-[24px]'>
									Ra đời từ thế kỉ XX, từ sự tiện dụng cho đến biểu tượng của phong cách casual. Giày lười Delta Shoes là một trong những đại diện của sự chững chạc trong thời trang, là xu hướng của thế giới thời trang tối giản. Đồng hành cùng Delta Shoes là đồng hành với chuẩn mực của chính bạn.
								</p>
								<div className='inline-block uppercase text-[20px] mt-[15px] cursor-pointer hover:text-[#ff2d37] '>
									<span className=''>Xem tất cả</span>
									<BsChevronRight className='mx-[4px] mb-[4px] inline-block' />
								</div>
							</div>

							<img src={slipon} alt='slipon' className='max-w-[470px]'></img>
						</div>
						{/* bot-section */}
						<div className="flex px-[15px] gap-[15px] pb-[30px] mt-[15px]">
							<ProductCard products={hotProduct?.data?.filter((product)=>product.category === "Slip-on nổi bật")}/>
						</div>
					</div>
				</div>
			</section>
			{/* Danh mục tất cả sản phẩm */}
			<section className='flex w-full mt-[40px]'>
				<div className="w-[1200px] m-auto ">
					<div className="mx-[15px] bg-white flex flex-col shadow-lg">
						{/* banner */}
						<img src={category} alt='category' className='w-full' />
						{/* body */}
						<div className='my-[15px] flex'>
							{/* left section */}
							<div className='w-[282px] px-[15px]'>
								<p className='uppercase text-[28px] mb-[24px]'>Danh mục</p>
								{/* SideBar */}
								<div className=' '>
									<SideBar />
								</div>
							</div>
							{/* right section */}
							<div className='w-[888px] flex flex-col justify-between'>
								<div className="flex flex-wrap  px-[15px] gap-[15px] flex-1">
									<ProductCard products={hotProduct?.data}/>
										
								</div>
								<div className='flex mt-[15px]'>
									<a className='text-white m-auto inline-block cursor-pointer px-[25px] w-[124px]  h-[35px] bg-[#ff2d37]'>
										<span className='h-[35px] leading-[35px] text-[14px] font-bold'>Xem tất cả</span>
										<BsChevronRight/>
									</a>
								</div>
							</div>


						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;