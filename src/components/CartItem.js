import { useSelector } from "react-redux"
import productImage from '../assets/images/product_1.webp'
import { BsTrash3Fill } from 'react-icons/bs'
const CartItem = (props) => {
    const {product} = props
    return (
        <li className="h-[145px] w-full p-[20px] flex border-b border-[#eaebf3]">
            <a href="#" className="w-[85px] h-[85px] mr-[10px]">
                <img className="w-full object-fill" src={productImage} />
            </a>
            <div className="flex flex-col relative w-[158px] top-[-3px] ">
                <div className=" text-[14px] text-[#282828] cursor-pointer hover:text-[#ff2d37] ">
                    Giày đá bóng chính hãng hàng hot
                </div>
                <span class="text-[14px] font-bold text-[#ff2d37] mt-1 cursor-text">700.000₫</span>
                <input type="text" value={"1"} readOnly className="w-[50px] min-h-[30px] mt-2 outline-none border border-solid border-[#eaebf3] text-[#282828] text-center" />
            </div>
            <BsTrash3Fill className="w-3 h-4 text-[#ff2d37] relative left-1" />
        </li>
    )
}

export default CartItem