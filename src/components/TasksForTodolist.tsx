import CheckBox from "./CheckBox";
import TodolistTitle from "./TodolistTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {memo, useCallback} from "react";
import {TasksType} from "../Todolist";

type TaskPropsType = {
    task: TasksType,
    removeTodolistTask: (taskID: string) => void
    editTasksTitle:(newTitle: string)=>void,
    changeTodolistTasksStatus:(taskID: string, eventValue: boolean)=>void,

}

export const Tasks = memo(({
                          task,
                          removeTodolistTask,
                          changeTodolistTasksStatus,
                          editTasksTitle
}:
                          TaskPropsType) => {
    // let dispatch
    // dispatch = useDispatch()
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
    const removeTodolistTaskHandler = useCallback(() => removeTodolistTask(task.id),[removeTodolistTask, task.id])
    const changeTodolistTasksStatus1 = useCallback((taskID: string, eventValue: boolean) => {
        changeTodolistTasksStatus(task.id, eventValue)
    },[changeTodolistTasksStatus, task.id])
    const editTaskTitle1 = useCallback((newTitle: string) => {
        editTasksTitle(newTitle)
    },[editTasksTitle])
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