import React, { useEffect, useState } from 'react'
import SideBar from '../../../components/Admin/SideBarAdmin'
import { fetchProductAPI, updateProductAPI } from '../../../apis';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { MenuItem, Select } from '@mui/material';
import { formatCurrency } from '../../../util/formatCurency';
import { toast } from 'react-toastify';
import lodash from 'lodash';

const SIZE = ['36', '37', '38', '39', '40', '41', '42', '43', '44']

function AddProductVariant() {
    const [inputValue, setInputValue] = useState(false)
    const [product, setProduct] = useState();
    const [size, setSize] = useState();
    const [quantity, setQuantity] = useState();
    const [price, setPrice] = useState();
    const slug = useParams()

    useEffect(() => {
        fetchProductAPI(slug.id, '').then((dataRes) => {
            setProduct(dataRes.data)
        })
    }, [slug.id])
    useEffect(() => {
        if (size && quantity && price) {
            setInputValue(true)
        } else {
            setInputValue(false)
        }
    }, [size, quantity, price]);
    const handleChangeSize = (event) => {
        let value = event.target.value;
        setSize(value)
    }
    const handleChangeQuantity = (event) => {
        let inputValue = event.target.value;
        if (inputValue.length === 0 || inputValue === '00') {
            return setQuantity('0')
        }
        // Xóa các ký tự không phải số
        const cleanValue = inputValue.replace(/\D/g, '');
        // Loại bỏ các số 0 ở đầu
        const noLeadingZeros = cleanValue.replace(/^0+/, '');
        setQuantity(noLeadingZeros)
    }
    const handleChangePrice = (event) => {
        let inputValue = event.target.value;
        if (inputValue.length === 0 || inputValue === '00') {
            return setPrice('0')
        }
        const price = formatCurrency(inputValue)
        setPrice(price)
    }

    const handleSubmitAdd = () => {
        if (size && quantity && price) {
            if (product?.size.find(item => item.size === size)) {
                return toast.error('Kích thước đã tồn tại')
            }
            const productClone = lodash.cloneDeep(product)
            productClone?.size.push({
                size,
                quantity,
                price
            })
            setProduct(productClone)
            const total = productClone.total + Number(quantity)
            console.log('totalAđ', total)

            toast.success('Thêm phiên bản thành công')
            // gọi api cập nhật product
            updateProductAPI(product?._id, { size: productClone?.size, total, status: total > 0 ? 'true' : product?.status }).then((dataRes) => {
                setProduct(dataRes.data)
            })
        }
    };
    return (
        <div className='flex'>
            <SideBar />

            <main className='bg-[#F9F9F9] min-h-[calc(100vh)] flex-1'>
                <div className='w-[full] h-full'>
                    {/* Header */}
                    <div style={{ boxShadow: '0px 2px 2px -1px rgba(0, 0, 0, 0.15)' }} className='fixed left-[230px] w-[calc(100%-230px)] h-[52px] bg-white flex items-center justify-between px-[30px]'>
                        <div className='h-[76px] flex flex-1 items-center justify-end gap-[15px] px-[20px] select-none '>
                            <Link to={`/admin/products/${product?.slug}`}>
                                <div className='flex items-center justify-center w-[60px] h-[36px] border border-[#0088FF] rounded-[6px] font-[600] text-[14px] text-[#0088FF] cursor-pointer hover:bg-[#F2F9FF]'>Hủy</div>
                            </Link>
                            <div onClick={handleSubmitAdd} className={`flex items-center justify-center w-[142px] h-[36px] rounded-[6px] font-[600] text-[14px] ${inputValue ? 'text-white bg-[#0088FF] hover:bg-[#33A0FF] cursor-pointer' : 'bg-[#F3F4F5] text-[#747c87] cursor-not-allowed '}`}>Thêm phiên bản</div>
                        </div>
                    </div>
                    <div className='w-[calc(100%-230px)] h-full ml-[230px] pt-[52px] px-[30px] pb-[200px]'>
                        <div className='ml-[2px] text-[22px] font-[500] h-[65px] flex gap-[16px] items-center'>
                            <Link to={`/admin/products/${product?.slug}`}>
                                <div className='h-[36px] w-[36px] bg-white flex items-center justify-center rounded-[6px] border border-[#D3D5D7] cursor-pointer'>
                                    <FaArrowLeftLong className='text-[14px] text-[#747C87]' />
                                </div>
                            </Link>
                            <div>Thêm phiên bản "{product?.name}"</div>
                        </div>
                        {/* Thông tin sản phẩm */}
                        <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full px-[20px] bg-white rounded-[6px]'>
                            <div className='h-[120px] flex gap-[16px] items-center'>
                                <div className='border rounded-[6px]'>
                                    <img className='h-[78px] w-[78px] rounded-[6px]' src={product?.image?.[0]} alt=''></img>
                                </div>
                                <div className=''>
                                    <div className='font-[500]'>{product?.name}</div>
                                    <div className='text-[#747C87]'>{product?.size.length} phiên bản</div>
                                </div>

                            </div>
                        </div>
                        {/* Phiên bản */}
                        <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full mt-[15px] py-[18px] bg-white rounded-[6px]'>
                            {/* Phiên bản */}
                            <div className=' font-[500] px-[20px]'>Phiên bản</div>
                            {
                                product?.size?.map((size, index) => {
                                    return (
                                        <div key={index} className='h-[67px] border-b flex gap-[10px] items-center py-[13px] px-[20px] hover:bg-[#F2F9FF] cursor-pointer'>
                                            <div className='border rounded-[6px]'>
                                                <img className='h-[38px] w-[38px] rounded-[6px]' src={product?.image?.[0]} alt=''></img>
                                            </div>
                                            <div className='flex flex-1'>
                                                <div className='flex-1'>
                                                    <div className='font-[500] text-[#0088FF]'>{size.size}</div>
                                                    <div className='text-[#747C87]'>Có thể bán: <span className='font-[500]'>{size.quantity}</span></div>
                                                </div>
                                                <div className='flex gap-2 items-center'>Giá bán:<span className='font-[500] text-[#0088FF]'>{size.price}₫</span></div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* Thuộc tính */}
                        <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full mt-[15px] px-[20px] py-[18px] bg-white rounded-[6px]'>
                            <div className='font-[500]'>Thuộc tính</div>
                            <div className='mt-[20px]'>
                                <div className='text-[14px] text-[#46515F] font-[500]'>Kích thước</div>
                                <div className='w-[250px]  rounded-[6px]'>
                                    <Select
                                        value={size}
                                        onChange={handleChangeSize}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            marginTop: '10px',
                                            '& .MuiSelect-select': {
                                                paddingY: '7px',
                                            }
                                        }}
                                    >
                                        {
                                            SIZE?.map((size, index) => {
                                                return (
                                                    <MenuItem key={index} value={size}>{size}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </div>
                                <div className='text-[14px] text-[#46515F] font-[500] mt-[16px]'>Số lượng</div>
                                <div className='w-[250px] border-[#D3D5D7] border rounded-[6px] mt-[6px]'>
                                    <input
                                        value={quantity}
                                        onChange={handleChangeQuantity}
                                        maxLength={8}
                                        className='px-[12px] w-full h-[34px] text-[14px] rounded-[6px] bg-[white] focus:outline-[#0088FF]' >

                                    </input>
                                </div>
                                <div className='text-[14px] text-[#46515F] font-[500] mt-[16px]'>Giá bán</div>
                                <div className='w-[250px] border-[#D3D5D7] border rounded-[6px] mt-[6px]'>
                                    <input
                                        value={price}
                                        onChange={handleChangePrice}
                                        maxLength={14}
                                        className='px-[12px] w-full h-[34px] text-[14px] rounded-[6px] bg-[white] focus:outline-[#0088FF]' >
                                    </input>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default AddProductVariant