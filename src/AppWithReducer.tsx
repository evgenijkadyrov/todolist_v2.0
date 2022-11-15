import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducer() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchTodolist] = useReducer(todolistsReducer,[
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: 'Js', isDone: false},
            {id: v1(), title: 'Css', isDone: false},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'webql', isDone: false},
            {id: v1(), title: 'mongo', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'milk', isDone: false},
            {id: v1(), title: 'bread', isDone: false},
            {id: v1(), title: 'water', isDone: true},

        ]
    })
    function changeFilter(filter: FilterType, todolistId: string) {

        const action=changeTodolistFilterAC(filter,todolistId)
       dispatchTodolist(action)
    }

    function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
      const action=changeTaskStatusAC(todolistId,taskId,isDone)
        dispatchTasks(action)
    }

    function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
       const action=changeTaskTitleAC(todolistId,taskId,newTitle)
        dispatchTasks(action)
    }

    function removeTask(taskId: string, todolistId: string) {
        const action=removeTaskAC(todolistId,taskId)
        dispatchTasks(action)

    }

    function addTask(title: string, todolistId: string) {
const action=addTaskAC(todolistId,title)
      dispatchTasks(action)
    }

    function removeTodolist(todolistId: string) {
        const action=removeTodolistAC(todolistId)
        dispatchTodolist(action)
        dispatchTasks(action)

    }

    const changeTodolistTitle = (todolistId: string, newTitle: string,) => {
        const action=changeTodolistTitleAC(newTitle,todolistId)
      dispatchTodolist(action)

    }

    function addTodolist(title: string) {
       const action=addTodolistAC(title)
        dispatchTodolist(action)
        dispatchTasks(action)
    }

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist}/>
            {todolists.map((todolist) => {
                let allTodolistTasks = tasks[todolist.id]
                let tasksForTodolist = allTodolistTasks
                if (todolist.filter === 'completed') {
                    tasksForTodolist = allTodolistTasks.filter(el => el.isDone === true)
                }
                if (todolist.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(el => el.isDone === false)
                }
                return <Todolist
                    key={todolist.id}
                    id={todolist.id}
                    title={todolist.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeTaskStatus}
                    filter={todolist.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
                    changeTodolistTitle={changeTodolistTitle}

                />
            })
            }

        </div>
    );

}

export default AppWithReducer;
