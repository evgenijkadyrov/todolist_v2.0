import {Dispatch} from "redux";
import {ResponseType} from "../api/types";
import {ActionsCommonType} from "../components/CommonActions/ApplicationCommonActions";

const{SetAppError,SetAppStatus}=ActionsCommonType
export const handleServerAppError=<D>(data:ResponseType<D>,dispatch:Dispatch)=>{
    if (data.messages[0]) {
        dispatch(SetAppError({error:data.messages[0]}))
    } else {
        dispatch(SetAppError({error:'Some mistake'}))
    }
    dispatch(SetAppStatus({status:'failed'}))
}
export const handleServerNetworkAppError=(error: { message:string|null }, dispatch:Dispatch)=>{
    dispatch(SetAppError({error:error.message}?{error:error.message}:{error:'Some errror occupied' }))
    dispatch(SetAppStatus({status:'failed'}))
}


export const handleAsyncServerAppError=<D>(data:ResponseType<D>,thunkAPI:any,showError=true)=>{
    if(showError){

        thunkAPI.dispatch({error:data.messages.length?data.messages[0]:"Some error occured"})
    }
    thunkAPI.dispatch(SetAppStatus({status:'failed'}))

    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
    }

export const handleAsyncServerNetworkAppError=(error: { message:string|null }, thunkAPI:any,showError=true)=>{
    if(showError){
        thunkAPI.dispatch(SetAppError({error:error.message}?{error:error.message}:{error:'Some errror occupied' }))
    }

    thunkAPI.dispatch(SetAppStatus({status:'failed'}))
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}