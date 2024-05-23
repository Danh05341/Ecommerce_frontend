import { BsTrash3Fill } from 'react-icons/bs'
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, minusProduct, setCountProduct, removeProduct } from "../../../redux/cartSlice"

function CartItem({ product, quantity }) {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.user.data)
    const [value, setValue] = useState(Number(quantity));
    const [totalPrice, setTotalPrice] = useState("");
    const handleMinus = () => {
        setValue((prev) => {
            if (prev > 1) {
                dispatch(minusProduct({ product }))
                // gọi API
                fetch(`${process.env.REACT_APP_SERVER_LOCAL}cart/${userData.cart_id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({ product, value: -1 })
                }).then(respone => respone.json())
                    .then(respone => {
                        console.log(respone)
                    })
                    .catch(err => console.log(err))
                return (prev - 1);
            } else {
                return (1);
            }
        });
    };
    const handlePlus = () => {
        setValue((prev) => {
            if (prev < 9999) {
                dispatch(addProduct({ product, value: +1 }))
                fetch(`${process.env.REACT_APP_SERVER_LOCAL}cart/${userData.cart_id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify({ product, value: 1 })
                }).then(respone => respone.json())
                    .then(respone => {
                        console.log(respone)
                    })
                    .catch(err => console.log(err))
                return (Number(prev) + 1);
            } else {
                return (9999);
            }
        });
    };

    const handleChangeQuantity = (e) => {
        if (e.target.value < 9999 && e.target.value > 0) {
            setValue(e.target.value);
            dispatch(setCountProduct({ product, value: e.target.value }))
            fetch(`${process.env.REACT_APP_SERVER_LOCAL}cart/${userData.cart_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ product, value: e.target.value, setCount: true })
            }).then(respone => respone.json())
                .then(respone => {
                    console.log(respone)
                })
                .catch(err => console.log(err))
        }
    }

    const handleRemoveProductCart = () => {
        dispatch(removeProduct(product._id))
        if (userData.cart_id) {
            fetch(`${process.env.REACT_APP_SERVER_LOCAL}cart/${userData.cart_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ id: product._id }),
            }).then(respone => respone.json())
                .then(respone => {
                    console.log(respone)
                })
                .catch(err => console.log(err))
        }
    }
    console.log('product: ', product)
    useEffect(() => {
        const calculateTotalPrice = () => {
            let totalPrice = product?.price?.replace(/\./g, '') * value
            totalPrice = totalPrice?.toLocaleString('vi-VN')
            setTotalPrice(totalPrice);
        };
        calculateTotalPrice()
    }, [value])

    return (
        <div className="py-[30px] border-b">
            <div className="flex ">
                {/* ảnh */}
                <div className="w-[14%] px-[5px] flex justify-center">
                    <Link to={`/${product?.slug}`} className="inline-block w-[100px]">
                        <div className="w-[100px] object-contain border border-solid border-[#ebebeb]">
                            <img className="w-[100%] " src={product?.image[0]} alt=""></img>
                        </div>
                    </Link>
                </div>
                {/* thông tin sản phẩm */}
                <div className="w-[24%]  px-[5px] flex flex-col justify-center select-none">
                    <Link to={`/${product?.slug}`}>
                        <div className="text-[16px] text-[#282828] hover:text-[#ff2d37] cursor-pointer">Giày đá bóng chính hãng hàng hot</div>
                    </Link>
                    <div className="flex items-center gap-1 mt-3">
                        <Link className="flex items-center gap-1 ">
                            <BsTrash3Fill className="text-[#ff2d37] h-[13px] "></BsTrash3Fill>
                            <span onClick={handleRemoveProductCart} className="text-[#ff2d37] text-[14px] ">Xóa sản phẩm</span>
                        </Link>
                    </div>
                </div>
                <div className="w-[20%] px-[5px] flex items-center justify-center">
                    <div className="text-[#ff2d37] text-[16px] font-bold">{product?.price}₫</div>
                </div>
                <div className="w-[18%] px-[5px] flex items-center justify-center">
                    <div className="product-quantity ">
                        <div className="custom-quantity flex items-center ">
                            <button
                                onClick={handleMinus}
                                className="minus-btn  border border-solid border-[#ebebeb] flex items-center justify-center w-[35px] h-[35px]"
                            >
                                <AiOutlineMinus className=""></AiOutlineMinus>
                            </button>
                            <input
                                onChange={handleChangeQuantity}
                                className="w-[45px] h-[35px] border border-solid border-[#ebebeb] flex items-center justify-center text-center outline-none"
                                value={value}
                                maxLength={4}
                            ></input>
                            <button
                                onClick={handlePlus}
                                className="plus-btn border border-solid border-[#ebebeb] flex items-center justify-center w-[35px] h-[35px]"
                            >
                                <AiOutlinePlus></AiOutlinePlus>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-[24%] px-[5px] flex items-center justify-center">
                    <div className="text-[#ff2d37] text-[16px] font-bold ml-4">{totalPrice}₫</div>
                </div>
            </div>
        </div>
    )
}

export default CartItem