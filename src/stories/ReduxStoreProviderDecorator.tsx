import {Provider} from "react-redux";

import {v1} from "uuid";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {todolistsReducer} from "../state/todolist-reducer";
import {tasksReducer} from "../state/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {appReducer} from "../state/app-reducer";
import {AppRootReducer, RootState} from "../state/store";
import thunk from "redux-thunk";
import {loginReducer} from "../state/login-reducer";

const rootReducer=combineReducers({
    todolists: todolistsReducer,
    tasks:tasksReducer,
    app:appReducer,
    login: loginReducer,


})
const initialGlobalState:RootState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all',order:0, addedDate:'', entityStatus:'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all',order:0, addedDate:'',entityStatus:'loading'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'Js', status:TaskStatuses.New,todoListId:'todolistId1',startDate:'', order:0, deadline:'', addedDate:'', priority:TaskPriorities.Low, description:''},
            {id: v1(), title: 'Css', status:TaskStatuses.New,todoListId:'todolistId1',startDate:'', order:0, deadline:'', addedDate:'', priority:TaskPriorities.Low, description:''},
        ],
        ['todolistId2']: [
            {id: v1(), title: 'milk', status:TaskStatuses.New,todoListId:'todolistId2',startDate:'', order:0, deadline:'', addedDate:'', priority:TaskPriorities.Low, description:''},
            {id: v1(), title: 'bread', status:TaskStatuses.New,todoListId:'todolistId2',startDate:'', order:0, deadline:'', addedDate:'', priority:TaskPriorities.Low, description:''},
        ],

    },
    app:{
        status:'idle',
        error:null,
        isInitialized:false


    },
    login:{
        isLoginOn:false
    }
}
const storeBookStore=createStore(rootReducer, initialGlobalState as AppRootReducer,applyMiddleware(thunk))
export const ReduxStoreProviderDecorator = (storyFn:any) => {
    return <Provider store={storeBookStore}>{storyFn()}</Provider>
}