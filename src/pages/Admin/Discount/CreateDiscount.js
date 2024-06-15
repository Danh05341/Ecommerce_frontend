import React, { useState } from 'react';
import { IoAddCircleOutline } from "react-icons/io5";
import { createDiscountAPI } from '../../../apis'; // Thay thế bằng API của bạn
import { formatCurrency } from '../../../util/formatCurency';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
function CreateDiscount() {
    const [code, setCode] = useState('');
    const [amount, setAmount] = useState('');
    const navigate = useNavigate()
    const handleCreateDiscount = async () => {
        try {
            // Gọi API tạo khuyến mãi với code và amount
            const response = await createDiscountAPI({ code, amount });

            console.log('Khuyến mãi đã được tạo:', response);
            if (response.data) {
                navigate('/admin/discounts');
                toast.success('Tạo mã giảm giá thành công')
            } else {
                toast.error('Tạo mã giảm giá thất bại')

            }

        } catch (error) {
            console.error('Lỗi khi tạo khuyến mãi:', error);
            toast.error('Tạo mã giảm giá thất bại')

            // Xử lý lỗi nếu cần thiết
        }
    };
    // Hàm xử lý khi người dùng thay đổi giá trị của số tiền
    const handleAmountChange = (value) => {
        setAmount(formatCurrency(value));
    };

    return (
        <div className='ml-[230px] w-[calc(100%-230px)] pt-[52px] h-full px-[30px]'>
            <div className='ml-[2px] text-[22px] font-[500] h-[65px] flex items-center justify-between'>
                <div>Tạo mới khuyến mãi</div>
            </div>
            <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full bg-white rounded-[6px] p-[30px]'>
                <div className='flex flex-col gap-y-[20px]'>
                    <div className='flex items-center gap-x-[20px]'>
                        <label className='w-[120px] font-[500] text-[16px]'>Mã khuyến mãi:</label>
                        <div className='flex border w-[240px] border-[#0088FF] rounded-[6px] text-[#0088FF] font-[600] bg-[white] '>

                            <input
                                type='text'
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className='flex-1 h-[36px] px-[10px] rounded-[6px] outline-none'
                                placeholder='Nhập mã khuyến mãi...'
                            />
                        </div>
                    </div>
                    <div className='flex items-center gap-x-[20px] '>
                        <label className='w-[120px] font-[500] text-[16px]'>Số tiền giảm giá:</label>
                        <div className='flex border w-[240px] border-[#0088FF] rounded-[6px] text-[#0088FF] font-[600] bg-[white] '>
                            <input
                                value={amount}
                                onChange={(e) => handleAmountChange(e.target.value)}
                                className='flex-1 h-[36px] px-[10px]  rounded-[6px] outline-none'
                                placeholder='Nhập số tiền giảm giá...'
                            />
                            <div className='w-[30px] h-[34px] flex justify-center items-center text-[#747c87] select-none'>₫</div>

                        </div>
                    </div>
                </div>
                <div className='flex justify-end mt-[20px]'>
                    <button
                        onClick={handleCreateDiscount}
                        className='flex items-center justify-center gap-[6px] w-[120px] h-[36px] bg-[#0088FF] text-white text-[16px] rounded-[6px] cursor-pointer'
                    >
                        <IoAddCircleOutline className='text-[20px]' />
                        <span className='mb-[2px]'>Tạo</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateDiscount;