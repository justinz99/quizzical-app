import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: 'start'
}

const gameStatusSlice = createSlice({
    name: 'gameStatus',
    initialState,
    reducers: {
        switchGameStatus: (state, action) => {
            state.status = action.payload
        } 
    }
})

export const gameStatusReducer = gameStatusSlice.reducer
export const { switchGameStatus } = gameStatusSlice.actions