import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCustomersAPI, deleteCustomerAPI } from '../../../apis'; // Cần tạo các hàm này trong `apis.js`
import { IoAddCircleOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        getCustomersAPI().then(dataRes => setCustomers(dataRes.data));
    }, []);

    const handleDelete = (id) => {
        deleteCustomerAPI(id).then((dataRes) => {
            setCustomers(customers.filter(customer => customer._id !== id));
            if (dataRes.data) {
                toast.success('Xóa user thành công')
                navigate('/admin/customers')
            } else {
                toast.error('Xóa user thất bại ')
            }
        });
    };

    return (
        <div className='ml-[230px] w-[calc(100%-230px)] pt-[52px] h-full px-[30px]'>
            <div className='ml-[2px] text-[22px] font-[500] h-[65px] flex items-center justify-between'>
                <div>Quản lý khách hàng</div>
                <Link to="/admin/customers/create">
                    <div className='flex items-center justify-center gap-[6px] w-[184px] h-[36px] bg-[#0088FF] text-white text-[16px] rounded-[6px] cursor-pointer'>
                        <IoAddCircleOutline className='text-[20px]' />
                        <span className='mb-[2px]'>Tạo Khách Hàng</span>
                    </div>
                </Link>
            </div>
            <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full bg-white rounded-[6px]'>
                <div className='p-4'>
                    <table className='min-w-full divide-y divide-gray-200'>
                        <thead>
                            <tr>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Tên</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Vai trò</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Thời gian tạo</th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {customers.map(customer => (
                                <tr key={customer._id}>
                                    <td className='px-6 py-4 whitespace-nowrap'>{customer.firstName} {customer.lastName}</td>
                                    <td className='px-6 py-4 whitespace-nowrap'>{customer.email}</td>
                                    <td className='px-6 py-4 whitespace-nowrap'>{customer.role}</td>
                                    <td className='px-6 py-4 whitespace-nowrap'>{new Date(customer.createdAt).toLocaleString()}</td>
                                    <td className='px-6 py-4 whitespace-nowrap flex gap-2'>
                                        <Link to={`/admin/customers/edit/${customer._id}`} className='text-blue-500 hover:underline'>Sửa</Link>
                                        <button onClick={() => handleDelete(customer._id)} className='text-red-500 hover:underline'>Xóa</button>
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

export default CustomerList;