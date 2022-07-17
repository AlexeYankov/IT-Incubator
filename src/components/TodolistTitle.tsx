import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@mui/material";

type TodolistTitleType = {
    title: string
    callBack: (changeTitle: string) => void
}

const TodolistTitle = (props: TodolistTitleType) => {
    const [edit, setEdit] = useState(false)
    let [newTitle, setNewTitle] = useState(props.title)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const EditTitleHandler = () => {
        setEdit(!edit)
        addTask()
    }
    const addTask = () => {
        props.callBack(newTitle);
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTask()
    return (
        edit
            ?<TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
                onChange={onChangeHandler}
                autoFocus type="text"
                value={newTitle}
                onBlur={EditTitleHandler}
                onKeyDown={onKeyDownAddTask}
            />
            : <span onDoubleClick={EditTitleHandler}>{props.title}</span>

    );
};

export default TodolistTitle;
