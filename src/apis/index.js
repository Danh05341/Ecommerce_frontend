export const fetchCategoryAPI = async () => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}category`)
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
export const deleteManyProductAPI = async (id, dataToDelete) => {
    console.log('id: ',id)
    console.log('updateData: ',dataToDelete)
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}product/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToDelete)
    })
    const dataRes = await fetchData.json()
    return dataRes
}

export const getCategoryBySlugAPI = async (slug) => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}category/${slug}`)
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