import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import './App.css';
import {FilterValuesType} from './App';
import TodolistInput from "./components/todolistInput";
import {Button} from "@mui/material";
import TodolistTitle from "./components/TodolistTitle";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    todoListID: string
    title: string
    tasks: TasksType[]
    filter: FilterValuesType
    removeTask: (taskID: string, todolistID: string) => void
    changeFilter: (filter: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (tasksID: string, isDone: boolean, todolistID: string) => void
    removeTodolist: (todoListID: string) => void
    editTodolist: (todolistID: string, newTitle: string) => void
    editTask: (todolistID: string, taskID: string, newTitle: string) => void
}


const TodoList = (props: TodoListType) => {
    const tasksJSXElements = props.tasks.length
        ? props.tasks.map(t => {
            const removeTask = () => props.removeTask(t.id, props.todoListID)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListID)
            const taskClasses = t.isDone ? 'is-done' : ''
            return (
                <li key={t.id} className={taskClasses}>
                    <input onChange={changeTaskStatus} type="checkbox" checked={t.isDone}/>
                    <TodolistTitle title={t.title} callBack={(newTitle:string)=>editTaskHandler(t.id, newTitle)}/>
                    <button onClick={removeTask}>x</button>
                </li>
            )
        })
        : <span>List is empty</span>
    const changeFilter = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter, props.todoListID)
    }
    const allBtnClasses = props.filter === 'all' ? 'active-filter' : ''
    const activeBtnClasses = props.filter === 'active' ? 'active-filter' : ''
    const completedBtnClasses = props.filter === 'completed' ? 'active-filter' : ''
    const removeTodolist = () => {
        props.removeTodolist(props.todoListID)
    }
    const CallBackHandler = (title: string) => {
        props.addTask(title, props.todoListID)
    }
    const editTodolistHandler=(newTitle: string)=>{
        props.editTodolist(props.todoListID, newTitle)
    }
    const editTaskHandler = (taskID: string, newTitle: string) => {
        props.editTask(props.todoListID, taskID, newTitle)
    }
    return (
        <div>
            <TodolistTitle title={props.title} callBack={editTodolistHandler}/>
            <Button onClick={removeTodolist} variant="contained">x</Button>
            <TodolistInput callBack={CallBackHandler}/>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>

                <button className={allBtnClasses} onClick={changeFilter("all")}>All</button>
                <button className={activeBtnClasses} onClick={changeFilter("active")}>Active</button>
                <button className={completedBtnClasses} onClick={changeFilter("completed")}>Completed</button>
            </div>
        </div>
    )
};

export default TodoList;
