import {TasksStateType} from "../App";
import {TasksType} from "../Todolist";

let initialState: TasksStateType = {}

export const TasksReducer = (state = initialState, action: reduceACType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const currentTodoListTasks = state[action.payload.todolistID]
            const updatedTasks = currentTodoListTasks.filter(t => t.id !== action.payload.taskID)
            return {...state, [action.payload.todolistID]: updatedTasks}
        }
        case "ADD-TASK": {
            const newTask: TasksType = {
                id: action.payload.taskID, title: action.payload.title, isDone: false
            }
            return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
        }
        case "CHANGE-TASK-STATUS": {
            const currentTodoListTasks: TasksType[] = state[action.payload.todolistID]
            const updatedTasks: TasksType[] = currentTodoListTasks.map(t => t.id === action.payload.tasksID ? {
                ...t,
                isDone: action.payload.isDone
            } : t)
            return ({...state, [action.payload.todolistID]: updatedTasks})
        }
        case "ADD-TODOLIST-TASK": {
            return ({
                ...state, [action.payload.newID]: action.payload.newTasks
            })
        }
        case "EDIT-TASK": {
            return ({
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskID ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            })
        }
        default:
            return state
    }
}

type reduceACType = removeTaskACType | addTaskACType | changeTaskACType | editTaskACType | addNewTodolistTaskACType
type  removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            taskID,
            todolistID,
        }
    } as const
}

type  addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistID: string, taskID: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            title,
            todolistID,
            taskID
        }
    } as const
}

type  changeTaskACType = ReturnType<typeof changeTaskAC>
export const changeTaskAC = (tasksID: string, todolistID: string, isDone: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            tasksID,
            todolistID,
            isDone
        }
    } as const
}

type  editTaskACType = ReturnType<typeof editTaskAC>
export const editTaskAC = (todolistID: string, taskID: string, newTitle: string) => {
    return {
        type: "EDIT-TASK",
        payload: {
            todolistID,
            taskID,
            newTitle
        }
    } as const
}

type  addNewTodolistTaskACType = ReturnType<typeof addNewTodolistTaskAC>
export const addNewTodolistTaskAC = (newID: string, newTasks: TasksType[]) => {
    return {
        type: "ADD-TODOLIST-TASK",
        payload: {
            newID,
            newTasks
        }
    } as const
}

export default TasksReducer