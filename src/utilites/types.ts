import {store} from "../app/store";
import {FieldsErrorType} from "../api/types";
import {rootReducer} from "../app/reducers";

export {

}
export type AppRootReducer = ReturnType<typeof rootReducer>
export type RootStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type ThunkError = { rejectValue: { errors: Array<string>, fieldsErrors?: FieldsErrorType[] } }