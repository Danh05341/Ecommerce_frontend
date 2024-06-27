import React, { useEffect, useState } from 'react'
import { IoIosSearch } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { getUserByIdAPI } from '../../../apis';

function HeaderAdmin() {
    const userData = useSelector(state => state.user.data)
    const [user, setUser] = useState({})
    console.log('user: ', user)
    useEffect(() => {
       
        getUserByIdAPI(userData.user_id ?? userData._id).then(dataRes => {
            setUser(dataRes.data)
        }).catch(err => {
            console.log('error', err)
        })
    }, [])

    return (
        <div style={{ boxShadow: '0px 2px 2px -1px rgba(0, 0, 0, 0.15)' }} className='fixed left-[230px] w-[calc(100%-230px)] h-[52px] bg-white flex items-center justify-between px-[30px] z-20'>
            {/* header left */}
            <div className='flex'>
                <div className='flex items-center bg-[white] border border-transparent rounded-[6px] w-[600px] hover:bg-[#F3F3F3] focus-within:border-[#0088FF] cursor-pointer group/input'>
                    <div className='w-[32px] h-[32px] flex items-center justify-center mx-[8px]'>
                        <IoIosSearch className='text-[#9CA3B5] text-[20px] ' />
                    </div>
                    <input className='h-[36px] text-[14px] rounded-[6px] bg-[white] outline-none w-full font-[500] group-hover/input:bg-[#F3F3F3] focus:border-[black]' placeholder='Tìm kiếm Crtl + K'></input>
                </div>
            </div>
            {/* header right */}
            <div className='flex items-center gap-2 max-w-[200px] h-[42px] rounded-[8px] cursor-pointer px-[8px] py-[5px] hover:bg-[#F2F9FF]'>
                <img className='w-[30px] h-[30px] rounded-full' src={user.image} alt=''></img>
                <span className='flex-1 flex justify-center font-[500] text-[16px]'>{user.lastName}</span>
                <FaChevronDown className='text-[12px] mt-[1px] text-[#9CA3B5]'/>
            </div>
        </div>
    )
}

export default HeaderAdmin