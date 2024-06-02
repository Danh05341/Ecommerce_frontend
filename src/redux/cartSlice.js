import { createSlice, unwrapResult } from '@reduxjs/toolkit'
import { json } from 'react-router-dom'

const initialState = {
    data: []
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setDataProduct: (state, action) => {
            state.data = action.payload
        },
        setDataLogout: (state, action) => {
            state.data = []
        },
        addProduct: (state, action) => {
            const product = action.payload.product
            const count = Number(action.payload.value)
            const existingProduct = state?.data?.find(
                (item) => item.productId?._id === product?._id
            )
            // Nếu sản phẩm đã tồn tại, tăng số lượng
            if (existingProduct) {
                existingProduct.quantity += count;
            }
            // const target_copy = JSON.parse(JSON.stringify(existingProduct))
            else {
                state.data.push({
                    productId: product,
                    quantity: count
                })
            }
        },
        minusProduct: (state, action) => {
            const product = action.payload.product
            const existingProduct = state?.data?.find(
                (item) => item.productId?._id === product?._id
            )
            // Nếu sản phẩm đã tồn tại, tăng số lượng
            if (existingProduct) {
                existingProduct.quantity -= 1;
            }
        },
        setCountProduct: (state, action) => {
            const product = action.payload.product
            const count = Number(action.payload.value)
            const existingProduct = state?.data?.find(
                (item) => item.productId?._id === product?._id
            )
            // Nếu sản phẩm đã tồn tại, tăng số lượng
            if (existingProduct) {
                existingProduct.quantity = count;
                console.log('type:', typeof(existingProduct.quantity))
            }
        },
        removeProduct: (state, action) => {
            const id = action.payload.id
            state.data = state.data.filter(item => item.productId._id !== id)
        }
    }
})

export const { setDataProduct, setDataLogout, addProduct, minusProduct, removeProduct, setCountProduct } = cartSlice.actions

export default cartSlice.reducer
