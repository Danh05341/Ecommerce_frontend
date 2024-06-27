import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserByIdAPI } from "../../apis";
import Addresses from "./Adresses";
import ChangePassWord from "./ChangePassWord";

const Account = () => {
    const userData = useSelector(state => state.user.data)
    const [user, setUser] = useState({})
    const [accountState, setAccountState] = useState('user')

    console.log('userData: ', userData)
    useEffect(() => {
        getUserByIdAPI(userData.user_id ?? userData._id).then((dataRes) => {
            console.log('dataRes: ', dataRes)
            setUser(dataRes.data)
        })
    }, [userData])

    return (
        <div className="w-full  bg-white flex mb-[-30px]">
            <div className="w-[1200px]  m-auto">
                <div className='w-full px-[15px] mt-[24px] ml-[20px]'>
                    <Link to='/'>
                        <li className="list-none inline cursor-pointer  text-[14px] hover:text-[#ff2d37]">Trang ch</li>
                    </Link>
                    <BsChevronRight className='text-[10px] font-bold w-[30px] h-[10px] inline' />

                    <li className="list-none inline cursor-text text-[#ff2d37] text-[14px]">Trang khách hàng</li>
                </div>
                <div className="mx-[15px] bg-white  ">
                    <div className="text-[24px] font-bold text-[#ff2d37] leading-[38px] text-center mt-[8px]">
                        Trang khách hàng
                    </div>
                </div>
                <div className="px-[20px] mt-[20px] flex h-[500px]">
                    <div className="w-[300px] px-[15px] ">
                        <div className="text-[20px]">TRANG TÀI KHOẢN</div>
                        <div className="text-[14px] font-bold">Xin chào, <span className="text-[#ff2d37]">DANH LE!</span></div>
                        <div className="flex flex-col gap-[20px] mt-[25px] cursor-pointer">
                            <div onClick={() => setAccountState('user')} className={accountState === 'user' ? 'text-[#ff2d37]' : 'hover:text-[#ff2d37]'} to={'/account/user'}>Thông tin tài khoản</div>
                            <div onClick={() => setAccountState('changepassword')} className={accountState === 'changepassword' ? 'text-[#ff2d37]' : 'hover:text-[#ff2d37]'} to={'/account/changepassword'}>Đổi mật khẩu</div>
                            <div onClick={() => setAccountState('addresses')} className={accountState === 'addresses' ? 'text-[#ff2d37]' : 'hover:text-[#ff2d37]'} to={'/account/addresses'}>Địa chỉ</div>
                        </div>
                    </div>
                    {
                        (accountState === 'user') && (
                            <div className="px-[15px] flex-1">
                                <div className="border-b pb-[20px]">
                                    <div className="text-[20px]">THÔNG TIN TÀI KHOẢN</div>
                                </div>
                                <div className="flex flex-col gap-[20px] mt-[25px]">
                                    <div className='text-[14px]' >
                                        <span className="font-bold ">Họ tên: </span>
                                        <span className="">{`${user.firstName} ${user.lastName}`}</span>
                                    </div>
                                    <div className='text-[14px]' >
                                        <span className="font-bold ">Email: </span>
                                        <span className="">danh05341@gmail.com </span>

                                    </div>
                                    {
                                        user?.addresses?.[0].phone && (
                                            <div className='text-[14px]' >
                                                <span className="font-bold ">Điện thoại: </span>
                                                {user?.addresses?.[0]?.phone}
                                            </div>
                                        )
                                    }
                                    {
                                        user?.addresses?.length > 0 && (
                                            <div className='text-[14px]' >
                                                <span className="font-bold ">Địa chỉ: </span>
                                                {user?.addresses?.[0]?.address}

                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )

                    }
                    {
                        (accountState === 'addresses') && (
                            <Addresses />
                        )

                    }
                    {
                        (accountState === 'changepassword') && (
                            <ChangePassWord />
                        )
                    }

                </div>
            </div>
        </div>
    )
};

export default Account;
