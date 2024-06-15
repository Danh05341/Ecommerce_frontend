import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDiscountAPI, updateDiscountAPI } from '../../../apis'; // Cần tạo các hàm này trong `apis.js`
import { formatCurrency } from '../../../util/formatCurency';
import { IoSaveOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

function EditDiscount() {
    const { id } = useParams();
    const [code, setCode] = useState('');
    const [amount, setAmount] = useState('');
    const navigate = useNavigate()
    useEffect(() => {
        // Lấy thông tin khuyến mãi hiện tại
        getDiscountAPI(id).then(dataRes => {
            setCode(dataRes.data.code);
            setAmount(dataRes.data.amount.toString());
        });
    }, [id]);

    const handleUpdateDiscount = async () => {
        try {
            // Gọi API cập nhật khuyến mãi
            const response = await updateDiscountAPI(id, { code, amount });
            // Điều hướng đến trang danh sách khuyến mãi sau khi cập nhật thành công
            if (response.data) {
                navigate('/admin/discounts');
                toast.success('Cập nhật mã giảm giá thành công')
            } else {
                toast.error('Cập nhật mã giảm giá thất bại')
            }

        } catch (error) {
            console.error('Lỗi khi cập nhật khuyến mãi:', error);
            toast.error('Cập nhật mã giảm giá thất bại')

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
                <div>Chỉnh sửa khuyến mãi</div>
            </div>
            <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full bg-white rounded-[6px] p-[30px]'>
                <div className='flex flex-col gap-y-[20px]'>
                    <div className='flex items-center gap-x-[20px]'>
                        <label className='w-[120px] font-[500] text-[16px]'>Mã khuyến mãi:</label>
                        <div className='flex border w-[240px] border-[#0088FF] rounded-[6px] text-[#0088FF] font-[600] bg-[white]'>
                            <input
                                type='text'
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className='flex-1 h-[36px] px-[10px] rounded-[6px] outline-none'
                                placeholder='Nhập mã khuyến mãi...'
                            />
                        </div>
                    </div>
                    <div className='flex items-center gap-x-[20px]'>
                        <label className='w-[120px] font-[500] text-[16px]'>Số tiền giảm giá:</label>
                        <div className='flex border w-[240px] border-[#0088FF] rounded-[6px] text-[#0088FF] font-[600] bg-[white]'>
                            <input
                                value={amount}
                                onChange={(e) => handleAmountChange(e.target.value)}
                                className='flex-1 h-[36px] px-[10px] rounded-[6px] outline-none'
                                placeholder='Nhập số tiền giảm giá...'
                            />
                            <div className='w-[30px] h-[34px] flex justify-center items-center text-[#747c87] select-none'>₫</div>
                        </div>
                    </div>
                </div>
                <div className='flex justify-end mt-[20px]'>
                    <button
                        onClick={handleUpdateDiscount}
                        className='flex items-center justify-center gap-[6px] w-[120px] h-[36px] bg-[#0088FF] text-white text-[16px] rounded-[6px] cursor-pointer'
                    >
                        <IoSaveOutline className='text-[20px]' />
                        <span className='mb-[2px]'>Lưu</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditDiscount