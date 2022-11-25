import {combineReducers} from "redux";
import {actionTodolistsType, todolistsReducer} from "./todolist-reducer";
import {actionTasksType, tasksReducer} from "./tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppActionsType, appReducer} from "./app-reducer";
import { loginReducer} from "./login-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer=combineReducers({
    todolists:todolistsReducer,
    tasks:tasksReducer,
    app:appReducer,
    login:loginReducer,

})
type ActionsType=actionTodolistsType|actionTasksType|AppActionsType
export type AppRootReducer=ReturnType<typeof rootReducer>
// export const store=createStore(rootReducer, applyMiddleware(thunk))
export const store=configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(thunk)
})
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, ActionsType>
export type AppThunk<ReturnType=void>=ThunkAction< ReturnType, RootState, unknown, ActionsType>
// @ts-ignore
window.store=store