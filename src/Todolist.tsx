import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterType} from "./App";
import './App.css';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    title: string
    id: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    filter: FilterType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => {
        props.changeFilter('all', props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active', props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed', props.id)
    }

    function addTask(title: string) {
        props.addTask(title.trim(), props.id)

    }

    const OnClickRemoveTodoHandler = () => {
        props.removeTodolist(props.id)
    }
    const onChangeTitleHandler = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    return <div>

        <h3><EditableSpan title={props.title} onChange={onChangeTitleHandler}/>
            <button onClick={OnClickRemoveTodoHandler}>X</button>
        </h3>

        <AddItemForm addItem={addTask}/>
        <ul>
            {props.tasks.map((el) => {
                const onClickRemoveHandler = () => {
                    props.removeTask(el.id, props.id)
                }
                const onChangeStatusHandler =
                    (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDone = e.currentTarget.checked
                        props.changeTaskStatus(el.id, newIsDone, props.id)
                    }
                const onChangeTitleHandler = (newTitle: string) => {
                    props.changeTaskTitle(el.id, newTitle, props.id)
                }
                return (
                    <li key={el.id} className={el.isDone ? 'is-done' : ''}><input type="checkbox" checked={el.isDone}
                                                                                  onChange={onChangeStatusHandler}/>
                        <EditableSpan title={el.title} onChange={onChangeTitleHandler}/>
                        <button onClick={onClickRemoveHandler}>x
                        </button>
                    </li>)
            })}

        </ul>
        <div>
            <button className={props.filter === 'all' ? "active-filter" : ''} onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? "active-filter" : ''} onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? "active-filter" : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}