import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppThunk} from "./store";

export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>
export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>
export type actionTodolistsType =
    | RemoveTodolistAT
    | AddTodolistAT
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsAT

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterType
}

const initialState: Array<TodolistDomainType> = []
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: actionTodolistsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.id)
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistDomainType = {...action.todolist, filter:'all'           }
            return [newTodolist, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            let todolist = state.find(el => el.id === action.id)
            if (todolist) {
                todolist.title = action.title
            }
            return [...state]
        }
        case  "CHANGE-TODOLIST-FILTER": {
            let todolist = state.find((el) => el.id === action.id)
            if (todolist) {
                todolist.filter = action.newFilter
            }
            return ([...state])
        }
        case "SET-TODOLISTS": {
            return action.todolists.map(el => ({...el, filter: 'all'}))

        }
        default:
            return state
    }
}


export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)
export const changeTodolistTitleAC = (id: string,title: string, ) => ({
    type: "CHANGE-TODOLIST-TITLE",
    title,
    id
} as const)
export const changeTodolistFilterAC = (newFilter: FilterType, id: string) => ({
    type: "CHANGE-TODOLIST-FILTER",
    newFilter,
    id
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists} as const)


export const fetchTodolistsTC = ():AppThunk =>{
    return (dispatch)=>{
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}
export const RemoveTodolist=(id:string):AppThunk=>{
    return (dispatch)=>{
        todolistsAPI.deleteTodolist(id)
            .then(res=>{
                dispatch(removeTodolistAC(id))
            })
    }
}
export const AddTodolistTC=(title:string):AppThunk=>{
    return (dispatch)=>{
        todolistsAPI.createTodolist(title)
            .then(res=>{
                dispatch(addTodolistAC(res.data.data.item))
            })
    }
}
export const ChangeTodolistTitleTC = (id:string,title:string):AppThunk=>{
    return (dispatch)=>{
        todolistsAPI.updateTodolistTitle(id,title)
            .then(res=>{
                dispatch(changeTodolistTitleAC(id,title))
            })
    }
}