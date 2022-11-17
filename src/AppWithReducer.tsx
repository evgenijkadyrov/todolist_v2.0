import React, {useReducer, useState} from 'react';
import './App.css';
import { Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterType,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolist-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TaskPriorities, TaskResponseType, TaskStatuses} from "./api/todolists-api";



export type TasksStateType = {
    [key: string]: Array<TaskResponseType>
}

function AppWithReducer() {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let [todolists, dispatchTodolist] = useReducer(todolistsReducer,[
        {id: todolistId1, title: 'What to learn', filter: 'all',order:0,addedDate:''},
        {id: todolistId2, title: 'What to buy', filter: 'all',order:0,addedDate:''}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: 'Js', status:TaskStatuses.New,todoListId:todolistId1,startDate:'', order:0, deadline:'', addedDate:'', priority:TaskPriorities.Low, description:''},
            {id: v1(), title: 'Css', status:TaskStatuses.New,todoListId:todolistId1,startDate:'', order:0, deadline:'', addedDate:'', priority:TaskPriorities.Low, description:''},
            {id: v1(), title: 'React', status:TaskStatuses.New,todoListId:todolistId1,startDate:'', order:0, deadline:'', addedDate:'', priority:TaskPriorities.Low, description:''},

        ],
        [todolistId2]: [
            {id: v1(), title: 'milk', status:TaskStatuses.New,todoListId:todolistId2,startDate:'', order:0, deadline:'', addedDate:'', priority:TaskPriorities.Low, description:''},
            {id: v1(), title: 'bread', status:TaskStatuses.New,todoListId:todolistId2,startDate:'', order:0, deadline:'', addedDate:'', priority:TaskPriorities.Low, description:''},

        ]
    })
    function changeFilter(filter: FilterType, todolistId: string) {

        const action=changeTodolistFilterAC(filter,todolistId)
       dispatchTodolist(action)
    }

    function changeTaskStatus(taskId: string, status: TaskStatuses, todolistId: string) {
      const action=changeTaskStatusAC(todolistId,taskId,status)
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
                    tasksForTodolist = allTodolistTasks.filter(el => el.status === TaskStatuses.Completed)
                }
                if (todolist.filter === 'active') {
                    tasksForTodolist = allTodolistTasks.filter(el => el.status === TaskStatuses.New)
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
