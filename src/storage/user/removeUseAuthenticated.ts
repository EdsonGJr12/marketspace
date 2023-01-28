import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_AUTHENTICATED } from "@storage/storageConfig";

export async function removeUserAuthenticated() {
    await AsyncStorage.removeItem(USER_AUTHENTICATED);
}