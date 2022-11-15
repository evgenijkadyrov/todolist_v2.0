import {FilterType, TodolistType} from "./App";
import {v1} from "uuid";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolist-reducer";

let todolistId1:string
let todolistId2:string
let startState:Array<TodolistType>

beforeEach(()=>{
     todolistId1 = v1()
     todolistId2 = v1()

     startState = [
        {id: todolistId1, title: 'how', filter: 'all'},
        {id: todolistId2, title: 'ny', filter: 'all'},
    ]
})
test('correct todolist should be removed', () => {

    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistId1))
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

})

test('correct todolist should be add', () => {

    let newTitle = 'new todolist'

    const endState = todolistsReducer(startState, AddTodolistAC(newTitle,todolistId1))
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
    expect(endState[2].filter).toBe('all')
})
test('correct title should be changeded', () => {

    let newTitle = 'new todolist'

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(newTitle, todolistId1))
    expect(endState[0].title).toBe('new todolist')
    expect(endState[1].title).toBe('ny')

})
test('change filter in todolist', () => {

    let newFilter: FilterType = 'active'

    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(newFilter, todolistId1))
    expect(endState[0].filter).toBe('active')
    expect(endState[1].filter).toBe('all')
})