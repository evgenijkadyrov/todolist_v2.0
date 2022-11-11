import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterType} from "./App";
import './App.css';

type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
    filter: string
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    const onAllClickHandler = () => {
        props.changeFilter('all')
    }
    const onActiveClickHandler = () => {
        props.changeFilter('active')
    }
    const onCompletedClickHandler = () => {
        props.changeFilter('completed')
    }

    function addTask() {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title required')
        }
    }

    const onkeyPresshandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }
    return <div>
        <h3>{props.title}</h3>
        <div>

            <input className={error ? 'error' : ''} value={title} onChange={onChangeHandler}
                   onKeyPress={onkeyPresshandler}/>
            <button onClick={addTask}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>

        <ul>
            {props.tasks.map((el) => {
                const onClickRemoveHandler = () => {
                    props.removeTask(el.id)
                }
                const onChangeStatusHandler =
                    (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDone = e.currentTarget.checked
                        props.changeTaskStatus(el.id, newIsDone)
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