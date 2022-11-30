import {TaskResponseType, TodolistType} from "../../../api/types";
import {RequestStatusType} from "../../Application/types";

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}
export type PropsType = {
    demo?: boolean
    todolist: TodolistDomainType
    tasks: Array<TaskResponseType>
}
export type TaskPropsType = {
    task: TaskResponseType
    todolistId: string
}
export type TodolistsListPropsType = {
    demo?: boolean
}