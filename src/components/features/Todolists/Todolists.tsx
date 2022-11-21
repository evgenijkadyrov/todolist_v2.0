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
import {AddTaskTC, RemoveTaskTC, UpdateTaskTC} from "../../../state/tasks-reducer";
import AddItemForm from "../../AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {TasksStateType} from "../../App/App";
import LinearProgress from "@mui/material/LinearProgress";
import {Container} from "@mui/material";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ErrorSnackBar from "../../SnackBar";

export const TodolistsList = () => {
    const todolists = useSelector<AppRootReducer, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootReducer, TasksStateType>(state => state.tasks)

    const useAppDispatch = () => useDispatch<AppDispatch>()
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())

    }, [])


    const changeFilter = useCallback((filter: FilterType, todolistId: string) => {

        dispatch(changeTodolistFilterAC(filter, todolistId))
    }, []);

    const changeTaskStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(UpdateTaskTC(todolistId, taskId, {status}))
    }, []);

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        dispatch(UpdateTaskTC(todolistId, taskId, {title: newTitle}))
    }, []);

    const removeTask = useCallback((taskId: string, todolistId: string) => {
        dispatch(RemoveTaskTC(todolistId, taskId))

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
                            </Paper>
                        </Grid>
                    })
                    }
                </Grid>

            </Container>


        </div>
    );
}