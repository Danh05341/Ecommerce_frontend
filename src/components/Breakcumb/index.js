import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const BreakCumb = () => {
    return (
        <div className="w-full px-[15px] mt-[24px] ml-[20px]">
            <Link to="/">
                <li className="list-none inline cursor-pointer  text-[14px] hover:text-[#ff2d37]">
                    Trang chủ
                </li>
            </Link>
            <BsChevronRight className="text-[10px] font-bold w-[30px] h-[10px] inline" />
            {/* <Link to="/">
                <li className="list-none inline cursor-pointer  text-[14px] hover:text-[#ff2d37]">
                    Sneaker nổi bật
                </li>
            </Link>
            <BsChevronRight className="text-[10px] font-bold w-[30px] h-[10px] inline" /> */}
            <li className="list-none inline cursor-text text-[#ff2d37] text-[14px]">
                Tất cả sản phẩm
            </li>
        </div>
    )
}

export default BreakCumb