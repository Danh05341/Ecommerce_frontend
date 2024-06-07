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
            const currentImage = action.payload.image
            const productSize = action.payload.size
            const productImage = product.image[currentImage]
            const count = Number(action.payload.value)
            const existingProduct = state?.data?.find(
                (item) => (item.productId?._id === product?._id && item.productSize === productSize && item.imageCurrent === currentImage)
            )
            // Nếu sản phẩm đã tồn tại, tăng số lượng
            if (existingProduct) {
                existingProduct.quantity += count;
            }
            // const target_copy = JSON.parse(JSON.stringify(existingProduct))
            else {
                state?.data?.push({
                    productId: product,
                    quantity: count,
                    imageCurrent: currentImage,
                    productSize
                })
            }
        },
        minusProduct: (state, action) => {
            const product = action.payload.product
            const productSize = action.payload.size
            const currentImage = action.payload.image

            const existingProduct = state?.data?.find(
                (item) => (item.productId?._id === product?._id && item.productSize === productSize && item.imageCurrent === currentImage)
            )
            // Nếu sản phẩm đã tồn tại, tăng số lượng
            if (existingProduct) {
                existingProduct.quantity -= 1;
            }
        },
        setCountProduct: (state, action) => {
            const product = action.payload.product
            const currentImage = action.payload.image
            const productSize = action.payload.size

            const count = Number(action.payload.value)
            const existingProduct = state?.data?.find(
                (item) => (item.productId?._id === product?._id && item.productSize === productSize && item.imageCurrent === currentImage)
            )
            // Nếu sản phẩm đã tồn tại, tăng số lượng
            if (existingProduct) {
                existingProduct.quantity = count;
            }
        },
        removeProduct: (state, action) => {
            const id = action.payload.id
            const productSize = action.payload.size
            const currentImage = action.payload.image
            
            const existingProductIndex = state.data.findIndex(item => {
                return (item.productId._id === id && item.productSize === productSize && item.imageCurrent === currentImage)
            })
            console.log('existingProductIndex:', existingProductIndex)
            if (existingProductIndex !== -1) {
                state.data = state.data.filter(item => 
                    !(item.productId._id === id && item.productSize === productSize && item.imageCurrent === currentImage)
                );
            } else {
                throw new Error("Không tìm thấy sản phẩm")
            }

        }
    }
})

export const { setDataProduct, setDataLogout, addProduct, minusProduct, removeProduct, setCountProduct } = cartSlice.actions

export default cartSlice.reducer
