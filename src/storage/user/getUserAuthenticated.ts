import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_AUTHENTICATED } from "@storage/storageConfig";
import { UserDTO } from "src/dto/UserDTO";

export async function getUserAuthenticated() {
    const storage = await AsyncStorage.getItem(USER_AUTHENTICATED);
    const user: UserDTO = storage ? JSON.parse(storage) : null;
    return user;
}