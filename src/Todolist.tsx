import React, {useState, KeyboardEvent, ChangeEvent, useReducer} from 'react';
import './App.css';
import {FilterValuesType} from './App';
import TodolistInput from "./components/todolistInput";
import {Button, Checkbox} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
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
    changeTaskStatus: (tasksID: string, todolistID: string, isDone: boolean) => void
    removeTodolist: (todoListID: string) => void
    editTodolist: (todolistID: string, newTitle: string) => void
    editTask: (todolistID: string, taskID: string, newTitle: string) => void
}


const TodoList = (props: TodoListType) => {
    const tasksJSXElements = props.tasks.length
        ? props.tasks.map(t => {
            const styleForRTaskList = {
                maxWidth: '20px',
                maxHeight: '20px',
                minWidth: '20px',
                minHeight: '20px',
                fontsize: '20px',
                color: 'black',
                marginTop: '10px',
            }
            const removeTask = () => props.removeTask(t.id, props.todoListID)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, props.todoListID, e.currentTarget.checked)
            const taskClasses = t.isDone ? 'is-done' : ''
            return (
                <li key={t.id} className={taskClasses}>
                    <Checkbox onChange={changeTaskStatus} checked={t.isDone} defaultChecked/>
                    <TodolistTitle title={t.title} callBack={(newTitle:string)=>editTaskHandler(t.id, newTitle)}/>
                    <DeleteIcon onClick={removeTask} style={styleForRTaskList} className="removeTasks"/>

                </li>
            )
        })
        : <span>List is empty</span>
    const changeFilter = (filter: FilterValuesType) => {
        return () => props.changeFilter(filter, props.todoListID)
    }
    const allBtnClasses = props.filter === 'all' ? 'contained' : 'outlined'
    const activeBtnClasses = props.filter === 'active' ? 'contained' : 'outlined'
    const completedBtnClasses = props.filter === 'completed' ? 'contained' : 'outlined'
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

    const styleForRTodoList = {
        maxWidth: '20px',
        maxHeight: '20px',
        minWidth: '20px',
        minHeight: '20px',
        fontsize: '20px',
        color: 'black',
        marginTop: '15px',
    }
    const filterAll = {
        fontsize: '20px',
        color: 'black',
        marginLeft: '10px',
    }
    return (
        <div>
            <TodolistTitle title={props.title} callBack={editTodolistHandler}/>
            <DeleteIcon onClick={removeTodolist} style={styleForRTodoList}/>

            <TodolistInput callBack={CallBackHandler}/>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <Button variant={allBtnClasses} onClick={changeFilter("all")} style={filterAll}>All</Button>
                <Button variant={activeBtnClasses} onClick={changeFilter("active")} style={filterAll}>Active</Button>
                <Button variant={completedBtnClasses} onClick={changeFilter("completed")} style={filterAll}>Completed</Button>
            </div>
        </div>
    )
};

export default TodoList;
