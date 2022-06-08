import React, { useState, useContext } from "react"
import { useWindowDimensions } from "react-native"
import styled from "styled-components/native"
import IconButton from "../components/IconButton"
import { icons } from "../icons"
import { themeType } from "../../Types"

import TodoList from "../store/Context"
import Storage from "../store/LocalStorage"

interface propTypes {
    item: any
}

const Task = ({ item }: propTypes) => {
    const [isEdit, setIsEdit] = useState(false)
    const [text, setText] = useState(item.text)
    const width = useWindowDimensions().width
    const { list, setList } = useContext(TodoList)

    const updateItem = () => {
        const items = list
        items[item.id].text = text
        // setList(prev => prev[item.id].text = text)
        setList({ ...items })
        Storage.setItem({ key: "task", value: { ...items } })
        setIsEdit(false)
    }

    const removeItem = () => {
        const items: any = list
        delete items[item.id]
        // setList(prev => delete prev[id])
        setItems({ ...items })
        Storage.setItem({ key: "task", value: { ...items } })
    }

    const completedItem = () => {
        const items: any = list
        items[item.id].completed = !items[item.id].completed

        // setList(prev => prev[item.id].completed = !items[item.id].completed)
        setList({ ...items })
        Storage.setItem({ key: "task", value: { ...items } })
    }

    return isEdit ? (
        <StyledInput
            width={width}
            maxLength={50}
            autoCapitalize='none'
            autoCorrect={false}
            returnKeyType='done'
            keyboardAppearance='dark'
            value={text}
            onChangeText={text => setText(text)}
            onSubmitEditing={updateItem}
            onBlur={() => {
                setText(item.text)
                setIsEdit(false)
            }}
        />
    ) : (
        <Container>
            <IconButton
                icon={item.completed ? icons.check : icons.uncheck}
                item={item}
                onPress={completedItem}
            />
            <Contents completed={item.completed}>{item.text}</Contents>
            {!item.completed && <IconButton icon={icons.edit} onPress={() => setIsEdit(true)} />}
            <IconButton icon={icons.delete} item={item} onPress={removeItem} />
        </Container>
    )
}

const StyledInput = styled.TextInput.attrs(({ theme }: { theme: themeType }) => ({
    placeholderTextColor: theme.main
}))`
    width: ${({ width }: { width: number }) => width - 40}px;
    height: 60px;
    margin: 3px 0;
    padding: 15px 20px;
    border-radius: 10px;
    font-size: 25px;
    background-color: ${({ theme }: { theme: themeType }) => theme.itemBackground};
    color: ${({ theme }: { theme: themeType }) => theme.text};
`

const Container = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }: { theme: themeType }) => theme.itemBackground};
    border-radius: 10px;
    padding: 5px;
    margin: 3px 0;
`
const Contents = styled.Text`
    flex: 1;
    font-size: 24px;
    color: ${({ theme, completed }: { theme: themeType; completed: boolean }) =>
        completed ? theme.done : theme.text};
    text-decoration-line: ${({ completed }: { completed: boolean }) =>
        completed ? "line-through" : "none"};
`

export default Task
