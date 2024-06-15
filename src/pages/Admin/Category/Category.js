import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";
import { CiFilter } from "react-icons/ci";
import Pagination from '../../../components/Pagination'
import { IoAddCircleOutline } from "react-icons/io5";
import { categoryQuantityProductAPI, deleteCategoryAPI } from '../../../apis';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string'
import { toast } from 'react-toastify';
function Category() {
    const location = useLocation()
    const navigate = useNavigate()
    const [category, setCategory] = useState()
    const [pageNumbers, setPageNumbers] = useState()
    const [totalProductCategory, setTotalProductCategory] = useState()
    const [page, setPage] = useState(1)
    const [inputValue, setInputValue] = useState()
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const handleDeleteSelected = () => {
        setShowConfirmModal(true);
    };

    const confirmDelete = () => {
        deleteCategoryAPI(selectedCategories).then(() => {
            setCategory(category.filter(item => !selectedCategories.includes(item.name)));
            setSelectedCategories([]);
            setShowConfirmModal(false);
            toast.success('Xóa danh mục thành công')
        }).catch(err => {
            toast.success('Xóa danh mục thất bại')

            console.error("Xóa danh mục thất bại", err);
            setShowConfirmModal(false);
        });
    };
    useEffect(() => {
        categoryQuantityProductAPI(location.search).then((dataRes) => {
            setCategory(dataRes.data.categories)
            setPageNumbers(dataRes.data.totalPages)
            setTotalProductCategory(dataRes.data.totalProduct)
        })
    }, [location.search])
    const handleChangePage = (e, page) => {
        setPage(page)
        setSelectedCategories([])
        navigate(`/admin/category?page=${page}`)
    }
    // const handleDeleteSelected = () => {
    //     // Xóa các mục được chọn khỏi danh sách
    //     setCategory(category.filter(item => !selectedCategories.includes(item.name)));
    //     // Xóa các mục được chọn khỏi state
    //     setSelectedCategories([]);
    //     // GỌi API xóa category
    //     console.log('selected: ', selectedCategories)
    //     deleteCategoryAPI(selectedCategories).then()

    // };
    const handleCheckboxChange = (e, categoryId) => {
        if (e.target.checked) {
            setSelectedCategories([...selectedCategories, categoryId]);
        } else {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        }
    };
  
    const handleChangeInput = (e) => {
        setInputValue((e.target.value))
        const query = queryString.parse(location.search)
        console.log('e', e.target.value)
        query.page = 1
        setPage(1)
        query.search = e.target.value
        if(!e.target.value) delete query.search
        navigate(`/admin/category?${queryString.stringify(query)}`)
    }

    return (
        <div className='ml-[230px] w-[calc(100%-230px)] pt-[52px] h-full px-[30px]'>
            <div className='ml-[2px] text-[22px] font-[500] h-[65px] flex items-center justify-between'>
                <div>Danh sách sản phẩm</div>
                <Link to={'/admin/category/create'}>
                    <div className='flex items-center justify-center gap-[6px] w-[184px] h-[36px] bg-[#0088FF] text-white text-[16px] rounded-[6px] cursor-pointer'>
                        <IoAddCircleOutline className='text-[20px]' />
                        <span className='mb-[2px]'>Thêm danh mục</span>
                    </div>
                </Link>
            </div>
            <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full  bg-white  rounded-[6px]'>
                <div className='h-[46px] flex items-center border-b'>
                    <div className='font-[500] flex items-center px-[20px] h-full cursor-pointer border-b-[2px]  border-[#0088FF] text-[#0088FF]'>Tất cả</div>
                </div>
                {/* Thanh tìm kiếm */}
                {selectedCategories.length === 0 && (
                    <div className='h-[76px] flex items-center px-[20px] z-10 justify-between'>
                        <div className='flex flex-1 items-center bg-[white] border rounded-[6px] w-[350px] h-[34px] hover:bg-[#F3F3F3] focus-within:border-[#0088FF] cursor-pointer group/input'>
                            <div className='w-[full] h-[full] flex items-center justify-center mx-[8px]'>
                                <IoIosSearch className='text-[#9CA3B5] text-[20px]' />
                            </div>
                            <input onChange={handleChangeInput} value={inputValue} className='h-[full] text-[14px] rounded-[6px] bg-[white] outline-none w-full font-[500] group-hover/input:bg-[#F3F3F3] focus:border-[black]' placeholder='Tìm kiếm danh mục sản phẩm ...'></input>
                        </div>
                    </div>
                )}

                {/* Nút xóa */}
                {selectedCategories.length > 0 && (
                    <div className='flex justify-between items-center px-[20px] py-[12px] bg-[#F4F6F8] border-b'>
                        <span className='font-[500] text-[16px]'>Đã chọn: {selectedCategories.length}</span>
                        <button onClick={handleDeleteSelected} className='bg-red-500 text-white px-[10px] py-[5px] rounded-[6px]'>
                            Xóa các mục đã chọn
                        </button>
                    </div>
                )}
                <div className='h-[48px] bg-[#F4F6F8] flex gap-[20px] items-center font-[500] pl-[12px] border-b z-0'>
                    <input type='checkbox' className='w-[16px] h-[16px] text-[#D3D5D7] cursor-pointer' />

                    <div className='text-[18px] flex pl-[52px] w-[65%]'>
                        Danh mục
                    </div>
                    <div className='text-[18px] flex justify-center w-[35%]'>
                        Số lượng
                    </div>

                </div>

                {/* <Link to={`/admin/category/abcxyz`}> */}
                {/* <div className='h-[82px] bg-[white] text-[#0088FF] flex gap-[20px]  items-center font-[500] pl-[12px] border-t border-b hover:bg-[#F3F4F5] cursor-pointer'>
                    <input type='checkbox' onClick={(e) => e.stopPropagation()} className='w-[16px] h-[16px] text-[#D3D5D7] cursor-pointer' />
                    <div className='pl-[52px] flex h-[100%] items-center w-[65%]'>
                        Tất cả sản phẩm
                    </div>
                    <div className='px-[10px] flex h-[100%] justify-center items-center w-[35%]'>
                        {totalProductCategory}
                    </div>
                </div> */}
                {/* </Link> */}
                {/* render product */}
                {
                    category?.map((item, index) => {
                        return (
                            // <Link key={item.name} to={`/admin/category/abcxyz`}>
                            <div key={item.name} className='h-[82px] bg-[white] text-[#0088FF] flex gap-[20px]  items-center font-[500] pl-[12px] border-t border-b hover:bg-[#F3F4F5] cursor-pointer'>
                                <input onClick={(e) => e.stopPropagation()} id={item.name} type='checkbox' className='w-[16px] h-[16px] text-[#D3D5D7] cursor-pointer' onChange={(e) => handleCheckboxChange(e, item.name)} />
                                <div className='pl-[52px] flex h-[100%] items-center w-[65%]'>
                                    {item.name}
                                </div>
                                <div className='px-[10px] flex h-[100%] justify-center items-center w-[35%]'>
                                    {item.count}
                                </div>
                            </div>
                            // </Link>
                        )
                    })
                }
                <div className='h-[70px] flex justify-center items-center pb-[30px]'>
                    <Pagination page={page} pageNumbers={pageNumbers} handleChangePage={handleChangePage} />
                </div>

                 {/* MOdal delete */}
                 {showConfirmModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md">
                        <h2 className="text-lg font-semibold mb-4">Xác nhận xóa</h2>
                        <p>Bạn có chắc chắn muốn xóa các danh mục đã chọn không?</p>
                        <div className="flex justify-end mt-4">
                            <button onClick={() => setShowConfirmModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Hủy</button>
                            <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">Xóa</button>
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>
    )
}

export default Category