import React, { useEffect, useState } from 'react'
import { getCategoryBySlugAPI, fetchProductAPI, fetchBrandAPI, updateProductAPI, addNewProductAPI } from '../../../apis'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoAddCircleOutline } from 'react-icons/io5';
import { ClickAwayListener, Dialog, Menu, MenuItem, Select, Slide, Tooltip } from '@mui/material';
import { IoMdClose } from "react-icons/io";
import { FaCaretDown, FaRegTrashAlt } from "react-icons/fa";
import { getAllCategoryNames, getCategoriesWithChildren } from '../../../util/category';
import slugify from 'slugify';
import { formatCurrency } from '../../../util/formatCurency';
import { toast } from 'react-toastify';
import lodash from 'lodash';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const SIZE = ['36', '37', '38', '39', '40', '41', '42', '43', '44']


function CreateNewProduct() {
    const [product, setProduct] = useState({
        name: '',
        description: '',
        size: [],
        image: [], //Cần url cloud
        price: '',
        brand_id: null,
        slug: '',
        category: '',
        total: 0,
        status: false
    })
    const navigate = useNavigate()
    const [category, setCategory] = useState([])
    const [categoryType, setCategoryType] = useState([])
    const [brands, setBrands] = useState([])
    const [brandSelectd, setBrandSelectd] = useState('');
    const [selectedCategoriesChildren, setSelectedCategoriesChildren] = useState('');
    const [selectedCategoriesParent, setSelectedCategoriesParent] = useState('');
    const [productSize, setProductSize] = useState([])
    const [productImage, setProductImage] = useState([])
    const [productName, setProductName] = useState('')
    const [productDescription, setProductDescription] = useState('')

    const [openEditPriceForm, setOpenEditPriceForm] = useState(false);
    const [openEditQuantityForm, setOpenEditQuantityForm] = useState(false);
    const [openAddVariantForm, setOpenAddVariantForm] = useState(false);

    const [size, setSize] = useState();
    const [price, setPrice] = useState();
    const [quantity, setQuantity] = useState();

    const handleChangeSize2 = (event) => {
        let value = event.target.value;
        setSize(value)
    }
    const handleChangeQuantity2 = (event) => {
        let inputValue = event.target.value;
        if (inputValue.length === 0 || inputValue === '00') {
            return setQuantity('0')
        }
        // Xóa các ký tự không phải số
        const cleanValue = inputValue.replace(/\D/g, '');
        // Loại bỏ các số 0 ở đầu
        const noLeadingZeros = cleanValue.replace(/^0+/, '');
        setQuantity(noLeadingZeros)
    }
    const handleChangePrice2 = (event) => {
        let inputValue = event.target.value;
        if (inputValue.length === 0 || inputValue === '00') {
            return setPrice('0')
        }
        const price = formatCurrency(inputValue)
        setPrice(price)
    }


    const handleClickEditPriceForm = () => {
        handleCloseMenuEdit()
        setOpenEditPriceForm(true);
    }
    const handleCloseAddVariantForm = () => {
        setOpenAddVariantForm(false);

    }
    const handleCloseEditPriceForm = () => {
        setOpenEditPriceForm(false);
    }
    console.log('product:', product)
    const handleSubmitAddVariant = () => {
        if (size && quantity && price) {
            if (product?.size.find(item => item.size === size)) {
                return toast.error('Kích thước đã tồn tại')
            }
            const productClone = lodash.cloneDeep(product)
            productClone?.size.push({
                size,
                quantity,
                price
            })

            const total = productClone.total + Number(quantity)
            productClone.total = total
            productClone.status = total > 0 ? true : false

            setProductSize(prev => {
                return [
                    ...prev,
                    { size, quantity, price, checked: false }
                ];
            })
            setProduct(productClone)
            toast.success('Thêm phiên bản thành công')
            setOpenAddVariantForm(false)
        } else {
            toast.warning('Vui lòng nhập đủ thông tin')
        }
    }
    console.log('product-Size-ngoài: ', productSize)

    const handleClickEditQuantityForm = () => {
        handleCloseMenuEdit()
        setOpenEditQuantityForm(true);
    }
    const handleCloseEditQuantityForm = () => {
        setOpenEditQuantityForm(false);
    }
    const handleClickRemoveVersionForm = () => {
        handleCloseMenuEdit()
        // setOpenRemoveVersionForm(true);
        let sizeIds = []
        let newProductSize = []
        productSize.forEach(item => {
            if (item.checked) {
                sizeIds.push(item.size)
            } else {
                newProductSize.push(item)
            }
        })
        if (sizeIds.length === 0) {
            toast.warning('Chưa chọn phiên bản cần xóa')
            return
        }
        setProductSize(newProductSize)

        //Gọi api delete product.size
        const newSizes = newProductSize.map(item => {
            return {
                size: item.size,
                quantity: item.quantity,
                price: item.price
            }
        })
        const total = newSizes.reduce((total, item) => {
            total = Number(total) + Number(item.quantity)
            return total
        }, 0)
        setProduct(prev => {
            return {
                ...prev,
                size: newSizes,
                total: total,
                status: (total > 0 ? true : false)
            }
        })
        toast.success('Xóa thành công')

    }
    // const handleCloseRemoveVersionForm = () => {
    //     setOpenRemoveVersionForm(false);
    // }


    const [anchorEl, setAnchorEl] = useState(null);
    const openMenuEdit = Boolean(anchorEl);
    const handleClickButtonEdit = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenuEdit = () => {
        setAnchorEl(null);
    };

    const handleSubmitPrice = () => {
        setOpenEditPriceForm(false);
        setProduct(prev => ({
            ...prev,
            size: productSize
        }))

    }
    const handleSubmitQuantity = () => {
        setOpenEditQuantityForm(false);
        const total = productSize.reduce((total, product) => {
            return total += Number(product.quantity)
        }, 0)
        setProduct(prev => ({
            ...prev,
            size: productSize,
            total: total,
            status: total > 0 ? true : false
        }))

    }
    const handleChangePrice = (event, size) => {
        let inputValue = event.target.value;
        if (inputValue.length === 0 || inputValue === '00') {
            const newProductSize = productSize.map(item => {
                if (item.size === size) {
                    return { ...item, price: '0' }
                } else {
                    return { ...item }
                }
            })
            return setProductSize(newProductSize)
        }
        const price = formatCurrency(inputValue)
        const newProductSize = productSize.map(item => {
            if (item.size === size) {
                return { ...item, price: price }
            } else {
                return { ...item }
            }
        })
        setProductSize(newProductSize)
    }
    const handleChangeQuantity = (event, size) => {
        let inputValue = event.target.value;
        if (inputValue.length === 0 || inputValue === '00') {
            const newProductSize = productSize.map(item => {
                if (item.size === size) {
                    return { ...item, quantity: '0' }
                } else {
                    return { ...item }
                }
            })
            return setProductSize(newProductSize)
        }
        // Xóa các ký tự không phải số
        const cleanValue = inputValue.replace(/\D/g, '');
        // Loại bỏ các số 0 ở đầu
        const noLeadingZeros = cleanValue.replace(/^0+/, '');

        const newProductSize = productSize.map(item => {
            if (item.size === size) {
                return { ...item, quantity: noLeadingZeros }
            } else {
                return { ...item }
            }
        })
        setProductSize(newProductSize)
    }
    const handleCategoryTypeChange = (event) => {
        setSelectedCategoriesChildren(event.target.value);
    };
    const handleCategoryParentChange = (event) => {
        const categoryParentName = event.target.value
        let categoryChildrenArrays = []

        setSelectedCategoriesParent(categoryParentName);
        setSelectedCategoriesChildren('');

        if (categoryParentName === 'Tất cả sản phẩm') {
            categoryChildrenArrays = category
        } else {
            // Tìm ra danh mục con để render vào loại sản phẩm
            const categoryWithChildren = getCategoriesWithChildren(category, categoryParentName)
            const categoryChildren = getAllCategoryNames(categoryWithChildren)
            categoryChildrenArrays = categoryChildren.map(category => {
                return {
                    name: category
                }
            })
        }
        setCategoryType(categoryChildrenArrays)
    };
    const handleChange = (event) => {
        setBrandSelectd(event.target.value);
    };
    const handleChangeCheck = (size) => {
        setProductSize(productSize.map(item =>
            item.size === size ? { ...item, checked: !item.checked } : item
        ));
    }

    const handleChangeProductName = (e) => {
        const value = e.target.value
        setProductName(value)
    }

    const handleChangeProductDescription = (e) => {
        const value = e.target.value
        setProductDescription(value)

    }
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
    const handleChangeImage = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const imageUrl = await uploadImageToCloudinary(file);
                setProductImage([...productImage, imageUrl]); // Thêm URL hình ảnh mới vào danh sách
            } catch (error) {
                console.error('Lỗi khi tải lên hình ảnh:', error);
            }
        }
    }

    const handleAddVariant = () => {
        setOpenAddVariantForm(true)
    }
    
   
    const handleClickSave = () => {
        
        if(productName && 
            productDescription && 
            productSize.length > 0 && 
            productImage.length > 0 &&
            selectedCategoriesChildren &&
            brandSelectd &&
            product.status &&
            product.total
        ) {
            const brand = brands.find(brand => brand.name === brandSelectd)
            const sizes = productSize.map(item => {
                return {
                    size: item.size,
                    quantity: item.quantity,
                    price: item.price
                }
            })

            const createProduct = {
                name: productName,
                description: productDescription,
                size: sizes,
                image: productImage, //Cần url cloud
                price: productSize?.[0]?.price,
                brand_id: brand._id,
                slug: slugify(productName, { locale: 'vi' }),
                category: selectedCategoriesChildren,
                status: product.status,
                total: product.total
            }
            // Gọi API tạo product  
            addNewProductAPI(createProduct).then(dataRes => {
                console.log('dataRes: ', dataRes.data);
                if(dataRes.data) toast.success('Thêm sản phẩm mới thành công')
                navigate('/admin/products')
            }).catch(err => {
                toast.error('Error while adding')
                console.error(err)
            });

        } else {
            toast.warning('Vui lòng nhập đủ thông tin sản phẩm')
        }
        
      
    }
   
    const handleRemoveImage = (imageUrl) => {
        const newImages = productImage.filter(image => image !== imageUrl)
        setProductImage(newImages)
    }
    useEffect(() => {
        getCategoryBySlugAPI('all').then((dataRes) => {
            setCategory(dataRes.data)
        })
        fetchBrandAPI().then((dataRes) => {
            setBrands(dataRes.data)
        })

    }, [])
  
    useEffect(() => {
        const getCategory = () => {
            getCategoryBySlugAPI(slugify(product?.category, { locale: 'vi' })).then((dataRes) => {
                if (dataRes.data && dataRes.data.parent === null) {
                    setSelectedCategoriesParent('Tất cả sản phẩm')
                    setCategoryType(category)
                } else if (dataRes.data && dataRes.data.parent !== null) {
                    // Tìm ra danh mục con để render vào loại sản phẩm
                    const categoryWithChildren = getCategoriesWithChildren(category, dataRes.data.parent)
                    const categoryChildren = getAllCategoryNames(categoryWithChildren)
                    const categoryChildrenArrays = categoryChildren.map(category => {
                        return {
                            name: category
                        }
                    })
                    setCategoryType(categoryChildrenArrays)
                    setSelectedCategoriesParent(dataRes?.data?.parent)

                }
                setSelectedCategoriesChildren(dataRes?.data?.name)
            })
        }
        if (product) getCategory()
    }, [product])
  

    return (
        <div>
            <div className='w-[calc(100%-230px)] h-full ml-[230px] pt-[52px] px-[30px] pb-[200px]'>
                <div className='ml-[2px] text-[22px] font-[500] h-[65px] flex gap-[16px] items-center'>
                    <Link to={'/admin/products'}>
                        <div className='h-[36px] w-[36px] bg-white flex items-center justify-center rounded-[6px] border border-[#D3D5D7] cursor-pointer'>
                            <FaArrowLeftLong className='text-[14px] text-[#747C87]' />
                        </div>
                    </Link>
                    <div>Thêm sản phẩm</div>
                </div>
                {/* Thông tin sản phẩm */}
                <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full px-[20px] bg-white rounded-[6px]'>
                    <div className='pb-[18px]'>
                        <div className='font-[600] py-[18px]'>Thông tin sản phẩm</div>
                        <div className='text-[16px] text-[#46515F] font-[500]'>Tên sản phẩm</div>
                        <div className='border-[#D3D5D7] border rounded-[6px] mt-[6px]'>
                            <input onChange={handleChangeProductName} className='px-[12px] w-full h-[34px] text-[14px] rounded-[6px] bg-[white] focus:outline-[#0088FF]' value={productName}></input>
                        </div>

                        <div className='text-[16px] text-[#46515F] font-[500] mt-[15px]'>Mô tả</div>
                        <div className=' mt-[6px] rounded-[6px] border border-[#D3D5D7] focus-within:border-transparent'>
                            <textarea onChange={handleChangeProductDescription} value={productDescription} className='w-[100%] px-[12px] py-[12px] min-h-[200px] focus:outline-[#0088FF]  rounded-[6px]' id="description" name="description" placeholder="Nhập mô tả của bạn tại đây..."></textarea>
                        </div>
                    </div>
                </div>
                {/* Phiên bản */}
                <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full mt-[15px] bg-white rounded-[6px]'>
                    <div className='flex justify-between items-center px-[20px]'>
                        <div className='font-[600] py-[18px]'>Phiên bản</div>
                        <div onClick={handleAddVariant} className='flex items-center justify-center gap-[6px] w-[164px] h-[36px] bg-[#0088FF] text-white text-[16px] rounded-[6px] cursor-pointer'>
                            <IoAddCircleOutline className='text-[20px]' />
                            <span className='mb-[2px]'>Thêm phiên bản</span>
                        </div>
                        {/* modal thêm phiên bản */}
                        <Dialog
                            open={openAddVariantForm}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleCloseAddVariantForm}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <div className='w-[598px]'>
                                <div className=' h-[52px] px-[20px] flex justify-between items-center font-[600] border border-[#D3D5D7]'>
                                    <span>Thêm phiên bản</span>
                                    <div onClick={handleCloseAddVariantForm} className='flex items-center justify-center cursor-pointer w-[36px] h-[36px] hover:bg-[#F2F9FF] '><IoMdClose className='' /></div>
                                </div>
                                <div className='flex justify-between border border-[#D3D5D7] px-[20px] py-[10px]'>
                                    {/* Phần trang chỉnh sửa variant productdetails */}
                                    <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full mt-[5px] px-[20px] py-[18px] bg-white rounded-[6px]'>
                                        <div className='font-[500]'>Thuộc tính</div>
                                        <div className='mt-[20px]'>
                                            <div className='text-[14px] text-[#46515F] font-[500]'>Kích thước</div>
                                            <div className='w-[250px]  rounded-[6px]'>
                                                <Select
                                                    value={size}
                                                    onChange={handleChangeSize2}
                                                    sx={{
                                                        width: '100%',
                                                        height: '100%',
                                                        marginTop: '10px',
                                                        '& .MuiSelect-select': {
                                                            paddingY: '7px',
                                                        }
                                                    }}
                                                >
                                                    {
                                                        SIZE?.map((size, index) => {
                                                            return (
                                                                <MenuItem key={index} value={size}>{size}</MenuItem>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            </div>
                                            <div className='text-[14px] text-[#46515F] font-[500] mt-[16px]'>Số lượng</div>
                                            <div className='w-[250px] border-[#D3D5D7] border rounded-[6px] mt-[6px]'>
                                                <input
                                                    value={quantity}
                                                    onChange={handleChangeQuantity2}
                                                    maxLength={8}
                                                    className='px-[12px] w-full h-[34px] text-[14px] rounded-[6px] bg-[white] focus:outline-[#0088FF]' >

                                                </input>
                                            </div>
                                            <div className='text-[14px] text-[#46515F] font-[500] mt-[16px]'>Giá bán</div>
                                            <div className='w-[250px] border-[#D3D5D7] border rounded-[6px] mt-[6px]'>
                                                <input
                                                    value={price}
                                                    onChange={handleChangePrice2}
                                                    maxLength={14}
                                                    className='px-[12px] w-full h-[34px] text-[14px] rounded-[6px] bg-[white] focus:outline-[#0088FF]' >
                                                </input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='h-[76px] flex items-center justify-end gap-[15px] px-[20px] select-none '>
                                <div onClick={handleCloseAddVariantForm} className='flex items-center justify-center w-[60px] h-[36px] border border-[#0088FF] rounded-[6px] font-[600] text-[14px] text-[#0088FF] cursor-pointer hover:bg-[#F2F9FF]'>Hủy</div>
                                <div onClick={handleSubmitAddVariant} className='flex items-center justify-center w-[100px] h-[36px] bg-[#0088FF] rounded-[6px] font-[600] text-[14px] text-white hover:bg-[#33A0FF] cursor-pointer'>Xác nhận</div>
                            </div>
                        </Dialog>
                    </div>
                    <div className='px-[20px] flex gap-[26px] py-[12px] text-[14px] font-[600]'>
                        <span>Bộ lọc:</span>
                        <span className='text-[#0088FF] flex-1'>Kích thước</span>
                        <div onClick={handleClickButtonEdit} className='flex gap-[6px] items-center justify-center w-[123px] h-[34px] rounded-[6px] border border-[#D3D5D7] cursor-pointer hover:bg-[#F2F9FF]'>
                            <span>Chỉnh sửa</span>
                            <FaCaretDown className='text-[#A3A8AF]  mt-[2px]' />
                        </div>
                        {/* menu chỉnh sửa */}
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={openMenuEdit}
                            onClose={handleCloseMenuEdit}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                                autoFocusItem: false,
                            }}
                        >
                            <MenuItem onClick={handleClickEditPriceForm}>Chỉnh sửa giá</MenuItem>
                            <MenuItem onClick={handleClickEditQuantityForm}>Chỉnh sửa số lượng</MenuItem>
                            <MenuItem onClick={handleClickRemoveVersionForm}>Xóa phiên bản</MenuItem>
                        </Menu>
                        {/* modal chỉnh sửa giá */}
                        <Dialog
                            open={openEditPriceForm}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleCloseEditPriceForm}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <div className='w-[598px]'>
                                <div className=' h-[52px] px-[20px] flex justify-between items-center font-[600] border border-[#D3D5D7]'>
                                    <span>Chỉnh sửa giá</span>
                                    <div onClick={handleCloseEditPriceForm} className='flex items-center justify-center cursor-pointer w-[36px] h-[36px] hover:bg-[#F2F9FF] '><IoMdClose className='' /></div>
                                </div>
                                <div className='flex justify-between border border-[#D3D5D7] px-[20px] py-[10px]'>
                                    <div>Kích thước</div>
                                    <div>Giá</div>
                                </div>
                                {
                                    productSize?.map((item, index) => {
                                        return (
                                            <div key={item.size} className='h-[60px] px-[20px] flex items-center justify-between border-b border-[#D3D5D7]'>
                                                <span className='text-[#0088FF] font-[600]'>{item.size}</span>
                                                <div className='flex border border-[#0088FF] rounded-[6px] text-[#0088FF] font-[600] bg-[white] '>
                                                    <input
                                                        value={productSize[index]?.price}
                                                        maxLength={14}
                                                        onChange={(event) => handleChangePrice(event, item.size)}
                                                        className='px-[12px] w-[150px] h-[34px] text-[14px] rounded-[6px] bg-[white] outline-none'>
                                                    </input>
                                                    <div className='w-[30px] h-[34px] flex justify-center items-center text-[#747c87] select-none'>₫</div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='h-[76px] flex items-center justify-end gap-[15px] px-[20px] select-none '>
                                <div onClick={handleCloseEditPriceForm} className='flex items-center justify-center w-[60px] h-[36px] border border-[#0088FF] rounded-[6px] font-[600] text-[14px] text-[#0088FF] cursor-pointer hover:bg-[#F2F9FF]'>Hủy</div>
                                <div onClick={handleSubmitPrice} className='flex items-center justify-center w-[100px] h-[36px] bg-[#0088FF] rounded-[6px] font-[600] text-[14px] text-white hover:bg-[#33A0FF] cursor-pointer'>Xác nhận</div>
                            </div>
                        </Dialog>
                        {/* modal chỉnh sửa số lượng */}
                        <Dialog
                            open={openEditQuantityForm}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleCloseEditQuantityForm}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <div className='w-[598px]'>
                                <div className=' h-[52px] px-[20px] flex justify-between items-center font-[600] border border-[#D3D5D7]'>
                                    <span>Chỉnh sửa số lượng</span>
                                    <div onClick={handleCloseEditQuantityForm} className='flex items-center justify-center cursor-pointer w-[36px] h-[36px] hover:bg-[#F2F9FF] '><IoMdClose className='' /></div>
                                </div>
                                <div className='flex justify-between border border-[#D3D5D7] px-[20px] py-[10px]'>
                                    <div>Kích thước</div>
                                    <div>Số lượng</div>
                                </div>
                                {
                                    productSize?.map((item, index) => {
                                        return (
                                            <div key={item.size} className='h-[60px] px-[20px] flex items-center justify-between border-b border-[#D3D5D7]'>
                                                <span className='text-[#0088FF] font-[600]'>{item.size}</span>
                                                <div className='border border-[#0088FF] rounded-[6px] text-[#0088FF] font-[600] bg-[white] '>
                                                    <input
                                                        type='number'
                                                        value={productSize[index]?.quantity}
                                                        maxLength={5}
                                                        onChange={(event) => handleChangeQuantity(event, item.size)}
                                                        className='px-[12px] w-[150px] h-[34px] text-[14px] rounded-[6px] bg-[white] outline-none'>
                                                    </input>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className='h-[76px] flex items-center justify-end gap-[15px] px-[20px] select-none '>
                                <div onClick={handleCloseEditQuantityForm} className='flex items-center justify-center w-[60px] h-[36px] border border-[#0088FF] rounded-[6px] font-[600] text-[14px] text-[#0088FF] cursor-pointer hover:bg-[#F2F9FF]'>Hủy</div>
                                <div onClick={handleSubmitQuantity} className='flex items-center justify-center w-[100px] h-[36px] bg-[#0088FF] rounded-[6px] font-[600] text-[14px] text-white hover:bg-[#33A0FF] cursor-pointer'>Xác nhận</div>
                            </div>
                        </Dialog>


                    </div>
                    <label htmlFor='version' className='cursor-pointer'>
                        <div className='border-b border-t border-[#E8EAEB] font-[600] px-[20px] flex gap-[16px] items-center py-[28px]'>
                            <input type='checkbox' id='version' className='w-[16px] h-[16px] text-[#D3D5D7] cursor-pointer' />
                            <span>{productSize?.length} phiên bản</span>
                            {/* <span>Tất cả phiên bản</span>
                            <span>Đã chọn ? phiên bản</span> */}
                        </div>
                    </label>

                    {
                        productSize.map((item, index) => {
                            return (
                                <div key={item.size} className='h-[76px] px-[20px] border-b border-[#E8EAEB] flex items-center'>
                                    <input onChange={() => handleChangeCheck(item.size)} id={item.size} type='checkbox' className='w-[16px] h-[16px] text-[#D3D5D7] cursor-pointer' />
                                    {/* <img className='ml-[45px] w-[50px]' src={product?.image[0]} alt=''></img> */}
                                    <span className='ml-[45px] font-bold text-[#0088FF] flex-1'>
                                        {item.size}
                                    </span>
                                    <div className='flex flex-col text-right'>
                                        <div>Có thể bán: <span className='font-bold text-[#0088FF]'>{item.quantity}</span></div>
                                        <div>Giá bán: <span className='font-bold text-[#0088FF]'>{item?.price}₫</span></div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    <div className='h-[59px] px-[20px] flex justify-between items-center'>
                        <div>Tổng tồn kho</div>
                        <div>Có thể bán: <span className='font-bold text-[#0088FF]'>{product?.total}</span></div>
                    </div>
                </div>
                {/* Ảnh */}
                <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full mt-[15px] bg-white rounded-[6px] pb-[20px]'>
                    <div className='flex justify-between items-center px-[20px]'>
                        <div className='font-[600] py-[18px]'>Ảnh sản phẩm</div>
                    </div>
                    <div className='flex gap-[12px] px-[20px]'>
                        <label htmlFor='productImage'>
                            <div className='w-[88px] h-[88px] border border-dashed rounded-[6px] flex items-center justify-center cursor-pointer hover:border-[#0088FF]'>
                                {/* <img className='' src={''} alt=''></img> */}
                                <input type='file' id='productImage' accept='image/*' className='hidden' onChange={handleChangeImage} />

                                <span className='text-[#A3A8AF] text-[32px]'>+</span>
                            </div>
                        </label>
                        {/* render Ảnh sản phẩm */}
                        {
                            productImage?.map((image, index) => {
                                return (
                                    <div key={index} className='relative w-[88px] h-[88px] border border-dashed rounded-[6px] flex items-center justify-center cursor-pointer hover:border-[#0088FF] group/image'>
                                        <img className='w-full h-full rounded-[6px]' src={image} alt=''></img>
                                        <div className='hidden absolute bg-[#0F1824] w-[88px] h-[88px] opacity-[0.5] group-hover/image:flex  rounded-[6px]'>
                                            <Tooltip title="Xóa ảnh" placement='top' arrow style={{
                                                position: 'absolute',
                                                right: 0,
                                            }}>
                                                <div className='flex-1 flex justify-end p-[5px]'>
                                                    <FaRegTrashAlt onClick={() => handleRemoveImage(image)} className='w-[20px] h-[20px] p-[5px] hover:bg-[#999EA6] text-white text-[16px]' />
                                                </div>
                                            </Tooltip>

                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                {/* Thuộc tính */}
                <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full mt-[15px] py-[24px] px-[20px] bg-white rounded-[6px]'>
                    {/* Danh mục cha */}
                    <div className='text-[16px] text-[#46515F] font-[500]'>Danh mục</div>

                    <Select
                        value={selectedCategoriesParent}
                        onChange={handleCategoryParentChange}
                        sx={{
                            width: '100%',
                            marginTop: '10px',
                        }}

                    >
                        <MenuItem value='Tất cả sản phẩm'>Tất cả sản phẩm</MenuItem>
                        {
                            category?.map((item) => {
                                return (
                                    <MenuItem key={item._id} value={item.name}>{item.name}</MenuItem>
                                )
                            })
                        }
                    </Select>

                    {/* Danh mục con/ Loại */}
                    <div className='text-[16px] text-[#46515F] font-[500] mt-[20px]'>Loại sản phẩm</div>

                    <Select
                        value={selectedCategoriesChildren}
                        onChange={handleCategoryTypeChange}
                        sx={{
                            width: '100%',
                            marginTop: '10px',
                        }}
                    >
                        {
                            categoryType?.map((item) => {
                                return (
                                    <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                                )
                            })
                        }
                    </Select>

                    {/* Thương hiệu */}
                    <div className='text-[16px] text-[#46515F] font-[500] mt-[20px]'>Thương hiệu</div>

                    <Select
                        value={brandSelectd}
                        onChange={handleChange}
                        sx={{
                            width: '100%',
                            marginTop: '10px'
                        }}
                    >
                        {
                            brands?.map((brand, index) => {
                                return (
                                    <MenuItem key={index} value={brand.name}>{brand.name}</MenuItem>
                                )
                            })
                        }
                    </Select>

                </div>
                <div className='flex gap-[16px] justify-end w-[full] py-[20px]'>
                    <div onClick={handleClickSave} className='h-[34px] w-[60px] bg-[#0088FF] text-white flex justify-center items-center rounded-[6px] cursor-pointer hover:bg-[#33A0FF]'>Lưu</div>
                </div>
            </div>
        </div >

    )
}

export default CreateNewProduct