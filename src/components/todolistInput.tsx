import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

export default TodolistInput;

type TodoListInputType = {
    callBack: (title: string) => void
}

function TodolistInput(props: TodoListInputType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const addTask = () => {
        const taskTitle = title.trim()
        if (taskTitle) {
            props.callBack(taskTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask()
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const taskTitle = e.currentTarget.value.trim()
        setTitle(taskTitle)
        if (error && taskTitle) setError(false)
        if (!error && !taskTitle) setError(true)
    }
    const addTaskStyle = {
        maxWidth: '40px',
        maxHeight: '40px',
        minWidth: '40px',
        minHeight: '40px',
        fontsize: '20px',
        color: 'white',
        backgroundColor: 'blue',
        borderRadius: '5px',
        marginLeft: '2px',
    }
    const errorMessage = error && 'Title is required!'
    return (
        <div>
            <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                value={title}
                label={errorMessage}
                error={error}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddTask}
                className={error ? "error" : ""}
                />

            <Button onClick={addTask} style={addTaskStyle}>+</Button>
        </div>
    );
}

