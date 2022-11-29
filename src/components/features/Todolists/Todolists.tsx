import {useSelector} from "react-redux";
import {useActions} from "../../../state/store";
import React, {useCallback, useEffect} from "react";

import AddItemForm from "../../AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Container} from "@mui/material";
import Grid from "@mui/material/Grid";
import {Navigate} from "react-router-dom";
import {todolistsActions, todolistsSelectors} from "../Todolists";
import {loginSelectors} from "../../Login";

type TodolistsListPropsType = {
    demo?: boolean
}
export const TodolistsList = (props: TodolistsListPropsType) => {

    const todolists = useSelector(todolistsSelectors.selectTodolists)
    const tasks = useSelector(todolistsSelectors.selectTasks)
    const isLoginOn=useSelector(loginSelectors.selectIsLoginOn)

    const {fetchTodolists,addTodolist,}=useActions(todolistsActions)


    useEffect(() => {
        if (props.demo||!isLoginOn){
            return
        }
            fetchTodolists()

    }, [])


    const addTodolistCallback = useCallback(async(title: string) => {
        addTodolist({title})

    }, []);
    if(!isLoginOn){
        return <Navigate to={'/login'}/>
    }
    return (
        <div className="App">
            <Container fixed>
                <Grid container style={{padding: '20px'}}><AddItemForm addItem={addTodolistCallback}/></Grid>

                <Grid container spacing={3} style={{flexWrap:'nowrap', overflowX:'scroll'}} >
                    {todolists.map((todolist) => {
                        let allTodolistTasks = tasks[todolist.id]
                        let tasksForTodolist = allTodolistTasks

                        return <Grid item>
                            <div style={{ width:'300px'} }>
                                <Todolist
                                    key={todolist.id}
                                    demo={props.demo}
                                    todolist={todolist}
                                    tasks={tasksForTodolist}

                                />
                            </div>
                        </Grid>
                    })
                    }
                </Grid>

            </Container>


        </div>
    );
}