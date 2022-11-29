import React, {ChangeEvent, useCallback} from "react";
import EditableSpan from "../../../../EditableSpan";

import {TaskResponseType, TaskStatuses} from "../../../../../api/todolists-api";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from "@mui/material/Checkbox";
import {UpdateDomainTaskType} from "../../tasks-reducer";
import {useActions} from "../../../../../state/store";
import {tasksActions} from "../../index";

type TaskPropsType = {
       task: TaskResponseType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
        const { removeTask,  updateTask,} = useActions(tasksActions)

        const onClickRemoveHandler = () => {
           removeTask({todolistId:props.todolistId, taskId:props.task.id})
        }
        const onChangeStatusHandler =useCallback(
            (e: ChangeEvent<HTMLInputElement>) => {
                let newStatusValue = e.currentTarget.checked
                updateTask({todolistId:props.todolistId, taskId:props.task.id,model:{status: newStatusValue ? TaskStatuses.Completed : TaskStatuses.New,}})
            },[props.todolistId,props.task.id ])
        const onChangeTitleHandler = useCallback((newTitle: string) => {
            updateTask({taskId:props.task.id, model:{title:newTitle}, todolistId:props.todolistId})
        }, [ props.task.id, props.todolistId])
        return (
            <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
                <Checkbox color={'primary'}
                          checked={props.task.status === TaskStatuses.Completed}
                          onChange={onChangeStatusHandler}/>
                <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
                <IconButton  onClick={onClickRemoveHandler}><DeleteIcon fontSize={'small'}/>
                </IconButton>
            </div>)
    }
    )
;