import { useSelector } from "react-redux"
import productImage from '../assets/images/product_1.webp'
import { BsTrash3Fill } from 'react-icons/bs'
import CartItem from "./CartItem"
import { Link } from "react-router-dom"
const Cart = () => {
    const products = useSelector(state => state.product.data)
    console.log(products)
    return (
        <>
            {
                products ? (
                    <div className="hidden absolute top-[45px] right-[-8px] bg-white shadow-lg z-50 group-hover/cart:block">
                        <ul className="w-[315px]">
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
                                <span className="font-bold text-[#ff2d37] text-[18px]">970.000₫</span>
                            </div>
                            <div className="bg-[#ff2d37] flex justify-center items-center border border-[#ff2d37] border-solid rounded-[4px] hover:bg-white group/checkout ">
                                <Link to='/checkout' className="inline-block p-[7px] ">
                                    <span className="text-white group-hover/checkout:text-[#ff2d37]">Tiến hành thanh toán</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (   
                    <div className="hidden w-[315px] p-[15px] absolute top-[45px] right-[-8px] shadow-md text-[#282828] text-[14px] bg-white group-hover/cart:block">
                        Không có sản phẩm nào
                    </div>
                )
            }
        </>

    )
}

export default Cart