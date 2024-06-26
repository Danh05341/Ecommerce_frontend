import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { changePasswordUserAPI, getUserByIdAPI } from "../../apis";
import { toast } from "react-toastify";

const ChangePassWord = () => {
    const userData = useSelector(state => state.user.data)

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleChangePassword = () => {
        if (newPassword !== confirmPassword) {
            toast.warning('Mật khẩu xác nhận không khớp!');
            return;
        }
        if (oldPassword === newPassword) {
            toast.warning('Mật khẩu cũ không được trùng với mật khẩu mới!');
            return;
        }
        if (newPassword.length < 8) {
            toast.warning('Độ dài của mật khẩu tối thiểu là 8 kí tự');
            return;
        }

        if (newPassword === confirmPassword) {
            const userId = userData.user_id ?? userData._id
            changePasswordUserAPI(userId, oldPassword, newPassword).then(dataRes => {
                if(dataRes.data) {
                    setOldPassword('')
                    setNewPassword('')
                    setConfirmPassword('')
                    toast.success('Thay đổi mật khẩu thành công')
                } else {
                    toast.error(dataRes.error)

                }
            }).catch(err => {
                toast.error('Thay đổi mật khẩu thất bại')
            })
        }
    }
    return (
        <div className="px-[15px] flex-1">
            <div className="border-b pb-[20px]">
                <div className="text-[20px]">ĐỔI MẬT KHẨU</div>
            </div>
            <div className="flex flex-col gap-[20px] mt-[25px]">
                <div className="text-[14px] mb-[10px]">Để đảm bảo tính bảo mật vui lòng đặt mật khẩu với ít nhất 8 kí tự</div>
                <div className="mb-[15px]">
                    <label className="block text-[14px] mb-[5px]">Mật khẩu cũ *</label>
                    <input
                        type="password"
                        className="w-full px-[10px] py-[8px] border rounded-[4px]"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div className="mb-[15px]">
                    <label className="block text-[14px] mb-[5px]">Mật khẩu mới *</label>
                    <input
                        type="password"
                        className="w-full px-[10px] py-[8px] border rounded-[4px]"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="mb-[15px]">
                    <label className="block text-[14px] mb-[5px]">Xác nhận lại mật khẩu *</label>
                    <input
                        type="password"
                        className="w-full px-[10px] py-[8px] border rounded-[4px]"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <button
                    className="w-full bg-[#ff2d37] text-white py-[10px] rounded-[4px] cursor-pointer"
                    onClick={handleChangePassword}
                >
                    Đặt lại mật khẩu
                </button>
            </div>
        </div>
    )
};

export default ChangePassWord;
