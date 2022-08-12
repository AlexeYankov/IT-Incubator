import {Grid, Paper} from "@mui/material";
import TodoList, {TasksType} from "../Todolist";
import React, {memo} from "react";
import {TodoListType} from "../App";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";

type PropsType = {
    id: string
    todolist: TodoListType
}

export const GridComponents = memo(({todolist}: PropsType) => {
    const {id} = {...todolist}
    let tasks1 = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[id])
    return (
        <Grid item key={id}>
            <Paper style={{padding: '10px'}}>
                <TodoList
                    key={id}
                    todolist={todolist}
                />
            </Paper>
        </Grid>
    )
})

export default GridComponents