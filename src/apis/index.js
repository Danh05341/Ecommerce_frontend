export const fetchCategoryAPI = async () => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}category`)
    const dataRes = await fetchData.json()
    return dataRes
}

export const getCategoryBySlugAPI = async (slug) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}category/${slug}`)
    const dataRes = await fetchData.json()
    return dataRes
}

export const categoryQuantityProductAPI = async (query) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}category/quantity${query}`)
    const dataRes = await fetchData.json()
    return dataRes
}
export const createCategoryAPI = async (body) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}category/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    const dataRes = await fetchData.json()
    return dataRes
}

export const deleteCategoryAPI = async (toDelete) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}category`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(toDelete)
    })
    const dataRes = await fetchData.json()
    return dataRes
}

export const fetchBrandAPI = async () => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}brand`)
    const dataRes = await fetchData.json()
    return dataRes
}
export const getBrandById = async (id) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}brand/${id}`)
    const dataRes = await fetchData.json()
    return dataRes
}

export const fetchProductAPI = async (slug, location) => {
    console.log('slug + location: ',slug + location)
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}product/${slug + location}`)
    const dataRes = await fetchData.json()
    return dataRes
}

export const addNewProductAPI = async(productNew) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}product/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productNew)
    })
    const dataRes = await fetchData.json()
    return dataRes
}

export const updateProductAPI = async (id, updateData) => {
    console.log('id: ',id)
    console.log('updateData: ',updateData)
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}product/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
    })
    const dataRes = await fetchData.json()
    return dataRes
}
export const deleteProductAPI = async (id) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}product/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
    })
    const dataRes = await fetchData.json()
    return dataRes
}

export const LoginAPI = async (email, password) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}users/login`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, password})
    })
    const dataRes = await fetchData.json()
    return dataRes
}

export const checkTokenAPI = async (token) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}users/checkToken`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token
        }
    })
    const dataRes = await fetchData.json()
    return dataRes
}

export const getAllProvince = async () => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}province`)
    const dataRes = await fetchData.json()
    return dataRes
}
// Orders
export const getAllOrderAPI = async (query) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}order${query}`)
    const dataRes = await fetchData.json()
    return dataRes
}

export const updateOrderAPI = async (id, updateData) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}order/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData)
    })
    const dataRes = await fetchData.json()
    return dataRes
}

export const getOrderDetailsAPI = async (id) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}order/details/${id}`)
    const dataRes = await fetchData.json()
    return dataRes
}

export const createOrderAPI = async (dataForm) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}order`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForm)
    })
    const dataRes = await fetchData.json()
    return dataRes
}
export const getOrderUserAPI = async (id, query) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}order/user/${id}${query}`)
    const dataRes = await fetchData.json()
    return dataRes
}

// Payment

export const createPaymentUrl = async (amount, orderId) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}payment/create_payment_url`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({amount, orderId})
    })
    const dataRes = await fetchData.json()
    return dataRes
}

// Mock data
export const getDashboardData = async () => {
    // Đây là dữ liệu giả lập, trong thực tế bạn sẽ lấy từ server
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                revenue: {
                    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'],
                    data: [1200, 2100, 1500, 3000, 2500, 3200]
                },
                orderStatus: {
                    labels: ['Đang chờ xác nhận', 'Chờ giao hàng', 'Đã hoàn thành', 'Đã hủy'],
                    data: [30, 15, 50, 5]
                },
                categoryDistribution: {
                    labels: ['Điện thoại', 'Máy tính', 'Phụ kiện', 'Đồ gia dụng', 'Thời trang', 'Khác'],
                    data: [40, 20, 30, 10, 15, 10]
                }
            });
        }, 1000);
    });
};

// Dashboard
export const revenueSummaryAPI = async (startDate, endDate) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}order/revenue-summary`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({startDate, endDate})
    })
    const dataRes = await fetchData.json()
    return dataRes
}

// Discount admin API
export const getDiscountsAPI = async () => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}discount`);
    const dataRes = await fetchData.json()
    return dataRes
};

export const getDiscountAPI = async (id) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}discount/${id}`);
    const dataRes = await fetchData.json()
    return dataRes
};

export const createDiscountAPI = async (discount) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}discount/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(discount)
    })
    const dataRes = await fetchData.json()
    return dataRes;
};

export const updateDiscountAPI = async (id, update) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}discount/edit/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(update)
    })
    const dataRes = await fetchData.json()
    return dataRes;
};

export const deleteDiscountAPI = async (id) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}discount/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
    })
    const dataRes = await fetchData.json()
    return dataRes;
};

// Customer admin API
export const getCustomersAPI = async () => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}users`);
    const dataRes = await fetchData.json()
    return dataRes
};

export const getCustomerAPI = async (id) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}users/${id}`);
    const dataRes = await fetchData.json()
    return dataRes
};

export const createCustomerAPI = async (user) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}users/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
    })
    const dataRes = await fetchData.json()
    return dataRes;
};

export const updateCustomerAPI = async (id, update) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}users/edit/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(update)
    })
    const dataRes = await fetchData.json()
    return dataRes;
};

export const deleteCustomerAPI = async (id) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}users/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
    })
    const dataRes = await fetchData.json()
    return dataRes;
};


export const applyDiscountAPI = async (code) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}discount/apply`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({code: code})
    })
    const dataRes = await fetchData.json()
    return dataRes;
};