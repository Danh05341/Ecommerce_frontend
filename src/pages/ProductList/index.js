import { BsChevronRight } from "react-icons/bs";

import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { useEffect, useState } from "react";
import ProductCard from "../Home/ProductCard";
import { fetchProductAPI, getCategoryBySlugAPI } from "../../apis";
import PaginationRounded from "../../components/Pagination";
import queryString from "query-string";
import { Box } from "@mui/material";

const ProductList = () => {
    const [brand, setBrand] = useState()
    const [brandAPI, setBrandAPI] = useState([])
    const [product, setProduct] = useState()
    const [page, setPage] = useState(0)
    const [category, setCategory] = useState()
    const [pageNumbers, setPageNumbers] = useState(0)
    const navigate = useNavigate()
    const slug = useParams();
    const location = useLocation();
    const [sizes, setSizes] = useState([])
    const [search, setSearch] = useState('')
    useEffect(() => {
        setBrand(brand.map(brand => ({ ...brand, checked: false })))
        setPrice(price.map(item => ({ ...item, checked: false })))
        setSizes(sizes.map(item => ({ ...item, checked: false })))
        setCheckAscDesc({ ascending: false, descending: false })
    }, [search])
    const [checkAscDesc, setCheckAscDesc] = useState({
        ascending: false,
        descending: false
    })
    const [price, setPrice] = useState([
        { id: 1, minPrice: '0', maxPrice: '100.000', value: 'Dưới 100.000', checked: false },
        { id: 2, minPrice: '100.000', maxPrice: '200.000', value: '100.000 - 200.000', checked: false },
        { id: 3, minPrice: '200.000', maxPrice: '300.000', value: '200.000 - 300.000', checked: false },
        { id: 4, minPrice: '300.000', maxPrice: '500.000', value: '300.000 - 500.000', checked: false },
        { id: 5, minPrice: '500.000', maxPrice: '1.000.000', value: '500.000 - 1.000.000', checked: false },
        { id: 6, minPrice: '1.000.000', maxPrice: '999.999.999.999', value: 'Trên 1.000.000', checked: false }
    ])

    useEffect(() => {
        // Lọc ra các mục đã được chọn
        const selectedPrices = price?.filter(item => item.checked === true);
        const query = queryString.parse(location.search)
        query.page = 1
        // 
        setPage(1)
        // Nếu không có mục nào được chọn, không cần gọi API
        if (selectedPrices?.length === 0) {
            delete query.minPrice
            delete query.maxPrice

            navigate(`/product/${slug.name}?${queryString.stringify(query)}`)
            return
        };

        // Tìm giá trị minPrice nhỏ nhất và maxPrice lớn nhất
        const minPrice = Math.min(...selectedPrices?.map(item => item.minPrice.replace(/\./g, '')));
        const maxPrice = Math.max(...selectedPrices?.map(item => item.maxPrice.replace(/\./g, '')));


        // Gọi API với giá trị minPrice và maxPrice
        query.minPrice = minPrice
        query.maxPrice = maxPrice
        navigate(`/product/${slug.name}?${queryString.stringify(query)}`)
    }, [price])
    const handleChangePrice = (id) => {
        setPrice(prevState => {
            const newPrice = prevState.map(
                item => item.id === id ? { ...item, checked: !item.checked } : { ...item }
            )

            return newPrice
        })
    }
    const handleChangeSizeAPI = (sizes) => {
        let newSizeAPI = []
        const query = queryString.parse(location.search)
        sizes.forEach(size => {
            if (size.checked === true) newSizeAPI.push(size.size)
        })
        if (newSizeAPI.length === 0) {
            delete query.size
            navigate(`/product/${slug.name}?${queryString.stringify(query)}`)
            return
        }
        query.size = newSizeAPI.join(',')
        query.page = 1

        setPage(1)
        navigate(`/product/${slug.name}?${queryString.stringify(query)}`)
    }
    const handleChangeSize = (id) => {
        let newSizes
        setSizes(prevState => {
            newSizes = prevState.map(size => size.size === id ?
                { ...size, checked: !size.checked } :
                { ...size })
            handleChangeSizeAPI(newSizes)
            return newSizes
        })
    }

    const handleChangeAscDesc = (status) => {
        // chỉ 1 status được chọn
        setCheckAscDesc(prevState => {
            if (prevState[status]) {
                const query = queryString.parse(location.search)
                query.page = 1
                setPage(1)
                delete query.sort

                navigate(`/product/${slug.name}?${queryString.stringify(query)}`)
                return {
                    ascending: false,
                    descending: false
                }
            }
            const query = queryString.parse(location.search)
            query.page = 1
            setPage(1)

            query.sort = status
            navigate(`/product/${slug.name}?${queryString.stringify(query)}`)
            return {
                ascending: status === 'ascending',
                descending: status === 'descending'
            };
        })
    }
    useEffect(() => {
        getCategoryBySlugAPI(slug.name).then((dataRes) => {
            setCategory(dataRes.data)
        })
        // fetchBrandAPI().then((dataRes) => {
        //     const brandList = dataRes.data.map(brand => ({ ...brand, checked: false }))
        //     console.log('dataRes: ', brandList)
        //     setBrand(brandList)
        // })
        fetchProductAPI(slug.name, location.search).then((dataRes) => {
            setProduct(dataRes.data)
            setPageNumbers(dataRes.totalPage)
            setCheckAscDesc({ ascending: false, descending: false })
            setPrice(prevState => prevState.map(item => ({ ...item, checked: false })))

            const brandList = dataRes.brandNames.map(brand => ({ ...brand, checked: false }))
            setBrand(brandList)
            const sizeList = dataRes.sizes.map(item => ({ size: item, checked: false }))
            console.log('sizeList: ', sizeList)
            setSizes(sizeList)
        })
        setPage(1)
    }, [slug.name])

    useEffect(() => {
        fetchProductAPI(slug.name, location.search).then((dataRes) => {
            setProduct(dataRes.data)
            setPageNumbers(dataRes.totalPage)
        })
        const query = queryString.parse(location.search)
        setSearch(query.search)
    }, [location.search])

    // brandAPI
    useEffect(() => {
        const query = queryString.parse(location.search)

        console.log('query: ', query)

        if (brandAPI.length > 0) {
            query.brands = brandAPI.join(',')
            query.page = 1
        }
        else {
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
                        (search ? (
                            <div className="text-[24px] font-bold text-[#ff2d37] leading-[38px] text-center mt-[8px]">
                                {search}
                            </div>
                        ) :
                            slug.name === 'all' ? (
                                <div className="text-[24px] font-bold text-[#ff2d37] leading-[38px] text-center mt-[8px]">
                                    Tất cả sản phẩm
                                </div>
                            )
                                :
                                (
                                    <div className="text-[24px] font-bold text-[#ff2d37] leading-[38px] text-center mt-[8px]">
                                        {category?.name}
                                    </div>
                                )
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
                                    {
                                        price?.map(item => {
                                            return (
                                                <div key={`price-${item.value}`} className="flex items-center relative flex-1 ">
                                                    <input onChange={() => handleChangePrice(item.id)} type="checkbox" id={`price-${item.value}`} checked={item.checked} className=" w-[15px] h-[15px] cursor-pointer" />
                                                    {/* <BsCheck className="absolute top-0 left-[-3px] w-[20px] h-[20px] text-[#ff2d37] " /> */}
                                                    <label htmlFor={`price-${item.value}`} className="text-[14px] pl-[8px] cursor-pointer select-none">{item.value}đ</label>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            </div>

                            {/* Size */}
                            <div className="leading-[40px] text-[14px] font-bold mt-[24px]">THEO KÍCH CỠ</div>
                            <div className="flex flex-wrap gap-x-[20px] gap-y-[10px] px-[15px] pb-[15px] pt-[6px] border border-solid border-[#ebebeb] ">
                                {
                                    sizes.map(size => {
                                        return (
                                            <div key={`${size.size}-size`} className="flex items-center relative ">
                                                <input onChange={() => handleChangeSize(size.size)} type="checkbox" id={size.size} checked={size.checked} className=" w-[15px] h-[15px] cursor-pointer" />
                                                <label htmlFor={size.size} className="text-[14px] pl-[8px] cursor-pointer select-none">{size.size}</label>
                                            </div>
                                        )
                                    })
                                }

                            </div>

                        </div>
                        <div className="w-[900px] px-[15px]">
                            <div className="text-[14px] flex items-center border-b pb-[20px] border-solid border-[#ebebeb]">
                                <span className=" font-bold ">Sắp xếp:</span>
                                <div className="ml-[30px] inline-block">
                                    <div className="inline-flex ml-[20px] items-center hover:text-[#ff2d37] ">
                                        <input onChange={() => handleChangeAscDesc('ascending')} checked={checkAscDesc.ascending} type="checkbox" className="w-[14px] h-[14px] cursor-pointer" name="ascending" id="ascending" />
                                        <label htmlFor="ascending" className="ml-[6px] cursor-pointer">Giá tăng dần</label>
                                    </div>
                                    <div className="inline-flex ml-[20px] items-center hover:text-[#ff2d37] ">
                                        <input onChange={() => handleChangeAscDesc('descending')} checked={checkAscDesc.descending} type="checkbox" className="w-[14px] h-[14px] cursor-pointer" name="descending" id="descending" />
                                        <label htmlFor="descending" className="ml-[6px] cursor-pointer">Giá giảm dần</label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-x-[15px] gap-y-[20px]  w-[870px] mt-[20px]">
                                <ProductCard products={product} />
                            </div>

                            {
                                pageNumbers ? (<PaginationRounded page={page} pageNumbers={pageNumbers} handleChangePage={handleChangePage} />) : (
                                    <Box sx={{ bgcolor: '#fcf8e3', padding: '16px', color: '#8a6d3b', fontSize: '14px' }}>
                                        Sản phẩm đang được cập nhật
                                    </Box>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProductList