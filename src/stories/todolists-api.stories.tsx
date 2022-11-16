import React, {useEffect, useState} from 'react'
import axios from 'axios'

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
        axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
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
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', payload, settings)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.delete('https://social-network.samuraijs.com/api/1.1/todo-lists/39a67752-bab4-4da5-a561-b476e5ee7daa', settings)
            .then(res => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.put('https://social-network.samuraijs.com/api/1.1/todo-lists/8c134c50-e397-4092-bbbd-10a0c0db7d8b', {title: 'Changed title'}, settings)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

