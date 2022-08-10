import {TodoListType} from "../App";

let initialState: TodoListType[] = []

export const todolistReducer = (state = initialState, action: reduceTodolistACType): TodoListType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            const currentTodolist = state.filter(tl => tl.id !== action.payload.todolistID)
            return currentTodolist
        }
        case "CHANGE-FILTER-TODOLIST": {
            const currentTodolist = state.map(tl => tl.id === action.payload.todolistID ? {
                ...tl,
                filter: action.payload.newValueFilter
            } : tl)
            return currentTodolist
        }
        case "EDIT-TODOLIST": {
            const currentTodolist = state.map(el => el.id === action.payload.todolistID ? {
                ...el,
                title: action.payload.newTitle
            } : el)
            return currentTodolist
        }
        case "ADD-TODOLIST": {
            const newTodolist: TodoListType = {id: action.payload.newID, title: action.payload.newTitle, filter: 'all'}

            return [newTodolist, ...state]
        }
        default:
            return state
    }
}

type reduceTodolistACType = removeTodolistACType | changeFilterACType | editTodolistACType | addTodolistACType
type  removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todolistID,
        }
    } as const
}

type  changeFilterACType = ReturnType<typeof changeFilterTodolistAC>
export const changeFilterTodolistAC = (todolistID: string, newValueFilter: string) => {
    return {
        type: "CHANGE-FILTER-TODOLIST",
        payload: {
            todolistID,
            newValueFilter,
        }
    } as const
}

type  editTodolistACType = ReturnType<typeof editTodolistAC>
export const editTodolistAC = (todolistID: string, newTitle: string) => {
    return {
        type: "EDIT-TODOLIST",
        payload: {
            todolistID,
            newTitle,
        }
    } as const
}

type  addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTitle: string, newID: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            newTitle,
            newID
        }
    } as const
}

export default todolistReducer