import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_TOKEN } from "@storage/storageConfig";

export async function removeUserToken() {
    await AsyncStorage.removeItem(USER_TOKEN);
}