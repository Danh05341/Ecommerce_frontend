import { Link } from "react-router-dom"
import {BsChevronDown} from 'react-icons/bs'
import NavCategory from "./NavCategory"
import NavSportShoes from "./NavSportShoes"
const Navbar = () => {
    return (
        <div className="w-full relative h-[44px] flex items-center justify-center gap-[35px] bg-[#ff2d37] uppercase font-bold text-[14px] text-white cursor-pointer">
            <div className="">
                <Link to='/' className="leading-[44px] inline-block">Trang chủ</Link>
            </div>
            <div className="group/navCategory">
                <Link to='/' className="inline-block leading-[44px]">Sản phẩm</Link>
                <BsChevronDown className="ml-[8px] text-[12px] inline-block "/>
                <NavCategory/>
            </div>
            <div className="group/sportShoes relative">
                <Link to='/' className="inline-block leading-[44px]">Giày thể thao</Link>
                <BsChevronDown className="ml-[8px] text-[12px] inline-block "/>
                <NavSportShoes/>
            </div>
            <div className="">
                <Link to='/' className="inline-block leading-[44px]">Liên hệ</Link>
            </div>
            <div className="">
                <Link to='/' className="inline-block leading-[44px]">Giới thiệu</Link>
            </div>
            <div className="">
                <Link to='/' className="inline-block leading-[44px]">Tin tức</Link>
            </div>
        </div>
    )
}

export default Navbar