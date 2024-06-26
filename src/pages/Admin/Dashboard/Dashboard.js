import React, { useEffect, useState } from 'react'
import { getDashboardData, revenueSummaryAPI } from '../../../apis';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Box, Button, Grid, TextField } from '@mui/material';
import moment from 'moment';

function Dashboard() {
    // Giả sử dữ liệu doanh thu được lấy từ API hoặc cơ sở dữ liệu
    const [dailyRevenueData, setDailyRevenueData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [label, setLabel] = useState('');
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    useEffect(() => {
        fetchData('monthly')
        setLabel('tháng nay')
    }, []);

    const handleCustomDateFetch = () => {

        if (startDate && endDate) {
            // Gọi API với các tham số startDate và endDate
            revenueSummaryAPI(startDate, endDate)
                .then(dataRes => {
                    // Xử lý dữ liệu trả về từ API và hiển thị biểu đồ
                    setDailyRevenueData(dataRes.data)
                })
                .catch(error => console.error('Error fetching data:', error));
            setLabel(`từ ${startDate} đến ${endDate}`);
        }
    }
    // Xác định các label và data cho biểu đồ
    const chartData = {
        labels: dailyRevenueData.map(data => data.date),
        datasets: [
            {
                label: `Doanh thu ${label}`,
                data: dailyRevenueData.map(data => data.revenue),
                fill: true,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };
    // const chartOptions = {
    //     responsive: true,
    //     plugins: {
    //         tooltip: {
    //             callbacks: {
    //                 label: function(tooltipItem) {
    //                     return `Doanh thu: ${tooltipItem.raw} ₫`;
    //                 }
    //             }
    //         }
    //     },
    //     scales: {
    //         y: {
    //             ticks: {
    //                 callback: function(value) {
    //                     return `${value} VNĐ`;
    //                 }
    //             }
    //         }
    //     }
    // };
    const fetchData = (type) => {

        let startDate;
        let endDate;

        const currentDate = moment().format('YYYY-MM-DD'); // Ngày tháng hiện tại VN
        endDate = currentDate; // Định dạng ngày tháng (YYYY-MM-DD)

        if (type === 'daily') {
                startDate = endDate; // Bắt đầu từ ngày hiện tại
                setLabel('hôm nay');
            } else if (type === 'weekly') {
                startDate = moment().startOf('week').format('YYYY-MM-DD'); // Ngày đầu tuần (Chủ Nhật)
                setLabel('tuần nay');
            } else if (type === 'monthly') {
                startDate = moment().startOf('month').format('YYYY-MM-DD'); // Bắt đầu từ ngày đầu tiên của tháng hiện tại
                setLabel('tháng nay');
            } else if (type === 'yearly') {
                startDate = moment().startOf('year').format('YYYY-MM-DD'); // Bắt đầu từ ngày đầu tiên của năm hiện tại
                setLabel('năm nay');
            }

        console.log('startDate: ', startDate)
        console.log('endDate: ', endDate)

        setStartDate(startDate);
        setEndDate(endDate);

        // Gọi API với các tham số startDate và endDate
        revenueSummaryAPI(startDate, endDate)
            .then(dataRes => {
                // Xử lý dữ liệu trả về từ API và hiển thị biểu đồ
                setDailyRevenueData(dataRes.data)
            })
            .catch(error => console.error('Error fetching data:', error));

    };
    return (
        <div className='w-[calc(100%-230px)] h-full ml-[230px] px-[30px] pt-[52px]'>
            <div className='ml-[2px] text-[22px] font-[500] h-[65px] flex items-center'>
                Admin Dashboard
            </div>
            <div style={{ boxShadow: '0px 1px 3px 1px rgba(0, 0, 0, 0.1)' }} className='w-full  bg-white pb-[10px] rounded-[6px]'>
                <Box className='px-[20px]'>
                    <div className='text-[20px] font-[500] h-[65px] flex items-center'>Biểu đồ doanh thu</div>
                    <Grid container spacing={2} alignItems="center" justifyContent='space-between'>

                        <Grid item>
                            <Button variant="contained" onClick={() => fetchData('daily')}>Hôm nay</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={() => fetchData('weekly')}>Tuần nay</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={() => fetchData('monthly')}>Tháng nay</Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={() => fetchData('yearly')}>Năm nay</Button>
                        </Grid>
                        <Grid item>
                            <TextField
                                id="start-date"
                                label="Từ ngày"
                                type="date"
                                value={startDate}
                                onChange={handleStartDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="end-date"
                                label="Đến ngày"
                                type="date"
                                value={endDate}
                                onChange={handleEndDateChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        
                    </Grid>
                    <Grid item sx={{textAlign: 'right', marginTop: '10px'}}>
                            <Button variant="contained" onClick={handleCustomDateFetch}>Lấy dữ liệu</Button>
                        </Grid>
                    <Bar data={chartData}/>
                    {/* <Bar data={chartData}/> */}
                    {/* <Bar data={chartData}/> */}
                </Box>
            </div>
        </div>
    )
}

export default Dashboard