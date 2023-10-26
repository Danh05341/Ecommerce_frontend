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

const Header = () => {
    // const [showMenu, setShowMenu] = useState(false)
    // const dispatch = useDispatch()
    // const navigate = useNavigate()

    // const handleShowMenu = () => {
    //     setShowMenu(preShow => !preShow)
    // }
    // const handleLogout = () => {
    //     dispatch(logoutRedux())
    //     navigate('/')
    // }
    // const userData = useSelector(state => state.user.data)
    const [inputValue, setInputValue] = useState('')
    const [isHoverCart, setIsHoverCart] = useState(false)
     
    const navigate = useNavigate();

    const handleInput = (e) => {
        setInputValue(e.target.value)
    }
    const handleSearch = () => {
        if (inputValue) {
            navigate(`/search?query=${encodeURIComponent(inputValue)}`)
        }
        setInputValue("")
    }

    return (
        // <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white'>
        //     {/* desktop  */}
        //     <div className='flex items-center h-full justify-between'>
        //         <Link to='/'>
        //             <div className='h-12'>
        //                 <img className='h-full' src={logo} alt='logo'></img>
        //             </div>

        //         </Link>

        //         <div className='flex items-center gap-4 md:gap-7'>
        //             <nav className='flex gap-4 md:gap-6 text-base md:text-lg'>
        //                 <Link to='/'>Home</Link>
        //                 <Link to='/menu'>Menu</Link>
        //                 <Link to='/about'>About</Link>
        //                 <Link to='/contact'>Contact</Link>
        //             </nav>
        //             <div className='text 2xl text-slate-600 relative cursor-pointer w-5 h-5'>
        //                 <BsCartFill className='w-full h-full'/>
        //                 <div className='absolute -top-2 -right-2 text-white bg-red-500 h-4 w-4 m-0 p-0 rounded-full text-xs text-center'>0</div>
        //             </div>
        //             <div className='text-slate-600' onClick={handleShowMenu}>
        //                 <div className='text-2xl cursor-pointer w-6 h-6 rounded-full overflow-hidden'>
        //                     {userData.image
        //                         ? <img src={userData.image} alt="user" className='h-full w-full'/>
        //                         : <HiOutlineUserCircle />
        //                     }
        //                 </div>
        //                 {
        //                     showMenu && (
        //                         <div className='absolute right-2 py-2  bg-white shadow drop-shadow-md flex flex-col cursor-pointer'>
        //                             {userData.email === 'danh05341@gmail.com' && <Link to='/newproduct' className='whitespace-nowrap px-2'>New product</Link>}
        //                             {
        //                                 userData.image ? <p onClick={handleLogout} className=' text-white bg-red-500 px-2'>Logout</p> : <Link to='/login' className='whitespace-nowrap px-2'>Login</Link >
        //                             }

        //                         </div>
        //                     )
        //                 }
        //             </div>
        //         </div>
        //     </div>
        //     {/* mobile */}
        // </header>
        <div class="header h-[110px] py-[10px] w-full flex justify-center">
            <div class="w-[1200px] mx-[32px] px-[15px] flex items-center justify-between">

                <div class="block w-[300px] h-[90px] py-[10px] float-left px-[15px] cursor-pointer">
                    <Link to='/'>
                        <img src={logo} alt="logo" className='h-full' />
                    </Link>

                </div>

                <div class="float-right flex gap-[15px]">
                    <div class="border border-solid border-[#e5e6ec] rounded-[40px] w-[350px] h-[45px] flex items-center">
                        <input class="inline-block w-[340px] h-[40px] outline-none border-none m-[16px]" placeholder="Tìm kiếm..." value={inputValue} onChange={handleInput}></input>
                        <button class="inline-block text-[#ff2d37] font-bold text-[24px] w-[40px] h-[40px] bg-white border-none mx-[8px] rounded-full " onClick={handleSearch}>
                            <AiOutlineSearch />
                        </button>
                    </div>

                    <a class="flex items-center border-2  border-solid border-[#ff2d37] rounded-[45px] text-[#ff2d37] cursor-pointer hover:bg-[#ffc6c9] hover:text-white" href="#">
                        <div class="w-[127px] h-[41px] flex flex-col justify-center text-[11px] text-center mr-[4px] ml-[22px]">
                            <span className='text-[14px] leading-[1] mt-[4px]'>Tư vấn bán hàng</span>
                            <span className='font-bold text-[14px] '>Gọi ngay 19006750</span>
                        </div>
                        <div class=" w-[43px] h-[41px] border-2  border-solid border-[#ff2d37] rounded-[45px] bg-[#ff2d37] flex items-center justify-center text-white">
                            <BsFillTelephoneFill />
                        </div>
                    </a>

                    <div class="relative h-[45px] w-[45px] bg-[#ff2d37] rounded-[50px] flex items-center justify-center text-white cursor-pointer group/user  " >
                        <BiSolidUser />

                        <div class=" hidden w-[180px] bg-white p-[10px] text-center absolute z-50 top-[45px] border rounded-[10px] shadow-md group-hover/user:block ">
                            <a class="block bg-[#ff2d37] text-white border border-[#ff2d37] h-[35px] leading-[35px] rounded-[25px] mt-[5px] hover:bg-white hover:text-[#ff2d37]" href="#">Đăng nhập</a>
                            <a class="block bg-[#ff2d37] text-white border border-[#ff2d37] h-[35px] leading-[35px] rounded-[25px] mt-[5px] hover:bg-white hover:text-[#ff2d37]" href="#">Đăng ký</a>
                        </div>
                    </div>

                    <div class="relative h-[45px] w-[45px] bg-[#ff2d37] rounded-[50px] flex items-center justify-center  text-white cursor-pointer group/cart" >
                        <FaBasketShopping />
                        <Cart />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header