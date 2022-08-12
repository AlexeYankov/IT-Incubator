import React, {memo, useCallback} from 'react';
import {Button} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import TodolistInput from "./components/todolistInput";
import TodolistTitle from "./components/TodolistTitle";
import {AppRootStateType} from "./state/store";

import {TodoListType} from './App';
import './App.css';
import {
    changeFilterTodolistAC,
    editTodolistAC,
    removeTodolistAC
} from "./reducers/reducerForTodolists";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTasksStatusAC, editTaskAC, removeTaskAC} from "./reducers/reducerForTasks";
import {Tasks} from "./components/TasksForTodolist";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodoListType
}


export const TodoList = memo(({todolist}: PropsType) => {
    console.log('Todolist')
    const {id, title, filter} = {...todolist}
    let tasks1 = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[id])

    const dispatch = useDispatch()

    let tasksForTodolist = tasks1

    if (filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
    }
    if (filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
    }

    let tasksForRender = tasksForTodolist.map(t => {

        const removeTodolistTask = () => dispatch(removeTaskAC(id, t.id))
        const changeTodolistTaskStatus = (taskID: string, eventValue: boolean) => {
            dispatch(changeTasksStatusAC(id, t.id, eventValue))
        }
        const editTaskTitle2 = (newTitle: string) => {
            dispatch(editTaskAC(id, t.id, newTitle))
        }

        return (
            <Tasks
                key={t.id}
                task={t}
                removeTodolistTask={removeTodolistTask}
                changeTodolistTasksStatus={changeTodolistTaskStatus}
                editTasksTitle={editTaskTitle2}
            />
            // <li key={t.id} className={taskClasses}>
            //     <CheckBox
            //         callBack={(eventValue) => changeTodolistTaskStatus(t.id, eventValue)}
            //         checked={t.isDone}/>
            //     <TodolistTitle
            //         title={t.title}
            //         setTodolistTaskTitle={() => editTaskTitle(t.title)}/>
            //     <DeleteIcon
            //         onClick={removeTodolistTask}
            //         style={styleForRTaskList}
            //         className="removeTasks"/>
            // </li>
        )
    })

    const changeFilter = useCallback((filter: string) => {
        dispatch(changeFilterTodolistAC(id, filter))
    }, [dispatch, id])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(id, title))
    },[dispatch, id])

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(id))
    }, [dispatch, id])

    const editTodolistTitleHandler = useCallback((newTitle: string) => {
        dispatch(editTodolistAC(id, newTitle))
    }, [dispatch, id])

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

    const memouizedButtonAll = useCallback(() => {
        changeFilter("all")
    }, [changeFilter])
    const memouizedButtonActive = useCallback(() => {
        changeFilter("active")
    }, [changeFilter])
    const memouizedButtonCompleted = useCallback(() => {
        changeFilter("completed")
    }, [changeFilter])

    const allBtnClasses = filter === 'all' ? 'contained' : 'outlined'
    const activeBtnClasses = filter === 'active' ? 'contained' : 'outlined'
    const completedBtnClasses = filter === 'completed' ? 'contained' : 'outlined'
    return (
        <div>
            <TodolistTitle title={title} setTodolistTaskTitle={editTodolistTitleHandler}/>
            <DeleteIcon onClick={removeTodolist} style={styleForRTodoList}/>

            <TodolistInput addNewTodolist={addTask}/>
            <ul>
                {tasksForRender}
            </ul>
            <div>
                <Button variant={allBtnClasses} onClick={memouizedButtonAll} style={filterAll}>All</Button>
                <Button variant={activeBtnClasses} onClick={memouizedButtonActive}
                        style={filterAll}>Active</Button>
                <Button variant={completedBtnClasses} onClick={memouizedButtonCompleted}
                        style={filterAll}>Completed</Button>
            </div>
        </div>
    )
})

export default TodoList;
