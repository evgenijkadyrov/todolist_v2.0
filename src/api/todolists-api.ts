import axios from "axios";
import {DataLoginPropsType, GetTasksType, ResponseType, TaskResponseType, TodolistType, UpdateTaskType} from "./types";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'fae13881-e951-4f04-94b2-31eb83e53019'
    }
}
const instance=axios.create({
    baseURL:'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})
export const authAPI={
    loginMe(data:DataLoginPropsType){
        return instance.post<ResponseType<{}>>('auth/login', data )
    },
    me(){
        return instance.get<ResponseType<{id:string,login:string, password:string}>>('auth/me')
    },
    logout(){
        return instance.delete<ResponseType<{}>>('auth/login')
    }
}

export const todolistsAPI = {
    getTodolists() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>('todo-lists', {title: title})

    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType<{}>>(`todo-lists/${id}`)
    },
    updateTodolistTitle(id: string, title: string) {
        return instance.put<ResponseType<{}>>(`todo-lists/${id}`, {title: title})
    },
    getTasks(todolistId:string){
        return instance.get<GetTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId:string, taskId:string){
        return instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId:string, title:string){
        return instance.post<ResponseType<{ item:TaskResponseType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, payload:UpdateTaskType){

        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`,payload)
    },

}

