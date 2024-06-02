import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartItem from "./CartItem/CartItem";
import { useEffect, useState } from "react";

function Cart() {
    const productsCart = useSelector(state => state.cart.data)
    const [totalPrice, setTotalPrice] = useState()
    const [countProduct, setCountProduct] = useState()
    console.log('productsCart: ', productsCart)
    //chưa xong
    useEffect(() => {
        const calculateTotalPrice = () => {
            let totalPrice = productsCart.reduce((total, product) => {
                total += +product?.productId?.price?.replace(/\./g, '') * product?.quantity
                return total;
            }, 0)
            totalPrice = totalPrice.toLocaleString('vi-VN')
            setTotalPrice(totalPrice);
        };
        const calculateCountProduct = () => {
            let countProduct = productsCart.reduce((total, product) => {
                console.log('product.quantity:', product.quantity)
                total += (product?.quantity)
                return total;
            }, 0)
            setCountProduct(countProduct);
        }
        calculateTotalPrice()
        calculateCountProduct()
    }, [productsCart])
    //
    return (
        <div className="w-full h-[100vh] bg-white flex">
            <div className="w-[1200px] mx-auto">
                <div className="mx-[15px] bg-white ">
                    {/* Breakcumb */}
                    <div className='w-full px-[15px] mt-[24px] ml-[20px]'>
                        <Link to='/'>
                            <li className="list-none inline cursor-pointer  text-[14px] hover:text-[#ff2d37]">Trang chủ</li>
                        </Link>
                        <BsChevronRight className='text-[10px] font-bold w-[30px] h-[10px] inline' />
                        <li className="list-none inline cursor-text text-[#ff2d37] text-[14px]">Giỏ hàng</li>
                    </div>
                    <div className="text-[24px] font-bold text-[#ff2d37] leading-[38px] text-center mt-[8px]">
                        Giỏ hàng
                    </div>

                    <div className=" mt-[25px] px-[20px]">

                        <div className="flex items-center gap-[6px] mb-[10px] cursor-pointer">
                            <h3 className="text-[24px] text-[#282828] font-bold hover:text-[#ff2d37]">Giỏ hàng của bạn</h3>
                            <p className="text-[14px] text-[#8d90a6] mt-2">(<span>{countProduct}</span> sản phẩm)</p>
                        </div>
                        {
                            productsCart.length > 0 ? (
                                <div className="">
                                    <div className="py-[10px] flex border-b">
                                        <div className="w-[43%] font-bold text-[16px] text-[#282828]">Sản phẩm</div>
                                        <div className="w-[19%] font-bold text-[16px] flex justify-center text-[#282828]"><span className="">Giá</span></div>
                                        <div className="w-[23%] font-bold text-[16px] flex justify-center text-[#282828]"><span className="">Số lượng</span></div>
                                        <div className="w-[25%] font-bold text-[16px] flex justify-center text-[#282828]"><span className="">Thành tiền</span></div>
                                    </div>
                                    {/* 1 product item cart */}
                                    {/* render item cart */}
                                    {
                                        productsCart.map((product) => {
                                            return (
                                                <CartItem key={product.productId._id} product={product.productId} quantity={product.quantity}></CartItem>
                                            )
                                        })
                                    }

                                    <div className="flex justify-between mt-[10px] items-center">
                                        <Link to={"/product/all"}>
                                            <div className="h-[40px] bg-[#000] rounded-[40px] cursor-pointer flex items-center justify-center border border-solid border-[#000] hover:bg-white hover:border-[#ff2d37] group/continue">
                                                <div className="px-[56px] py-[5px] text-[16px] text-white  select-none group-hover/continue:text-[#ff2d37]">Tiếp tục mua hàng</div>
                                            </div>
                                        </Link>
                                        <div className="h-[50px] w-[360px] flex justify-between items-center border-b">
                                            <div className="text-[#282828] text-[16px] font-bold">Thành tiền:</div>
                                            <div className="text-[#ff2d37] text-[18px] font-bold">{totalPrice}₫</div>
                                        </div>
                                    </div>
                                    <Link to={'/checkout'}>
                                        <div className="w-[360px] h-[40px] bg-[#ff2d37] rounded-[40px] cursor-pointer flex items-center justify-center border border-solid border-[#ff2d37] float-right mt-[25px] hover:bg-white hover:border-[#ff2d37] group/continue">
                                            <div className="px-[56px] py-[5px] text-[16px] text-white  select-none group-hover/continue:text-[#ff2d37]">Tiến hành thanh toán</div>
                                        </div>
                                    </Link>

                                </div>
                            ) : (
                                <div>Không có sản phẩm nào. Quay lại cửa hàng để tiếp tục mua sắm.</div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
