import React, { useEffect, useRef, useState } from 'react'
import { getCategoryBySlugAPI, fetchProductAPI, fetchBrandAPI, fetchCategoryAPI, updateProductAPI } from '../../../apis'
import { Link, useParams } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoAddCircleOutline } from 'react-icons/io5';
import { Autocomplete, Box, Button, Checkbox, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, MenuItem, Select, Slide, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { IoMdClose } from "react-icons/io";
import { CiEdit } from "react-icons/ci";

import { getAllCategoryNames, getCategoriesWithChildren } from '../../../util/category';
import slugify from 'slugify';
import { formatCurrency } from '../../../util/formatCurency';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ProductDetails() {
    const slug = useParams()
    const [product, setProduct] = useState()
    const [category, setCategory] = useState([])
    const [categoryType, setCategoryType] = useState([])
    const [brands, setBrands] = useState([])
    const [brandSelectd, setBrandSelectd] = useState('');
    const [selectedCategoriesChildren, setSelectedCategoriesChildren] = useState('');
    const [selectedCategoriesParent, setSelectedCategoriesParent] = useState('');
    const [productsQuantity, setProductsQuantity] = useState([])
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmitQuantity = () => {
        setOpen(false);
        const total = productsQuantity.reduce((total, product) => {
            return total += Number(product.quantity)
        }, 0)
        console.log('total:', total)
        const updateData = {
            size: productsQuantity,
            total: total
        }
        console.log('updateData-1: ', updateData)

        updateProductAPI(product._id, updateData).then((dataRes) => {
            setProduct(dataRes.data)
        })
    }
    const handleChangeQuantity = (event, size) => {
        let inputValue = event.target.value;
        if ( inputValue.length === 0 || inputValue === '00') {
            const newProductQuantity = productsQuantity.map(item => {
                if (item.size === size) {
                    return { ...item, quantity: '0' }
                } else {
                    return { ...item }
                }
            })
            return setProductsQuantity(newProductQuantity)
        }
        // Xóa các ký tự không phải số
        const cleanValue = inputValue.replace(/\D/g, '');
        // Loại bỏ các số 0 ở đầu
        const noLeadingZeros = cleanValue.replace(/^0+/, '');
        console.log('noLeadingZeros: ', noLeadingZeros)

        const newProductQuantity = productsQuantity.map(item => {
            if (item.size === size) {
                return { ...item, quantity: noLeadingZeros }
            } else {
                return { ...item }
            }
        })
        setProductsQuantity(newProductQuantity)
    }
    const handleCategoryTypeChange = (event) => {
        setSelectedCategoriesChildren(event.target.value);
    };
    const handleCategoryParentChange = (event) => {
        const categoryParentName = event.target.value
        let categoryChildrenArrays = []

        setSelectedCategoriesParent(categoryParentName);
        setSelectedCategoriesChildren('');

        if (categoryParentName === 'Tất cả sản phẩm') {
            categoryChildrenArrays = category
        } else {
            // Tìm ra danh mục con để render vào loại sản phẩm
            const categoryWithChildren = getCategoriesWithChildren(category, categoryParentName)
            const categoryChildren = getAllCategoryNames(categoryWithChildren)
            categoryChildrenArrays = categoryChildren.map(category => {
                return {
                    name: category
                }
            })
        }
        setCategoryType(categoryChildrenArrays)
    };
    const handleChange = (event) => {
        setBrandSelectd(event.target.value);
    };


    useEffect(() => {
        getCategoryBySlugAPI('all').then((dataRes) => {
            setCategory(dataRes.data)
        })
        fetchBrandAPI().then((dataRes) => {
            setBrands(dataRes.data)
        })
    }, [])
    useEffect(() => {
        fetchProductAPI(slug.id, '').then((dataRes) => {
            setProduct(dataRes.data)
            setProductsQuantity(dataRes.data.size)
        })
    }, [slug.id])
    useEffect(() => {
        const getCategory = () => {
            getCategoryBySlugAPI(slugify(product?.category, { locale: 'vi' })).then((dataRes) => {
                if (dataRes.data && dataRes.data.parent === null) {
                    setSelectedCategoriesParent('Tất cả sản phẩm')
                    setCategoryType(category)
                } else if (dataRes.data && dataRes.data.parent !== null) {
                    // Tìm ra danh mục con để render vào loại sản phẩm
                    const categoryWithChildren = getCategoriesWithChildren(category, dataRes.data.parent)
                    const categoryChildren = getAllCategoryNames(categoryWithChildren)
                    const categoryChildrenArrays = categoryChildren.map(category => {
                        return {
                            name: category
                        }
                    })
                    setCategoryType(categoryChildrenArrays)
                    setSelectedCategoriesParent(dataRes?.data?.parent)

                }
                setSelectedCategoriesChildren(dataRes?.data?.name)
            })
        }
        if (product) getCategory()
    }, [product])
    // console.log('category: ', category)
    // console.log('selectedCategories: ', selectedCategories)
    // console.log('categoryParentNull: ', categoryParentNull)
    // console.log('selectedCategoriesChildren: ', selectedCategoriesChildren)
    // console.log('selectedCategoriesParent: ', selectedCategoriesParent)
    // console.log('categoryType: ', categoryType)

    return (
        <div>
            <div className='w-[calc(100%-230px)] h-full ml-[230px] pt-[52px] px-[30px] pb-[200px]'>
                <div className='ml-[2px] text-[22px] font-[500] h-[65px] flex gap-[16px] items-center'>
                    <Link to={'/admin/products'}>
                        <div className='h-[36px] w-[36px] bg-white flex items-center justify-center rounded-[6px] border border-[#D3D5D7] cursor-pointer'>
                            <FaArrowLeftLong className='text-[14px] text-[#747C87]' />
                        </div>
                    </Link>
                    <div>{product?.name}</div>
                </div>
                <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full px-[20px] bg-white rounded-[6px]'>
                    <div className='pb-[18px]'>
                        <div className='font-[600] py-[18px]'>Thông tin sản phẩm</div>
                        <div className='text-[16px] text-[#46515F] font-[500]'>Tên sản phẩm</div>
                        <div className='border-[#D3D5D7] border rounded-[6px] mt-[6px]'>
                            <input className='px-[12px] w-full h-[34px] text-[14px] rounded-[6px] bg-[white] focus:outline-[#0088FF]' value={product?.name}></input>
                        </div>

                        <div className='text-[16px] text-[#46515F] font-[500] mt-[15px]'>Mô tả</div>
                        <div className=' mt-[6px] rounded-[6px] border border-[#D3D5D7] focus-within:border-transparent'>
                            <textarea className='w-[100%] px-[12px] py-[12px] min-h-[200px] focus:outline-[#0088FF]  rounded-[6px]' id="description" name="description" placeholder="Nhập mô tả của bạn tại đây..."></textarea>
                        </div>
                    </div>
                </div>
                {/* Phiên bản */}
                <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full mt-[15px] bg-white rounded-[6px]'>
                    <div className='flex justify-between items-center px-[20px]'>
                        <div className='font-[600] py-[18px]'>Phiên bản</div>
                        <div className='flex items-center justify-center gap-[6px] w-[164px] h-[36px] bg-[#0088FF] text-white text-[16px] rounded-[6px] cursor-pointer'>
                            <IoAddCircleOutline className='text-[20px]' />
                            <span className='mb-[2px]'>Thêm phiên bản</span>
                        </div>
                    </div>
                    <div className='px-[20px] flex gap-[26px] py-[12px] text-[14px] font-[600]'>
                        <span>Bộ lọc:</span>
                        <span className='text-[#0088FF] flex-1'>Kích thước</span>
                        <div onClick={handleClickOpen} className='flex gap-[6px] items-center justify-center w-[123px] h-[34px] rounded-[6px] border border-[#D3D5D7] cursor-pointer hover:bg-[#F2F9FF]'>
                            <span>Chỉnh sửa</span>
                            <CiEdit className='text-[#A3A8AF]  mt-[2px]'/>
                        </div>
                        {/* modal chỉnh sửa số lượng */}
                        <Dialog
                            open={open}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <div className='w-[598px]'>
                                <div className=' h-[52px] px-[20px] flex justify-between items-center font-[600] border border-[#D3D5D7]'>
                                    <span>Chỉnh sửa số lượng</span>
                                    <div onClick={handleClose} className='flex items-center justify-center cursor-pointer w-[36px] h-[36px] hover:bg-[#F2F9FF] '><IoMdClose className=''/></div>
                                </div>
                                <div className='flex justify-between border border-[#D3D5D7] px-[20px] py-[10px]'>
                                    <div>Kích thước</div>
                                    <div>Số lượng</div>
                                </div>
                                {
                                    product?.size?.map((item, index) => {
                                        return (
                                            <div key={item.size} className='h-[60px] px-[20px] flex items-center justify-between border-b border-[#D3D5D7]'>
                                                <span className='text-[#0088FF] font-[600]'>{item.size}</span>
                                                <div className='border border-[#0088FF] rounded-[6px] text-[#0088FF] font-[600] bg-[white] '>
                                                    <input
                                                        type='number'
                                                        value={productsQuantity[index]?.quantity}
                                                        maxLength={5}
                                                        onChange={(event) => handleChangeQuantity(event, item.size)}
                                                        className='px-[12px] w-[150px] h-[34px] text-[14px] rounded-[6px] bg-[white] outline-none'>
                                                    </input>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='h-[76px] flex items-center justify-end gap-[15px] px-[20px] select-none '>
                                <div onClick={handleClose} className='flex items-center justify-center w-[60px] h-[36px] border border-[#0088FF] rounded-[6px] font-[600] text-[14px] text-[#0088FF] cursor-pointer hover:bg-[#F2F9FF]'>Hủy</div>
                                <div onClick={handleSubmitQuantity} className='flex items-center justify-center w-[100px] h-[36px] bg-[#0088FF] rounded-[6px] font-[600] text-[14px] text-white hover:bg-[#33A0FF] cursor-pointer'>Xác nhận</div>
                            </div>
                        </Dialog>
                    </div>
                    <label htmlFor='version' className='cursor-pointer'>
                        <div className='border-b border-t border-[#E8EAEB] font-[600] px-[20px] flex gap-[16px] items-center py-[28px]'>
                            <input type='checkbox' id='version' className='w-[16px] h-[16px] text-[#D3D5D7] cursor-pointer' />
                            <span>4 phiên bản</span>
                            {/* <span>Tất cả phiên bản</span>
                            <span>Đã chọn ? phiên bản</span> */}
                        </div>
                    </label>

                    {
                        product?.size.map((item, index) => {
                            return (
                                <div key={index} className='h-[76px] px-[20px] border-b border-[#E8EAEB] flex items-center'>
                                    <input type='checkbox' className='w-[16px] h-[16px] text-[#D3D5D7] cursor-pointer' />
                                    <img className='ml-[45px] w-[50px]' src={product?.image[0]} alt=''></img>
                                    <span className='ml-[45px] font-bold text-[#0088FF] flex-1'>
                                        {item.size}
                                    </span>
                                    <div className='flex flex-col text-right'>
                                        <div>Có thể bán: <span className='font-bold text-[#0088FF]'>{item.quantity}</span></div>
                                        <div>Giá bán: <span className='font-bold text-[#0088FF]'>{product?.price}₫</span></div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className='h-[59px] px-[20px] flex justify-between items-center'>
                        <div>Tổng tồn kho</div>
                        <div>Có thể bán: <span className='font-bold text-[#0088FF]'>{product?.total}</span></div>
                    </div>
                </div>
                {/* Ảnh */}
                <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full mt-[15px] bg-white rounded-[6px] pb-[20px]'>
                    <div className='flex justify-between items-center px-[20px]'>
                        <div className='font-[600] py-[18px]'>Ảnh sản phẩm</div>
                    </div>
                    <div className='flex gap-[12px] px-[20px]'>
                        <div className='w-[88px] h-[88px] border border-dashed rounded-[6px] flex items-center justify-center cursor-pointer hover:border-[#0088FF]'>
                            {/* <img className='' src={''} alt=''></img> */}
                            <span className='text-[#A3A8AF] text-[32px]'>+</span>
                        </div>
                        {/* render Ảnh sản phẩm */}
                        {
                            product?.image.map((image, index) => {
                                return (
                                    <div key={index} className='w-[88px] h-[88px] border border-dashed rounded-[6px] flex items-center justify-center cursor-pointer hover:border-[#0088FF]'>
                                        <img className='w-full h-full rounded-[6px]' src={image} alt=''></img>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {/* Thuộc tính */}
                <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full mt-[15px] py-[24px] px-[20px] pb-[200px] bg-white rounded-[6px]'>
                    {/* Danh mục cha */}
                    <div className='text-[16px] text-[#46515F] font-[500]'>Danh mục</div>
                    {
                        product ? (
                            <Select
                                value={selectedCategoriesParent}
                                onChange={handleCategoryParentChange}
                                sx={{
                                    width: '100%',
                                    marginTop: '10px',
                                }}

                            >
                                <MenuItem value='Tất cả sản phẩm'>Tất cả sản phẩm</MenuItem>
                                {
                                    category?.map((item) => {
                                        return (
                                            <MenuItem key={item._id} value={item.name}>{item.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        ) : <></>
                    }
                    {/* Danh mục con/ Loại */}
                    <div className='text-[16px] text-[#46515F] font-[500] mt-[20px]'>Loại sản phẩm</div>
                    {
                        product ? (
                            <Select
                                value={selectedCategoriesChildren}
                                onChange={handleCategoryTypeChange}
                                sx={{
                                    width: '100%',
                                    marginTop: '10px',
                                }}
                            >
                                {
                                    categoryType?.map((item) => {
                                        return (
                                            <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        ) : <></>
                    }
                    {/* Thương hiệu */}
                    <div className='text-[16px] text-[#46515F] font-[500] mt-[20px]'>Thương hiệu</div>
                    {
                        product ? (
                            <Select
                                value={brandSelectd}
                                onChange={handleChange}
                                sx={{
                                    width: '100%',
                                    marginTop: '10px'
                                }}
                            >
                                {
                                    brands?.map((brand, index) => {
                                        return (
                                            <MenuItem key={index} value={brand.name}>{brand.name}</MenuItem>
                                        )
                                    })
                                }
                            </Select>

                        ) : <></>
                    }
                </div>
            </div>
        </div>

    )
}

export default ProductDetails
