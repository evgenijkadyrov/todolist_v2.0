import {authAPI} from "../../api/todolists-api";
import {handleAsyncServerAppError, handleAsyncServerNetworkAppError} from "../../utilites/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ThunkError} from "../../utilites/types";
import {DataLoginPropsType} from "../../api/types";
import {ActionsCommonType} from "../CommonActions/ApplicationCommonActions";


const login = createAsyncThunk<{ isLoginOn: boolean }, DataLoginPropsType, ThunkError>('auth/login', async (param: DataLoginPropsType, thunkAPI) => {
    thunkAPI.dispatch(ActionsCommonType.SetAppStatus({status: 'loading'}))
    try {

        const res = await authAPI.loginMe(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(ActionsCommonType.SetAppStatus({status: 'success'}))
            return {isLoginOn: true}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }
    } catch (error: any) {
        return handleAsyncServerNetworkAppError(error, thunkAPI)
    }
})
const logout = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(ActionsCommonType.SetAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {

            thunkAPI.dispatch(ActionsCommonType.SetAppStatus({status: 'success'}))
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI)
        }

    } catch (error: any) {
        handleAsyncServerNetworkAppError(error, thunkAPI)
    }

})
export const ActionsType = {login, logout}

export const slice = createSlice({
    name: 'login',
    initialState: {isLoginOn: false,},
    reducers: {},
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoginOn = true
        })
        builder.addCase(logout.fulfilled, (state, action) => {
            state.isLoginOn = false
        })
    }

})






