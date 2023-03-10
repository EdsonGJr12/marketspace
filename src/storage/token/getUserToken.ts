import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_TOKEN } from "@storage/storageConfig";

export async function getUserToken() {
    return await AsyncStorage.getItem(USER_TOKEN);
}