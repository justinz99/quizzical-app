import { configureStore } from "@reduxjs/toolkit";
import { triviaGameReducer } from "./triviaGameSlice";
import { gameStatusReducer } from "./gameStatusSlice";


export const store = configureStore({
    reducer: {
        gameStatus: gameStatusReducer,
        triviaGame: triviaGameReducer,
    }
})