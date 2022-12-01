import {combineReducers} from "redux";
import {tasksReducer, todolistsReducer} from "../components/features/Todolists";
import {appReducer} from "../components/Application";
import {loginReducer} from "../components/Login";

export const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: loginReducer,

})