import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import { BsFillTelephoneFill, BsCheck, BsChevronRight } from "react-icons/bs";
import { AiFillStar, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { GiBeachBag } from "react-icons/gi";
import { FiScissors } from "react-icons/fi";
import { FaStickyNote } from "react-icons/fa";

import "./ProductDetails.scss";
import WrapperModel from "./WrapperModel";
import WrapperImage from "./WrapperImage";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/cartSlice";
import { toast } from 'react-toastify'
import { addReviewAPI, fetchProductAPI, getOrderIdsUserAPI, getReviewByProductIdAPI } from "../../apis";


function ProductDetail() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userData = useSelector(state => state.user.data)
    const products = useSelector(state => state.cart.data)
    const [purchasedProducts, setPurchasedProducts] = useState([]) // Danh sách ID sản phẩm đã mua

    //số lượng sp trong cart
    const productCount = products?.reduce((count, product) => {
        return count += product.quantity
    }, 0)
    //tong tien
    let productTotalPrice = products?.reduce((total, product) => {
        total += +product?.productId?.price?.replace(/\./g, '') * product?.quantity
        return total;
    }, 0)
    productTotalPrice = productTotalPrice?.toLocaleString('vi-VN')

    const [currentImage, setCurrentImage] = useState(0);
    const handleActiveImageItem = (index) => {
        setCurrentImage(index);
    };
    // số lượng
    const [value, setValue] = useState(1);
    const [isActive, setIsActive] = useState("Mô tả");
    const [isActiveSizeGuild, setIsActiveSizeGuild] = useState(false);
    const [modalIsActive, setModalIsActive] = useState(false);
    const [product, setProduct] = useState();
    const { slug } = useParams();

    const [sizeActive, setSizeActive] = useState()

    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 0, comment: '' });

    const handleChangeReview = (e) => {
        const { name, value } = e.target;
        setNewReview(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (newReview.rating && newReview.comment) {
            const newReviewData = { ...newReview, userId: userData.user_id, productId: product._id };
            addReviewAPI(newReviewData).then(dataRes => {
                console.log('newreview: ', dataRes)
                setReviews(prev => [...prev, dataRes.data]);

            })

        } else {
            alert('Vui lòng điền đầy đủ thông tin đánh giá.');
        }
    };

    const handleActiveSize = (size) => {
        setSizeActive(size)
    }
    const getClassNamesSize = (size) => {
        return (
            `relative flex items-center justify-center h-[32px] text-[14px] font-[600] w-[45px] border border-[#ff2d37] cursor-pointer  ${size === sizeActive ? 'text-[#ff2d37]' : 'text-[#c6cddb]'}`
        )
    }

    useEffect(() => {

        fetchProductAPI(slug, '').then(dataRes => {
            setProduct(dataRes.data);
            return dataRes.data
        }).then((data) => {
            getReviewByProductIdAPI(data._id).then(dataRes => {
                console.log('id: ', data._id)
                setReviews(dataRes.data)
            })
        })
            .catch(err => {
                console.log(err);
            })
        getOrderIdsUserAPI(userData.user_id).then(dataRes => {

            setPurchasedProducts(dataRes.data)
        }).catch(err => console.log(err));
    }, [slug]);

    const handleMinus = () => {
        setValue((prev) => {
            if (prev > 1) {
                return (prev - 1);
            } else {
                return (1);
            }
        });
    };
    const handlePlus = () => {
        setValue((prev) => prev + 1);
    };

    const handeActive = (e) => {
        const name = e.target.dataset.name;
        setIsActive(name);
    };
    const handleClickSizeGuild = () => {
        setIsActiveSizeGuild(prev => !prev)
    }
    const handleClickBuy = (e) => {

        if (sizeActive) setModalIsActive((prev) => !prev);
        if (!modalIsActive) {
            if (sizeActive) {
                console.log('value: ', value)
                console.log('image: ', currentImage)
                console.log('size: ', sizeActive)
                dispatch(addProduct({ product: product, value: value, image: currentImage, size: sizeActive }))
                if (userData.cart_id) {
                    fetch(`${process.env.REACT_APP_SERVER_LOCAL}cart/${userData?.cart_id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: JSON.stringify({ product, value, currentImage, sizeActive })
                    }).then(respone => respone.json())
                        .then(respone => {
                            console.log(respone)
                        })
                        .catch(err => console.log(err))
                }
            } else {
                toast.warning('Vui lòng chọn kích cỡ')
            }
        }
    };
    const handleClickCart = () => {
        navigate('/cart')
    }
    const handleStopPropag = (e) => {
        e.stopPropagation();
    };
    console.log('product-1: ', product)
    return (
        <div className="product-detail pb-[20px]">
            <div className="product-container ">
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
                <div className="w-full px-[15px] mt-[24px] ml-[20px]">
                    <Link to="/">
                        <li className="list-none inline cursor-pointer  text-[14px] hover:text-[#ff2d37]">
                            Trang chủ
                        </li>
                    </Link>
                    <BsChevronRight className="text-[10px] font-bold w-[30px] h-[10px] inline" />
                    {/* <Link to="/">
                        <li className="list-none inline cursor-pointer  text-[14px] hover:text-[#ff2d37]">
                            Sneaker nổi bật
                        </li>
                    </Link>
                    <BsChevronRight className="text-[10px] font-bold w-[30px] h-[10px] inline" /> */}
                    <li className="list-none inline cursor-text text-[#ff2d37] text-[14px]">
                        Tất cả sản phẩm
                    </li>
                </div>
                <div className="text-[24px] font-bold text-[#ff2d37] leading-[38px] text-center mt-[8px]">
                    {product?.category}
                </div>
                <div className="product-info">
                    <div className="product-image">
                        <WrapperImage
                            src={product?.image?.[currentImage]}
                            alt="Product"
                        ></WrapperImage>
                    </div>
                    <div className="product-option">
                        <div className="product-color relative">
                            {product?.image?.map((item, index) => {
                                return (
                                    <WrapperModel
                                        key={index}
                                        index={index}
                                        currentImage={currentImage}
                                        onClick={handleActiveImageItem}
                                    >
                                        <img
                                            className="product-img"
                                            src={item}
                                            alt={`Product ${index}`}
                                        ></img>
                                    </WrapperModel>
                                );
                            })}
                            <FiScissors className="absolute bottom-[-8px] left-[-15px] text-[#ff2d37]"></FiScissors>
                        </div>
                        <div className="product-bot mt-[10px]">
                            <div className="product-name">{product?.name}</div>
                            <div className="product-group-status flex items-center mt-[10px]">
                                <span className="lable-name">
                                    Thương hiệu:{" "}
                                    <span className="text-[#ff2d37]">{product?.brand_id?.name}</span>
                                </span>
                                <div className="border-l border-solid border-black inline mx-[10px] py-[7px] h-[10px]"></div>
                                <span className="lable-name">
                                    Kho: {
                                        product?.status && (
                                            <span className="status-name">Còn hàng</span>
                                        )
                                    }
                                </span>
                            </div>
                            <div onClick={handleClickSizeGuild} className="product-guild-size flex items-center gap-2 px-2 select-none">
                                <FaStickyNote></FaStickyNote>
                                <span>Hướng dẫn chọn size</span>
                            </div>
                            <div className="product-price">
                                <span className="special-price">{product?.size.find(item => (item.size === sizeActive))?.price || product?.price}₫</span>
                                {product?.sale_price ? <span className="old-price">{product?.sale_price}₫</span> : <></>}
                            </div>
                            <div className="flex py-[20px]">
                                <div className="text-[14px] font-bold w-[90px]">Kích thước:</div>
                                <div className="flex flex-wrap items-center gap-[10px] ml-[28px]">
                                    {
                                        product?.size?.map((item, index) => {
                                            return (
                                                <div key={index} onClick={() => handleActiveSize(item.size)} className={getClassNamesSize(item.size)}>
                                                    <div>{item.size}</div>
                                                    {sizeActive === item.size && <img className="absolute h-[14px] w-[14px] right-0 bottom-0" src="https://bizweb.dktcdn.net/100/342/645/themes/701397/assets/checked.png?1705907579799" alt=""></img>}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            <div className="product-quantity">
                                <div className="lable-name">Số lượng:</div>
                                <div className="custom-quantity flex items-center">
                                    <button
                                        onClick={handleMinus}
                                        className="minus-btn  border border-solid border-[#ebebeb] flex items-center justify-center w-[35px] h-[35px]"
                                    >
                                        <AiOutlineMinus className=""></AiOutlineMinus>
                                    </button>
                                    <input
                                        readOnly
                                        className="w-[45px] h-[35px] border border-solid border-[#ebebeb] flex items-center justify-center text-center outline-none"
                                        value={value}
                                    ></input>
                                    <button
                                        onClick={handlePlus}
                                        className="plus-btn border border-solid border-[#ebebeb] flex items-center justify-center w-[35px] h-[35px]"
                                    >
                                        <AiOutlinePlus></AiOutlinePlus>
                                    </button>
                                </div>
                            </div>
                            <div className="product-action">
                                <button
                                    onClick={handleClickBuy}
                                    className="product-order font-bold flex justify-center items-center hover:text-[#ff2d37] hover:bg-white"
                                >
                                    MUA NGAY
                                </button>
                                <button className="product-contact">
                                    <BsFillTelephoneFill className="product-contact-icon"></BsFillTelephoneFill>
                                    <p>Mua số lượng lớn</p>
                                    <span>Gọi ngay 19006750</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* mô tả sản phẩm */}
                <div className="product-des mt-[124px] ">
                    <div onClick={handeActive} className="inline-block">
                        <span
                            data-name={"Mô tả"}
                            className={clsx(
                                "px-[25px] py-[10px] rounded-t-[4px] text-black text-[18px] cursor-pointer",
                                {
                                    active: isActive === "Mô tả",
                                }
                            )}
                        >
                            Mô tả sản phẩm
                        </span>
                    </div>
                    <div onClick={handeActive} className="inline-block">
                        <span
                            data-name={"Đánh giá"}
                            className={clsx(
                                "px-[25px] py-[10px] rounded-t-[4px] text-black text-[18px] cursor-pointer",
                                {
                                    active: isActive === "Đánh giá",
                                }
                            )}
                        >
                            Đánh giá
                        </span>
                    </div>
                    {isActive === "Mô tả" && (
                        <div className=" border border-solid border-[#ebebeb] mt-[8px] py-[25px] px-[15px]">
                            <p className="text-[#9d9c9c]  text-[14px]">
                                Giày Đá Bóng Sân Cỏ cho độ bám sàn tốt cũng như có độ bền cùng
                                độ dẻo dai cao, là chọn lựa lý tưởng của những bạn nam yêu thích
                                thể thao. Thân giày đá bóng cỏ tự nhiên được làm từ da PU cao
                                cấp Giày Đá Bóng Sân Cỏ cho độ bám sàn tốt cũng như có độ bền
                                cùng độ dẻo dai cao, là chọn lựa lý tưởng của những bạn nam yêu
                                thích thể thao. Thân giày đá bóng cỏ tự nhiên được làm từ da PU
                                cao cấp, bề mặt bóng chống bám bẩn, chống thấm nước. Bên cạnh
                                đó, lớp da của phần upper được tráng một lớp firm mỏng giúp bảo
                                vệ phần da giày tốt hơn. Đế giày được may toàn bộ quanh mũi giày
                                và gót nên rất chắc chắn, thích ứng với sân cỏ nhân tạo. Giày
                                thiết kế dành riêng cho bề mặt sân cỏ tự nhiên với các khối đinh
                                lớn hình tam giác có độ cao vừa phải, tránh trơn trượt ngay cả
                                khi bạn chạy trên sân cỏ tự nhiên; đồng thời hỗ trợ tuyệt vời
                                cho những pha xử lý bóng bằng gầm giày, những cú ngoặt bóng siêu
                                nhanh. Phần lõi trong đôi giày đá banh tự nhiên là lớp vải mềm
                                giúp thấm hút mồ hôi và tạo sự thông thoáng cho đôi chân, không
                                gây mùi khó chịu khi sử dụng. Chất liệu cao su thiên nhiên tạo
                                sự đàn hồi nhất định cho đôi giày, mang đến cảm giác êm ái,
                                thoải mái khi sử dụng sản phẩm. Form giày đá bóng chuẩn ôm sát
                                chân tạo cảm giác bóng tốt, làm tăng khả năng xử lý bóng, đồng
                                thời giúp cho việc kiểm soát bóng của bạn trở nên dễ dàng hơn.
                            </p>
                        </div>
                    )}
                    {isActive === "Đánh giá" && (
                        <div className=" border border-solid border-[#ebebeb] mt-[8px] py-[25px] px-[15px]">
                            {reviews?.length > 0 ? (
                                reviews?.map((review, index) => (
                                    <div key={index} className="border-b items-center border-gray-200 py-3 flex space-x-4">
                                        <img
                                            src={review?.image}
                                            alt={review?.name}
                                            className="w-16 h-16 rounded-full "
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center">
                                                <div className="text-gray-800 font-semibold">{review?.name}</div>
                                                <div className="flex items-center space-x-1 ml-2">
                                                    {[...Array(5)].map((_, i) => (
                                                        <AiFillStar key={i} className={`text-xl ${i < review?.rating ? "text-yellow-500" : "text-gray-300"}`} />
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="text-gray-600 mt-1">{review?.comment}</div>
                                            <div className="text-gray-500 text-sm mt-1">
                                                {new Date(review?.createdAt).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Chưa có đánh giá nào.</p>
                            )}
                            {/* Hiển thị nút và form thêm đánh giá nếu người dùng đã mua sản phẩm và chưa đánh giá */}
                            {purchasedProducts.includes(product._id) && !reviews.some(review => review.userId === userData.user_id) && (
                                <div className="mt-4">
                                    <h4 className="text-lg font-semibold mb-2">Thêm đánh giá của bạn</h4>
                                    <form onSubmit={handleSubmitReview}>

                                        <div className="flex items-center mb-2">
                                            <span>Đánh giá:</span>
                                            <div className="ml-2 flex">
                                                {[...Array(5)].map((_, i) => (
                                                    <AiFillStar
                                                        key={i}
                                                        className={`text-xl cursor-pointer ${i < newReview.rating ? "text-yellow-500" : "text-gray-300"}`}
                                                        onClick={() => setNewReview(prev => ({ ...prev, rating: i + 1 }))}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                        <textarea
                                            name="comment"
                                            value={newReview.comment}
                                            onChange={handleChangeReview}
                                            placeholder="Nhập đánh giá của bạn"
                                            className="border border-solid border-gray-300 rounded px-3 py-2 mb-2 w-full"
                                            required
                                        />
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold"
                                        >
                                            Gửi đánh giá
                                        </button>
                                    </form>
                                </div>
                            )}
                            {!purchasedProducts.includes(product._id) && (
                                <p className="mt-4 text-red-500">Bạn cần mua sản phẩm này để thêm đánh giá.</p>
                            )}
                            {purchasedProducts.includes(product._id) && reviews.some(review => review.userId === userData.user_id) && (
                                <p className="mt-4 text-green-500">Bạn đã đánh giá sản phẩm này.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            {/* modal */}
            {modalIsActive && (
                <div
                    onClick={handleClickBuy}
                    className="modal w-full h-full flex justify-center fixed top-0 left-0 right-0 bottom-0  bg-[rgba(0,0,0,0.4)] z-50"
                >
                    {/* ngừng nổi bọt */}
                    <div
                        onClick={handleStopPropag}
                        className=" w-[750px] h-[240px] flex absolute top-[30px] bg-white"
                    >
                        <div className="flex-col w-[375px] h-[240px] p-[30px]  flex border-r border-solid border-[#ebebeb]">
                            <div className="">
                                <BsCheck className="text-[#ff2d37] text-[24px] inline-block"></BsCheck>
                                <span className="text-[#ff2d37] text-[14px] italic font-bold">
                                    Sản phẩm vừa được thêm vào giỏ hàng
                                </span>
                                <div className=" border-b border-solid border-[#ebebeb] mt-[12px]"></div>
                            </div>
                            <div className="flex  mt-[32px] gap-[20px]">
                                <img
                                    className="w-[100px] h-[100px]"
                                    src={product?.image[currentImage]}
                                    alt="product-img"
                                />
                                <div className="flex flex-col">
                                    <span className="font-bold text-[14px]">{product?.name}</span>
                                    <span className="text-[#ff2d37] text-[18px]">
                                        {product?.size.find(item => (item.size === sizeActive))?.price || product?.price}đ
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-[360px]">
                            <div className="flex-col w-[375px] h-[240px] p-[30px]  flex border-r border-solid border-[#ebebeb]">
                                <div className="">
                                    <GiBeachBag className="text-[#ff2d37] text-[20px] inline align-text-top "></GiBeachBag>
                                    <span onClick={handleClickCart} className="ml-[4px] text-[#898989] text-[16px] cursor-pointer hover:text-[#ff2d37]">
                                        Giỏ hàng ({productCount})
                                    </span>
                                    <div className=" border-b border-solid border-[#ebebeb] mt-[12px]"></div>
                                </div>
                                <div className="flex flex-col mt-[32px] gap-[20px]">
                                    <div className="flex items-center">
                                        <span className="font-bold text-[14px]">Tổng tiền:</span>
                                        <span className="ml-[12px] text-[#ff2d37] text-[18px] font-[500]">
                                            {productTotalPrice}
                                        </span>
                                    </div>
                                    <Link to={"/checkout"}>
                                        <div className="h-[45px] w-[293px] px-[15px] rounded-full uppercase bg-[#ff2d37] flex items-center justify-center text-white cursor-pointer text-[16px] font-[500] active:shadow-md">
                                            Tiến hành thanh toán
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {
                isActiveSizeGuild && (
                    <div
                        onClick={handleClickSizeGuild}
                        className="modal w-full h-full flex justify-center fixed top-0 left-0 right-0 bottom-0  bg-[rgba(0,0,0,0.4)] z-50"
                    >
                        <div
                            onClick={handleStopPropag}
                            className=" w-[500px] h-[435px] pt-[20px] pb-[40px] rounded-[25px] flex absolute top-[15%] bg-white select-none"
                        >
                            <img className="w-[500px]h-[375px]" src="https://bizweb.dktcdn.net/100/342/645/themes/701397/assets/size_giay.jpg?1705907597479" alt="size-guild-img"></img>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default ProductDetail;
