import {v1} from "uuid";
import TodolistReducer from "../reducers/reducerForTodolists";
import TasksReducer from "../reducers/reducerForTasks";
import { TasksStateType, TodoListType} from "../App";


test.skip('user reducer should remove Todolist',()=>{
    const a1 = v1()
    const a2 = v1()
    const a3 = v1()
    const removeTodolistID = a1
    const startState: TodoListType[] = [
        {id: a1, title: "WTB", filter: 'all'},
        {id: a2, title: "WTB", filter: 'all'},
        {id: a3, title: "WTB", filter: 'all'},
    ]
    const endState = TodolistReducer(startState,{type:'REMOVE-TODOLIST', payload: {todolistID: removeTodolistID}})

    expect(endState.length).toBe(2)
})

test.skip('user reducer should change-filter-todolist Todolist', ()=>{
    const a1 = v1()
    const a2 = v1()
    const a3 = v1()
    const todolistIDtest = a1
    const newValueFilter1 = 'active'
    const startStateTodolists: TodoListType[] = [
        {id: a1, title: "WTB", filter: 'all'},
        {id: a2, title: "WTB", filter: 'active'},
        {id: a3, title: "WTB", filter: 'active'},
    ]

    const endState = TodolistReducer(startStateTodolists,{type:'CHANGE-FILTER-TODOLIST', payload: {newValueFilter: newValueFilter1, todolistID: todolistIDtest}})

    expect(endState[0].filter).toBe('active')
})

test.skip ('user reducer should edit Todolist name',()=>{
    const a1 = v1()
    const a2 = v1()
    const a3 = v1()
    const todolistIDtest = a2
    const newTitleTest = 'Milk'
    const startStateTodolists: TodoListType[] = [
        {id: a1, title: "WTB", filter: 'all'},
        {id: a2, title: "WTs", filter: 'active'},
        {id: a3, title: "WTB", filter: 'active'},
    ]
    const endState = TodolistReducer(startStateTodolists,{type:'EDIT-TODOLIST', payload: {todolistID: todolistIDtest, newTitle: newTitleTest}})

    expect(endState[1].title).toBe('Milk')

})

test.skip ('user reducer should add new Todolist',()=>{
    const a1 = v1()
    const a2 = v1()
    const a3 = v1()
    const a4 = v1()
    const todolistIDtest = a4
    const newTitleTest = 'Milk'
    const startStateTodolists: TodoListType[] = [
        {id: a1, title: "WTB", filter: 'all'},
        {id: a2, title: "WTs", filter: 'active'},
        {id: a3, title: "WTB", filter: 'active'},
    ]
    const endState = TodolistReducer(startStateTodolists,{type:'ADD-TODOLIST', payload: {newTitle: newTitleTest, newID: todolistIDtest}})

    expect(endState.length).toBe(4)

})

