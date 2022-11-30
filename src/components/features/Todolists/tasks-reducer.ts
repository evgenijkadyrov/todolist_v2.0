import {TaskPriorities, TaskResponseType, TaskStatuses, todolistsAPI, UpdateTaskType} from "../../../api/todolists-api";
import {TasksStateType} from "../../App/App";
import {RootStateType, ThunkError} from "../../../state/store";
import {SetAppStatus,} from "../../App/app-reducer";
import {handleAsyncServerAppError, handleAsyncServerNetworkAppError} from "../../../utilites/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ActionsType as todolistsActions, TodolistDomainType} from "./todolist-reducer";


const initialState: TasksStateType = {}
//asyncThunks
const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatus({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todolistId)

    thunkAPI.dispatch(SetAppStatus({status: 'success'}))
    return {tasks: res.data.items, todolistId}

})
const removeTask = createAsyncThunk('tasks/removeTask', async (param: { todolistId: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatus({status: 'loading'}))
    try {
        const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId)
        thunkAPI.dispatch(SetAppStatus({status: 'success'}))
        return ({todolistId: param.todolistId, taskId: param.taskId})
    } catch (error: any) {
        return handleAsyncServerNetworkAppError(error, thunkAPI)
    }
})
const addTask = createAsyncThunk<{ task: TaskResponseType }, { todolistId: string, title: string }, ThunkError>('tasks/addTask', async (param, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatus({status: 'loading'}))

    try {
        const res = await todolistsAPI.createTask(param.todolistId, param.title)
        thunkAPI.dispatch(SetAppStatus({status: 'success'}))

        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(SetAppStatus({status: 'success'}))
            return {task: res.data.data.item}
        } else {
            return handleAsyncServerAppError(res.data, thunkAPI, false)
        }
    } catch (error: any) {
        return handleAsyncServerNetworkAppError(error, thunkAPI)
    }
})
const updateTask = createAsyncThunk('tasks/updateTask', async (param: { todolistId: string, taskId: string, model: UpdateDomainTaskType }, thunkAPI) => {
    {
        const state = thunkAPI.getState() as RootStateType

        const task = state.tasks[param.todolistId].find(el => el.id === param.taskId)
        if (!task) {
            console.warn('Erorror')
            return thunkAPI.rejectWithValue(null)
        }
        const payload: UpdateTaskType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            status: task.status,
            title: task.title,
            ...param.model
        }
        thunkAPI.dispatch(SetAppStatus({status: 'loading'}))


        try {
            const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, payload)
            if (res.data.resultCode === 0) {

                thunkAPI.dispatch(SetAppStatus({status: 'success'}))
                return {todolistId: param.todolistId, taskId: param.taskId, model: param.model}
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (error: any) {
            return handleAsyncServerNetworkAppError(error, thunkAPI)

        }
    }
})

export const ActionType = {
    fetchTasks: fetchTasks, removeTask, addTask, updateTask
}
export const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(todolistsActions.addTodolist.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(todolistsActions.removeTodolist.fulfilled, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(todolistsActions.fetchTodolists.fulfilled, (state, action) => {
            action.payload.todolists.forEach((el: TodolistDomainType) => {
                state[el.id] = []
            })
        });
        builder.addCase(fetchTasks.fulfilled, ((state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        }))
        builder.addCase(removeTask.fulfilled, ((state, action) => {
            const index = state[action.payload.todolistId].findIndex(el => el.id === action.payload.taskId)
            state[action.payload.todolistId].splice(index, 1)
        }));
        builder.addCase(addTask.fulfilled, ((state, action) => {
                if (action.payload.task) {
                    state[action.payload.task.todoListId].unshift(action.payload.task)
                }
            }
        ))
        builder.addCase(updateTask.fulfilled, ((state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(el => el.id === action.payload.taskId)
            tasks[index] = {...tasks[index], ...action.payload.model}
        }))
    }

})
export const tasksReducer = slice.reducer

//types


export type UpdateDomainTaskType = {
    title?: string
    description?: string | null
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string | null
    deadline?: string | null
}
