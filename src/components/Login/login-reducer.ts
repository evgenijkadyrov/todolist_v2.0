import {SetAppStatus} from "../App/app-reducer";
import {authAPI, DataLoginPropsType, FieldsErrorType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkAppError} from "../../utilites/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

// type InitialStateType = {
//     isLoginOn: boolean
// }
const initialState = {
    isLoginOn: false,
}
 const loginTC = createAsyncThunk<{ isLoginOn: boolean }, DataLoginPropsType, { rejectValue: { errors: Array<string>, fieldsErrors?: FieldsErrorType[] } }>('auth/login', async (param: DataLoginPropsType, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatus({status: 'loading'}))
    try {

        const res = await authAPI.loginMe(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(SetAppStatus({status: 'success'}))
            return {isLoginOn: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsErrors: res.data.fieldsErrors})
        }
    } catch (error: any) {
        handleServerNetworkAppError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
    }
})
 const logoutTC = createAsyncThunk('auth/logout', async (param, {dispatch, rejectWithValue}) => {
    dispatch(SetAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {

            dispatch(SetAppStatus({status: 'success'}))
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue({})
        }

    } catch (error: any) {
        handleServerNetworkAppError(error, dispatch)
        return rejectWithValue({})
    }

})
export const ActionsType={

    loginTC,logoutTC }
const slice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoginOn = true
        })
        builder.addCase(logoutTC.fulfilled, (state, action) => {
            state.isLoginOn = false
        })
    }

})
export const loginReducer = slice.reducer





