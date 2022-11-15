import React, {ChangeEvent, useCallback} from "react";
import EditableSpan from "./EditableSpan";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    task: TaskType
    taskId: string
}
export const Task = React.memo((props: TaskPropsType) => {
        const onClickRemoveHandler = () => {
            props.removeTask(props.task.id, props.taskId)
        }
        const onChangeStatusHandler =
            (e: ChangeEvent<HTMLInputElement>) => {
                let newIsDone = e.currentTarget.checked
                props.changeTaskStatus(props.task.id, newIsDone, props.taskId)
            }
        const onChangeTitleHandler = useCallback((newTitle: string) => {
            props.changeTaskTitle(props.task.id, newTitle, props.taskId)
        }, [props.changeTaskTitle, props.task.id, props.taskId])
        return (
            <li key={props.task.id} className={props.task.isDone ? 'is-done' : ''}><input type="checkbox"
                                                                                          checked={props.task.isDone}
                                                                                          onChange={onChangeStatusHandler}/>
                <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
                <button onClick={onClickRemoveHandler}>x
                </button>
            </li>)
    }
    )
;