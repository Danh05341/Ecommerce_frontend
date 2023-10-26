import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: {}
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            state.data = action.payload.data
        },
        logoutRedux: (state, action) => {
            state.data = {}
        }
    }
})

export const { loginRedux, logoutRedux } = userSlice.actions

export default userSlice.reducer
