import React from 'react';
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import TodolistInput from "./components/todolistInput";
import TodolistTitle from "./components/TodolistTitle";
import CheckBox from "./components/CheckBox";
import {AppRootStateType} from "./state/store";

import {FilterValuesType, TasksStateType, TodoListType} from './App';
import './App.css';
import ReducerForTodolists from "./reducers/reducerForTodolists";
import {useSelector} from "react-redux";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodoListType
    task: TasksStateType
    // title: string
    // tasks: TasksType[]
    // filter: FilterValuesType
    // removeTask: (taskID: string, todolistID: string) => void
    // changeFilter: (filter: FilterValuesType, todolistID: string) => void
    // addTask: (title: string, todoListID: string) => void
    // changeTaskStatus: (tasksID: string, todolistID: string, isDone: boolean) => void
    // removeTodolist: (todoListID: string) => void
    // editTodolist: (todolistID: string, newTitle: string) => void
    // editTask: (todolistID: string, taskID: string, newTitle: string) => void
}


const TodoList = ({todolist}: PropsType) => {
    const {id, title, filter} = {...todolist}
    const tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[id])

    const tasksJSXElements = tasks.length
        ? tasks.map(t => {
            const styleForRTaskList = {
                maxWidth: '20px',
                maxHeight: '20px',
                minWidth: '20px',
                minHeight: '20px',
                fontsize: '20px',
                color: 'black',
                marginTop: '10px',
            }
            const removeTask = () => removeTask(t.id, todoListID)
            // const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, props.todoListID, e.currentTarget.checked)
            const callBackHandler = (taskID: string, eventValue: boolean) =>{
                changeTaskStatus(taskID, todoListID, eventValue)
            }
            const taskClasses = t.isDone ? 'is-done' : ''
            return (
                <li key={t.id} className={taskClasses}>
                    <CheckBox callBack={(eventValue)=>callBackHandler(t.id, eventValue)} checked={t.isDone}/>
                    <TodolistTitle title={t.title} callBack={(newTitle: string) => editTaskHandler(t.id, newTitle)}/>
                    <DeleteIcon onClick={removeTask} style={styleForRTaskList} className="removeTasks"/>

                </li>
            )
        })
        : <span>List is empty</span>

    const changeFilter = (filter: FilterValuesType) => {
        return () => changeFilter(filter, todoListID)
    }

    const removeTodolist = () => {
        removeTodolist(todoListID)
    }

    const CallBackHandler = (title: string) => {
        addTask(title, todoListID)
    }

    const editTodolistHandler = (newTitle: string) => {
        editTodolist(todoListID, newTitle)
    }

    const editTaskHandler = (taskID: string, newTitle: string) => {
        editTask(todoListID, taskID, newTitle)
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
    const allBtnClasses = filter === 'all' ? 'contained' : 'outlined'
    const activeBtnClasses = filter === 'active' ? 'contained' : 'outlined'
    const completedBtnClasses = filter === 'completed' ? 'contained' : 'outlined'
    return (
        <div>
            <TodolistTitle title={title} callBack={editTodolistHandler}/>
            <DeleteIcon onClick={removeTodolist} style={styleForRTodoList}/>

            <TodolistInput callBack={CallBackHandler}/>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <Button variant={allBtnClasses} onClick={changeFilter("all")} style={filterAll}>All</Button>
                <Button variant={activeBtnClasses} onClick={changeFilter("active")} style={filterAll}>Active</Button>
                <Button variant={completedBtnClasses} onClick={changeFilter("completed")}
                        style={filterAll}>Completed</Button>
            </div>
        </div>
    )
};

export default TodoList;
