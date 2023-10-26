// import React, { useEffect, useRef, useState } from "react";
// import { useSelector } from "react-redux";
// import CardFeature from "../component/CardFeature";
// import HomeCard from "../components/HomeCard";
// import { GrPrevious, GrNext } from "react-icons/gr";
// import FilterProduct from "../components/FilterProduct";
// import AllProduct from "../component/AllProduct";
import Slider from '../../components/Slider';
import slider1 from '../../assets/images/slider_1.webp'
import Category from './Category';
import { BsChevronRight } from "react-icons/bs";


import banner1 from '../../assets/images/banner_project_1.webp'
import banner2 from '../../assets/images/banner_project_2.webp'
import ProductCard from './ProductCard';
import sneaker from '../../assets/images/sneaker_section.webp'
import slipon from '../../assets/images/slipon_section.webp'
import category from '../../assets/images/category_section.webp'
import SideBar from '../../components/SideBar';

const Home = () => {
	// const productData = useSelector((state) => state.product.data);
	// const homeProductCartList = productData.slice(1, 5);
	// const homeProductCartListVegetables = productData.filter(
	//   (el) => el.category === "vegetable",
	//   []
	// );
	// const loadingArray = new Array(4).fill(null);
	// const loadingArrayFeature = new Array(10).fill(null);

	// const slideProductRef = useRef();
	// const nextProduct = () => {
	//   slideProductRef.current.scrollLeft += 200;
	// };
	// const preveProduct = () => {
	//   slideProductRef.current.scrollLeft -= 200;
	// };

	return (
		// <div className="p-2 md:p-4">
		//   <div className="md:flex gap-4 py-2">
		//     <div className="md:w-1/2">
		//       <div className="flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full">
		//         <p className="text-sm font-medium text-slate-900">Bike Delivery</p>
		//         <img
		//           src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
		//           className="h-7"
		//         />
		//       </div>
		//       <h2 className="text-4xl md:text-7xl font-bold py-3">
		//         The Fasted Delivery in{" "}
		//         <span className="text-red-600 text-">Your Home</span>
		//       </h2>
		//       <p className="py-3 text-base ">
		//         Lorem Ipsum is simply dummy text of the printing and typesetting
		//         industry. Lorem Ipsum has been the industry's standard dummy text
		//         ever since the 1500s, when an unknown printer took a galley of type
		//         and scrambled it to make a type specimen book. It has survived not
		//         only five centuries
		//       </p>
		//       <button className="font-bold bg-red-500 text-slate-200 px-4 py-2 rounded-md">
		//         Order Now
		//       </button>
		//     </div>

		//     <div className="md:w-1/2 flex flex-wrap gap-5 p-4 justify-center">
		//       {homeProductCartList[0]
		//         ? homeProductCartList.map((el) => {
		//             return (
		//               <HomeCard
		//                 key={el._id}
		//                 id={el._id}
		//                 image={el.image}
		//                 name={el.name}
		//                 price={el.price}
		//                 category={el.category}
		//               />
		//             );
		//           })
		//         : loadingArray.map((el, index) => {
		//             return <HomeCard key={index+"loading"} loading={"Loading..."} />;
		//           })}
		//     </div>
		//   </div>

		//   <div className="">
		//     <div className="flex w-full items-center">
		//       <h2 className="font-bold text-2xl text-slate-800 mb-4">
		//         Fresh Vegetables
		//       </h2>
		//       <div className="ml-auto flex gap-4">
		//         <button
		//           onClick={preveProduct}
		//           className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
		//         >
		//           <GrPrevious />
		//         </button>
		//         <button
		//           onClick={nextProduct}
		//           className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
		//         >
		//           <GrNext />
		//         </button>
		//       </div>
		//     </div>
		//     <div
		//       className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
		//       ref={slideProductRef}
		//     >
		//       {homeProductCartListVegetables[0]
		//         ? homeProductCartListVegetables.map((el) => {
		//             return (
		//               <CardFeature
		//                 key={el._id+"vegetable"}
		//                 id={el._id}
		//                 name={el.name}
		//                 category={el.category}
		//                 price={el.price}
		//                 image={el.image}
		//               />
		//             );
		//           })
		//         : loadingArrayFeature.map((el,index) => (
		//             <CardFeature loading="Loading..." key={index+"cartLoading"} />
		//           ))}
		//     </div>
		//   </div>

		//   <AllProduct heading={"Your Product"}/>
		// </div>
		<div>
			<Slider slider={slider1} />
			{/* Category Banner */}
			<Category />
			{/* Sản phẩm bán chạy */}
			<section className='flex w-full '>
				<div className="w-[1200px] m-auto ">
					<div className="mx-[15px] bg-white shadow-lg ">
						<div className='w-full text-center p-[20px]'>
							<span className="text-[28px] text-[#282828] uppercase font-[400] cursor-pointer hover:text-[#ff2d37]">Sản phẩm bán chạy</span>
						</div>
						<div className="flex px-[15px] gap-[15px] pb-[30px]">
							<ProductCard />
						</div>
					</div>
				</div>
			</section>
			{/* Sneaker */}
			<section className='flex w-full mt-[40px] '>
				<div className="w-[1200px] m-auto ">
					<div className="mx-[15px] bg-white flex flex-col shadow-lg">
						{/* top-seaction */}
						<div className='flex'>
							<img src={sneaker} alt='sneaker' className='max-w-[470px]'></img>
							<div className='pl-[70px] pt-[28px] pr-[40px]'>
								<div className='w-full mb-[27px]'>
									<span className="text-[28px] text-[#282828] uppercase font-[400] cursor-pointer hover:text-[#ff2d37]">Sản phẩm bán chạy</span>
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
							<ProductCard />
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
									<span className="text-[28px] text-[#282828] uppercase font-[400] cursor-pointer hover:text-[#ff2d37]">Sản phẩm bán chạy</span>
								</div>
								<p className='text-[14px] text-[#282828] leading-[24px]'>
									Sneaker đã trở thành một biểu tượng của xã hội, là một sản phẩm của thời đại với những thiết kế cổ điển và những điều đó đều nằm trong những đôi giày Sneaker Delta Shoes. Không lỗi thời với thời gian, mang dấu ấn cá tính khác biệt và tạo mọi sự lôi cuốn từ chính đôi giày Sneaker. Tự tạo cuộc chơi, tự tạo phong cách, đó là Delta Shoes
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
							<ProductCard />
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
								<div className="flex flex-wrap  px-[15px] gap-[15px] ">
									<ProductCard />
									
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