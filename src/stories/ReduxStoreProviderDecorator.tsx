import {Provider} from "react-redux";
import {AppRootReducer, store} from "../state/store";
import {v1} from "uuid";
import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "../state/todolist-reducer";
import {tasksReducer} from "../state/tasks-reducer";

const rootReducer=combineReducers({
    todolists: todolistsReducer,
    tasks:tasksReducer
})
const initialGlobalState = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all'}
    ],
    tasks: {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true}
        ],
        ['todolistId2']: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'React Book', isDone: true}
        ]
    }
}
const storeBookStore=createStore(rootReducer, initialGlobalState as AppRootReducer)
export const ReduxStoreProviderDecorator = (storyFn:any) => {
    return <Provider store={storeBookStore}>{storyFn()}</Provider>
}