import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";
import { CiFilter } from "react-icons/ci";
import Pagination from '../../../components/Pagination'
import { IoAddCircleOutline } from "react-icons/io5";
import { fetchBrandAPI, fetchProductAPI } from '../../../apis';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string'
function Products() {
    const location = useLocation()
    const navigate = useNavigate()
    const [products, setProducts] = useState()
    const [pageNumbers, setPageNumbers] = useState()
    const [page, setPage] = useState(1)
    const [inputValue, setInputValue] = useState()
    const [showBrandDropdown, setShowBrandDropdown] = useState(false)
    const [brands, setBrands] = useState([])
    const handleBrandDropDownChange = (event, brandId) => {
        setBrands(prev => {
            const newBrands = prev.map(brand => {
                if (brand._id === brandId) return { ...brand, checked: !brand.checked }
                else return { ...brand }
            })
            return newBrands
        });
    };
    const handleFilterBrands = () => {
        setShowBrandDropdown(false);
        setInputValue('')
        let selectedArrays = []
        brands.forEach(brand => {
            if (brand.checked === true)
                selectedArrays.push(brand)
        });
        // Nếu không check, trả về all tất cả trạng thái
        if (selectedArrays.length === 0) {
            navigate(`/admin/products`)
        }
        else {
            const query = queryString.parse(location.search)
            const brandNames = selectedArrays.map(brand => brand.name)
            query.brands = brandNames.join(',')
            query.page = 1
            setPage(1)
            delete query.search
           
            navigate(`/admin/products?${queryString.stringify(query)}`)
        }
    };
    useEffect(() => {
        fetchBrandAPI().then((dataRes) => {
            setBrands(dataRes.data.map(brand => ({ ...brand, checked: false })))
        }).catch((error) => console.error(error))
    }, [])
    useEffect(() => {
        fetchProductAPI('all', location.search).then((dataRes) => {
            setProducts(dataRes.data)
            setPageNumbers(dataRes.totalPage)
        })
    }, [location.search])
    const handleChangePage = (e, page) => {
        setPage(page)
        navigate(`/admin/products?page=${page}`)
    }

    const handleChangeInput = (e) => {
        setInputValue((e.target.value))
        const query = queryString.parse(location.search)
        query.page = 1
        setPage(1)
        query.search = e.target.value
        navigate(`/admin/products?${queryString.stringify(query)}`)
    }
    return (
        <div className='ml-[230px] w-[calc(100%-230px)] pt-[52px] h-full px-[30px]'>
            <div className='ml-[2px] text-[22px] font-[500] h-[65px] flex items-center justify-between'>
                <div>Danh sách sản phẩm</div>
                <Link to={'/admin/products/create'}>
                    <div className='flex items-center justify-center gap-[6px] w-[164px] h-[36px] bg-[#0088FF] text-white text-[16px] rounded-[6px] cursor-pointer'>
                        <IoAddCircleOutline className='text-[20px]' />
                        <span className='mb-[2px]'>Thêm sản phẩm</span>
                    </div>
                </Link>
            </div>
            <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full  bg-white  rounded-[6px]'>
                <div className='h-[46px] flex items-center border-b'>
                    <div className='font-[500] flex items-center px-[20px] h-full cursor-pointer border-b-[2px]  border-[#0088FF] text-[#0088FF]'>Tất cả</div>
                </div>
                <div className='h-[76px] flex items-center px-[20px] z-10 justify-between'>
                    <div className='flex flex-1 items-center bg-[white] border rounded-[6px] w-[350px] h-[34px] hover:bg-[#F3F3F3] focus-within:border-[#0088FF] cursor-pointer group/input'>
                        <div className='w-[full] h-[full] flex items-center justify-center mx-[8px]'>
                            <IoIosSearch className='text-[#9CA3B5] text-[20px] ' />
                        </div>
                        <input onChange={handleChangeInput} value={inputValue} className='h-[full] text-[14px] rounded-[6px] bg-[white] outline-none w-full font-[500] group-hover/input:bg-[#F3F3F3] focus:border-[black]' placeholder='Tìm kiếm theo tên sản phẩm ...'></input>
                    </div>
                    <div className='ml-[15px] flex'>
                        {/* trạng thái giao hàng */}
                        <div onClick={() => { setShowBrandDropdown(prev => !prev) }} className='relative flex gap-[4px] mb-[2px] items-center justify-center text-[#0F1824] select-none bg-[white] border rounded-tl-[6px] rounded-bl-[6px] w-[175px] h-[34px] cursor-pointer hover:bg-[#F3F4F5]'>
                            <span>Thương hiệu</span>
                            <TiArrowSortedDown className='mt-[4px] text-[#747C87]' />
                            {showBrandDropdown && (
                                <div onClick={(event) => event.stopPropagation()} className='absolute top-full left-0 w-full p-[12px] bg-white border shadow-md z-20'>
                                    {brands.map((brand) => (
                                        <div key={brand._id} className='flex mb-[10px]'>
                                            <label htmlFor={brand._id} className='flex flex-1 gap-x-[12px] cursor-pointer'>
                                                <input
                                                    id={brand._id}
                                                    type='checkbox'
                                                    className='w-[16px] cursor-pointer'
                                                    checked={brand.checked}
                                                    onChange={(event) => handleBrandDropDownChange(event, brand._id)}
                                                />
                                                <span className='flex-1'>{brand.name}</span>
                                            </label>
                                        </div>
                                    ))}
                                    <div onClick={handleFilterBrands} className='mt-[10px] w-[full] rounded-[6px] h-[36px] bg-[#0088FF] text-white flex justify-center items-center font-[500] hover:bg-[#33A0FF]' >
                                        Lọc
                                    </div>
                                </div>
                            )}

                        </div>
                       
                        {/* Bộ lọc khác */}
                        <div className='relative flex gap-[4px] mb-[2px] items-center justify-center text-[#0F1824]  bg-[white] border-r border-b border-t rounded-tr-[6px] rounded-br-[6px] w-[132px] h-[34px] cursor-pointer hover:bg-[#F3F4F5]'>
                            <CiFilter className='mt-[2px] text-[#7C838E] text-[20px]' />
                            <span>Bộ lọc khác</span>
                        </div>
                    </div>
                </div>
                <div className='h-[48px] bg-[#F4F6F8] flex gap-[20px] items-center font-[500] pl-[12px] border-b z-0'>
                    <div className='text-[18px] flex items-center w-[90px]'>
                    </div>
                    <div className='text-[18px] flex justify-center w-[35%]'>
                        Sản phẩm
                    </div>
                    <div className='text-[18px] flex justify-center w-[15%]'>
                        Có thể bán
                    </div>
                    <div className='text-[18px] flex justify-center w-[15%]'>
                        Giá
                    </div>
                    <div className='text-[18px] flex justify-center w-[15%]'>
                        Thương hiệu
                    </div>

                </div>
                {/* render product */}
                {
                    products?.map((product, index) => {
                        return (
                            <Link key={product._id} to={`/admin/products/${product.slug}`}>
                                <div className='h-[82px] bg-[white] text-[#0088FF] flex gap-[20px] items-center font-[500] pl-[12px] border-t border-b hover:bg-[#F3F4F5] cursor-pointer'>
                                    <div className='flex items-center w-[90px] '>
                                        <img src={product.image[0]} alt='' className=' w-[100%] h-[80px]'></img>
                                    </div>
                                    <div className='px-[10px] flex h-[100%] justify-center items-center w-[35%]'>
                                        {product.name}
                                    </div>
                                    <div className='px-[10px] flex flex-col h-[100%] justify-center items-center w-[15%]'>
                                        <div>{product.total}</div>
                                        <div className='text-[#747C87] text-[15px]'>({product.size.length} phiên bản)</div>
                                    </div>
                                    <div className='px-[10px] flex h-[100%] justify-center items-center w-[15%]'>
                                        {product.price} ₫
                                    </div>
                                    <div className='px-[10px] flex h-[100%] justify-center items-center w-[15%]'>
                                        {product.brand_id.name}
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
                <div className='h-[70px] flex justify-center items-center pb-[30px]'>
                    <Pagination page={page} pageNumbers={pageNumbers} handleChangePage={handleChangePage} />
                </div>
            </div>
        </div>
    )
}

export default Products