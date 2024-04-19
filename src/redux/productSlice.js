import { createSlice, unwrapResult } from '@reduxjs/toolkit'
import { json } from 'react-router-dom'

const initialState = {
    data: []
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setDataProduct: (state, action) => {
            state.data = action.payload
            console.log(state.data)
        },
        setDataLogout: (state, action) => {
            state.data = []
        },
        addProduct:  (state, action) => {
            const product = action.payload
            const existingProduct = state?.data?.find(
                (item) => item.productId?._id === product?._id
            )
                // Nếu sản phẩm đã tồn tại, tăng số lượng
                if(existingProduct) {
                    existingProduct.quantity += 1;
                }
                // const target_copy = JSON.parse(JSON.stringify(existingProduct))
                else {
                    state.data.push({
                        productId: product,
                        quantity: 1
                    })
                }
        },
        removeProduct: (state, action) => {
            const id = action.payload
            state.data = state.data.filter(item => item.productId._id !== id)
        }
    }
})

export const { setDataProduct, setDataLogout, addProduct, removeProduct } = productSlice.actions

export default productSlice.reducer
