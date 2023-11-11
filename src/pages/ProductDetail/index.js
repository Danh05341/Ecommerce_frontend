import { Link } from "react-router-dom"
import { BsChevronRight, BsCheck } from "react-icons/bs";


// const ProductDetail = () => {
//     return (
//         <div className="w-full h-full bg-white flex">
//             <div className="m-auto w-[1200px] h-[2000px] flex">
//                 <div className="mx-[15px]  w-full h-[1000px] ">

//                     {/* Breakcumb */}
//                     <div className='w-full px-[15px] mt-[24px] ml-[20px]'>
//                         <Link to='/'>
//                             <li className="list-none inline cursor-pointer  text-[14px] hover:text-[#ff2d37]">Trang chủ</li>
//                         </Link>
//                         <BsChevronRight className='text-[10px] font-bold w-[30px] h-[10px] inline' />
//                         <Link to='/'>
//                             <li className="list-none inline cursor-pointer  text-[14px] hover:text-[#ff2d37]">Sneaker nổi bật</li>
//                         </Link>
//                         <BsChevronRight className='text-[10px] font-bold w-[30px] h-[10px] inline' />
//                         <li className="list-none inline cursor-text text-[#ff2d37] text-[14px]">Tất cả sản phẩm</li>
//                     </div>
//                     <div className="text-[24px] font-bold text-[#ff2d37] leading-[38px] text-center mt-[8px]">
//                         Giày nam
//                     </div>


//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductDetail

import { BiChevronRight } from "react-icons/bi";
import { BsFillTelephoneFill } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import './ProductDetails.scss'
import WrapperModel from "./WrapperModel";
import WrapperImage from "./WrapperImage";
import { useState } from "react";
function ProductDetail() {
    const [currentImage, setCurrentImage] = useState(0)
    const handleActiveImageItem = (index) => {
        setCurrentImage(index)
    }

    const productModels = [
        {
            img: 'https://bizweb.dktcdn.net/thumb/grande/100/342/645/products/bd30ea8934835dfbad4dca4072b1ba3b.jpg?v=1545572480550%22'
        },
        {
            img: "https://bizweb.dktcdn.net/thumb/grande/100/342/645/products/1788475-l.jpg?v=1545572481460"
        },
        {
            img: "https://bizweb.dktcdn.net/thumb/grande/100/342/645/products/0c6ae505cd0029d8918b8a6bebc82fe2.jpg?v=1545572483250"
        },
        {
            img: "https://bizweb.dktcdn.net/100/342/645/products/giay-da-bong-fg-nguoi-lon-den-trang.jpg?v=1545572483563"
        }
    ]

    return (
        <div className="product-detail">
            <div className="product-container">
                {/* <div className="bread-crumbs">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Trang chủ</a>
                            <BiChevronRight className="nav-icon"></BiChevronRight>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Giày nam</a>
                            <BiChevronRight className="nav-icon"></BiChevronRight>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Giày bóng đá sân cỏ nhân tạo</a>
                        </li>
                    </ul>
                    <div className="product-category-title">
                        Giày nam
                    </div>

                </div> */}
                {/* Breakcumb */}
                <div className='w-full px-[15px] mt-[24px] ml-[20px]'>
                    <Link to='/'>
                        <li className="list-none inline cursor-pointer  text-[14px] hover:text-[#ff2d37]">Trang chủ</li>
                    </Link>
                    <BsChevronRight className='text-[10px] font-bold w-[30px] h-[10px] inline' />
                    <Link to='/'>
                        <li className="list-none inline cursor-pointer  text-[14px] hover:text-[#ff2d37]">Sneaker nổi bật</li>
                    </Link>
                    <BsChevronRight className='text-[10px] font-bold w-[30px] h-[10px] inline' />
                    <li className="list-none inline cursor-text text-[#ff2d37] text-[14px]">Tất cả sản phẩm</li>
                </div>
                <div className="text-[24px] font-bold text-[#ff2d37] leading-[38px] text-center mt-[8px]">
                    Giày nam
                </div>
                <div className="product-info">
                    <div className="product-image">
                        <WrapperImage
                            src={productModels[currentImage].img} alt='Product'>
                        </WrapperImage>
                    </div>
                    <div className="product-option">
                        <div className="product-color">
                            {
                                productModels.map((item, index) => {
                                    return (
                                        <WrapperModel
                                            key={index}
                                            index={index}
                                            currentImage={currentImage}
                                            onClick={handleActiveImageItem}
                                        >
                                            <img className='product-img' src={item.img} alt={`Product ${index}`} ></img>
                                        </WrapperModel>
                                    )
                                })
                            }
                        </div>
                        <div className="product-bot">
                            <div className="product-name">
                                Giày đá bóng sân cỏ nhân tạo
                            </div>
                            <div className="product-group-status">
                                <span className="lable-name">
                                    Thương hiệu: <span className="">Nike</span>
                                </span>
                                <span className="lable-name">
                                    Kho: <span className="status-name">Còn hàng</span>
                                </span>
                            </div>
                            <div className="product-guild-size">
                                <span>
                                    Hướng dẫn chọn size
                                </span>
                            </div>
                            <div className="product-price">
                                <span className="special-price">
                                    1.200.000₫
                                </span>
                                <span className="old-price">
                                    1.500.000₫
                                </span>
                            </div>
                            <div className="product-quantity">
                                <div className="lable-name">
                                    Số lượng:
                                </div>
                                <div className="custom-quantity">
                                    <button className="minus-btn">
                                        <AiOutlineMinus></AiOutlineMinus>
                                    </button>
                                    <input className="input-quantity" value='1'></input>
                                    <button className="plus-btn">
                                        <AiOutlinePlus></AiOutlinePlus>
                                    </button>
                                </div>
                            </div>
                            <div className="product-action">
                                <button className="product-order">MUA NGAY</button>
                                <button className="product-contact">
                                    <BsFillTelephoneFill className="product-contact-icon"></BsFillTelephoneFill>
                                    <p>Mua số lượng lớn</p>
                                    <span>Gọi ngay 19006750</span>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProductDetail