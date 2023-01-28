import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_AUTHENTICATED } from "@storage/storageConfig";
import { UserDTO } from "src/dto/UserDTO";

export async function saveUserAuthenticated(user: UserDTO) {
    await AsyncStorage.setItem(USER_AUTHENTICATED, JSON.stringify(user));
}