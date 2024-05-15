import { BsChevronRight, BsCheck } from "react-icons/bs";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { useEffect, useState } from "react";
import ProductCard from "../Home/ProductCard";
import { fetchBrandAPI, fetchProductAPI, getCategoryBySlugAPI } from "../../apis";
import PaginationRounded from "../../components/Pagination";
import queryString from "query-string";
import CheckBox from '../../components/Checkbox'

const ProductList = () => {
    const [brand, setBrand] = useState()
    const [brandAPI, setBrandAPI] = useState([])
    const [product, setProduct] = useState()
    const [page, setPage] = useState(0)
    const [category, setCategory] = useState()
    // const [page, setPage] = useState(0)
    const [pageNumbers, setPageNumbers] = useState(0)
    const navigate = useNavigate()
    const slug = useParams();
    const location = useLocation();
    // console.log('page-ngoài: ', page)

    useEffect(() => {
        getCategoryBySlugAPI(slug.name).then((dataRes) => {
            setCategory(dataRes.data)
        })
        fetchBrandAPI().then((dataRes) => {
            const brandList = dataRes.data.map(brand => ({ ...brand, checked: false }))
            console.log('dataRes: ', brandList)
            setBrand(brandList)
        })
        fetchProductAPI(slug.name, location.search).then((dataRes) => {
            setProduct(dataRes.data)
            setPageNumbers(dataRes.totalPage)
            // setBrand(dataRes.brandName)
        })
    // console.log('vào 1: ', location.search)
        setPage(1)
    }, [slug.name])
    // console.log('slug: ', slug)
    // console.log('location: ', location)
    // console.log('brand: ', brand)
    useEffect(() => {
        fetchProductAPI(slug.name, location.search).then((dataRes) => {
            console.log('dataRes: ', dataRes.data)
            setProduct(dataRes.data)
            setPageNumbers(dataRes.totalPage)
        })
    // console.log('vào 2: ', location.search)

    }, [location.search])

    // brandAPI
    useEffect(() => {
        const query = queryString.parse(location.search)

        console.log('query: ', query)

        if (brandAPI.length > 0) {
            query.brands = brandAPI.join(',')
            query.page = 1
        }
        else{
            delete query.brands
            delete query.page
        }
        // console.log('brandAPI: ', brandAPI)
        // console.log('query: ', queryString.stringify(query))
        // console.log('slug.name: ', slug.name)
        // console.log('query: ', queryString.stringify(query))

        navigate(`/product/${slug.name}?${queryString.stringify(query)}`)

    }, [brandAPI])

    const updateCheckStatusBrand = (id) => {
        console.log('onChange')
        // const query = queryString.parse(location.search)

        setBrand(brand => {
            const brandListNew = brand.map(item =>
                item._id === id ? { ...item, checked: !item.checked } : item
            )

            let brands = []
            brandListNew.forEach(item => {
                if (item.checked === true) brands.push(item.name)
            })
            console.log('brands: ', brands)

            setBrandAPI(brands)
            // query.brand = brands
            // console.log('query: ', query)

            return brandListNew
        })
        setPage(1)

        // navigate(`/product/${slug.name}?${queryString.stringify(query)}`)

    }

    const handleChangePage = (e, page) => {
        setPage(page)
        console.log('page: ', page)
        const query = queryString.parse(location.search)
        query.page = page
        // console.log('location: ', location.search)
        // console.log('query: ', query)
        console.log('e: ', e)
        navigate(`/product/${slug.name}?${queryString.stringify(query)}`)
    }

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
                                                    <input onChange={() => updateCheckStatusBrand(data._id)} checked={data.checked} type="checkbox" id={data.name} name={data.name} className=" w-[15px] h-[15px] cursor-pointer" />
                                                    {/* <BsCheck className="absolute top-0 left-[-3px] w-[20px] h-[20px] text-[#ff2d37] " /> */}
                                                    <label htmlFor={data.name} className="text-[14px] pl-[8px] w-full cursor-pointer select-none">{data.name}</label>
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
                                        <input type="checkbox" id="1" className=" w-[15px] h-[15px] cursor-pointer" />
                                        {/* <BsCheck className="absolute top-0 left-[-3px] w-[20px] h-[20px] text-[#ff2d37] " /> */}
                                        <label htmlFor="1" className="text-[14px] pl-[8px] cursor-pointer select-none">Giá dưới 100.000đ</label>
                                    </div>
                                    <div className="flex items-center relative flex-1 ">
                                        <input type="checkbox" id="2" className=" w-[15px] h-[15px] cursor-pointer" />
                                        {/* <BsCheck className="absolute top-0 left-[-3px] w-[20px] h-[20px] text-[#ff2d37] " /> */}
                                        <label htmlFor="2" className="text-[14px] pl-[8px] cursor-pointer select-none">100.000đ - 200.000đ</label>
                                    </div>
                                    <div className="flex items-center relative flex-1 ">
                                        <input type="checkbox" id="3" className=" w-[15px] h-[15px] cursor-pointer" />
                                        {/* <BsCheck className="absolute top-0 left-[-3px] w-[20px] h-[20px] text-[#ff2d37] " /> */}
                                        <label htmlFor="3" className="text-[14px] pl-[8px] cursor-pointer select-none">200.000đ - 300.000đ</label>
                                    </div>
                                    <div className="flex items-center relative flex-1 ">
                                        <input type="checkbox" id="4" className=" w-[15px] h-[15px] cursor-pointer" />
                                        {/* <BsCheck className="absolute top-0 left-[-3px] w-[20px] h-[20px] text-[#ff2d37] " /> */}
                                        <label htmlFor="4" className="text-[14px] pl-[8px] cursor-pointer select-none">300.000đ - 500.000đ</label>
                                    </div>
                                    <div className="flex items-center relative flex-1 ">
                                        <input type="checkbox" id="5" className=" w-[15px] h-[15px] cursor-pointer" />
                                        {/* <BsCheck className="absolute top-0 left-[-3px] w-[20px] h-[20px] text-[#ff2d37] " /> */}
                                        <label htmlFor="5" className="text-[14px] pl-[8px] cursor-pointer select-none">500.000đ - 1.000.000đ</label>
                                    </div>
                                    <div className="flex items-center relative flex-1 ">
                                        <input type="checkbox" id="6" className=" w-[15px] h-[15px] cursor-pointer" />
                                        {/* <BsCheck className="absolute top-0 left-[-3px] w-[20px] h-[20px] text-[#ff2d37] " /> */}
                                        <label htmlFor="6" className="text-[14px] pl-[8px] cursor-pointer select-none">Giá trên 1.000.000đ</label>
                                    </div>
                                </div>
                            </div>

                            {/* Color */}
                            <div className="leading-[40px] text-[14px] font-bold mt-[24px]">THEO KÍCH CỠ</div>
                            <div className="flex flex-wrap gap-x-[20px] gap-y-[10px] px-[15px] pb-[15px] pt-[6px] border border-solid border-[#ebebeb] ">
                                <div className="flex items-center relative ">
                                    <input type="checkbox" id="" name="" className=" w-[15px] h-[15px] cursor-pointer" />
                                    <label htmlFor="Hura" className="text-[14px] pl-[8px] cursor-pointer select-none">38</label>
                                </div>
                                <div className="flex items-center relative ">
                                    <input type="checkbox" id="" name="" className=" w-[15px] h-[15px] cursor-pointer" />
                                    <label htmlFor="Hura" className="text-[14px] pl-[8px] cursor-pointer select-none">39</label>
                                </div>
                                <div className="flex items-center relative ">
                                    <input type="checkbox" id="" name="" className=" w-[15px] h-[15px] cursor-pointer" />
                                    <label htmlFor="Hura" className="text-[14px] pl-[8px] cursor-pointer select-none">40</label>
                                </div>
                                <div className="flex items-center relative ">
                                    <input type="checkbox" id="" name="" className=" w-[15px] h-[15px] cursor-pointer" />
                                    <label htmlFor="Hura" className="text-[14px] pl-[8px] cursor-pointer select-none">41</label>
                                </div>
                                <div className="flex items-center relative ">
                                    <input type="checkbox" id="" name="" className=" w-[15px] h-[15px] cursor-pointer" />
                                    <label htmlFor="Hura" className="text-[14px] pl-[8px] cursor-pointer select-none">42</label>
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
                            <PaginationRounded page={page}  pageNumbers={pageNumbers} handleChangePage={handleChangePage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default ProductList