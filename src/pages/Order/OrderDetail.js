import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createPaymentUrl, getOrderDetailsAPI, updateOrderAPI } from '../../apis';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const OrderDetail = () => {
    const { id } = useParams()
    const [order, setOrder] = useState()
    const userData = useSelector(state => state.user.data)
    const [cancelling, setCancelling] = useState(false);
    const [paying, setPaying] = useState(false);
    useEffect(() => {
        getOrderDetailsAPI(id).then(dataRes => {
            setOrder(dataRes.data)
            // setCancelling(dataRes.data.proccesingStatus)
        }).catch(error => console.error(error))
    }, [id])

    const handlePayment = async () => {
        setPaying(true);
        try {
            const amount = order.totalPrice.replace(/\./g, '')
            const orderId = order._id
            const dataRes = await createPaymentUrl(amount, orderId);
            const urlPayment = dataRes.data;
            if (urlPayment) {
                window.location.href = urlPayment;
            } else {
                console.log('Lỗi server');
            }
        } catch (error) {
            console.error(error);
            toast.error('Thanh toán thất bại')
        } finally {
            setPaying(false);
        }
    };
    const handleCancelOrder = async () => {
        if (window.confirm('Bạn có chắc chắn muốn hủy đơn hàng này không?')) {
            setCancelling(true);
            try {
                await updateOrderAPI(id, { proccesingStatus: 'cancel' });
                setOrder(prevOrder => ({ ...prevOrder, proccesingStatus: 'cancel' }));
                alert('Đơn hàng đã được hủy thành công.');
            } catch (error) {
                console.error(error);
                alert('Có lỗi xảy ra khi hủy đơn hàng. Vui lòng thử lại.');
            } finally {
                setCancelling(false);
            }
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
    return (
        <div className='w-[full] h-full px-[65px]'>
            <div className='ml-[2px] text-[22px] font-[500] h-[65px] flex gap-[16px] items-center'>
                <Link to={`/order/user/${userData.user_id ?? userData._id}`}>
                    <div className='h-[36px] w-[36px] bg-white flex items-center justify-center rounded-[6px] border border-[#D3D5D7] cursor-pointer'>
                        <FaArrowLeftLong className='text-[14px] text-[#747C87]' />
                    </div>
                </Link>
                <div>Chi tiết đơn hàng</div>
            </div>
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
                        {(order.discountCode && order.discountAmount) && <p className='mb-2'><strong>Mã giảm giá:</strong> {order.discountCode}</p>}
                        {order.discountAmount && <p className='mb-2'><strong>Số tiền giảm:</strong> {order.discountAmount}₫</p>}
                        <p className='mb-2'><strong>Tổng giá trị đơn hàng:</strong> {order.totalPrice}₫</p>
                        <p className='mb-2'><strong>Phương thức thanh toán:</strong> {order.paymentMethod === 'Postpaid' ? 'Thanh toán khi nhận hàng' : 'VNPAY'}</p>
                        <p className='mb-2'><strong>Trạng thái thanh toán:</strong> {order.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán' }</p>
                        <p className='mb-2'><strong>Trạng thái xử lý:</strong> {getStatusProcessing(order.proccesingStatus)}</p>
                    </div>
                    <hr className='my-6 border-gray-300' />
                    <h2 className='text-xl font-semibold mb-4'>Danh sách sản phẩm</h2>
                    {/* Danh sách sản phẩm */}
                    {order.productsOrder.map((product, index) => (
                        <div key={index} className='flex items-center mb-4'>
                            <img src={product.image} alt={product.name} className='w-24 h-24 object-cover rounded-md mr-4' />
                            <div>
                                <p className='text-lg font-semibold'>{product.name}</p>
                                <p><strong>Giá:</strong> {product.price}₫</p>
                                <p><strong>Kích thước:</strong> {product.size}</p>
                                <p><strong>Số lượng:</strong> {product.quantity}</p>
                            </div>
                        </div>
                    ))}
                    {order.proccesingStatus !== 'cancel' && order.proccesingStatus !== 'finish' && (
                        <button
                            className='mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 cursor-pointer'
                            onClick={handleCancelOrder}
                            disabled={cancelling}
                        >
                            {cancelling ? 'Đang hủy...' : 'Hủy đơn hàng'}
                        </button>
                    )}
                    {order.proccesingStatus === 'cancel' && (
                        <button
                            className='mt-4 px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed'
                            disabled
                        >
                            Đơn hàng đã bị hủy
                        </button>
                    )}
                    {order.status !== 'paid' && order.proccesingStatus !== 'cancel' && (
                        <button
                            className='mx-4 mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 cursor-pointer'
                            onClick={handlePayment}
                            disabled={paying}
                        >
                            {paying ? 'Đang thanh toán...' : 'Thanh toán'}
                        </button>
                    )}
                </div>
            )}

        </div>
    )
}

export default OrderDetail;