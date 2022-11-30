import {todolistsAPI, TodolistType} from "../../../api/todolists-api";
import {RequestStatusType, SetAppStatus} from "../../App/app-reducer";
import {handleAsyncServerAppError, handleAsyncServerNetworkAppError} from "../../../utilites/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ThunkError} from "../../../state/store";

const fetchTodolists = createAsyncThunk('todolists/fetchTodolists', async (param, thunkAPI) => {
     thunkAPI.dispatch(SetAppStatus({status: 'loading'}))
    try {

        const res = await todolistsAPI.getTodolists()
         thunkAPI.dispatch(SetAppStatus({status: 'success'}))
        return ({todolists: res.data})

    } catch
        (error: any) {
        return handleAsyncServerNetworkAppError(error,thunkAPI)
    }
})
 const removeTodolist = createAsyncThunk('todolists/removeTodolist', async (param: { id: string }, thunkAPI) => {
     thunkAPI.dispatch(SetAppStatus({status: 'loading'}))
     thunkAPI.dispatch(changeTodolistEntityStatus({id: param.id, entityStatus: 'loading'}))

    try {
        const res = await todolistsAPI.deleteTodolist(param.id)
        if(res.data.resultCode===0){
             thunkAPI.dispatch(SetAppStatus({status: 'success'}))
            return ({id: param.id})
        } else{
            return handleAsyncServerAppError(res.data,thunkAPI,)
        }

    } catch (error: any) {
       return handleAsyncServerNetworkAppError(error,thunkAPI)
    }
})
 const addTodolist = createAsyncThunk< {todolist:TodolistType},  string ,
     ThunkError>('todolists/addTodolist', async (title, thunkAPI) => {
     thunkAPI.dispatch(SetAppStatus({status: 'loading'}))

    try {
        const res = await todolistsAPI.createTodolist(title)
        if (res.data.resultCode === 0) {

             thunkAPI.dispatch(SetAppStatus({status: 'success'}))
            return {todolist: res.data.data.item}
        } else {
            return handleAsyncServerAppError(res.data,thunkAPI,false)
        }
    } catch (error: any) {
       return handleAsyncServerNetworkAppError(error,thunkAPI)
    }
})
 const changeTodolistTitle = createAsyncThunk('todolists/changeTodolistTitle', async (param: { id: string, title: string }, thunkAPI) => {
     thunkAPI.dispatch(SetAppStatus({status: 'loading'}))

    try {
        const res = await todolistsAPI.updateTodolistTitle(param.id, param.title)
        if (res.data.resultCode === 0) {

            thunkAPI.dispatch(SetAppStatus({status: 'success'}))
            return {id: param.id, title: param.title}
        } else {

           return handleAsyncServerAppError(res.data,thunkAPI,)
        }
    } catch (error: any) {

      return handleAsyncServerNetworkAppError(error,thunkAPI,)
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

            return action.payload.todolists.map((el
            :TodolistType) => ({...el, filter: 'all', entityStatus: 'idle'}))
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