import React, {useState} from 'react';
import './App.css';
import TodoList, {TasksType} from './Todolist';
import {v1} from "uuid";
import TodolistInput from "./components/todolistInput";

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksStateType = {
    [todoListID: string]: TasksType[]
}

function App() {
    const todolistID_1 = v1()
    const todolistID_2 = v1()
    const todolistID_3 = v1()
    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todolistID_1, title: "WTB", filter: 'all'},
        {id: todolistID_2, title: "WTS", filter: 'all'},
        {id: todolistID_3, title: "WTR", filter: 'all'}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID_1]: [
            {id: v1(), title: "HTML+CSS", isDone: true},
            {id: v1(), title: "RSS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
            {id: v1(), title: "GG", isDone: true},
            {id: v1(), title: "RR", isDone: false}
        ],
        [todolistID_2]: [
            {id: v1(), title: "HTML+CSS", isDone: true},
            {id: v1(), title: "RSS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
            {id: v1(), title: "GG", isDone: true},
            {id: v1(), title: "RR", isDone: false}
        ],
        [todolistID_3]: [
            {id: v1(), title: "HTML+CSS", isDone: true},
            {id: v1(), title: "RSS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
            {id: v1(), title: "GG", isDone: true},
            {id: v1(), title: "RR", isDone: false}
        ]
    })
    const [filter, setFilter] = useState<FilterValuesType>("all")

    const addTask = (title: string, todolistID: string) => {
        const newTask: TasksType = {
            id: v1(), title: title, isDone: false
        }
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }
    const removeTask = (taskID: string, todolistID: string) => {
        const currentTodoListTasks = tasks[todolistID]
        const updatedTasks = currentTodoListTasks.filter(t => t.id !== taskID)
        tasks[todolistID] = updatedTasks
        setTasks({...tasks})
    }
    const changeTaskStatus = (tasksID: string, isDone: boolean, todolistID: string) => {
        const currentTodoListTasks: TasksType[] = tasks[todolistID]
        const updatedTasks: TasksType[] = currentTodoListTasks.map(t => t.id === tasksID ? {...t, isDone} : t)
        tasks[todolistID] = updatedTasks

        setTasks({...tasks})
    }
    const changeTodolistFilter = (newValueFilter: FilterValuesType, todolistID: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todolistID ? {...tl, filter: newValueFilter} : tl))
    }
    const removeTodolist = (todolistID: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
    }
    const getTasksForRender = (todoList: TodoListType) => {
        let tasksForRender = tasks[todoList.id]
        if (todoList.filter === "active") {
            return tasks[todoList.id].filter(t => t.isDone === false)
        }
        if (todoList.filter === "completed") {
            return tasks[todoList.id].filter(t => t.isDone === true)
        }
        return tasksForRender;
    }
    const editTodolist = (todolistID: string, newTitle: string) => {
        setTodoLists(todoLists.map(el=>el.id===todolistID ? {...el, title: newTitle} : el))
    }
    const editTask = (todolistID: string, taskID: string, newTitle: string) => {
        setTasks({...tasks, [todolistID]:tasks[todolistID].map(el=>el.id===taskID ? {...el, title: newTitle} : el)})
    }

    const todoListsComponents = todoLists.map(tl => {
        return (
            todoLists.length
                ?
                <TodoList
                    key={tl.id}
                    todoListID={tl.id}
                    title={tl.title}
                    tasks={getTasksForRender(tl)}
                    filter={tl.filter}
                    removeTask={removeTask}
                    changeTaskStatus={changeTaskStatus}
                    changeFilter={changeTodolistFilter}
                    addTask={addTask}
                    removeTodolist={removeTodolist}
                    editTodolist={editTodolist}
                    editTask={editTask}
                />
                : <span>Create your first Todolist!</span>
        )
    })
    const addTodolist = (newTitle: string) => {
        const newID = v1()
        const newTodolist: TodoListType = {id: newID, title: newTitle, filter: 'all'}
        setTodoLists([newTodolist, ...todoLists])
        setTasks({
            ...tasks, [newID]: [{id: v1(), title: "HTML+CSS", isDone: true},
                {id: v1(), title: "RSS", isDone: true},
                {id: v1(), title: "TS", isDone: false},
                {id: v1(), title: "GG", isDone: true},
                {id: v1(), title: "RR", isDone: false}]
        })
    }
    return (
        <div className="App">
            <TodolistInput callBack={addTodolist}/>
            {todoListsComponents}
        </div>
    );
}

export default App;
