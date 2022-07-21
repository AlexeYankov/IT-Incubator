import {FilterValuesType, TodoListType} from "../App";

const TodolistReducer = (state: TodoListType[], action:reduceTodolistACType): TodoListType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            const currentTodolist = state.filter(tl => tl.id !== action.payload.todolistID)
            return currentTodolist
        }
        case "CHANGE-FILTER-TODOLIST": {
            const currentTodolist = state.map(tl => tl.id === action.payload.todolistID ? {...tl, filter: action.payload.newValueFilter} : tl)
            return currentTodolist
        }
        case "EDIT-TODOLIST": {
            const currentTodolist = state.map(el => el.id === action.payload.todolistID ? {...el, title: action.payload.newTitle} : el)
            return currentTodolist
        }
        case "ADD-TODOLIST": {
            const newTodolist: TodoListType = {id: action.payload.newID, title: action.payload.newTitle, filter: 'all'}
            return [newTodolist, ...state]
        }
    }
}

type reduceTodolistACType = removeTaskACType | changeFilterTaskACType | editTodolistTaskACType | addTodolistTaskACType
type  removeTaskACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string)=>{
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistID,
        }
    } as const
}

type  changeFilterTaskACType = ReturnType<typeof changeFilterTodolistAC>
export const changeFilterTodolistAC = (newValueFilter: FilterValuesType ,todolistID: string)=>{
    return {
        type: "CHANGE-FILTER-TODOLIST",
        payload: {
            newValueFilter,
            todolistID
        }
    } as const
}

type  editTodolistTaskACType = ReturnType<typeof editTodolistTaskAC>
export const editTodolistTaskAC = (todolistID: string, newTitle: string)=>{
    return {
        type: "EDIT-TODOLIST",
        payload: {
            todolistID,
            newTitle,
        }
    } as const
}

type  addTodolistTaskACType = ReturnType<typeof addTodolistTaskAC>
export const addTodolistTaskAC = (newTitle: string, newID: string)=>{
    return {
        type: "ADD-TODOLIST",
        payload: {
            newTitle,
            newID
        }
    } as const
}

export default TodolistReducer