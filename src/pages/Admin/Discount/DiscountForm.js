import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDiscount, createDiscount, updateDiscount } from '../../../apis'; // Cần tạo các hàm này trong `apis.js`

function DiscountForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [discount, setDiscount] = useState({
        code: '',
        description: '',
        percentage: 0,
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        if (id) {
            getDiscount(id).then(data => setDiscount(data));
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDiscount({ ...discount, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            updateDiscount(id, discount).then(() => navigate('/admin/discount'));
        } else {
            createDiscount(discount).then(() => navigate('/admin/discount'));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="code"
                value={discount.code}
                onChange={handleChange}
                placeholder="Mã khuyến mãi"
                required
            />
            <textarea
                name="description"
                value={discount.description}
                onChange={handleChange}
                placeholder="Mô tả"
                required
            />
            <input
                type="number"
                name="percentage"
                value={discount.percentage}
                onChange={handleChange}
                placeholder="Phần trăm giảm giá"
                required
            />
            <input
                type="date"
                name="startDate"
                value={discount.startDate}
                onChange={handleChange}
                required
            />
            <input
                type="date"
                name="endDate"
                value={discount.endDate}
                onChange={handleChange}
                required
            />
            <button type="submit">{id ? 'Cập Nhật' : 'Tạo Mới'}</button>
        </form>
    );
}

export default DiscountForm;