import {combineReducers} from "redux";
import {tasksReducer, todolistsReducer} from "../components/features/Todolists";
import thunk from 'redux-thunk'
import {appReducer} from "../components/Application";
import {loginReducer} from "../components/Login";
import {configureStore} from "@reduxjs/toolkit";

export const rootReducer=combineReducers({
    todolists:todolistsReducer,
    tasks:tasksReducer,
    app:appReducer,
    login:loginReducer,

})

export const store=configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .prepend(thunk)
})

// @ts-ignore
window.store=store