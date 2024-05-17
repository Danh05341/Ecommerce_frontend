import { Link, useNavigate } from 'react-router-dom'
import { } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";
import { FaBasketShopping } from "react-icons/fa6";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { logoutRedux } from '../redux/userSlice'
import Cart from './Cart';
import logo from '../assets/images/logo.webp'
import { setDataLogout } from '../redux/productSlice';
import { toast } from 'react-toastify'


const Header = () => {
    
    const userImage = localStorage.getItem('user_image')
    const userToken = useSelector(state => state.user.token)
    const [inputValue, setInputValue] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleInput = (e) => {
        setInputValue(e.target.value)
    }
    const handleSearch = () => {
        if (inputValue) {
            navigate(`/search?query=${encodeURIComponent(inputValue)}`)
        }
        setInputValue("")
    }
    const handleLogout = () => {
        toast.success('Logout successfully')
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('user_image')
        localStorage.removeItem('user_role')
        localStorage.removeItem('cart_id')

        dispatch(logoutRedux())
        dispatch(setDataLogout())
    }
    return (
        <div className="header h-[110px] py-[10px] w-full flex justify-center">
            <div className="w-[1200px] mx-[32px] px-[15px] flex items-center justify-between">
            {/* <div><Link to={"/admin/dashboard"}>GO to admin page</Link></div> */}

                {/* Logo */}
                <div className="block w-[300px] h-[90px] py-[10px] float-left px-[15px] cursor-pointer">
                    <Link to='/'>
                        <img src={logo} alt="logo" className='h-full' />
                    </Link>
                </div>
                {/* right header */}
                <div className="float-right flex gap-[15px]">
                    <div className="border border-solid border-[#e5e6ec] rounded-[40px] w-[350px] h-[45px] flex items-center">
                        <input className="inline-block w-[340px] h-[40px] outline-none border-none m-[16px]" placeholder="Tìm kiếm..." value={inputValue} onChange={handleInput}></input>
                        <button className="inline-block text-[#ff2d37] font-bold text-[24px] w-[40px] h-[40px] bg-white border-none mx-[8px] rounded-full " onClick={handleSearch}>
                            <AiOutlineSearch />
                        </button>
                    </div>

                    <a className="flex items-center border-2  border-solid border-[#ff2d37] rounded-[45px] text-[#ff2d37] cursor-pointer hover:bg-[#ffc6c9] hover:text-white" href="#">
                        <div className="w-[127px] h-[41px] flex flex-col justify-center text-[11px] text-center mr-[4px] ml-[22px]">
                            <span className='text-[14px] leading-[1] mt-[4px]'>Tư vấn bán hàng</span>
                            <span className='font-bold text-[14px] '>Gọi ngay 19006750</span>
                        </div>
                        <div className=" w-[43px] h-[41px] border-2  border-solid border-[#ff2d37] rounded-[45px] bg-[#ff2d37] flex items-center justify-center text-white">
                            <BsFillTelephoneFill />
                        </div>
                    </a>

                    {
                        userToken.accessToken ? (
                            <div className="relative h-[45px] w-[45px] bg-[#ff2d37] rounded-[50px] flex items-center justify-center text-white cursor-pointer group/user  " >
                                {
                                    userImage ? (
                                        <img className='rounded-[500px] w-full h-full object-cover' src={userImage} alt="user-img"></img>

                                    ) : (
                                        <img className='rounded-[500px] w-full h-full object-cover' src='data:image/jpeg;base64,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' alt="user-img"></img>

                                    )
                                }
                                <div className=" hidden w-[180px] bg-white p-[10px] text-center absolute z-50 top-[45px] border rounded-[10px] shadow-md group-hover/user:block ">
                                    <Link className="block bg-[#ff2d37] text-white border border-[#ff2d37] h-[35px] leading-[35px] rounded-[25px] mt-[5px] hover:bg-white hover:text-[#ff2d37]" to={'/account/user'}>Tài khoản</Link>
                                    <Link to='/' onClick={handleLogout} className="block bg-[#ff2d37] text-white border border-[#ff2d37] h-[35px] leading-[35px] rounded-[25px] mt-[5px] hover:bg-white hover:text-[#ff2d37]" >Đăng xuất</Link>
                                </div>
                            </div>
                        ) : (
                            <div className="relative h-[45px] w-[45px] bg-[#ff2d37] rounded-[50px] flex items-center justify-center text-white cursor-pointer group/user  " >
                                <BiSolidUser />

                                <div className=" hidden w-[180px] bg-white p-[10px] text-center absolute z-50 top-[45px] border rounded-[10px] shadow-md group-hover/user:block ">
                                    <Link className="block bg-[#ff2d37] text-white border border-[#ff2d37] h-[35px] leading-[35px] rounded-[25px] mt-[5px] hover:bg-white hover:text-[#ff2d37]" to={'/login'}>Đăng nhập</Link>
                                    <Link className="block bg-[#ff2d37] text-white border border-[#ff2d37] h-[35px] leading-[35px] rounded-[25px] mt-[5px] hover:bg-white hover:text-[#ff2d37]" to={'/signup'}>Đăng ký</Link>
                                </div>
                            </div>
                        )

                    }


                    <div className="relative h-[45px] w-[45px] bg-[#ff2d37] rounded-[50px] flex items-center justify-center  text-white cursor-pointer group/cart" >
                        <FaBasketShopping />
                        <Cart />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header