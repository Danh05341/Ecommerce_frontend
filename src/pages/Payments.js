import React from 'react';
import { useLocation } from 'react-router-dom';

const Payments = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderId = queryParams.get('orderId');
    const success = queryParams.get('success');

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                {success ? (
                    <>
                        <h1 className="text-3xl font-bold text-green-600 mb-4">Thanh toán thành công!</h1>
                        <p className="text-gray-700 mb-4">
                            Cảm ơn bạn đã mua hàng. Mã đơn hàng của bạn là: <strong>{orderId}</strong>
                        </p>
                    </>
                ) : (
                    <h1 className="text-3xl font-bold text-red-600 mb-4">Thanh toán thất bại!</h1>
                )}
                <a href="/" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                    Quay lại trang chủ
                </a>
            </div>
        </div>
    );
};

export default Payments;