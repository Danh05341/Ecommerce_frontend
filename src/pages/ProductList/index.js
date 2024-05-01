import { BsChevronRight, BsCheck } from "react-icons/bs";

import { Link, useLocation, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { useEffect, useState } from "react";
import ProductCard from "../Home/ProductCard";
import { fetchBrandAPI, fetchProductAPI, getCategoryBySlugAPI } from "../../apis";
import PaginationRounded from "../../components/Pagination";


const ProductList = () => {
    const [brand, setBrand] = useState()
    const [product, setProduct] = useState()
    const [category, setCategory] = useState()
    const slug = useParams();
    useEffect(() => {
        getCategoryBySlugAPI(slug.name).then((dataRes) => {
            setCategory(dataRes.data)
        })
        fetchBrandAPI().then((dataRes) => {
            setBrand(dataRes.data)
        })
        fetchProductAPI(slug.name).then((dataRes) => {
            setProduct(dataRes.data)
        })
    }, [slug])
    // useEffect(() => {
        
    // }, [])
    return (
        <div className="w-full h-[100vh] bg-white flex">
            <div className="w-[1200px]  m-auto">
                <div className="mx-[15px] bg-white  ">
                    {/* Breakcumb */}
                    <div className='w-full px-[15px] mt-[24px] ml-[20px]'>
                        <Link to='/'>
                            <li className="list-none inline cursor-pointer  text-[14px] hover:text-[#ff2d37]">Trang chủ</li>
                        </Link>
                        <BsChevronRight className='text-[10px] font-bold w-[30px] h-[10px] inline' />
                        <Link to='/'>
                            <li className="list-none inline cursor-pointer  text-[14px] hover:text-[#ff2d37]">Sneaker nổi bật</li>
                        </Link>
                        <BsChevronRight className='text-[10px] font-bold w-[30px] h-[10px] inline' />
                        <li className="list-none inline cursor-text text-[#ff2d37] text-[14px]">Tất cả sản phẩm</li>
                    </div>
                    {
                        slug.name === 'all' ? (
                            <div className="text-[24px] font-bold text-[#ff2d37] leading-[38px] text-center mt-[8px]">
                                Tất cả sản phẩm
                            </div>
                        ) : (
                            <div className="text-[24px] font-bold text-[#ff2d37] leading-[38px] text-center mt-[8px]">
                                {category?.name}
                            </div>
                        )
                    }


                    <div className="flex mt-[20px] ">
                        <div className="w-[300px] px-[15px] h-[10000px]">
                            <div className="leading-[40px] text-[14px] font-bold">DANH MỤC SẢN PHẨM</div>
                            <div className="px-[15px] pb-[15px] pt-[6px] border border-solid border-[#ebebeb]">
                                <SideBar />
                            </div>
                            {/* Thương hiệu */}
                            <div className="leading-[40px] text-[14px] font-bold mt-[24px]">THƯƠNG HIỆU</div>
                            <div className="px-[15px] pb-[15px] pt-[6px] border border-solid border-[#ebebeb] ">
                                <div className="flex flex-col gap-[15px] mt-[9px] max-h-[245px] overflow-y-auto scrollbar-thin">
                                    {
                                        brand?.map((data, index) => {
                                            return (
                                                <div key={index} className="flex items-center relative flex-1 ">
                                                    <input type="checkbox" id={data.name} name={data.name} className=" w-[15px] h-[15px] " />
                                                    {/* <BsCheck className="absolute top-0 left-[-3px] w-[20px] h-[20px] text-[#ff2d37] " /> */}
                                                    <label htmlFor={data.name} className="text-[14px] ml-[8px]">{data.name}</label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {/* Giá */}
                            <div className="leading-[40px] text-[14px] font-bold mt-[24px]">MỨC GIÁ</div>
                            <div className="px-[15px] pb-[15px] pt-[6px] border border-solid border-[#ebebeb] ">
                                <div className="flex flex-col gap-[15px] mt-[9px]  overflow-y-auto scrollbar-thin">
                                    <div className="flex items-center relative flex-1 ">
                                        <input type="checkbox" id=" name=" className=" w-[15px] h-[15px] " />
                                        {/* <BsCheck className="absolute top-0 left-[-3px] w-[20px] h-[20px] text-[#ff2d37] " /> */}
                                        <label htmlFor="Hura" className="text-[14px] ml-[8px]">Giá dưới 100.000đ</label>
                                    </div>
                                    <div className="flex items-center relative flex-1 ">
                                        <input type="checkbox" id=" name=" className=" w-[15px] h-[15px] " />
                                        {/* <BsCheck className="absolute top-0 left-[-3px] w-[20px] h-[20px] text-[#ff2d37] " /> */}
                                        <label htmlFor="Hura" className="text-[14px] ml-[8px]">100.000đ - 200.000đ</label>
                                    </div>
                                    <div className="flex items-center relative flex-1 ">
                                        <input type="checkbox" id=" name=" className=" w-[15px] h-[15px] " />
                                        {/* <BsCheck className="absolute top-0 left-[-3px] w-[20px] h-[20px] text-[#ff2d37] " /> */}
                                        <label htmlFor="Hura" className="text-[14px] ml-[8px]">200.000đ - 300.000đ</label>
                                    </div>
                                    <div className="flex items-center relative flex-1 ">
                                        <input type="checkbox" id=" name=" className=" w-[15px] h-[15px] " />
                                        {/* <BsCheck className="absolute top-0 left-[-3px] w-[20px] h-[20px] text-[#ff2d37] " /> */}
                                        <label htmlFor="Hura" className="text-[14px] ml-[8px]">300.000đ - 500.000đ</label>
                                    </div>
                                    <div className="flex items-center relative flex-1 ">
                                        <input type="checkbox" id=" name=" className=" w-[15px] h-[15px] " />
                                        {/* <BsCheck className="absolute top-0 left-[-3px] w-[20px] h-[20px] text-[#ff2d37] " /> */}
                                        <label htmlFor="Hura" className="text-[14px] ml-[8px]">500.000đ - 1.000.000đ</label>
                                    </div>
                                    <div className="flex items-center relative flex-1 ">
                                        <input type="checkbox" id=" name=" className=" w-[15px] h-[15px] " />
                                        {/* <BsCheck className="absolute top-0 left-[-3px] w-[20px] h-[20px] text-[#ff2d37] " /> */}
                                        <label htmlFor="Hura" className="text-[14px] ml-[8px]">Giá trên 1.000.000đ</label>
                                    </div>
                                </div>
                            </div>

                            {/* Color */}
                            <div className="leading-[40px] text-[14px] font-bold mt-[24px]">THEO KÍCH CỠ</div>
                            <div className="flex flex-wrap gap-x-[20px] gap-y-[10px] px-[15px] pb-[15px] pt-[6px] border border-solid border-[#ebebeb] ">
                                <div className="flex items-center relative ">
                                    <input type="checkbox" id="" name="" className=" w-[15px] h-[15px] " />
                                    <label htmlFor="Hura" className="text-[14px] ml-[8px]">38</label>
                                </div>
                                <div className="flex items-center relative ">
                                    <input type="checkbox" id="" name="" className=" w-[15px] h-[15px] " />
                                    <label htmlFor="Hura" className="text-[14px] ml-[8px]">39</label>
                                </div>
                                <div className="flex items-center relative ">
                                    <input type="checkbox" id="" name="" className=" w-[15px] h-[15px] " />
                                    <label htmlFor="Hura" className="text-[14px] ml-[8px]">40</label>
                                </div>
                                <div className="flex items-center relative ">
                                    <input type="checkbox" id="" name="" className=" w-[15px] h-[15px] " />
                                    <label htmlFor="Hura" className="text-[14px] ml-[8px]">41</label>
                                </div>
                                <div className="flex items-center relative ">
                                    <input type="checkbox" id="" name="" className=" w-[15px] h-[15px] " />
                                    <label htmlFor="Hura" className="text-[14px] ml-[8px]">42</label>
                                </div>
                            </div>

                        </div>
                        <div className="w-[900px] px-[15px]">
                            <div className="text-[14px] flex items-center border-b pb-[20px] border-solid border-[#ebebeb]">
                                <span className=" font-bold ">Sắp xếp:</span>
                                <div className="ml-[30px] inline-block">
                                    <div className="inline-flex ml-[20px] items-center hover:text-[#ff2d37] ">
                                        <input type="checkbox" className="w-[14px] h-[14px] cursor-pointer" name="increase" id="increase" />
                                        <label htmlFor="increase" className="ml-[6px] cursor-pointer">Giá tăng dần</label>
                                    </div>
                                    <div className="inline-flex ml-[20px] items-center hover:text-[#ff2d37] ">
                                        <input type="checkbox" className="w-[14px] h-[14px] cursor-pointer" name="decrease" id="decrease" />
                                        <label htmlFor="decrease" className="ml-[6px] cursor-pointer">Giá giảm dần</label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-x-[15px] gap-y-[20px]  w-[870px] mt-[20px]">
                                <ProductCard products={product} />
                            </div>
                            <PaginationRounded productCount={product?.length}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default ProductList