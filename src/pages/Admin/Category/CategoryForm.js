import { Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createCategoryAPI } from '../../../apis';
import slugify from 'slugify'
function CategoryForm() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [image, setImage] = useState([]);
    const handleSubmit = (e) => {
        if (name) {
            createCategoryAPI({ name, description, image, slug: slugify(name, { locale: 'vi' }) }).then(dataRes => {
                console.log(dataRes.data)
                if (dataRes.data) {
                    toast.success('Thêm danh mục thành công');
                    navigate('/admin/category')
                } else {
                    toast.error('Tên danh mục đã tồn tại');
                }

            }).catch(err => {
                toast.error('Thêm danh mục thất bại');
            })
        } else {
            toast.warning('Vui lòng nhập tên danh mục')
        }

    };
    const uploadImageToCloudinary = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        try {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}upload`, {
                method: 'POST',
                body: formData
            });
            const data = await fetchData.json();
            return data.path; // URL hình ảnh sau khi tải lên thành công
        } catch (error) {
            console.error('Lỗi khi tải lên hình ảnh:', error);
            throw error;
        }
    };
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const imageUrl = await uploadImageToCloudinary(file);
                setImage([...image, imageUrl]); // Thêm URL hình ảnh mới vào danh sách
            } catch (error) {
                console.error('Lỗi khi tải lên hình ảnh:', error);
            }
        }
    };
    const handleRemoveImage = (imageUrl) => {
        const newImages = image.filter(image => image !== imageUrl)
        setImage(newImages)
    }
    return (
        <div className="ml-[230px] w-[calc(100%-230px)] pt-[52px] h-full px-[30px]">
            <div className="ml-[2px] text-[22px] font-[500] h-[65px] flex items-center justify-between">
                <div>Thêm danh mục mới</div>
            </div>
            <div className="w-full bg-white rounded-[6px] p-[20px]" style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }}>
                {error && <div className="text-red-500 mb-4">{error}</div>}

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Tên danh mục
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Nhập tên danh mục"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Mô tả
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        placeholder="Nhập mô tả danh mục"
                        required
                    ></textarea>
                </div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                    Ảnh danh mục

                </label>
                <div className='flex gap-[12px] flex-wrap'>
                    {
                        image.length === 0 && (
                            <label htmlFor='productImage' className='flex-1'>
                                <div className="mb-4 min-h-[200px] flex items-center justify-center border hover:cursor-pointer rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600">
                                    <input
                                        id="productImage"
                                        type="file"
                                        accept='image/*'
                                        onChange={handleImageChange}
                                        className="w-full px-3 py-2 hidden"
                                        required
                                    />
                                    <span className='text-[#A3A8AF] text-[32px]'>+</span>
                                </div>
                            </label>
                        )
                    }
                    {
                        image.length > 0 && (
                            <label htmlFor='productImage' className='w-[88px] h-[88px]'>
                                <div className='w-full h-full border border-dashed rounded-[6px] flex items-center justify-center cursor-pointer hover:border-[#0088FF]'>
                                    <input type='file' id='productImage' accept='image/*' className='hidden' onChange={handleImageChange} />
                                    <span className='text-[#A3A8AF] text-[32px]'>+</span>
                                </div>
                            </label>
                        )
                    }
                    {
                        image.map((imageUrl, index) => (
                            <div key={index} className='relative w-[88px] h-[88px] border border-dashed rounded-[6px] flex items-center justify-center cursor-pointer hover:border-[#0088FF] group/image'>
                                <img className='w-full h-full rounded-[6px]' src={imageUrl} alt='Category' />
                                <div className='hidden absolute bg-[#0F1824] w-[88px] h-[88px] opacity-[0.5] group-hover/image:flex rounded-[6px]'>
                                    <Tooltip title="Xóa ảnh" placement='top' arrow style={{ position: 'absolute', right: 0 }}>
                                        <div className='flex-1 flex justify-end p-[5px]'>
                                            <FaRegTrashAlt onClick={() => handleRemoveImage(imageUrl)} className='w-[20px] h-[20px] p-[5px] hover:bg-[#999EA6] text-white text-[16px]' />
                                        </div>
                                    </Tooltip>
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className="flex items-center justify-between mt-8">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Thêm
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/category')}
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CategoryForm;