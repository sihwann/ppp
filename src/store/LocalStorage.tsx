import AsyncStorage from "@react-native-async-storage/async-storage"

export const setItem = async ({ key, value }: { key: string; value: any }) => {
    await AsyncStorage.setItem(key, JSON.stringify(value))
}
export const getItem = async ({ key }: { key: string }) => {
    const data = await AsyncStorage.getItem(key)
    return JSON.parse(data || "{}")
}

export default { setItem, getItem }
