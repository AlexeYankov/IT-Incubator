import CheckBox from "./CheckBox";
import TodolistTitle from "./TodolistTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {memo, useCallback} from "react";
import {TasksType} from "../Todolist";
import {useDispatch} from "react-redux";
import {changeTasksStatusAC, editTaskAC, removeTaskAC} from "../reducers/reducerForTasks";

type TaskPropsType = {
    task: TasksType,
    todolistID: string
}

export const Tasks = memo(({
                          task, todolistID
}:
                          TaskPropsType) => {
    const dispatch = useDispatch()
    console.log('Tasks')
    const taskClasses = task.isDone ? 'is-done' : ''
    const styleForRTaskList = {
        maxWidth: '20px',
        maxHeight: '20px',
        minWidth: '20px',
        minHeight: '20px',
        fontsize: '20px',
        color: 'black',
        marginTop: '10px',
    }
    const removeTodolistTaskHandler = useCallback(() => dispatch(removeTaskAC(todolistID, task.id)),[dispatch, todolistID, task.id])
    const changeTodolistTasksStatus1 = useCallback((taskID: string, eventValue: boolean) => {
        dispatch(changeTasksStatusAC(todolistID, task.id, eventValue))
    },[dispatch, todolistID, task.id])
    const editTaskTitle1 = useCallback((newTitle: string) => {
        dispatch(editTaskAC(todolistID, task.id,newTitle))
    },[dispatch, todolistID, task.id])
    return (
        <li key={task.id} className={taskClasses}>
            <CheckBox
                callBack={(eventValue) => changeTodolistTasksStatus1(task.id, eventValue)}
                checked={task.isDone}/>
            <TodolistTitle
                title={task.title}
                setTodolistTaskTitle={(newTitle) => editTaskTitle1(newTitle)}/>
            <DeleteIcon
                onClick={removeTodolistTaskHandler}
                style={styleForRTaskList}
                className="removeTasks"/>
        </li>
    )
})