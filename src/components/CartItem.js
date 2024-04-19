import { useDispatch, useSelector } from "react-redux"
import productImage from '../assets/images/product_1.webp'
import { BsTrash3Fill } from 'react-icons/bs'
import { removeProduct } from "../redux/productSlice"
const CartItem = (props) => {
    const product = props.product
    const dispatch = useDispatch()
    const userData = useSelector(state => state.user.data)

    const handleRemoveProduct = () => {
        dispatch(removeProduct(product.productId._id))
        if(userData.cart_id) {
            fetch(`${process.env.REACT_APP_SERVER_LOCAL}cart/${userData.cart_id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({id: product.productId._id}),
            }).then(respone => respone.json())
            .then(respone => {
                console.log(respone)
            })
            .catch(err => console.log(err))
        }
    }
    return (
        <li className="h-[145px] w-full p-[20px] flex border-b border-[#eaebf3]">
            <a href="#" className="w-[85px] h-[85px] mr-[10px]">
                <img className="w-full object-fill" src={product?.productId?.image[0]} />
            </a>
            <div className="flex flex-col relative w-[158px] top-[-3px] ">
                <div className=" text-[14px] text-[#282828] cursor-pointer hover:text-[#ff2d37] ">
                    {product?.productId?.name}
                </div>
                <span className="text-[14px] font-bold text-[#ff2d37] mt-1 cursor-text">{product?.productId?.price}</span>
                <input type="text" value={product?.quantity} readOnly className="w-[50px] min-h-[30px] mt-2 outline-none border border-solid border-[#eaebf3] text-[#282828] text-center" />
            </div>
            <BsTrash3Fill onClick={handleRemoveProduct} className="w-3 h-4 text-[#ff2d37] relative left-1" />
        </li>
    )
}

export default CartItem