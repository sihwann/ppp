import React, { useState } from "react"
import { useWindowDimensions } from "react-native"
import styled from "styled-components/native"
import IconButton from "../components/IconButton"
import { icons } from "../icons"
import { themeType } from "../../Types"

interface propTypes {
    item: any
    deleteTask: () => void
    toggleTask: () => void
    updateTask: () => void
}

const Task = ({ item, deleteTask, toggleTask, updateTask }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(item.text)
    const width = useWindowDimensions().width

    const _onSumit = () => {
        if (isEditing) {
            const updatedItem = Object.assign({}, item)
            updatedItem["text"] = text
            setIsEditing(false)
            updateTask(updatedItem)
        }
    }

    return isEditing ? (
        <StyledInput
            width={width}
            maxLength={50}
            autoCapitalize='none'
            autoCorrect={false}
            returnKeyType='done'
            keyboardAppearance='dark'
            value={text}
            onChangeText={text => setText(text)}
            onSubmitEditing={_onSumit}
            onBlur={() => {
                setText(item.text)
                setIsEditing(false)
            }}
        />
    ) : (
        <Container>
            <IconButton
                icon={item.completed ? icons.check : icons.uncheck}
                item={item}
                onPress={toggleTask}
            />
            <Contents completed={item.completed}>{item.text}</Contents>
            {!item.completed && <IconButton icon={icons.edit} onPress={() => setIsEditing(true)} />}
            <IconButton icon={icons.delete} item={item} onPress={deleteTask} />
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
