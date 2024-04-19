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

        dispatch(logoutRedux())
        dispatch(setDataLogout())
    }
    return (
        <div className="header h-[110px] py-[10px] w-full flex justify-center">
            <div className="w-[1200px] mx-[32px] px-[15px] flex items-center justify-between">
            <div><Link to={"/admin/dashboard"}>GO to admin page</Link></div>

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
                                        <img className='rounded-[500px] w-full h-full object-cover' src='https://scontent.fdad4-1.fna.fbcdn.net/v/t39.30808-6/383346370_3656083124715580_4073762366733895123_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHxzwOB1fTff_nW3wXLA-MmrjK2NvLOcVOuMrY28s5xUzbSKrH3onV7-z0Hn8wkzp99tJWluYotPtAgh-0Qtzql&_nc_ohc=TAamSBZWjaQAX9XydUf&_nc_ht=scontent.fdad4-1.fna&oh=00_AfDhRIPCldtKKydnVVj4Tfx_kHJ5JsbC5cMDYRtxuNXLFA&oe=65564D07' alt="user-img"></img>

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