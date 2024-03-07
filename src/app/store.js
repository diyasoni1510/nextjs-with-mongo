import { configureStore } from "@reduxjs/toolkit";
import LoggedUserSlice from "./features/LoggedUserSlice";

export const store = configureStore({
    reducer: LoggedUserSlice
}) 