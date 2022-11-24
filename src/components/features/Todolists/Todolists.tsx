import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootReducer} from "../../../state/store";
import {
    AddTodolistTC,
    changeTodolistFilterAC,
    ChangeTodolistTitleTC,
    fetchTodolistsTC,
    FilterType,
    RemoveTodolist,
    TodolistDomainType
} from "../../../state/todolist-reducer";
import React, {useCallback, useEffect} from "react";
import {TaskStatuses} from "../../../api/todolists-api";
import {AddTaskTC, removeTaskTC, UpdateTaskTC} from "../../../state/tasks-reducer";
import AddItemForm from "../../AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {TasksStateType} from "../../App/App";
import {Container} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Navigate} from "react-router-dom";

type TodolistsListPropsType = {
    demo?: boolean
}
export const TodolistsList = (props: TodolistsListPropsType) => {
    const todolists = useSelector<AppRootReducer, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootReducer, TasksStateType>(state => state.tasks)
    const isLoginOn=useSelector<AppRootReducer>(state=>state.login.isLoginOn)
    const useAppDispatch = () => useDispatch<AppDispatch>()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (props.demo||!isLoginOn){
            return
        }
            dispatch(fetchTodolistsTC())

    }, [])


    const changeFilter = useCallback((filter: FilterType, todolistId: string) => {

        dispatch(changeTodolistFilterAC({newFilter:filter, id:todolistId}))
    }, []);

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(UpdateTaskTC(todolistId, taskId, {status}))
    }, []);

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(UpdateTaskTC(todolistId, taskId, {title: newTitle}))
    }, []);

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(removeTaskTC({todolistId, taskId}))

    }, []);

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(AddTaskTC(todolistId, title))
    }, []);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(RemoveTodolist(todolistId))
    }, []);

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string,) => {
        dispatch(ChangeTodolistTitleTC(todolistId, newTitle))

    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodolistTC(title))

    }, []);
    if(!isLoginOn){
        return <Navigate to={'/login'}/>
    }
    return (
        <div className="App">
            <Container fixed>
                <Grid container style={{padding: '20px'}}><AddItemForm addItem={addTodolist}/></Grid>

                <Grid container spacing={3}>
                    {todolists.map((todolist) => {
                        let allTodolistTasks = tasks[todolist.id]
                        let tasksForTodolist = allTodolistTasks

                        return <Grid item>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={todolist.id}
                                    demo={props.demo}
                                    todolist={todolist}
                                    tasks={tasksForTodolist}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}

                                />
                            </Paper>
                        </Grid>
                    })
                    }
                </Grid>

            </Container>


        </div>
    );
}