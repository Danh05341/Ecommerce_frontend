import { useState } from "react";
import { BsChevronRight } from "react-icons/bs";

const SideBar = () => {

    const [childActive1, setChildActive1] = useState(false)
    const [childActive2, setChildActive2] = useState(false)

    const handleActive1 = (e) => {
        setChildActive1(prev => !prev);
    }
    const handleActive2 = (e) => {
        setChildActive2(prev => !prev);
    }

    return (
        <div className="flex flex-col gap-y-[10px]">
            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Trang chủ</li>
            <li className="list-none text-[14px] ">
                <span className="hover:text-[#ff2d37] cursor-pointer flex items-center justify-between">
                    <div className="flex-1">Sản phẩm</div>
                    <BsChevronRight className='text-[10px] font-bold w-[30px] h-[10px]' onClick={handleActive1} />
                </span>
                {
                    childActive1 && (
                        <ul className="list-none text-[14px] pl-[20px] flex flex-col gap-[10px] pt-[10px]">
                            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giày nam</li>
                            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giày nữ</li>
                            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giày bé trai</li>
                            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giày bé gái</li>
                            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giày tây</li>
                        </ul>
                    )
                }
            </li>
            <li className="list-none text-[14px]">
                <span className="hover:text-[#ff2d37] cursor-pointer flex items-center justify-between">
                    <div className="flex-1">Giày thể thao</div>
                    <BsChevronRight className='text-[10px] font-bold w-[30px] h-[10px]' onClick={handleActive2} />
                </span>
                {
                    childActive2 && (
                        <ul className="list-none text-[14px] pl-[20px] flex flex-col gap-[10px] pt-[10px]">
                            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giày ultra boots</li>
                            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giày chạy bộ</li>
                            <li className="list-none text-[14px]">
                                <span className="hover:text-[#ff2d37] cursor-pointer">Giày đi phượt</span>
                                <ul className="list-none text-[14px] hidden ">
                                    <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giày chống nước</li>
                                    <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giày đinh</li>
                                </ul>
                            </li>
                            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giày bitis</li>
                            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giày nike</li>
                        </ul>
                    )
                }
            </li>
            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Giới thiệu</li>
            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Liên hệ</li>
            <li className="list-none text-[14px] hover:text-[#ff2d37] cursor-pointer">Tin tức</li>
        </div>
    )
}

export default SideBar