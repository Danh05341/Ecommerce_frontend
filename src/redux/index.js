import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from './userSlice.js'
import productSliceReducer from './productSlice.js'


export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    product: productSliceReducer
  },
})

