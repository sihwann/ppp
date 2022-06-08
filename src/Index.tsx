import { useState, useContext } from "react"
import { StatusBar, Dimensions, useWindowDimensions } from "react-native"
import styled from "styled-components/native"
import AppLoading from "expo-app-loading"

import { themeType } from "../Types"
import Task from "./components/Task"
import TodoList from "./store/Context"
import Storage from "./store/LocalStorage"

export default function App() {
    const [text, setText] = useState("")
    const width = useWindowDimensions().width
    // const width = Dimensions.get("window").width
    const { list, setList } = useContext(TodoList)

    const addItem = () => {
        if (text.length < 1) return

        const id = Date.now().toString().slice(10)
        const newItem = {
            [id]: { id, text, completed: false }
        }

        setText("")
        setList(prev => ({ ...prev, ...newItem }))
        Storage.setItem({ key: "task", value: { ...list, ...newItem } })
    }

    return (
        <Container>
            <Title>TODO List</Title>
            <StatusBar barStyle='light-content' backgroundColor={theme.background} />
            <StyledInput
                width={width}
                placeholder='+ Add a Task'
                autoCapitalize='none'
                autoCorrect={false}
                maxLength={50}
                value={text}
                onChangeText={text => setText(text)}
                onSubmitEditing={addItem}
                onBlur={() => setText("")}
            />
            <List width={width}>
                {Object.values(items)
                    .reverse()
                    .map(item => (
                        <Task key={item.id} item={item} />
                    ))}
            </List>
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

const List = styled.ScrollView`
    flex: 1;
    width: ${({ width }: { width: number }) => width - 40}px;
`

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }: { theme: themeType }) => theme.background};
    align-items: center;
    justify-content: flex-start;
    /* border: 5px solid blue; */
`
const Title = styled.Text`
    font-size: 40px;
    font-weight: 600;
    color: ${({ theme }: { theme: themeType }) => theme.main};
    width: 100%;
    align-items: flex-end;
    padding: 0 20px;
    border: 5px solid blue;
`
