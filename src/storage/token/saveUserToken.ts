import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_TOKEN } from "@storage/storageConfig";

export async function saveUserToken(token: string) {
    await AsyncStorage.setItem(USER_TOKEN, token);
}