import {SetAppStatus} from "./app-reducer";
import {authAPI, DataLoginPropsType, FieldsErrorType} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkAppError} from "../utilites/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

// type InitialStateType = {
//     isLoginOn: boolean
// }
const initialState = {
    isLoginOn: false,
}
export const loginTC = createAsyncThunk<{ isLoginOn: boolean }, DataLoginPropsType, { rejectValue: { errors: Array<string>, fieldsErrors?: FieldsErrorType[] } }>('auth/login', async (param: DataLoginPropsType, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatus({status: 'loading'}))
    try {
        debugger
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

const slice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setIsLoginOn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoginOn = action.payload.value
        }

    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoginOn = action.payload.isLoginOn
        })
    }
})
export const loginReducer = slice.reducer
export const {setIsLoginOn} = slice.actions

//thunks


export type IsLoginOnType = ReturnType<typeof setIsLoginOn>

