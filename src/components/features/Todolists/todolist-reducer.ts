import {todolistsAPI, TodolistType} from "../../../api/todolists-api";
import {RequestStatusType, SetAppStatus} from "../../App/app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../../../utilites/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

 const fetchTodolists = createAsyncThunk('todolists/fetchTodolists', async (param, {dispatch, rejectWithValue}) => {
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
 const removeTodolist = createAsyncThunk('todolists/removeTodolist', async (param: { id: string }, {dispatch, rejectWithValue}) => {
    dispatch(SetAppStatus({status: 'loading'}))
    dispatch(changeTodolistEntityStatus({id: param.id, entityStatus: 'loading'}))
    const res = await todolistsAPI.deleteTodolist(param.id)
    try {
        dispatch(SetAppStatus({status: 'success'}))
        return ({id: param.id})
    } catch (error: any) {
        handleServerNetworkAppError(error, dispatch)
        return rejectWithValue(null)
    }
})
 const addTodolist = createAsyncThunk('todolists/addTodolist', async (param: { title: string }, {dispatch, rejectWithValue}) => {
    dispatch(SetAppStatus({status: 'loading'}))
    const res = await todolistsAPI.createTodolist(param.title)
    try {
        if (res.data.resultCode === 0) {

            dispatch(SetAppStatus({status: 'success'}))
            return {todolist: res.data.data.item}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkAppError(error, dispatch)
        return rejectWithValue(null)
    }
})
 const changeTodolistTitle = createAsyncThunk('todolists/changeTodolistTitle', async (param: { id: string, title: string }, {dispatch, rejectWithValue}) => {
    dispatch(SetAppStatus({status: 'loading'}))
    const res = await todolistsAPI.updateTodolistTitle(param.id, param.title)
    try {
        if (res.data.resultCode === 0) {

            dispatch(SetAppStatus({status: 'success'}))
            return {id: param.id, title: param.title}
        } else {
            handleServerAppError(res.data, dispatch)
            return rejectWithValue(null)
        }
    } catch (error: any) {
        handleServerNetworkAppError(error, dispatch)
        return rejectWithValue(null)
    }
})


export const ActionsType={fetchTodolists,removeTodolist,addTodolist,changeTodolistTitle}

export const slice = createSlice({
    name: 'todolist',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilter(state, action: PayloadAction<{ newFilter: FilterType, id: string }>) {
            const index = state.find(el => el.id === action.payload.id)
            if (index)
                index.filter = action.payload.newFilter
        },
        changeTodolistEntityStatus(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            const index = state.find(el => el.id === action.payload.id)
            if (index)
                index.entityStatus = action.payload.entityStatus
        },

    },
    extraReducers: builder => {
        builder.addCase(fetchTodolists.fulfilled, (state, action) => {
            return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolist.fulfilled, (state, action) => {
            const index = state.findIndex(el => el.id === action.payload.id)
            state.splice(index, 1)
        })
        builder.addCase(addTodolist.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(changeTodolistTitle.fulfilled, (state, action) => {
            const todolist = state.find(el => el.id === action.payload.id)
            if (todolist)
                todolist.title = action.payload.title

        })
    }
})
export const todolistsReducer = slice.reducer
export const { changeTodolistFilter, changeTodolistEntityStatus} = slice.actions

//types

export type SetTodolistEntityStatusAT = ReturnType<typeof changeTodolistEntityStatus>

export type actionTodolistsType =
    | ReturnType<typeof changeTodolistFilter>

    | SetTodolistEntityStatusAT

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}