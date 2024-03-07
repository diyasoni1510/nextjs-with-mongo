import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    LoggedUser:{}
}

export const LoggedUserSlice = createSlice({
    name:"LoggedUser",
    initialState,
    reducers:{
        setLoggedUser: () => {}
    }
})

export const {setLoggedUser} = LoggedUserSlice.actions

export default LoggedUserSlice.reducer