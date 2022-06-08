import React, { createContext, useState } from "react"
import AppLoading from "expo-app-loading"
import { getItem } from "./localStorage"

export const TodoList = createContext({
    list: {},
    setList: () => {}
})

export const TodoListProVider = ({ children }) => {
    const items = getItem({ key: "items" })
    const [list, setList] = useState(items)
    const value = { list, setList } // 배열과 객체의 차이점 확인하기

    return <TodoList.Provider value={value}>{children}</TodoList.Provider>
}

export default TodoList
