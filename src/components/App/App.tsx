import React, {useCallback, useEffect} from 'react';
import './App.css';
import {TaskResponseType} from "../../api/todolists-api";
import {TodolistsList} from "../features/Todolists/Todolists";
import {Toolbar} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import MenuIcon from "@mui/icons-material/Menu";
import ErrorSnackBar from "../SnackBar";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, AppRootReducer, RootStateType, useAppDispatch} from "../../state/store";
import {inializedTC, RequestStatusType} from "./app-reducer";
import LinearProgress from "@mui/material/LinearProgress";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {Login} from "../Login/Login";
import CircularProgress from "@mui/material/CircularProgress";
import {logoutTC} from "../Login/login-reducer";


import {loginSelectors} from "../Login";
import {appSelectors} from "../App";
type PropsType={
    demo?:boolean
}

export type TasksStateType = {
    [key: string]: Array<TaskResponseType>
}

const App = ({demo=false}:PropsType) => {

    const status = useSelector(appSelectors.selectStatus)
    const isInitialized = useSelector(appSelectors.selectIsInitialized)
    const isLoginOn = useSelector(loginSelectors.selectIsLoginOn)


    const dispatch = useAppDispatch()
    useEffect(()=>{
        if(!demo){
            dispatch(inializedTC())
        }

    },[])
    const logoutHandler=useCallback(()=>{
        dispatch(logoutTC())
    },[])
    if(!isInitialized){
        return <div style={{position:'fixed',width:'100%', top:'30%', textAlign:'center' }}><CircularProgress/></div>
    }
    return (

            <div className="App">
                <ErrorSnackBar/>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="end"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 3}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Todolist
                        </Typography>
                        {isLoginOn && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
                    </Toolbar>
                </AppBar>
                {status === 'loading' && <LinearProgress/>}
                <Routes>
                    <Route path='/' element={<TodolistsList demo={false}/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='*' element={<Navigate to='/404'/>}/>
                    <Route path='/404' element={<h1>404: Page not found</h1>}/>
                </Routes>


            </div>

    );

};

export default App;
