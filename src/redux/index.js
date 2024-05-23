import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from './userSlice.js'
import cartSliceReducer from './cartSlice.js'


export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    cart: cartSliceReducer
  },
})

