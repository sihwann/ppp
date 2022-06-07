import Index from "./src/Index"
import { TodoListProVider } from "./src/store/Context"
import { theme } from "./src/theme"
import { ThemeProvider } from "styled-components/native"

const App = () => {
    return (
        <TodoListProVider>
            <ThemeProvider theme={theme}>
                <Index />
            </ThemeProvider>
        </TodoListProVider>
    )
}

export default App
