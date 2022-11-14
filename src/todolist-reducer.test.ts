
import {FilterType, TodolistType} from "./App";
import {v1} from "uuid";
import {todolistsReducer} from "./todolist-reducer";

test('correct todolist should be removed',()=>{
    let todolistId1=v1()
    let todolistId2=v1()

    const startState:Array<TodolistType>=[
        {id:todolistId1, title:'how', filter:'all'},
        {id:todolistId2, title:'how', filter:'all'},
    ]
    const endState= todolistsReducer(startState, {type:"REMOVE-TODOLIST", id:todolistId1})
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

})

test('correct todolist should be add',()=>{
    let todolistId1=v1()
    let todolistId2=v1()

    let newTitle='new todolist'
    const startState:Array<TodolistType>=[
        {id:todolistId1, title:'how', filter:'all'},
        {id:todolistId2, title:'how', filter:'all'},
    ]
    const endState=todolistsReducer(startState,{
        type:"ADD-TODOLIST",
        title:newTitle
    })
    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTitle)
    expect(endState[2].filter).toBe('all')
})
test ('correct title should be changeded',()=>{
    let todolistId1=v1()
    let todolistId2=v1()

    let newTitle='new todolist'
    const startState:Array<TodolistType>=[
        {id:todolistId1, title:'how', filter:'all'},
        {id:todolistId2, title:'ny', filter:'all'},
    ]
    const endState=todolistsReducer(startState, {type:"CHANGE-TODOLIST-TITLE",title:newTitle, id:todolistId1})
    expect(endState[0].title).toBe('new todolist')
    expect(endState[1].title).toBe('ny')

})
test('change filter in todolist',()=>{
    let todolistId1=v1()
    let todolistId2=v1()

    let newFilter:FilterType='active'
    const startState:Array<TodolistType>=[
        {id:todolistId1, title:'how', filter:'all'},
        {id:todolistId2, title:'ny', filter:'all'},
    ]
    const endState=todolistsReducer(startState,{
        type:"CHANGE-TODOLIST-FILTER",
        id:todolistId1,
        newFilter:newFilter
    })
    expect(endState[0].filter).toBe('active')
    expect(endState[1].filter).toBe('all')
})