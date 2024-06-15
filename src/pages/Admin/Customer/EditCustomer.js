import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCustomerAPI, updateCustomerAPI } from '../../../apis'; // Cần tạo các hàm này trong `apis.js`
import { IoSaveOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

function EditCustomer() {
    const { id } = useParams();
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user'); // Khởi tạo giá trị mặc định cho role là 'user'
    const navigate = useNavigate()

    useEffect(() => {
        // Lấy thông tin khách hàng hiện tại
        getCustomerAPI(id).then(dataRes => {
            setEmail(dataRes.data.email);
            setRole(dataRes.data.role);
        });
    }, [id]);

    const handleUpdateCustomer = async () => {
        try {
            // Gọi API cập nhật khách hàng
            const response = await updateCustomerAPI(id, { email, role });
            if (response.data) {
                toast.success('Cập nhật user thành công')
                navigate('/admin/customers')
            } else {
                toast.error('Cập nhật user thất bại ')
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật khách hàng:', error);
            toast.error('Cập nhật user thất bại ')

            // Xử lý lỗi nếu cần thiết
        }
    };

    return (
        <div className='ml-[230px] w-[calc(100%-230px)] pt-[52px] h-full px-[30px]'>
            <div className='ml-[2px] text-[22px] font-[500] h-[65px] flex items-center justify-between'>
                <div>Chỉnh sửa khách hàng</div>
            </div>
            <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full bg-white rounded-[6px] p-[30px]'>
                <div className='flex flex-col gap-y-[20px]'>
                    <div className='flex items-center gap-x-[20px]'>
                        <label className='w-[120px] font-[500] text-[16px]'>Email:</label>
                        <input
                            type='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='flex-1 h-[36px] px-[10px] border border-[#D3D5D7] rounded-[6px] outline-none'
                            placeholder='Nhập email...'
                        />
                    </div>
                    <div className='flex items-center gap-x-[20px]'>
                        <label className='w-[120px] font-[500] text-[16px]'>Role:</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className='flex-1 h-[36px] px-[10px] border border-[#D3D5D7] rounded-[6px] outline-none'
                        >
                            <option value='user'>user</option>
                            <option value='admin'>admin</option>
                        </select>
                    </div>
                </div>
                <div className='flex justify-end mt-[20px]'>
                    <button
                        onClick={handleUpdateCustomer}
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

export default EditCustomer;