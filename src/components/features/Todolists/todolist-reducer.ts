import {todolistsAPI, TodolistType} from "../../../api/todolists-api";
import {RequestStatusType, SetAppStatus} from "../../App/app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../../../utilites/error-utils";
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
export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist', async (param: { id: string }, {dispatch, rejectWithValue}) => {
    dispatch(SetAppStatus({status: 'loading'}))
    dispatch(changeTodolistEntityStatusAC({id: param.id, entityStatus: 'loading'}))
    const res = await todolistsAPI.deleteTodolist(param.id)
    try {
        dispatch(SetAppStatus({status: 'success'}))
        return ({id: param.id})
    } catch (error: any) {
        handleServerNetworkAppError(error, dispatch)
        return rejectWithValue(null)
    }
})
export const addTodolistTC = createAsyncThunk('todolists/addTodolist', async (param: { title: string }, {dispatch, rejectWithValue}) => {
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
export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitle', async (param: { id: string, title: string }, {dispatch, rejectWithValue}) => {
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


//ended here .

const slice = createSlice({
    name: 'todolist',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
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

    },
    extraReducers: builder => {
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(el => el.id === action.payload.id)
            state.splice(index, 1)
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const todolist = state.find(el => el.id === action.payload.id)
            if (todolist)
                todolist.title = action.payload.title

        })
    }
})
export const todolistsReducer = slice.reducer
export const { changeTodolistFilterAC, changeTodolistEntityStatusAC} = slice.actions

//types

export type SetTodolistEntityStatusAT = ReturnType<typeof changeTodolistEntityStatusAC>

export type actionTodolistsType =
    | ReturnType<typeof changeTodolistFilterAC>

    | SetTodolistEntityStatusAT

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}