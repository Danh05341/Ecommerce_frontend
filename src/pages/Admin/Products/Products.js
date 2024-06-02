import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";
import { CiFilter } from "react-icons/ci";
import Pagination from '../../../components/Pagination'
import { IoAddCircleOutline } from "react-icons/io5";
import { fetchProductAPI } from '../../../apis';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function Products() {
    const location = useLocation()
    const navigate = useNavigate()
    const [products, setProducts] = useState()
    const [pageNumbers, setPageNumbers] = useState()
    const [page, setPage] = useState(1)
    
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
    console.log('product: ', products)
    return (
        <div className='ml-[230px] w-[calc(100%-230px)] h-full px-[30px]'>
            <div className='ml-[2px] text-[22px] font-[500] h-[65px] flex items-center justify-between'>
                <div>Danh sách sản phẩm</div>
                <div className='flex items-center justify-center gap-[6px] w-[164px] h-[36px] bg-[#0088FF] text-white text-[16px] rounded-[6px] cursor-pointer'>
                    <IoAddCircleOutline className='text-[20px]' />
                    <span className='mb-[2px]'>Thêm sản phẩm</span>
                </div>
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
                        <input className='h-[full] text-[14px] rounded-[6px] bg-[white] outline-none w-full font-[500] group-hover/input:bg-[#F3F3F3] focus:border-[black]' placeholder='Tìm kiếm theo mã sản phẩm, tên sản phẩm ...'></input>
                    </div>
                    <div className='ml-[15px] flex'>
                        {/* trạng thái giao hàng */}
                        <div className='relative flex gap-[4px] mb-[2px] items-center justify-center text-[#0F1824]  bg-[white] border-l border-t border-b rounded-tl-[6px] rounded-bl-[6px] w-[160px] h-[34px] cursor-pointer hover:bg-[#F3F4F5]'>
                            <span>Thương hiệu</span>
                            <TiArrowSortedDown className='mt-[4px] text-[#747C87]' />
                            {/* <div className='absolute hidden top-[40px] w-[180px] flex-col gap-y-[10px] py-[20px] px-[12px] border rounded-[6px] bg-[white] shadow-md'>
                                <label htmlFor='1'>
                                    <div className='flex items-center gap-3 cursor-pointer'>
                                        <input type='checkbox' id='1' className='w-[18px] h-[18px] '></input>
                                        <div className='mb-[2px]'>Chưa xác nhận</div>
                                    </div>
                                </label>
                                <label htmlFor='2'>
                                    <div className='flex items-center gap-3 cursor-pointer'>
                                        <input type='checkbox' id='2' className='w-[18px] h-[18px] '></input>
                                        <div className='mb-[2px]'>Đang giao hàng</div>

                                    </div>
                                </label>
                                <label htmlFor='3'>
                                    <div className='flex items-center gap-3 cursor-pointer'>
                                        <input type='checkbox' id='3' className='w-[18px] h-[18px] '></input>
                                        <div className='mb-[2px]'>Đã nhận hàng</div>
                                    </div>
                                </label>
                                <div className='mt-[10px] w-[full] rounded-[6px] h-[36px] bg-[#0088FF] text-white flex justify-center items-center font-[500] hover:bg-[#33A0FF]'>Lọc</div>
                            </div> */}
                        </div>
                        {/* Ngày tạo*/}
                        <div className='relative flex gap-[4px] mb-[2px] items-center justify-center text-[#0F1824]  bg-[white] border w-[115px] h-[34px] cursor-pointer hover:bg-[#F3F4F5]'>
                            <span>Ngày tạo</span>
                            <TiArrowSortedDown className='mt-[4px] text-[#747C87]' />
                            {/* <div className='absolute hidden top-[40px] w-[180px] flex-col gap-y-[10px] py-[20px] px-[12px] border rounded-[6px] bg-[white] shadow-md'>
                                <label htmlFor='1'>
                                    <div className='flex items-center gap-3 cursor-pointer'>
                                        <input type='checkbox' id='1' className='w-[18px] h-[18px] '></input>
                                        <div className='mb-[2px]'>Chưa xác nhận</div>
                                    </div>
                                </label>
                                <label htmlFor='2'>
                                    <div className='flex items-center gap-3 cursor-pointer'>
                                        <input type='checkbox' id='2' className='w-[18px] h-[18px] '></input>
                                        <div className='mb-[2px]'>Đang giao hàng</div>

                                    </div>
                                </label>
                                <label htmlFor='3'>
                                    <div className='flex items-center gap-3 cursor-pointer'>
                                        <input type='checkbox' id='3' className='w-[18px] h-[18px] '></input>
                                        <div className='mb-[2px]'>Đã nhận hàng</div>
                                    </div>
                                </label>
                                <div className='mt-[10px] w-[full] rounded-[6px] h-[36px] bg-[#0088FF] text-white flex justify-center items-center font-[500] hover:bg-[#33A0FF]'>Lọc</div>
                            </div> */}
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