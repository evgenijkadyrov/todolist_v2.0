import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterType} from "./App";

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
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')

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
        props.addTask(title)
        setTitle('')

    }

    const onkeyPresshandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }

    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onkeyPresshandler}/>
            <button onClick={addTask}>+</button>
        </div>

        <ul>
            {props.tasks.map((el) => {
                const onClickRemovehandler = () => {
                    props.removeTask(el.id)
                }
                return (
                    <li key={el.id}><input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                        <button onClick={onClickRemovehandler}>x
                        </button>
                    </li>)
            })}

        </ul>
        <div>
            <button onClick={onAllClickHandler}>All
            </button>
            <button onClick={onActiveClickHandler}>Active
            </button>
            <button onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}