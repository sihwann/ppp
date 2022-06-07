import React, { createContext, useState } from "react"
import AppLoading from "expo-app-loading"
import { getItem } from "./localStorage"

const TodoList = createContext({
    items: {},
    setItems: () => {}
})

export const TodoListProVider = ({ children }) => {
    const list = getItem()
    const [items, setItems] = useState(list)
    const value = { items, setItems }

    return <TodoList.Provider value={value}>{children}</TodoList.Provider>
}

export default TodoList
