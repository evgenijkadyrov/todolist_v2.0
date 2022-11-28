import {addTodolistTC, fetchTodolistsTC, removeTodolistTC,} from "./todolist-reducer";
import {TaskPriorities, TaskStatuses, todolistsAPI, UpdateTaskType} from "../api/todolists-api";
import {TasksStateType} from "../components/App/App";
import {RootState} from "./store";
import {SetAppStatus, SetErrorType, SetStatusType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkAppError} from "../utilites/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const initialState: TasksStateType = {}
//asyncThunks
export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatus({status: 'loading'}))
    const res = await todolistsAPI.getTasks(todolistId)

    thunkAPI.dispatch(SetAppStatus({status: 'success'}))
    return {tasks: res.data.items, todolistId}

})
export const removeTaskTC = createAsyncThunk('tasks/removeTask', async (param: { todolistId: string, taskId: string }, thunkAPI) => {
    try {
        thunkAPI.dispatch(SetAppStatus({status: 'loading'}))
        const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId)

        thunkAPI.dispatch(SetAppStatus({status: 'success'}))
        return ({todolistId: param.todolistId, taskId: param.taskId})
    } catch (error: any) {
        handleServerNetworkAppError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})
export const addTaskTC = createAsyncThunk('tasks/addTask', async (param: { todolistId: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(SetAppStatus({status: 'loading'}))
    const res = await todolistsAPI.createTask(param.todolistId, param.title)
    try {
        thunkAPI.dispatch(SetAppStatus({status: 'success'}))
        return ({task: res.data.data.item})
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(SetAppStatus({status: 'success'}))
            return ({task: res.data.data.item})
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    } catch (e: any) {
        handleServerNetworkAppError(e, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue(null)
    }
})
export const updateTaskTC = createAsyncThunk('tasks/updateTask', async (param: { todolistId: string, taskId: string, model: UpdateDomainTaskType }, {dispatch, rejectWithValue, getState}) => {
    {
        const state = getState() as RootState

        const task = state.tasks[param.todolistId].find(el => el.id === param.taskId)
        if (!task) {
            console.warn('Erorror')
            return rejectWithValue(null)
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
        dispatch(SetAppStatus({status: 'loading'}))

            const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, payload)
        try {
            if (res.data.resultCode === 0) {

                dispatch(SetAppStatus({status: 'success'}))
                return{todolistId: param.todolistId, taskId: param.taskId, model: param.model}
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (error: any) {
            handleServerNetworkAppError(error, dispatch)
            return rejectWithValue(null)

        }
    }
})

export const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: { },
    extraReducers: (builder) => {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.id]
        });
        builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
            action.payload.todolists.forEach(el => {
                state[el.id] = []
            })
        });
        builder.addCase(fetchTasksTC.fulfilled, ((state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        }))
        builder.addCase(removeTaskTC.fulfilled, ((state, action) => {
            const index = state[action.payload.todolistId].findIndex(el => el.id === action.payload.taskId)
            state[action.payload.todolistId].splice(index, 1)
        }));
        builder.addCase(addTaskTC.fulfilled, ((state, action) => {
                if (action.payload.task) {
                    state[action.payload.task.todoListId].unshift(action.payload.task)
                }
            }
        ))
        builder.addCase(updateTaskTC.fulfilled,((state,action)=>{
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
export type actionTasksType =

    | SetErrorType
    | SetStatusType