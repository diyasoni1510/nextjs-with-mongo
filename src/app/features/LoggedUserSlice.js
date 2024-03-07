import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    LoggedUser: ""
}

export const LoggedUserSlice = createSlice({
    name:"LoggedUser",
    initialState,
    reducers:{
        setLoggedUser: (state,action) => {
            state.LoggedUser = action.payload
        }
    }
})

export const {setLoggedUser} = LoggedUserSlice.actions

export default LoggedUserSlice.reducer