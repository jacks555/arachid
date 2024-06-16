import AsyncStorage from '@react-native-async-storage/async-storage';
import { AddToStorageType, GetFromStorageType, RemoveFromStorageType } from '../@types/GlobalTypes';
export const addToStorage = async ({key, value}:AddToStorageType) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
}

export const getFromStorage = async ({key, defaultValue = null}:GetFromStorageType) => {
    const res = await AsyncStorage.getItem(key);
    if (!res) return defaultValue
    try {
        return JSON.parse(res)
    } catch (e) {
        return res
    }
}

export const removeFromStorage = async ({key}:RemoveFromStorageType) => {
    await AsyncStorage.removeItem(key);
}
export const getAllKeys = async () => {
  return  await AsyncStorage.getAllKeys();
}