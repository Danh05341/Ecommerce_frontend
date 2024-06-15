import React, { useState } from 'react';
import { IoAddCircleOutline } from 'react-icons/io5';
import { createCustomerAPI } from '../../../apis'; // Cần tạo các hàm này trong `apis.js`
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
function CreateCustomer() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Khởi tạo giá trị mặc định cho role là 'user'
    const navigate = useNavigate()
    const handleCreateCustomer = async () => {

        try {
            if (name && email && password && role) {
                const response = await createCustomerAPI({ name, email, password, role });
                console.log('Khách hàng đã được tạo:', response);
                if (response.data) {
                    toast.success('Tạo mới user thành công')
                    navigate('/admin/customers')
                } else {
                    toast.error('Tạo mới user thất bại ')
                }
            } else {
                toast.warning('Vui lòng nhập đủ thông tin')
            }

        } catch (error) {
            console.error('Lỗi khi tạo khách hàng:', error);
            toast.error('Tạo mới user thất bại ')
            // Xử lý lỗi nếu cần thiết
        }
    };

    return (
        <div className='ml-[230px] w-[calc(100%-230px)] pt-[52px] h-full px-[30px]'>
            <div className='ml-[2px] text-[22px] font-[500] h-[65px] flex items-center justify-between'>
                <div>Tạo mới khách hàng</div>
            </div>
            <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full bg-white rounded-[6px] p-[30px]'>
                <div className='flex flex-col gap-y-[20px]'>
                    <div className='flex items-center gap-x-[20px]'>
                        <label className='w-[120px] font-[500] text-[16px]'>Tên khách hàng:</label>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='flex-1 h-[36px] px-[10px] border border-[#D3D5D7] rounded-[6px] outline-none'
                            placeholder='Nhập tên khách hàng...'
                        />
                    </div>
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
                        <label className='w-[120px] font-[500] text-[16px]'>Mật khẩu:</label>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='flex-1 h-[36px] px-[10px] border border-[#D3D5D7] rounded-[6px] outline-none'
                            placeholder='Nhập mật khẩu...'
                        />
                    </div>
                    <div className='flex items-center gap-x-[20px]'>
                        <label className='w-[120px] font-[500] text-[16px]'>Role:</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className='flex-1 h-[36px] px-[10px] border border-[#D3D5D7] rounded-[6px] outline-none'
                        >
                            <option value='user'>User</option>
                            <option value='admin'>Admin</option>
                        </select>
                    </div>
                </div>
                <div className='flex justify-end mt-[20px]'>
                    <button
                        onClick={handleCreateCustomer}
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

export default CreateCustomer;