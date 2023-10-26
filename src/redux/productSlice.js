import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: []
}

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setDataProduct: (state, action) => {
            state.data = action.payload.data
        },
    }
})

export const { setDataProduct } = productSlice.actions

export default productSlice.reducer
