import axios from "axios";
const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'fae13881-e951-4f04-94b2-31eb83e53019'
    }
}
export const todolistsAPI={
    getTodolists(){
        const promise= axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return promise
    },
    createTodolist(title:string){

        const promise= axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title:title}, settings)
        return promise
    },
    deleteTodolist(id:string){

        return  axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
    },
    updateTodolistTitle(id:string,title:string){

        return  axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title: title}, settings)
    }
}