import {Provider} from "react-redux";
import {AppRootReducer, store} from "../state/store";
import {v1} from "uuid";
import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "../state/todolist-reducer";
import {tasksReducer} from "../state/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

const rootReducer=combineReducers({
    todolists: todolistsReducer,
    tasks:tasksReducer
})
const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all',order:0, addedDate:''},
        {id: 'todolistId2', title: 'What to buy', filter: 'all',order:0, addedDate:''}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'Js', status:TaskStatuses.New,todoListId:'todolistId1',startDate:'', order:0, deadline:'', addedDate:'', priority:TaskPriorities.Low, description:''},
            {id: v1(), title: 'Css', status:TaskStatuses.New,todoListId:'todolistId1',startDate:'', order:0, deadline:'', addedDate:'', priority:TaskPriorities.Low, description:''},
        ],
        ['todolistId2']: [
            {id: v1(), title: 'milk', status:TaskStatuses.New,todoListId:'todolistId2',startDate:'', order:0, deadline:'', addedDate:'', priority:TaskPriorities.Low, description:''},
            {id: v1(), title: 'bread', status:TaskStatuses.New,todoListId:'todolistId2',startDate:'', order:0, deadline:'', addedDate:'', priority:TaskPriorities.Low, description:''},
        ]
    }
}
const storeBookStore=createStore(rootReducer, initialGlobalState as AppRootReducer)
export const ReduxStoreProviderDecorator = (storyFn:any) => {
    return <Provider store={storeBookStore}>{storyFn()}</Provider>
}