import AsyncStorage from "@react-native-async-storage/async-storage"

export const setItem = async task => {
    await AsyncStorage.setItem("tasks", JSON.stringify(task))
}
export const getItem = async () => {
    const data = await AsyncStorage.getItem("tasks")
    return JSON.parse(data || "{}")
}
