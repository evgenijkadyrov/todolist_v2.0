import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolist-reducer";
import {tasksReducer} from "./tasks-reducer";

const rootReducer=combineReducers({
    todolists:todolistsReducer,
    tasks:tasksReducer
})
export type AppRootReducer=ReturnType<typeof rootReducer>
export const store=createStore(rootReducer)

// @ts-ignore
window.store=store