import axios from "axios";
import {create} from "domain";

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
type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type ResponseType<D> = {
    data: D
    messages: Array<string>
    resultCode: number
}
type TaskResponseType={
    description:string
    title:string
    status:number
    priority:number
    startDate:string
    deadline:string
    id:string
    todoListId:string
    order:number
    adddedDate:string

}
type GetTasksType={
    items:Array<TaskResponseType>
    totalCount:number
    error:string
}
type UpdateTaskType={
    title:string
    description:string|null
    status:number
    priority:number
    startDate:string|null
    deadline:string|null
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
    updateTask(todolistId:string, taskId:string,title:string){
        const payload:UpdateTaskType={
            title:title,
            description:null,
            status:0,
            priority:1,
            startDate:null,
            deadline:null
        }
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`,payload)
    }
}