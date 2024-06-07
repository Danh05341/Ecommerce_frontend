import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: {
        user_id: localStorage.getItem('user_id'),
        cart_id: localStorage.getItem('cart_id')
    },
    token: {
        accessToken: localStorage.getItem('access_token'),
        refreshToken: localStorage.getItem('refresh_token'),
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState,

    reducers: {
        loginRedux: (state, action) => {
            state.data = action.payload.data
            state.token = action.payload.data.token
        },
        logoutRedux: (state, action) => {
            state.data = {}
            state.token = { accessToken: null, refreshToken: null }
        }
    }
})

export const { loginRedux, logoutRedux } = userSlice.actions

export default userSlice.reducer
