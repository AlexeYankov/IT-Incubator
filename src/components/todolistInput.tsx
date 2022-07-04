import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export default TodolistInput;

type TodoListInputType = {
    todoListID: string
    title: string
    addTask: (title: string, todolistID: string) => void
}

function TodolistInput(props: TodoListInputType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const errorInputStyle = error ? {border: "2px solid red", outline: 'none'} : undefined
    const addTask = () => {
        const taskTitle = title.trim()
        if (taskTitle) {
            props.addTask(taskTitle, props.todoListID)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask()
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const taskTitle = e.currentTarget.value.trim()
        setTitle(e.currentTarget.value)
        if (error && taskTitle) setError(false)
        if (!error && !taskTitle) setError(true)
    }
    return (
        <div>
            <input
                style={errorInputStyle}
                value={title}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownAddTask}
            />
            <button onClick={addTask}>+</button>
            {error && <div style={{color: "red", fontWeight: "bold"}}>Title is required!</div>}
        </div>
    );
}

