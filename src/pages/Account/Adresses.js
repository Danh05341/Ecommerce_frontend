import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProvince, getUserByIdAPI, updateCustomerAPI } from "../../apis";
import { toast } from "react-toastify";
import { FaCheckCircle } from "react-icons/fa";

const Addresses = () => {
    const userData = useSelector(state => state.user.data)
    const [user, setUser] = useState({})
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [editAddress, setEditAddress] = useState({});
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        getUserByIdAPI(userData.user_id ?? userData._id).then((dataRes) => {
            setUser(dataRes.data)
        }).catch(err => console.log(err))
        getAllProvince().then(dataRes => {
            setProvinces(dataRes.data)
        }).catch(err => console.log(err))
    }, [userData])

    const handleAddNewAddress = () => {

        setEditAddress({ fullName: "", phone: "", address: "", city: "", district: "", ward: "", isDefault: false });
        setShowModal(true);
    };

    const handleOnChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setEditAddress((prev) => {
            return {
                ...prev,
                [name]: value,
            }
        })

        if (name === 'city') {
            setDistricts(
                provinces.find(province => province.Name === value).District
            )
            setWards([])
            setEditAddress(prev => {
                return {
                    ...prev,
                    district: '',
                    ward: ''
                }
            })
        }
        if (name === 'district') {
            setWards(
                districts.find(district => district.FullName === value).Ward
            )
            setEditAddress(prev => {
                return {
                    ...prev,
                    ward: ''
                }
            })
        }
    }
    const handleDelete = (id) => {
        console.log('id:', id)
        const updatedAddresses = user.addresses.filter(address => address._id !== id);
        updateCustomerAPI(user.user_id ?? user._id, { addresses: updatedAddresses })
            .then(() => {
                setUser(prev => ({
                    ...prev,
                    addresses: updatedAddresses
                }));
                toast.success('Xóa địa chỉ thành công');
            })
            .catch(error => {
                console.error(error);
                toast.error('Xóa địa chỉ thất bại');
            });
    };

    const handleEdit = (address) => {
        setEditAddress(address);
    };
    const handleSave = () => {

        const phoneRegex = /^\d{10}$/;

        if (!phoneRegex.test(editAddress.phone)) {
            toast.warning('Số điện thoại không hợp lệ. Vui lòng nhập 10 chữ số.');
            return;
        }

        if (!editAddress.address ||
            !editAddress.city ||
            !editAddress.district ||
            !editAddress.ward ||
            !editAddress.fullName ||
            !editAddress.phone
        ) {
            toast.warning('Vui lòng nhập đủ thông tin')
            return
        }

        // Nếu các trường đã được điền
        setUser(prev => ({
            ...prev,
            addresses: [
                ...(prev.addresses || {}),
                {
                    fullName: editAddress.fullName,
                    phone: editAddress.phone,
                    address: `${editAddress.address}, ${editAddress.ward}, ${editAddress.district}, ${editAddress.province}`,
                    isDefault: editAddress.isDefault,
                    city: editAddress.city,
                    district: editAddress.district,
                    wards: editAddress.ward,
                }
            ]
        }));
        const newAddress = {
            fullName: editAddress.fullName,
            phone: editAddress.phone,
            address: `${editAddress.address}, ${editAddress.ward}, ${editAddress.district}, ${editAddress.city}`,
            isDefault: editAddress.isDefault,
            city: editAddress.city,
            district: editAddress.district,
            ward: editAddress.ward,
        };
        console.log('newAđré:', newAddress)
        const isAddress = user.addresses.find(address => newAddress.address === address.address)
        if (isAddress) {
            toast.warning('Địa chỉ này đã tồn tại')
            return
        }
        // If the new address is set as default, unset the default flag on all other addresses
        if (newAddress.isDefault) {
            user.addresses.forEach(addr => addr.isDefault = false);
        }
        console.log('newAddress: ', newAddress)
        console.log('user.adresses: ', user.addresses)

        // Gửi cập nhật đến server sau khi state user đã được cập nhật
        const updatedAddresses = [
            ...(user.addresses || []),
            newAddress
        ];
        const sortedAddresses = updatedAddresses.sort((a, b) => b.isDefault - a.isDefault);
        updateCustomerAPI(user.user_id ?? user._id, { addresses: updatedAddresses })
            .then(dataRes => {
                console.log('dataRes', dataRes);
                if (dataRes.data) {
                    // Cập nhật state của user trước
                    setUser(prev => {
                        return {
                            ...prev,
                            addresses: sortedAddresses
                        };
                    });
                    toast.success('Thêm địa chỉ thành công')
                    setShowModal(false);
                    return
                } else {
                    toast.error('Thêm địa chỉ thất bại')
                    setShowModal(false);
                    return
                }
            })
            .catch(error => {
                toast.error('Thêm địa chỉ thất bại')
            });
    };
    return (
        <div className="px-[15px] flex-1 ">
            <div className="border-b pb-[20px]">
                <div className="text-[20px]">ĐỊA CHỈ CỦA BẠN</div>
                <div onClick={handleAddNewAddress} className="text-[14px] text-white w-[114px] h-[40px] flex items-center justify-center bg-[#ff2d37] rounded-[4px] mt-[25px] ml-[15px] cursor-pointer">Thêm địa chỉ</div>
            </div>
            <div className="flex flex-col gap-[20px] mt-[25px] overflow-y-auto max-h-[calc(100vh-300px)]">
                {user?.addresses?.map(address => (
                    <div key={address._id} className="mb-4 border-b pb-[20px]">
                        <div className="flex items-center">
                            <div className="flex-col flex-1">
                                <div className="">
                                    <span className="font-bold">Họ tên: </span>
                                    <span>{address.fullName} </span>
                                    {address.isDefault && (
                                        <span className="ml-[20px] inline-block text-[green]">
                                            <FaCheckCircle className="inline-block text-[14px]  mb-[2px] mr-[4px]" />
                                            <span className=" text-[14px]">Địa chỉ mặc định</span>
                                        </span>
                                    )}

                                </div>
                                <div className="">
                                    <span className="font-bold">Địa chỉ: </span>
                                    <span>{address.address} </span>
                                </div>
                                <div className="">
                                    <span className="font-bold">Số điện thoại: </span>
                                    <span>{address.phone} </span>
                                </div>
                            </div>
                            <div className="mr-[20px]">
                                <button onClick={() => handleDelete(address._id)} className="text-red-500 mt-[4px]">Xóa</button>
                            </div>
                        </div>
                    </div>
                ))}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
                        <div className="bg-white p-8 rounded shadow-lg w-[60%]">
                            <h3 className="mb-4 font-bold ">{editAddress._id ? 'Chỉnh sửa địa chỉ' : 'Thêm địa chỉ mới'}</h3>
                            <div className="flex flex-col space-y-2">
                                <input
                                    type="text"
                                    value={editAddress.fullName}
                                    onChange={(e) => setEditAddress({ ...editAddress, fullName: e.target.value })}
                                    placeholder="Họ tên"
                                    className="border p-2 mb-2 w-full"
                                />
                                <input
                                    type="text"
                                    value={editAddress.phone}
                                    onChange={(e) => setEditAddress({ ...editAddress, phone: e.target.value })}
                                    placeholder="Số điện thoại"
                                    className="border p-2 mb-2 w-full"
                                />
                                <input
                                    type="text"
                                    value={editAddress.address}
                                    onChange={(e) => setEditAddress({ ...editAddress, address: e.target.value })}
                                    placeholder="Địa chỉ"
                                    className="border p-2 mb-2 w-full"
                                />
                                <div className="flex space-x-2">
                                    <select
                                        name="city" id="city"
                                        onChange={handleOnChange}
                                        className="border p-2 mb-2 w-full"
                                    >
                                        <option selected value="">Chọn Tỉnh/Thành phố</option>
                                        {provinces.map(province => (
                                            <option key={province.Code} value={province.Name}>{province.Name}</option>
                                        ))}
                                    </select>
                                    <select
                                        name="district" id="district"
                                        onChange={handleOnChange}
                                        className="border p-2 mb-2 w-full"
                                    >
                                        <option selected value="">Chọn Quận/Huyện</option>
                                        {districts?.map(district => (
                                            <option key={district.Code} value={district.FullName}>{district.FullName}</option>
                                        ))}
                                    </select>
                                    <select
                                        name="ward" id="ward"
                                        onChange={handleOnChange}
                                        className="border p-2 mb-2 w-full"
                                    >
                                        <option selected value="">Chọn Phường/Xã</option>
                                        {wards?.map(province => (
                                            <option key={province.Code} value={province.FullName}>{province.FullName}</option>
                                        ))}
                                    </select>

                                </div>
                                <label className="flex items-center mb-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={editAddress.isDefault}
                                        onChange={(e) => setEditAddress({ ...editAddress, isDefault: e.target.checked })}
                                        className="mr-2 mt-[2px] cursor-pointer "
                                    />
                                    Đặt làm địa chỉ mặc định?
                                </label>
                                <div className="flex space-x-2 justify-end">
                                    <button onClick={() => setShowModal(false)} className="bg-transparent border text-[#262626] py-2 px-4 rounded hover:bg-gray-400">Hủy</button>
                                    <button onClick={handleSave} className="bg-[#ff2d37] text-white py-2 px-4 rounded hover:opacity-[0.8]">Thêm địa chỉ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default Addresses;
