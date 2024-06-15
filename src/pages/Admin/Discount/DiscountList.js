import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDiscountsAPI, deleteDiscountAPI } from '../../../apis'; // Cần tạo các hàm này trong `apis.js`
import { IoAddCircleOutline, IoTrashOutline, IoCreateOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

function DiscountList() {
    const [discounts, setDiscounts] = useState([]);

    useEffect(() => {
        getDiscountsAPI().then(dataRes => setDiscounts(dataRes.data));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa khuyến mãi này không?')) {
            deleteDiscountAPI(id).then((dataRes) => {
                setDiscounts(discounts.filter(discount => discount._id !== id));
                if(dataRes.data) {
                    toast.success('Xóa mã giảm giá thành công')

                } else {
                    toast.error('Xóa mã giảm giá thất bại')

                }
            });
        }
    };

    return (
        <div className='ml-[230px] w-[calc(100%-230px)] pt-[52px] h-full px-[30px]'>
            <div className='ml-[2px] text-[22px] font-[500] h-[65px] flex items-center justify-between'>
                <div>Quản lý khuyến mãi</div>
                <Link to="/admin/discounts/create">
                    <div className='flex items-center justify-center gap-[6px] w-[184px] h-[36px] bg-[#0088FF] text-white text-[16px] rounded-[6px] cursor-pointer'>
                        <IoAddCircleOutline className='text-[20px]' />
                        <span className='mb-[2px]'>Tạo Khuyến Mãi</span>
                    </div>
                </Link>
            </div>
            <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full bg-white rounded-[6px]'>
                <div className='p-4'>
                    <table className='w-full border-collapse'>
                        <thead>
                            <tr className='bg-gray-100'>
                                <th className='border border-gray-300 px-4 py-2 text-left'>Tên mã giảm giá</th>
                                <th className='border border-gray-300 px-4 py-2 text-left'>Số tiền giảm</th>
                                <th className='border border-gray-300 px-4 py-2 text-left'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {discounts.map(discount => (
                                <tr key={discount._id}>
                                    <td className='border border-gray-300 px-4 py-2'>{discount.code}</td>
                                    <td className='border border-gray-300 px-4 py-2'>{discount.amount.toLocaleString('vi-VN')}₫</td>
                                    <td className='border border-gray-300 px-4 py-2'>
                                        <div className='flex gap-4'>
                                            <Link 
                                                to={`/admin/discounts/edit/${discount._id}`} 
                                                className='flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-colors duration-200'
                                            >
                                                <IoCreateOutline className='text-[20px]' />
                                                <span>Sửa</span>
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(discount._id)} 
                                                className='flex items-center gap-2 text-red-500 hover:text-red-700 transition-colors duration-200'
                                            >
                                                <IoTrashOutline className='text-[20px]' />
                                                <span>Xóa</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default DiscountList;