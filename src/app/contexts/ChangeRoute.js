import { createContext,useContext } from "react";

export const ChangeRoute = createContext({
    Edit : false,
    Message : false,
})

export const useTodo = () => {
    return useContext(TodoContext)
}

export const TodoProvider = TodoContext.Provider