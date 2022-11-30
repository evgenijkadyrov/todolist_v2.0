import React, {ChangeEvent, useCallback} from "react";
import EditableSpan from "../../../../EditableSpan";
import {IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from "@mui/material/Checkbox";
import {tasksActions} from "../../index";
import {useActions} from "../../../../../utilites/redux-utils";
import {TaskStatuses} from "../../../../../api/types";
import {TaskPropsType} from "../../types";

export const Task = React.memo((props: TaskPropsType) => {
        const {removeTask, updateTask,} = useActions(tasksActions)

        const onClickRemoveHandler = () => {
            removeTask({todolistId: props.todolistId, taskId: props.task.id})
        }
        const onChangeStatusHandler = useCallback(
            (e: ChangeEvent<HTMLInputElement>) => {
                let newStatusValue = e.currentTarget.checked
                updateTask({
                    todolistId: props.todolistId,
                    taskId: props.task.id,
                    model: {status: newStatusValue ? TaskStatuses.Completed : TaskStatuses.New,}
                })
            }, [props.todolistId, props.task.id])
        const onChangeTitleHandler = useCallback((newTitle: string) => {
            updateTask({taskId: props.task.id, model: {title: newTitle}, todolistId: props.todolistId})
        }, [props.task.id, props.todolistId])
        return (
            <div style={{position: 'relative'}} key={props.task.id}
                 className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
                <Checkbox color={'primary'}
                          checked={props.task.status === TaskStatuses.Completed}
                          onChange={onChangeStatusHandler}/>
                <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
                <IconButton style={{position: 'absolute', right: '5px', top: '2px', marginRight: '-5px'}}
                            onClick={onClickRemoveHandler}><DeleteIcon fontSize={'small'}/>
                </IconButton>
            </div>)
    }
    )
;