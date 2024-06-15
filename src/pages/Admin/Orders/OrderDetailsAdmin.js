import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Link, useParams } from 'react-router-dom'
import { getOrderDetailsAPI, updateOrderAPI } from '../../../apis'
import { toast } from 'react-toastify'

function OrderDetails() {
    const { id } = useParams()
    const [order, setOrder] = useState()
   
    const [newStatus, setNewStatus] = useState('');
    const [updating, setUpdating] = useState(false);
    const [newPaymentStatus, setNewPaymentStatus] = useState('');
    useEffect(() => {
        getOrderDetailsAPI(id).then(dataRes => {
            setOrder(dataRes.data)
            setNewStatus(dataRes.data.proccesingStatus)
            setNewPaymentStatus(dataRes.data.status)
        }).catch(error => console.error(error))
    }, [id])
    const handleStatusChange = async () => {
        if (!newStatus || updating) return;
        setUpdating(true);

        try {
            const updatedOrder = { ...order, proccesingStatus: newStatus };
            setOrder(updatedOrder);
            const data = await updateOrderAPI(id, {proccesingStatus: newStatus});
            toast.success('Cập nhật trạng thái xử lí thành công')
        } catch (error) {
            console.error(error);
        } finally {
            setUpdating(false);
        }
    };
    const handlePaymentStatusChange = async () => {

        if (!newPaymentStatus || updating) return;
        setUpdating(true);

        try {
            const updatedOrder = { ...order, status: newPaymentStatus };
            setOrder(updatedOrder);
            toast.success('Cập nhật trạng thái thanh toán thành công')
            await updateOrderAPI(id, { status: newPaymentStatus });
        } catch (error) {
            console.error(error);
        } finally {
            setUpdating(false);
        }
    };
    const getStatusProcessing = (status) => {
        switch (status) {
            case 'unconfirmed':
                return 'Đang chờ xác nhận';
            case 'delivering':
                return 'Chờ giao hàng';
            case 'finish':
                return 'Đã hoàn thành';
            case 'unpaid':
                return 'Chưa thanh toán';
            case 'cancel':
                return 'Đã hủy';
            default:
                return status;
        }
    };
    const statusOptions = {
        unconfirmed: ['delivering', 'finish', 'cancel'],
        delivering: ['finish', 'cancel'],
        finish: [],
        cancel: []
    };
    const allStatusOptions = ['unconfirmed', 'delivering', 'finish', 'cancel'];
    return (
        <div className='w-[calc(100%-230px)] h-full ml-[230px] pt-[52px] px-[30px]'>

            <div className='ml-[2px] text-[22px] font-[500] h-[65px] flex gap-[16px] items-center'>
                <Link to={'/admin/orders'}>
                    <div className='h-[36px] w-[36px] bg-white flex items-center justify-center rounded-[6px] border border-[#D3D5D7] cursor-pointer'>
                        <FaArrowLeftLong className='text-[14px] text-[#747C87]' />
                    </div>
                </Link>
                <div>Chi tiết đơn hàng</div>
            </div>
            <div className=''>
                {order && (
                    <div className='bg-white shadow-xl rounded-lg p-6'>
                        <h2 className='text-xl font-semibold mb-4'>Thông tin đơn hàng</h2>
                        {/* Thông tin đơn hàng */}
                        <div>
                            <p className='mb-2'><strong>Người đặt hàng:</strong> {order.name}</p>
                            <p className='mb-2'><strong>Email:</strong> {order.email}</p>
                            <p className='mb-2'><strong>Địa chỉ:</strong> {order.address}, {order.ward}, {order.district}, {order.province}</p>
                            <p className='mb-2'><strong>Số điện thoại:</strong> {order.phone}</p>
                            <p className='mb-2'><strong>Phí vận chuyển:</strong> {order.shippingFee}₫</p>
                            {order.discountCode && <p className='mb-2'><strong>Mã giảm giá:</strong> {order.discountCode}</p>}
                            <p className='mb-2'><strong>Tổng giá trị đơn hàng:</strong> {order.totalPrice}₫</p>
                            <p className='mb-2'><strong>Phương thức thanh toán:</strong> {order.paymentMethod === 'Postpaid' ? 'Thanh toán khi nhận hàng' : 'VNPAY'}</p>
                            {order.discountAmount && <p className='mb-2'><strong>Số tiền giảm:</strong> {order.discountAmount}₫</p>}
                            <p className='mb-2'><strong>Trạng thái:</strong> {order.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán' }</p>
                            <p className='mb-2'><strong>Trạng thái xử lý:</strong> {getStatusProcessing(order.proccesingStatus)}</p>
                        </div>
                        <hr className='my-6 border-gray-300'/>
                        <h2 className='text-xl font-semibold mb-4'>Danh sách sản phẩm</h2>
                        {/* Danh sách sản phẩm */}
                        {order.productsOrder.map((product, index) => (
                            <div key={index} className='flex items-center mb-4'>
                                <img src={product.image} alt={product.name} className='w-24 h-24 object-cover rounded-md mr-4'/>
                                <div>
                                    <p className='text-lg font-semibold'>{product.name}</p>
                                    <p><strong>Giá:</strong> {product.price}₫</p>
                                    <p><strong>Kích thước:</strong> {product.size}</p>
                                    <p><strong>Số lượng:</strong> {product.quantity}</p>
                                </div>
                            </div>
                        ))}
                        {/* Cập nhật trạng thái đơn hàng */}
                        <div className='mb-4'>
                            <label className='block font-semibold mb-2'>Trạng thái xử lý:</label>
                            <select
                                value={newStatus}
                                onChange={(e) => setNewStatus(e.target.value)}
                                className='block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500'
                            >
                                {/* <option value='unconfirmed'>Đang chờ xác nhận</option>
                                <option value='delivering'>Chờ giao hàng</option>
                                <option value='finish'>Đã hoàn thành</option>
                                <option value='cancel'>Đã hủy</option> */}
                                {allStatusOptions.map((status) => (
                                    <option
                                        key={status}
                                        value={status}
                                        disabled={
                                            status !== order.proccesingStatus &&
                                            !statusOptions[order.proccesingStatus]?.includes(status)
                                        }
                                    >
                                        {getStatusProcessing(status)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={handleStatusChange}
                            disabled={updating}
                            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-200 disabled:opacity-50'
                        >
                            Cập nhật trạng thái xử lý
                        </button>
                        {/* <div className='mt-6 mb-4'>
                            <label className='block font-semibold mb-2'>Trạng thái thanh toán:</label>
                            <select
                                value={newPaymentStatus}
                                onChange={(e) => setNewPaymentStatus(e.target.value)}
                                className='block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500'
                            >
                                <option value='pending'>Chưa thanh toán</option>
                                <option value='paid'>Đã thanh toán</option>
                            </select>
                        </div>
                        <button
                            onClick={handlePaymentStatusChange}
                            disabled={updating}
                            className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-200 disabled:opacity-50'
                        >
                            Cập nhật trạng thái thanh toán
                        </button> */}
                    </div>
                )}
            </div>

        </div>
    )
}

export default OrderDetails