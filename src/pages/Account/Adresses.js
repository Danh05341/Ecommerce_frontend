import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserByIdAPI } from "../../apis";

const Addresses = () => {
    const userData = useSelector(state => state.user.data)
    const [user, setUser] = useState({})
    // const [accountState, setAccountState] = useState('user')

    useEffect(() => {
        getUserByIdAPI(userData.user_id ?? userData._id).then((dataRes) => {
            setUser(dataRes.data)
        })
    }, [userData])

    return (
        <div className="px-[15px] flex-1">
            <div className="border-b pb-[20px]">
                <div className="text-[20px]">ĐỊA CHỈ CỦA BẠN</div>
                <div className="text-[14px] text-white w-[114px] h-[40px] flex items-center justify-center bg-[#ff2d37] rounded-[4px] mt-[25px] ml-[15px] cursor-pointer">Thêm địa chỉ</div>
            </div>
            <div className="flex flex-col gap-[20px] mt-[25px]">
                
            </div>
        </div>
    )
};

export default Addresses;
