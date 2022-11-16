import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'fae13881-e951-4f04-94b2-31eb83e53019'
    }
}
export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsAPI.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const payload = {title: 'Yauhen,we are hsppy to see you'}
    useEffect(() => {

        todolistsAPI.createTodolist('Yauhen,we are hsppy to see you')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'f96a13b9-40e0-469b-a2ba-b3be388bef3c'
        todolistsAPI.deleteTodolist(todolistId)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'f9229cae-ba1e-4094-821b-cc4535080580'
        todolistsAPI.updateTodolistTitle(todolistId, 'title change')
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState]=useState<any>(null)
    useEffect(()=>{
        const todolistId='b9db3d45-7bc6-40fd-b2c2-c55760601532'
        todolistsAPI.getTasks(todolistId)
            .then(res=>setState(res.data))
    },[])
    return <div>{JSON.stringify(state)}</div>
}
// export const DeleteTask = () => {
//     const [state, setState]=useState<any>(null)
//     useEffect(() => {
//         const todolistId='b9db3d45-7bc6-40fd-b2c2-c55760601532'
//         const taskId='6887f017-cf45-4b10-8ea6-80a0c16d33e4'
//         todolistsAPI.deleteTask(todolistId,taskId)
//             .then(res=>setState(res.data))
//
//     },[])
//     return <div>{JSON.stringify(state)}</div>
// }
export const DeleteTask = () => {
    const [state, setState]=useState<any>(null)
    const [todolistId, setTodolistId]=useState<any>('')
    const [taskId, setTaskId]=useState<any>('')

    const onClickHandler = () =>{
        todolistsAPI.deleteTask(todolistId,taskId)
            .then(res=>setState(res.data))
    }
    return <div>
         <div>{JSON.stringify(state)}</div>
        <input placeholder={'todolistId'} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={'taskId'} value={taskId} onChange={(e)=>{setTaskId(e.currentTarget.value)}} />
        <button onClick={onClickHandler}>del</button>
    </div>
}


export const CreateTask = () => {
    const [state,setState]=useState<any>(null)
    useEffect(()=>{
        const todolistId='b9db3d45-7bc6-40fd-b2c2-c55760601532'
        todolistsAPI.createTask(todolistId,'new task created')
            .then(res=>setState(res.data))
    },[])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTask = () => {
    const [state,setState]=useState<any>(null)
    useEffect(()=>{
        const todolistId='b9db3d45-7bc6-40fd-b2c2-c55760601532'
        const taskId='f4727a03-a294-4856-88f3-78ea9447df33'
        todolistsAPI.updateTask(todolistId,taskId,'title rename')
            .then(res=>setState(res.data))
    },[])
    return <div>{JSON.stringify(state)}</div>
}
