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

export const fetchProductAPI = async () => {
    const fetchData = await fetch(`${process.env.REACT_APP_SERVER_LOCAL}product`)
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