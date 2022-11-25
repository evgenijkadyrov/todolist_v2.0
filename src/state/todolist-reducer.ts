import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {AppThunk} from "./store";
import {RequestStatusType, SetAppStatus} from "./app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../utilites/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolists', async (param, {dispatch, rejectWithValue}) => {
    dispatch(SetAppStatus({status: 'loading'}))
    const res = await todolistsAPI.getTodolists()
    try {
        dispatch(SetAppStatus({status: 'success'}))
        return ({todolists: res.data})

    } catch
        (error: any) {
        handleServerNetworkAppError(error, dispatch)
        return rejectWithValue(null)
    }
})

//ended here .

const slice = createSlice({
    name: 'todolist',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        removeTodolistAC(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(el => el.id === action.payload.id)
            state.splice(index, 1)
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistType }>) {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        changeTodolistTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const todolist = state.find(el => el.id === action.payload.id)
            if (todolist)
                todolist.title = action.payload.title
        },
        changeTodolistFilterAC(state, action: PayloadAction<{ newFilter: FilterType, id: string }>) {
            const index = state.find(el => el.id === action.payload.id)
            if (index)
                index.filter = action.payload.newFilter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            const index = state.find(el => el.id === action.payload.id)
            if (index)
                index.entityStatus = action.payload.entityStatus
        },
        // setTodolistsAC(state, action: PayloadAction<{ todolists: Array<TodolistType> }>) {
        //     return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        // },
    },
    extraReducers:builder => {
        builder.addCase(fetchTodolistsTC.fulfilled,(state,action)=>{
            return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        })
    }
})
export const todolistsReducer = slice.reducer
export const {removeTodolistAC, addTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, changeTodolistEntityStatusAC} = slice.actions

//thunks


export const RemoveTodolist = (id: string): AppThunk => {
    return (dispatch) => {
        dispatch(SetAppStatus({status: 'loading'}))
        dispatch(changeTodolistEntityStatusAC({id: id, entityStatus: 'loading'}))
        todolistsAPI.deleteTodolist(id)
            .then(res => {
                dispatch(removeTodolistAC({id: id}))
                dispatch(SetAppStatus({status: 'success'}))
            })
            .catch(error => {
                handleServerNetworkAppError(error, dispatch)
            })
    }
}
export const AddTodolistTC = (title: string): AppThunk => {
    return (dispatch) => {
        dispatch(SetAppStatus({status: 'loading'}))
        todolistsAPI.createTodolist(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolistAC({todolist: res.data.data.item}))
                    dispatch(SetAppStatus({status: 'success'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }

            })
            .catch(error => {
                handleServerNetworkAppError(error, dispatch)
            })
    }
}

export const ChangeTodolistTitleTC = (id: string, title: string): AppThunk => {
    return (dispatch) => {
        dispatch(SetAppStatus({status: 'loading'}))
        todolistsAPI.updateTodolistTitle(id, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC({id: id, title: title}))
                    dispatch(SetAppStatus({status: 'success'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }

            })
            .catch(error => {
                handleServerNetworkAppError(error, dispatch)
            })
    }
}

//types
export type AddTodolistAT = ReturnType<typeof addTodolistAC>
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>

export type SetTodolistEntityStatusAT = ReturnType<typeof changeTodolistEntityStatusAC>

export type actionTodolistsType =
    | RemoveTodolistAT
    | AddTodolistAT
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>

    | SetTodolistEntityStatusAT

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}