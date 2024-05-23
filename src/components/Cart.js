import { useSelector, useDispatch } from "react-redux"
import productImage from '../assets/images/product_1.webp'
import { BsTrash3Fill } from 'react-icons/bs'
import CartItem from "./CartItem"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { setDataProduct } from "../redux/cartSlice"

const Cart = () => {
	const dispatch = useDispatch()
    const userData = useSelector(state => state.user.data)
    const products = useSelector(state => state.cart.data)
    const [totalPrice, setTotalPrice] = useState()
    useEffect(() => {
        const getProduct = async() => {
            const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}cart/${userData.cart_id}`)
            const dataRes = await fetchData.json()
            dispatch(setDataProduct(dataRes.data.items))
        }
           if(userData.cart_id) {
                getProduct()
           }
    }, [userData])
    useEffect(() => {
        // Tính tổng tiền khi products thay đổi
        const calculateTotalPrice = () => {
            let totalPrice = products.reduce((total, product) => {
                total += +product?.productId?.price?.replace(/\./g, '') * product?.quantity
                return total;
            }, 0)
            totalPrice = totalPrice.toLocaleString('vi-VN')
            setTotalPrice(totalPrice);
        };
        calculateTotalPrice();
    }, [products]);
    return (
        <>
            {
                products?.[0] ? (
                    <div className="hidden  absolute top-[44px] right-[-8px] bg-white shadow-lg z-50 group-hover/cart:block">
                        <ul className="w-[315px] max-h-[290px] overflow-auto">
                            {
                                products.map((product, index) => {
                                    return (
                                        <CartItem key={index} product={product} />
                                    )
                                })
                            }
                        </ul>
                        <div className="h-[110px] px-[20px] text-[14px] flex flex-col">
                            <div className=" py-[12px] flex justify-between cursor-text">
                                <span className="font-bold text-[#282828] ">Tổng tiền:</span>
                                <span className="font-bold text-[#ff2d37] text-[18px]">{totalPrice}</span>
                            </div>
                            <div className="bg-[#ff2d37] flex justify-center items-center border border-[#ff2d37] border-solid rounded-[4px] hover:bg-white group/checkout ">
                                <Link to='/checkout' className="inline-block p-[7px] ">
                                    <span className="text-white group-hover/checkout:text-[#ff2d37]">Tiến hành thanh toán</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="hidden z-50 w-[315px] p-[15px] absolute top-[45px] right-[-8px] shadow-md text-[#282828] text-[14px] bg-white group-hover/cart:block">
                        Không có sản phẩm nào
                    </div>
                )
            }
        </>

    )
}

export default Cart