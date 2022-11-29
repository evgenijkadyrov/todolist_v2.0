import {ActionCreatorsMapObject, bindActionCreators, combineReducers} from "redux";
import {actionTodolistsType, todolistsReducer} from "../components/features/Todolists/todolist-reducer";
import { tasksReducer} from "../components/features/Todolists/tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import { appReducer} from "../components/App/app-reducer";
import { loginReducer} from "../components/Login/login-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {useMemo} from "react";

const rootReducer=combineReducers({
    todolists:todolistsReducer,
    tasks:tasksReducer,
    app:appReducer,
    login:loginReducer,

})
type ActionsType=actionTodolistsType
export type AppRootReducer=ReturnType<typeof rootReducer>
// export const store=createStore(rootReducer, applyMiddleware(thunk))
export const store=configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(thunk)
})
export type RootStateType=ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootStateType, unknown, ActionsType>
export type AppThunk<ReturnType=void>=ThunkAction< ReturnType, RootStateType, unknown, ActionsType>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useActions = <T extends ActionCreatorsMapObject<any>>(actions:T) => {
    const dispatch=useDispatch()
    const boundActions=useMemo(()=>{
        return bindActionCreators(actions,dispatch)
    },[])
    return boundActions
};

// @ts-ignore
window.store=store