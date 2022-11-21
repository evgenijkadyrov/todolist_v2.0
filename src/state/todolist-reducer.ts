import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {AppThunk} from "./store";
import {SetStatus} from "./app-reducer";



const initialState: Array<TodolistDomainType> = []
export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: actionTodolistsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(el => el.id !== action.id)

        case "ADD-TODOLIST":
            return [{...action.todolist, filter:'all'}, ...state]

        case "CHANGE-TODOLIST-TITLE":
            return state.map(el=>el.id===action.id?{...el,title:action.title}:el)

        case  "CHANGE-TODOLIST-FILTER":
            return state.map(el=>el.id===action.id?{...el,filter:action.newFilter}:el)

        case "SET-TODOLISTS": {
            return action.todolists.map(el => ({...el, filter: 'all'}))
        }
        default:
            return state
    }
}

//actions
export const removeTodolistAC = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: "ADD-TODOLIST", todolist} as const)
export const changeTodolistTitleAC = (id: string,title: string, ) => ({
    type: "CHANGE-TODOLIST-TITLE",title,id} as const)
export const changeTodolistFilterAC = (newFilter: FilterType, id: string) => ({
    type: "CHANGE-TODOLIST-FILTER",
    newFilter, id} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: "SET-TODOLISTS", todolists} as const)

//thunks
export const fetchTodolistsTC = ():AppThunk =>{
    return (dispatch)=>{
        dispatch(SetStatus('loading'))
        todolistsAPI.getTodolists()
            .then(res => {
                dispatch(setTodolistsAC(res.data))
                dispatch(SetStatus('success'))
            })
    }
}

export const RemoveTodolist=(id:string):AppThunk=>{
    return (dispatch)=>{
        dispatch(SetStatus('loading'))
        todolistsAPI.deleteTodolist(id)
            .then(res=>{
                dispatch(removeTodolistAC(id))
                dispatch(SetStatus('success'))
            })
    }
}
export const AddTodolistTC=(title:string):AppThunk=>{
    return (dispatch)=>{
        dispatch(SetStatus('loading'))
        todolistsAPI.createTodolist(title)
            .then(res=>{
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(SetStatus('success'))
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

//types
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