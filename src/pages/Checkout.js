import { Box } from '@mui/material'
import TextField from '@mui/material/TextField'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { IoChevronBack } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { createOrderAPI, createPaymentUrl, getAllProvince, getBrandById, applyDiscountAPI } from '../apis';
import { toast } from 'react-toastify'
function Checkout() {
    const productsCart = useSelector(state => state.cart.data)
    const userData = useSelector(state => state.user.data)
    const navigate = useNavigate()
    const [provinceAll, setProvinceAll] = useState([])
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [discountValue, setDiscountValue] = useState('')
    const [displayDiscount, setDisplayDiscount] = useState(false)

    const [total, setTotal] = useState(() => {
        let totalPrice = productsCart.reduce((total, product) => {
            total += +product?.productId?.price?.replace(/\./g, '') * product?.quantity
            return total;
        }, 0)
        return (totalPrice + 40000).toLocaleString('vi-VN')
    })
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
    console.log('total: ', total)
    const [dataForm, setDataForm] = useState({
        email: "",
        name: "",
        phone: "",
        address: "",
        city: "",
        district: "",
        ward: "",
        shippingFee: '40.000',
        discountCode: "",
        discount: "",
        paymentMethod: "",
        productsOrder: productsCart?.map(product => {
            return {
                name: product.productId.name,
                image: product.productId.image[product.imageCurrent],
                // price: (product.productId.size.find(size => size.size === product.productSize)).price,
                price: product.productId.price,
                quantity: product.quantity,
                size: product.productSize,
                brandId: product.productId.brand_id,
            }
        }),
        totalPrice: total,
        userId: userData.user_id ?? userData._id
    })

    const handleDiscount = () => {
        applyDiscountAPI(dataForm.discountCode).then(dataRes => {
            if (dataRes.data) {
                setDisplayDiscount(true)
                const priceTotal = (Number(total.replace(/\./g, '')) - Number(dataRes.data.amount.replace(/\./g, ''))).toLocaleString('vi-VN')
                setDataForm(prev => {
                    return {
                        ...prev,
                        discount: dataRes.data.amount,
                        totalPrice: priceTotal
                    }
                })
                setTotal(priceTotal)
                toast.success('Áp dụng mã giảm giá thành công')
            } else {
                toast.error('Mã giảm giá không hợp lệ')
                const priceTotal = (Number(totalPrice.replace(/\./g, '')) + 40000).toLocaleString('vi-VN')

                setDataForm(prev => {
                    return {
                        ...prev,
                        discount: "",
                        totalPrice: priceTotal
                    }
                })
                setTotal(priceTotal)

            }
        }).catch(err => {
            const priceTotal = (Number(totalPrice.replace(/\./g, '')) + 40000).toLocaleString('vi-VN')
            toast.error('Mã giảm giá không hợp lệ')

            setDataForm(prev => {
                return {
                    ...prev,
                    discount: "",
                    totalPrice: priceTotal
                }
            })
            setTotal(priceTotal)
        })
    }
    const handleOnChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setDataForm((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })
        if (name === 'city') {
            setDistricts(
                provinceAll.find(province => province.Name === value).District
            )
            setDataForm(prev => {
                return {
                    ...prev,
                    district: '',
                    ward: ''
                }
            })
        }
        if (name === 'district') {
            setWards(
                districts.find(district => district.FullName === value).Ward
            )
            setDataForm(prev => {
                return {
                    ...prev,
                    ward: ''
                }
            })
        }
    }
    const handleOrder = () => {

        if (dataForm.email && dataForm.name && dataForm.phone && dataForm.address && dataForm.city && dataForm.district && dataForm.paymentMethod && dataForm.ward && dataForm.shippingFee && dataForm.productsOrder && dataForm.totalPrice && dataForm.userId) {
            if (dataForm.paymentMethod === 'VNPAY') {
                createOrderAPI(dataForm).then((dataRes) => {
                    if (dataRes.data) {
                        const amount = dataRes.data.totalPrice.replace(/\./g, '')
                        const orderId = dataRes.data._id
                        createPaymentUrl(amount, orderId).then(dataRes => {
                            const urlPayment = dataRes.data
                            if (urlPayment) {
                                window.location.href = urlPayment
                            }
                            else {
                                console.log('loi server')
                            }
                        }).catch(err => console.error(err))
                    }
                })
                    .catch(err => console.error(err))

            } else {
                createOrderAPI(dataForm).then((dataRes) => {
                    console.log('dataRes2: ', dataRes)
                    navigate(`/order/status?orderId=${dataRes.data._id}&success=true`)

                }).catch(err => {
                    console.error(err)
                    navigate(`/order/status?success=false`)
                })
            }

        } else {
            toast.warning('Vui lòng điền đầy đủ thông tin để đặt hàng')
        }
    }

    useEffect(() => {
        getAllProvince().then(dataRes => {
            setProvinceAll(dataRes.data)
        }).catch(err => {
            console.log('error', err)
        })
    }, [])
    console.log('dataForm: ', dataForm)
    return (
        <div className='w-[1260px] px-[28px] mx-auto flex'>
            <div className='px-[28px] pt-[8px] pb-[40px] w-[70%] border-r'>
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
                                {
                                    provinceAll?.map(province => {
                                        return (
                                            <option key={province.Code} value={province.Name}>{province.Name}</option>
                                        )
                                    })
                                }
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
                                {
                                    districts?.map(district => {
                                        return (
                                            <option key={district.Code} value={district.FullName}>{district.FullName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='py-[5px] '>
                            <label htmlFor='ward' className='px-[11px] text-[#999]'>Phường Xã</label>
                            <select
                                name="ward" id="ward"
                                onChange={handleOnChange}
                                className='w-full h-[40px] border border-solid border-[#d9d9d9] bg-white px-[11px]  rounded focus-within:outline-blue-300'
                            >
                                <option selected value="">---</option>
                                {
                                    wards?.map(ward => {
                                        return (
                                            <option key={ward.Code} value={ward.FullName}>{ward.FullName}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className='px-[14px] flex-1'>
                        <div className='text-[18px] font-bold '>
                            Vận chuyển
                        </div>

                        <div className='h-[40px] flex items-center mt-[28px] text-[14px] bg-[transparent] border border-solid border-[#d1ecf1] rounded px-[20px] py-[12px]'>
                            <input type='radio' id='shippingFee' checked={true} className='w-[18px] h-[18px] '></input>
                            <div className='mb-[2px] ml-[8px] flex-1'>Giao hàng tận nơi</div>
                            <div>{dataForm?.shippingFee}₫</div>
                        </div>
                        <div className='mt-[24px]'>
                            <div className='text-[18px] font-bold mb-[10px]'>
                                Thanh toán
                            </div>
                            <form >
                                <label htmlFor='Postpaid'>
                                    <div className='flex items-center h-[68px] p-[14px] border border-solid border-[#d9d9d9] rounded cursor-pointer'>
                                        <input onChange={handleOnChange} value={'Postpaid'} name="paymentMethod" type='radio' id='Postpaid' className='w-[18px] h-[18px] '></input>
                                        <div className='text-[#999] mb-[2px] ml-[8px] flex-1'>Thanh toán khi giao hàng (COD)</div>
                                        <FaRegMoneyBillAlt className='w-[18px] h-[18px] '></FaRegMoneyBillAlt>
                                    </div>
                                </label>
                                <label htmlFor='VNPAY'>
                                    <div className='flex items-center h-[68px] p-[14px] mt-[20px] border border-solid border-[#d9d9d9] rounded cursor-pointer'>
                                        <input onChange={handleOnChange} value={'VNPAY'} name="paymentMethod" type='radio' id='VNPAY' className='w-[18px] h-[18px] '></input>
                                        <div className='text-[#999] mb-[2px] ml-[8px] flex-1'>Thanh toán bằng VNPAY</div>
                                        <FaRegMoneyBillAlt className='w-[18px] h-[18px] '></FaRegMoneyBillAlt>
                                    </div>
                                </label>

                            </form>
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
                        productsCart?.map(product => {
                            return (
                                <div key={`${product.productId._id}${product.productSize}${product.imageCurrent}`} className='flex flex-col gap-[12px] py-[20px]'>
                                    <div className='pr-[24px]  flex items-center'>
                                        <Link className='relative inline-block w-[50px] h-[50px] border rounded-[8px]'>
                                            <img className='w-full h-full rounded-[8px]' src={product.productId.image[product.imageCurrent]} alt=''></img>
                                            <div className='absolute top-[-10px] right-[-10px] w-[20px] h-[20px] flex items-center justify-center text-white text-[13px] bg-[#2a9dcc] rounded-full'>{product.quantity}</div>
                                        </Link>
                                        <div className='text-[#333333] text-[14px] flex-1 pl-[4px]'>{product.productId.name} {product?.productSize}</div>
                                        <div className='text-[#717171] text-[14px]'>{(product?.productId?.price?.replace(/\./g, '') * Number(product?.quantity)).toLocaleString('vi-VN')}₫</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='ml-[24px] flex gap-[12px] border-b py-[20px]'>
                    <input
                        type='text' id='discountCode' name='discountCode' placeholder='Nhập mã giảm giá'
                        value={dataForm.discountCode}
                        onChange={handleOnChange}
                        className='w-[170px] h-[40px] flex-1 border border-solid border-[#d9d9d9] bg-white px-[11px] py-[13px] rounded focus-within:outline-blue-300'
                    />

                    <div onClick={handleDiscount} className='w-[100px] h-[40px] border border-solid border-[#d9d9d9] bg-[#357ebd] text-[14px] flex items-center justify-center text-white rounded focus-within:outline-blue-300 cursor-pointer'>
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
                        <span>{dataForm.shippingFee}₫</span>
                    </div>
                    {
                        displayDiscount && (
                            <div className='flex justify-between py-[5px] text-[#717171] text-[15px]'>
                                <span>Mã giảm giá</span>
                                <span>- {dataForm.discount}₫</span>
                            </div>
                        )
                    }

                </div>
                <div className=' py-[15px] ml-[24px] flex justify-between'>
                    <span className='text-[#717171] text-[17px]'>Tổng cộng</span>
                    <span className='text-[#2a9dcc] text-[22px]'>{total}₫</span>
                </div>
                <div className='flex justify-between ml-[24px]'>
                    <Link to={'/cart'}>
                        <span className='text-[#2a9dcc] text-[14px] cursor-pointer flex items-center'>
                            <IoChevronBack className='mt-[2px]'></IoChevronBack>
                            Quay về giỏ hàng
                        </span>
                    </Link>
                    <div onClick={handleOrder} className='w-[121px] h-[40px] border border-solid border-[#d9d9d9] cursor-pointer bg-[#357ebd] text-[14px] flex items-center justify-center text-white rounded focus-within:outline-blue-300'>
                        ĐẶT HÀNG
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout