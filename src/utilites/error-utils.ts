import {SetAppError, SetAppStatus} from "../state/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";

export const handleServerAppError=<D>(data:ResponseType<D>,dispatch:Dispatch)=>{
    if (data.messages[0]) {
        dispatch(SetAppError(data.messages[0]))
    } else {
        dispatch(SetAppError('Some mistake'))
    }
    dispatch(SetAppStatus('failed'))
}
export const handleServerNetworkAppError=(error:any, dispatch:Dispatch)=>{
    dispatch(SetAppError(error.message?error.message:'Some errror occupied'))
    dispatch(SetAppStatus('failed'))
}