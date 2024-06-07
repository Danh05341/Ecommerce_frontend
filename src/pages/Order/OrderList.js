import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getOrderUserAPI } from '../../apis';
import { IoIosSearch } from "react-icons/io";
import { TiArrowSortedDown } from "react-icons/ti";
import { CiFilter } from "react-icons/ci";
import Pagination from '../../components/Pagination'
import queryString from 'query-string';
const PAGE_LIMIT = 10
const OrderList = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams()
    const location = useLocation()
    const [statusOrder, setStatusOrder] = useState('all')
    const [page, setPage] = useState(1)
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showDateDropDown, setShowDateDropDown] = useState(false);
    const [pageNumbers, setPageNumbers] = useState(0);

    // Thêm hai state mới để lưu giá trị của ngày bắt đầu và kết thúc
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Thêm hai hàm xử lý sự kiện cho việc thay đổi giá trị của ngày bắt đầu và kết thúc
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };


    const getStatusProcessing = (status) => {
        switch (status) {
            case 'unconfirmed':
                return 'Đang chờ xác nhận';
            case 'delivering':
                return 'Chờ giao hàng';
            case 'finish':
                return 'Đã hoàn thành';
            case 'unpaid':
                return 'Chưa thanh toán';
            case 'cancel':
                return 'Đã hủy';
            default:
                return status;
        }
        };
    console.log('location:', location.search)
    const handleChangePage = (e, page) => {
        const query = queryString.parse(location.search)
        query.page = page
        query.limit = PAGE_LIMIT
        setPage(page)
        navigate(`/order/user/65520534365011e1cd195c21?${queryString.stringify(query)}`)
    }
    const handleChangeStatus = (status) => {
        setStatusOrder(status)
        setSearchTerm('')
    }
    const getClassNamesStatus = (status) => {
        return (
            `text-[#747C87] font-[500] flex items-center px-[20px] h-full cursor-pointer ${statusOrder === status ? 'border-b-[2px] border-[#0088FF] text-[#0088FF]' : 'border-b-[2px] border-transparent hover:hover:border-[#747C87] hover:text-[#000]'}`
        )
    }
    useEffect(() => {
        // Giả sử bạn có API để lấy danh sách đơn hàng của người dùng
        getOrderUserAPI(id, location.search).then(dataRes => {
            setOrders(dataRes.data);
            setPageNumbers(Math.ceil(dataRes.totalPage/PAGE_LIMIT))
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [id, location.search]);
    useEffect(() => {
        let filtered = orders;
        if (statusOrder !== 'all') {
            filtered = filtered.filter(order => order.proccesingStatus === statusOrder);
        }
        if (searchTerm) {
            filtered = filtered.filter(order =>
                order._id.includes(searchTerm) ||
                order.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredOrders(filtered);
    }, [orders, statusOrder, searchTerm]);
    const [selectedStatus, setSelectedStatus] = useState({
        unconfirmed: false,
        delivering: false,
        finish: false,
        cancel: false,
    });

    const handleStatusDropDownChange = (event, status) => {
        setSelectedStatus(prev => {
            return {
                ...prev,
                [status]: !prev[status],
            }
        });
    };

    const handleDateFilter = () => {
        setShowDateDropDown(false)
        // setStatusOrder('all')
        // setSearchTerm('')
        // Thực hiện lọc dữ liệu dựa trên ngày bắt đầu và kết thúc
        let filtered = orders;
        // Nếu có giá trị ngày bắt đầu, thực hiện lọc
        if (startDate) {
            filtered = filtered.filter(order => new Date(order.createdAt) >= new Date(startDate));
        }

        // Nếu có giá trị ngày kết thúc, thực hiện lọc
        if (endDate) {

            // Lấy ngày kết thúc là ngày kế tiếp sau ngày được chọn
            const nextEndDate = new Date(endDate);
            nextEndDate.setDate(nextEndDate.getDate() + 1);

            filtered = filtered.filter(order => new Date(order.createdAt) < nextEndDate);
        }
        // Cập nhật danh sách đơn hàng đã lọc
        setFilteredOrders(filtered);

    };
   
    const handleFilter = () => {
        setShowStatusDropdown(false);
        let filtered = orders.filter(order => {
            // Kiểm tra xem order có chứa ít nhất một trong các trạng thái được chọn hay không
            return Object.keys(selectedStatus).some(status => selectedStatus[status] && order.proccesingStatus === status);
        });
        // Lọc khi k check -> all
        const array = Object.keys(selectedStatus).find(status => selectedStatus[status] === true)
        if(array) setFilteredOrders(filtered);
        else setFilteredOrders(orders)
    };

    if (loading) {
        return <div className="text-center mt-20">Đang tải dữ liệu...</div>;
    }
   
    return (
        <div className='w-[full] h-full px-[65px]'>
            <div className='ml-[2px] text-[22px] font-[500] h-[65px] flex items-center'>
                Danh sách đơn hàng
            </div>
            <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full  bg-white pb-[10px] rounded-[6px]'>
                <div className='h-[46px] flex items-center border-b'>
                    <div onClick={() => handleChangeStatus('all')} className={getClassNamesStatus('all')}>Tất cả</div>
                    <div onClick={() => handleChangeStatus('unconfirmed')} className={getClassNamesStatus('unconfirmed')}>Đang chờ xác nhận</div>
                    <div onClick={() => handleChangeStatus('delivering')} className={getClassNamesStatus('delivering')}>Chờ giao hàng</div>
                    <div onClick={() => handleChangeStatus('finish')} className={getClassNamesStatus('finish')}>Đã hoàn thành</div>
                    <div onClick={() => handleChangeStatus('unpaid')} className={getClassNamesStatus('unpaid')}>Chưa thanh toán</div>
                    <div onClick={() => handleChangeStatus('cancel')} className={getClassNamesStatus('cancel')}>Đã hủy</div>
                </div>
                <div className='h-[76px] flex items-center px-[20px] z-10 justify-between'>
                    <div className='flex flex-1 items-center bg-[white] border rounded-[6px] w-[350px] h-[34px] hover:bg-[#F3F3F3] focus-within:border-[#0088FF] cursor-pointer group/input'>
                        <div className='w-[full] h-[full] flex items-center justify-center mx-[8px]'>
                            <IoIosSearch className='text-[#9CA3B5] text-[20px] ' />
                        </div>
                        <input
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            className='h-[full] text-[14px] rounded-[6px] bg-[white] outline-none w-full font-[500] group-hover/input:bg-[#F3F3F3] focus:border-[black]'
                            placeholder='Tìm kiếm theo mã đơn hàng ...'
                        />
                    </div>
                    <div className='ml-[15px] flex'>
                        {/* trạng thái giao hàng */}
                        <div onClick={() => { setShowStatusDropdown(prev => !prev) }} className='relative flex gap-[4px] mb-[2px] items-center justify-center text-[#0F1824] select-none bg-[white] border-l border-t border-b rounded-tl-[6px] rounded-bl-[6px] w-[192px] h-[34px] cursor-pointer hover:bg-[#F3F4F5]'>
                            <span>Trạng thái giao hàng</span>
                            <TiArrowSortedDown className='mt-[4px] text-[#747C87]' />
                            {showStatusDropdown && (
                                <div onClick={(event) => event.stopPropagation()} className='absolute top-full left-0 w-full p-[12px] bg-white border shadow-md z-20'>
                                    {Object.keys(selectedStatus).map((status) => (
                                        <div key={status} className='flex mb-[10px]'>
                                            <label htmlFor={status} className='flex flex-1 gap-x-[12px] cursor-pointer'>
                                                <input
                                                    id={status}
                                                    type='checkbox'
                                                    className='w-[16px] cursor-pointer'
                                                    checked={selectedStatus[status]}
                                                    onChange={(event) => handleStatusDropDownChange(event, status)}
                                                />
                                                <span className='flex-1'>{getStatusProcessing(status)}</span>
                                            </label>
                                        </div>
                                    ))}
                                    <div onClick={handleFilter} className='mt-[10px] w-[full] rounded-[6px] h-[36px] bg-[#0088FF] text-white flex justify-center items-center font-[500] hover:bg-[#33A0FF]' >
                                        Lọc
                                    </div>
                                </div>
                            )}

                        </div>
                        {/* Ngày tạo*/}
                        <div onClick={() => setShowDateDropDown(prev => !prev)} className='relative flex gap-[4px] mb-[2px] items-center justify-center text-[#0F1824] select-none bg-[white] border w-[115px] h-[34px] cursor-pointer hover:bg-[#F3F4F5]'>
                            <span>Ngày tạo</span>
                            <TiArrowSortedDown className='mt-[4px] text-[#747C87]' />
                            {
                                showDateDropDown && (
                                    <div onClick={(e) => e.stopPropagation()} className='absolute top-[40px] w-[300px] flex-col gap-y-[10px] py-[20px] px-[12px] border rounded-[6px] bg-[white] shadow-md'>
                                        <div className='relative flex flex-1 gap-[4px] mb-[2px] items-center justify-around text-[#0F1824] bg-[white] border  h-[34px] cursor-pointer hover:bg-[#F3F4F5]'>
                                            <span>Ngày bắt đầu</span>
                                            <input
                                                type='date'
                                                value={startDate}
                                                onChange={handleStartDateChange}
                                                className='ml-[4px] text-[14px] bg-[white] outline-none   font-[500] hover:bg-[#F3F3F3] focus:border-[black] rounded-[6px] h-[full]'
                                            />
                                        </div>
                                        <div className='relative flex flex-1 gap-[4px] mb-[2px] items-center justify-around text-[#0F1824] bg-[white] border  h-[34px] cursor-pointer hover:bg-[#F3F4F5]'>
                                            <span>Ngày kết thúc</span>
                                            <input
                                                type='date'
                                                value={endDate}
                                                onChange={handleEndDateChange}
                                                className='ml-[4px] text-[14px] bg-[white] outline-none   font-[500] hover:bg-[#F3F3F3] focus:border-[black] rounded-[6px] h-[full]'
                                            />
                                        </div>
                                        <div onClick={handleDateFilter} className='mt-[10px] w-[full] rounded-[6px] h-[36px] bg-[#0088FF] text-white flex justify-center items-center font-[500] hover:bg-[#33A0FF]'>Lọc</div>
                                    </div>
                                )
                            }
                        </div>
                        {/* Bộ lọc khác */}
                        <div className='relative flex gap-[4px] mb-[2px] items-center justify-center text-[#0F1824]  bg-[white] border-r border-b border-t rounded-tr-[6px] rounded-br-[6px] w-[132px] h-[34px] cursor-pointer hover:bg-[#F3F4F5]'>
                            <CiFilter className='mt-[2px] text-[#7C838E] text-[20px]' />
                            <span>Bộ lọc khác</span>
                        </div>
                    </div>
                </div>
                <div className='h-[48px] bg-[#F4F6F8] flex gap-[20px] items-center font-[500] pl-[12px] border-b z-0'>
                    <div className='w-[25%]'>
                        Mã đơn hàng
                    </div>
                    <div className='w-[20%]'>
                        Ngày tạo
                    </div>
                    <div className='w-[20%]'>
                        Trạng thái đơn hàng
                    </div>
                    <div className='w-[20%]'>
                        Trạng thái thanh toán
                    </div>
                    <div className='w-[15%]'>
                        Thành tiền
                    </div>
                </div>
                {
                    filteredOrders?.map(order => {
                        return (
                            <Link to={`/order/details/${order._id}`} key={order._id}>
                                <div className='h-[42px] bg-[white] flex gap-[20px] items-center text-[#282828] font-[500] pl-[12px] border-t border-b hover:bg-[#F3F4F5] cursor-pointer'>
                                    <div className='w-[25%] hover:text-[#0088ff] hover:underline'>
                                        #{order._id}
                                    </div>
                                    <div className='w-[20%]'>
                                        {`${new Date(order.createdAt).toLocaleDateString()} ${new Date(order.createdAt).toLocaleTimeString()}`}
                                    </div>
                                    <div className='w-[20%]'>
                                        <span className={`${order.proccesingStatus === 'cancel' ? 'text-[#FF2D37]' : 'text-[#16A34A]'}`}>{getStatusProcessing(order.proccesingStatus)}</span>
                                    </div>
                                    <div className='w-[20%] text-[#FF2D37]'>
                                        <span className={`${order.status === 'paid' ? 'text-[#16A34A]' : 'text-[#FF2D37]'}`}>{order.status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}</span>
                                    </div>
                                    <div className='w-[15%] '>
                                        {order.totalPrice}₫
                                    </div>
                                </div>
                            </Link>
                        )

                    })
                }
                <div className='h-[70px] flex justify-center items-center pb-[15px]'>
                    <Pagination page={page} pageNumbers={pageNumbers} handleChangePage={handleChangePage} />
                </div>
            </div>
        </div>
    );
};

export default OrderList;