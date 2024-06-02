import { Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import { useSelector } from 'react-redux';

function Checkout() {
    const productsCart = useSelector(state => state.cart.data)
    console.log('productsCart-1: ', productsCart)
    const [totalQuantity, setTotalQuantity] = useState(() => {
        const countProduct = productsCart.reduce((total, product) => {
            total += (product?.quantity)
            return total;
        }, 0)
        return countProduct
    })

    const [totalPrice, setTotalPrice] = useState(() => {
        let totalPrice = productsCart.reduce((total, product) => {
            total += +product?.productId?.price?.replace(/\./g, '') * product?.quantity
            return total;
        }, 0)
        return totalPrice.toLocaleString('vi-VN')
    })
    const [dataForm, setDataForm] = useState({
        email: "",
        name: "",
        phone: "",
        address: "",
        city: "",
        district: "",
        note: ""
    })
    const handleOnChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setDataForm((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
    }
    console.log('dataForm: ', dataForm)
    return (
        <div className='w-[1260px] px-[28px] mx-auto flex'>
            <div className='px-[28px] pt-[28px] w-[70%] border-r'>
                <Link to={'/'} className='text-[#2a9dcc] text-[28px] hover:text-[#2a6395] cursor-pointer inline-block pb-[10px]'>Delta Shoes</Link>
                <div className='flex'>
                    <div className='px-[14px] flex-1'>
                        <div className='text-[18px] font-bold '>
                            Thông tin nhận hàng
                        </div>
                        <div className='py-[5px] '>
                            <label htmlFor='email' className='px-[11px] text-[#999]'>Email</label>
                            <input
                                type='text' id='email' name='email'
                                value={dataForm.email}
                                onChange={handleOnChange}
                                className='w-full h-[40px] border border-solid border-[#d9d9d9] bg-white px-[11px] py-[13px] rounded focus-within:outline-blue-300'
                            />
                        </div>
                        <div className='py-[5px] '>
                            <label htmlFor='name' className='px-[11px] text-[#999]'>Họ và tên</label>
                            <input
                                type='text' id='name' name='name'
                                value={dataForm.name}
                                onChange={handleOnChange}
                                className='w-full h-[40px] border border-solid border-[#d9d9d9] bg-white px-[11px] py-[13px] rounded focus-within:outline-blue-300'
                            />
                        </div>
                        <div className='py-[5px] '>
                            <label htmlFor='phone' className='px-[11px] text-[#999]'>Số điện thoại</label>
                            <input
                                type='text' id='phone' name='phone'
                                value={dataForm.phone}
                                onChange={handleOnChange}
                                className='w-full h-[40px] border border-solid border-[#d9d9d9] bg-white px-[11px] py-[13px] rounded focus-within:outline-blue-300'
                            />
                        </div>
                        <div className='py-[5px] '>
                            <label htmlFor='address' className='px-[11px] text-[#999]'>Địa chỉ</label>
                            <input
                                type='text' id='address' name='address'
                                value={dataForm.address}
                                onChange={handleOnChange}
                                className='w-full h-[40px] border border-solid border-[#d9d9d9] bg-white px-[11px] py-[13px] rounded focus-within:outline-blue-300'
                            />
                        </div>
                        <div className='py-[5px] '>
                            <label htmlFor='city' className='px-[11px] text-[#999]'>Tỉnh thành</label>
                            <select
                                name="city" id="city"
                                onChange={handleOnChange}
                                className='w-full h-[40px] border border-solid border-[#d9d9d9] bg-white px-[11px]  rounded focus-within:outline-blue-300'
                            >
                                <option selected value="">---</option>
                                <option value="Hà Nội">Hà Nội</option>
                                <option value="Đà Nẵng">Đà Nẵng</option>
                                <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                            </select>
                        </div>
                        <div className='py-[5px] '>
                            <label htmlFor='district' className='px-[11px] text-[#999]'>Quận huyện</label>
                            <select
                                name="district" id="district"
                                onChange={handleOnChange}
                                className='w-full h-[40px] border border-solid border-[#d9d9d9] bg-white px-[11px]  rounded focus-within:outline-blue-300'
                            >
                                <option selected value="">---</option>
                                <option value="Hà Nội">Nam Từ Liêm</option>
                                <option value="Đà Nẵng">Thanh Khê</option>
                                <option value="Hồ Chí Minh">Bình Thạnh</option>
                            </select>
                        </div>
                    </div>
                    <div className='px-[14px] flex-1'>
                        <div className='text-[18px] font-bold '>
                            Vận chuyển
                        </div>

                        <div className='h-[40px] flex items-center mt-[28px] text-[14px] bg-[#d1ecf1] border border-solid border-[#d1ecf1] rounded px-[20px] py-[12px]'>
                            Vui lòng nhập thông tin giao hàng
                        </div>
                        <div className='mt-[24px]'>
                            <div className='text-[18px] font-bold mb-[10px]'>
                                Thanh toán
                            </div>
                            <label htmlFor='checkout'>
                                <div className='flex items-center h-[68px] p-[14px] border border-solid border-[#d9d9d9] rounded cursor-pointer'>
                                    <input type='radio' id='checkout' className='w-[18px] h-[18px] '></input>
                                    <div className='text-[#999] mb-[2px] ml-[8px] flex-1'>Thanh toán khi giao hàng (COD)</div>
                                    <FaRegMoneyBillAlt className='w-[18px] h-[18px] '></FaRegMoneyBillAlt>
                                </div>
                            </label>
                        </div>

                    </div>
                </div>
            </div>
            <div className='w-[30%] '>
                <div className='text-[18px] font-bold h-[60px] flex items-center border-b px-[24px]'>
                    Đơn hàng ({totalQuantity} sản phẩm)
                </div>
                <div className='h-[145px] ml-[24px] overflow-auto border-b'>
                    {/* từng item  */}
                    {
                        productsCart.map(product => {
                            return (
                                <div key={product.productId._id} className='flex flex-col gap-[12px] py-[20px]'>
                                    <div className='pr-[24px]  flex items-center'>
                                        <Link className='relative inline-block w-[50px] h-[50px] border rounded-[8px]'>
                                            <img className='w-full h-full rounded-[8px]' src={product.productId.image[0]} alt=''></img>
                                            <div className='absolute top-[-10px] right-[-10px] w-[20px] h-[20px] flex items-center justify-center text-white text-[13px] bg-[#2a9dcc] rounded-full'>{product.quantity}</div>
                                        </Link>
                                        <div className='text-[#333333] text-[14px] flex-1 pl-[4px]'>{product.productId.name}</div>
                                        <div className='text-[#717171] text-[14px]'>1{product.productId.price}₫</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='ml-[24px] flex gap-[12px] border-b py-[20px]'>
                    <input
                        type='text' id='address' name='address' placeholder='Nhập mã giảm giá'
                        value={dataForm.address}
                        onChange={handleOnChange}
                        className='w-[170px] h-[40px] flex-1 border border-solid border-[#d9d9d9] bg-white px-[11px] py-[13px] rounded focus-within:outline-blue-300'
                    />

                    <div className='w-[100px] h-[40px] border border-solid border-[#d9d9d9] bg-[#357ebd] text-[14px] flex items-center justify-center text-white rounded focus-within:outline-blue-300'>
                        Áp dụng
                    </div>
                </div>
                <div className='border-b border-[#717171] py-[20px] ml-[24px]'>
                    <div className='flex justify-between py-[5px] text-[#717171] text-[15px]'>
                        <span>Tạm tính</span>
                        <span>{totalPrice}₫</span>

                    </div>
                    <div className='flex justify-between py-[5px] text-[#717171] text-[15px]'>
                        <span>Phí vận chuyển</span>
                        <span>0₫</span>
                    </div>
                </div>
                <div className=' py-[15px] ml-[24px] flex justify-between'>
                    <span className='text-[#717171] text-[17px]'>Tổng cộng</span>
                    <span className='text-[#2a9dcc] text-[22px]'>{totalPrice}₫</span>
                </div>
                <div className='flex justify-between ml-[24px]'>
                    <span className='text-[#2a9dcc] text-[14px] cursor-pointer flex items-center'>
                        <IoChevronBack className='mt-[2px]'></IoChevronBack>
                        Quay về giỏ hàng
                    </span>
                    <div className='w-[121px] h-[40px] border border-solid border-[#d9d9d9] cursor-pointer bg-[#357ebd] text-[14px] flex items-center justify-center text-white rounded focus-within:outline-blue-300'>
                        ĐẶT HÀNG
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout