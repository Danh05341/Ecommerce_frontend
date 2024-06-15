import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CiHome } from "react-icons/ci";
import { MdOutlineBorderColor } from "react-icons/md";
import { CgWebsite } from "react-icons/cg";
import { FaEye } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { BiCategory, BiPackage } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { CiDiscount1 } from "react-icons/ci";


function SideBarAdmin() {
  const location = useLocation()
  const parts = location?.pathname?.split('/')
  const lastPart = parts[parts.length - 1]
  const [active, setActive] = useState(lastPart)
  const handleCLick = (item) => {
    setActive(item)
  }
  const getClassNames = (item) => {
    return (
      `flex items-center h-[32px] px-[8px] gap-[13px] cursor-pointer hover:bg-[#2B4263] group/icon rounded ${active === item ? 'bg-[#2B4263]' : ''
      }`
    )
  }
  return (
    <div className='fixed left-0 top-0 bottom-0 w-[230px] h-[100vh] bg-[#182537] text-[#EEEFEF] flex flex-col z-20'>
      <div className='h-[52px] flex items-center border-b border-[#46515F]'>
        <div className='font-bold px-[20px]'>DELTA SHOES</div>
      </div>
      <div className='px-[12px] flex flex-col gap-y-[4px] my-[8px] '>

        <Link to={'/admin/dashboard'}>
          <div onClick={() => handleCLick('dashboard')} className={getClassNames('dashboard')}>
            <CiHome className='text-[20px] mt-[2px]  text-[#EEEFEF] group-hover/icon:text-[#EEEFEF]'></CiHome>
            <span className='text-[16px] '>Tổng quan</span>
          </div>
        </Link>
        <Link to={'/admin/orders'}>
          <div onClick={() => handleCLick('orders')} className={getClassNames('orders')}>
            <MdOutlineBorderColor className='text-[20px] mt-[2px] text-[#EEEFEF] group-hover/icon:text-[#EEEFEF]'></MdOutlineBorderColor>
            <span className='text-[16px] '>Đơn hàng</span>
          </div>
        </Link>

        <Link to={'/admin/products'}>
          <div onClick={() => handleCLick('products')} className={getClassNames('products')}>
            <BiPackage className='text-[20px] mt-[2px] text-[#EEEFEF] group-hover/icon:text-[#EEEFEF]'></BiPackage>
            <span className='text-[16px] '>Sản phẩm</span>
          </div>
        </Link>

        <Link to={'/admin/category'}>
          <div onClick={() => handleCLick('category')} className={getClassNames('category')}>
            <BiCategory className='text-[20px] mt-[2px] text-[#EEEFEF] group-hover/icon:text-[#EEEFEF]'></BiCategory >
            <span className='text-[16px] '>Danh mục sản phẩm</span>
          </div>
        </Link>

        <Link to={'/admin/customers'}>
          <div onClick={() => handleCLick('customers')} className={getClassNames('customers')}>
            <FaRegUser className='text-[20px] mt-[2px] text-[#EEEFEF] group-hover/icon:text-[#EEEFEF]'></FaRegUser>
            <span className='text-[16px] '>Khách hàng</span>
          </div>
        </Link>

        <Link to={'/admin/discount'}>
          <div onClick={() => handleCLick('discount')} className={getClassNames('discount')}>
            <CiDiscount1 className='text-[20px] mt-[2px] text-[#EEEFEF] group-hover/icon:text-[#EEEFEF]'></CiDiscount1>
            <span className='text-[16px] '>Khuyến mãi</span>
          </div>
        </Link>

      </div>
      <div className='px-[12px] py-[4px] flex flex-col gap-y-[4px] my-[8px] border-t border-[#46515F]'>
        <div className='flex items-center justify-between pr-[6px]'>
          <div className='font-[500] px-[10px] text-[16px] py-[8px]'>KÊNH BÁN HÀNG</div>
          <IoIosAddCircleOutline className='text-[21px] text-[#EEEFEF] ' ></IoIosAddCircleOutline>
        </div>

        <Link to={'/'} target='blank'>
          <div onClick={() => handleCLick('website')} className={getClassNames('website')}>
            <div className='hover:bg-[#2B4263] cursor-pointer group/icon flex items-center h-[32px] gap-[13px] rounded pl-[8px] ml-[-8px] flex-1'>
              <div className='w-[18px] h-[18px] bg-[#0DB473] rounded flex items-center justify-center'><CgWebsite className='text-[20px] mt-[2px] text-[white] inline-block px-[2px]'></CgWebsite></div>
              <span className='text-[16px] flex-1'>Website</span>
            </div>
            <FaEye className='text-[18px] text-[#EEEFEF] hover:text-[#EEEFEF] cursor-pointer'></FaEye>
          </div>
        </Link>
      </div>
      <div className='px-[12px] py-[4px] flex-1 flex flex-col gap-y-[4px] my-[8px] border-t  border-[#46515F]'>
        <div className='flex items-center justify-between pr-[6px]'>
          <div className='font-[500] px-[10px] text-[16px] py-[8px]'>ỨNG DỤNG</div>
          <IoIosAddCircleOutline className='text-[21px] text-[#EEEFEF] ' ></IoIosAddCircleOutline>
        </div>
      </div>
      {/* Cấu hình */}
      <div className='px-[12px] py-[8px] flex flex-col gap-y-[4px]  border-t border-[#46515F]'>
        <div onClick={() => handleCLick('settings')} className={getClassNames('settings')}>
          <IoSettingsOutline className='text-[20px] mt-[2px] text-[#EEEFEF] group-hover/icon:text-[#EEEFEF]'></IoSettingsOutline>
          <span className='text-[16px] '>Cấu hình</span>
        </div>
      </div>
    </div>
  )
}
// color: #EEEFEF, #EEEFEF

export default SideBarAdmin