test.skip ('user reducer should remove Task to Todolist',()=>{

    const a1 = v1()
    const a2 = v1()
    const a3 = v1()
    const todolistIDtest = a3
    const newID = '13'
    const newID1 = '14'
    const newID2 = '15'
    const startStateTodolists: TasksStateType = {
        [a1]: [
        {id: v1(), title: "HTML+CSS", isDone: true},
        {id: v1(), title: "RSS", isDone: true},
        {id: v1(), title: "TS", isDone: false},
    ],
        [a2]: [
            {id: v1(), title: "HTML+CSS", isDone: true},
            {id: v1(), title: "RSS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
        ],
        [a3]: [
            {id: newID, title: "HTML+CSS", isDone: true},
            {id: newID1, title: "RSS", isDone: true},
            {id: newID2, title: "TS", isDone: false},
        ]

    }
    const endState = TasksReducer(startStateTodolists,{type:'REMOVE-TASK', payload: {taskID: newID, todolistID: todolistIDtest}})

    expect(endState[todolistIDtest].length).toBe(2)
    expect(endState[todolistIDtest][0].id).toBe(newID1)

})

test.skip ('user reducer should Add Task to Todolist',()=>{
    const a1 = v1()
    const a2 = v1()
    const a3 = v1()
    const todolistIDtest = a3
    const newID = '13'
    const newID1 = '14'
    const newID2 = '15'
    const newID3 = '16'
    const todoNewTitle = 'Milk'
    const startStateTodolists: TasksStateType = {
        [a1]: [
        {id: v1(), title: "HTML+CSS", isDone: true},
        {id: v1(), title: "RSS", isDone: true},
        {id: v1(), title: "TS", isDone: false},
    ],
        [a2]: [
            {id: v1(), title: "HTML+CSS", isDone: true},
            {id: v1(), title: "RSS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
        ],
        [a3]: [
            {id: newID, title: "HTML+CSS", isDone: true},
            {id: newID1, title: "RSS", isDone: true},
            {id: newID2, title: "TS", isDone: false},
        ]

    }
    const endState = TasksReducer(startStateTodolists,{type:'ADD-TASK', payload: {title: todoNewTitle, todolistID: todolistIDtest,taskID: newID3}})

    expect(endState[todolistIDtest].length).toBe(4)
    expect(endState[todolistIDtest][0].id).toBe(newID3)
})

test.skip ('user reducer should change Task status to Todolist',()=>{
    const a1 = v1()
    const a2 = v1()
    const a3 = v1()
    const todolistIDtest = a3
    const newID = '13'
    const newID1 = '14'
    const newID2 = '15'
    const chengeCheck = true
    const startStateTodolists: TasksStateType = {
        [a1]: [
        {id: v1(), title: "HTML+CSS", isDone: true},
        {id: v1(), title: "RSS", isDone: true},
        {id: v1(), title: "TS", isDone: false},
    ],
        [a2]: [
            {id: v1(), title: "HTML+CSS", isDone: true},
            {id: v1(), title: "RSS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
        ],
        [a3]: [
            {id: newID, title: "HTML+CSS", isDone: false},
            {id: newID1, title: "RSS", isDone: true},
            {id: newID2, title: "TS", isDone: false},
        ]

    }
    const endState = TasksReducer(startStateTodolists,{type:'CHANGE-TASK-STATUS', payload: {tasksID: newID, todolistID: todolistIDtest, isDone: chengeCheck}})

    expect(endState[todolistIDtest][0].isDone).toBe(true)
})

test ('user reducer should Add new Todolist to Todolist',()=>{
    const a1 = v1()
    const a2 = v1()
    const a3 = v1()
    const newID = '13'
    const newID1 = '14'
    const newID2 = '15'
    const newID3 = '18'
    const testTasks = [
        {id: v1(), title: "HTML+CSS", isDone: true},
        {id: v1(), title: "tts", isDone: true},
        {id: v1(), title: "TS", isDone: false},
    ]
    const startStateTodolists: TasksStateType = {
        [a1]: [
        {id: v1(), title: "HTML+CSS", isDone: true},
        {id: v1(), title: "RSS", isDone: true},
        {id: v1(), title: "TS", isDone: false},
    ],
        [a2]: [
            {id: v1(), title: "HTML+CSS", isDone: true},
            {id: v1(), title: "RSS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
        ],
        [a3]: [
            {id: newID, title: "HTML+CSS", isDone: false},
            {id: newID1, title: "RSS", isDone: true},
            {id: newID2, title: "TS", isDone: false},
        ]

    }
    const endState = TasksReducer(startStateTodolists,{type:'ADD-TODOLIST-TASK', payload: {newID: newID3, newTasks: testTasks}})

    expect(endState[newID3][1].title).toBe('tts')
})

test ('user reducer should edit Task title to Todolist',()=>{
    const a1 = v1()
    const a2 = v1()
    const a3 = v1()
    const todolistIDtest = a3
    const newID = '13'
    const newID1 = '14'
    const newID2 = '15'
    const chengeTitle = 'burger'
    const startStateTodolists: TasksStateType = {
        [a1]: [
            {id: v1(), title: "HTML+CSS", isDone: true},
            {id: v1(), title: "RSS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
        ],
        [a2]: [
            {id: v1(), title: "HTML+CSS", isDone: true},
            {id: v1(), title: "RSS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
        ],
        [a3]: [
            {id: newID, title: "HTML+CSS", isDone: false},
            {id: newID1, title: "RSS", isDone: true},
            {id: newID2, title: "TS", isDone: false},
        ]

    }
    const endState = TasksReducer(startStateTodolists,{type:'EDIT-TASK', payload: {todolistID: todolistIDtest, taskID: newID,  newTitle: chengeTitle}})

    expect(endState[todolistIDtest][0].title).toBe('burger')
})






