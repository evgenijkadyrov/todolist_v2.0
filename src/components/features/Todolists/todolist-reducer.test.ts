import {v1} from "uuid";
import {
    TodolistDomainType,
    todolistsReducer,

    FilterType,
} from "./todolist-reducer";
import {todolistsActions} from "./index";

let todolistId1:string
let todolistId2:string
let startState:Array<TodolistDomainType>

beforeEach(()=>{
     todolistId1 = v1()
     todolistId2 = v1()

     startState = [
        {id: todolistId1, title: 'how', filter: 'all', order:0, addedDate:'', entityStatus:'idle'},
        {id: todolistId2, title: 'ny', filter: 'all', order:0, addedDate:'', entityStatus:'idle'},
    ]
})
test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, todolistsActions.removeTodolist.fulfilled({id:todolistId1},'required',{id:todolistId1}))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

})
//
test('correct todolist should be add', () => {

    let newTitle = 'new todolist'

    const todolist = {id: '1', title:newTitle ,  order:0, addedDate:'',filter: 'all', entityStatus: 'idle'};
    const endState = todolistsReducer(startState, todolistsActions.addTodolist.fulfilled({todolist},'required',{title:newTitle}))
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTitle)
    expect(endState[0].filter).toBe('all')
})
test('correct title should be changeded', () => {

    let newTitle = 'new todolist'

    const endState = todolistsReducer(startState, todolistsActions.changeTodolistTitle.fulfilled({title:newTitle, id:todolistId1},'required',{title:newTitle, id:todolistId1}))
    expect(endState[0].title).toBe('new todolist')
    expect(endState[1].title).toBe('ny')

})
test('change filter in todolist', () => {

    let newFilter: FilterType = 'active'

    const endState = todolistsReducer(startState, todolistsActions.changeTodolistFilter({newFilter, id:todolistId1}))
    expect(endState[0].filter).toBe('active')
    expect(endState[1].filter).toBe('all')
})
test ('entityStatus should be changed',()=>{

    const endState=todolistsReducer(startState,todolistsActions.changeTodolistEntityStatus({id:todolistId1,entityStatus:'loading'}))
    expect(endState[0].entityStatus).toBe('loading')
    expect(endState[1].entityStatus).toBe('idle')
})
test ('todolists should be adeed',()=>{
    const state:Array<TodolistDomainType>=[]
    const todolists= [{id: todolistId1, title: 'how', filter: 'all', order:0, addedDate:'', entityStatus:'idle'}]
    const endState=todolistsReducer(state,todolistsActions.fetchTodolists.fulfilled({todolists},'required'))
    expect(endState.length).toBe(1)
})