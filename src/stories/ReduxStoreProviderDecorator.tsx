import {Provider} from "react-redux";
import {v1} from "uuid";
import {combineReducers} from "redux";
import {todolistsReducer} from "../components/features/Todolists/todolist-reducer";
import {tasksReducer} from "../components/features/Todolists/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {appReducer} from "../components/App/app-reducer";
import {RootStateType} from "../state/store";
import thunk from "redux-thunk";
import {loginReducer} from "../components/Login/login-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {HashRouter} from "react-router-dom";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    login: loginReducer,


})
const initialGlobalState: RootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', order: 0, addedDate: '', entityStatus: 'loading'}
    ],
    tasks: {
        ['todolistId1']: [
            {
                id: v1(),
                title: 'Js',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                startDate: '',
                order: 0,
                deadline: '',
                addedDate: '',
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(),
                title: 'Css',
                status: TaskStatuses.New,
                todoListId: 'todolistId1',
                startDate: '',
                order: 0,
                deadline: '',
                addedDate: '',
                priority: TaskPriorities.Low,
                description: ''
            },
        ],
        ['todolistId2']: [
            {
                id: v1(),
                title: 'milk',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                startDate: '',
                order: 0,
                deadline: '',
                addedDate: '',
                priority: TaskPriorities.Low,
                description: ''
            },
            {
                id: v1(),
                title: 'bread',
                status: TaskStatuses.New,
                todoListId: 'todolistId2',
                startDate: '',
                order: 0,
                deadline: '',
                addedDate: '',
                priority: TaskPriorities.Low,
                description: ''
            },
        ],

    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: true


    },
    login: {
        isLoginOn: true
    }
}
const storeBookStore = configureStore(
    {
        reducer: rootReducer,
        preloadedState: initialGlobalState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .prepend(thunk)
    }
)
export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storeBookStore}>{storyFn()}</Provider>
}
export const BrowserRouterDecorator = (storyFn: any) => {
    return <HashRouter>
        {storyFn()}
    </HashRouter>
}