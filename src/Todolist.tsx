import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterType} from "./App";
import './App.css';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    title: string
    id:string
    tasks: Array<TaskType>
    removeTask: (taskId: string,todolistId:string) => void
    changeFilter: (filter: FilterType,todolistId:string) => void
    addTask: (title: string,todolistId:string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean,todolistId:string) => void
    filter: FilterType
    removeTodolist:(todolistId:string)=>void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    const onAllClickHandler = () => {
        props.changeFilter('all',props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active',props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed',props.id)
    }

    function addTask() {
        if (title.trim() !== '') {
            props.addTask(title.trim(),props.id)
            setTitle('')
        } else {
            setError('Title required')
        }
    }
const OnClickRemoveTodoHandler=()=>{
        props.removeTodolist(props.id)
}
    const onkeyPresshandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }
    return <div>
        <h3>{props.title} <button onClick={OnClickRemoveTodoHandler}>X</button></h3>

        <div>

            <input className={error ? 'error' : ''} value={title} onChange={onChangeHandler}
                   onKeyPress={onkeyPresshandler}/>
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>

        <ul>
            {props.tasks.map((el) => {
                const onClickRemoveHandler = () => {
                    props.removeTask(el.id,props.id)
                }
                const onChangeStatusHandler =
                    (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDone = e.currentTarget.checked
                        props.changeTaskStatus(el.id, newIsDone,props.id)
                    }
                return (
                    <li key={el.id} className={el.isDone ? 'is-done' : ''}><input type="checkbox" checked={el.isDone}
                                                                                  onChange={onChangeStatusHandler}/>
                        <span>{el.title}</span>
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