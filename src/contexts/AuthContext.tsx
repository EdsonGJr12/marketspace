import { api } from "@services/api";
import { getUserToken } from "@storage/token/getUserToken";
import { removeUserToken } from "@storage/token/removeUserToken";
import { saveUserToken } from "@storage/token/saveUserToken";
import { getUserAuthenticated } from "@storage/user/getUserAuthenticated";
import { removeUserAuthenticated } from "@storage/user/removeUseAuthenticated";
import { saveUserAuthenticated } from "@storage/user/saveUserAuthenticated";
import { createContext, ReactNode, useEffect, useState } from "react";
import { UserDTO } from "src/dto/UserDTO";

type AuthContextDataProps = {
    isAuthenticated: boolean;
    user: UserDTO | undefined,
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    isAppLoading: boolean;
}

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

export function AuthProvider({ children }: AuthContextProviderProps) {

    const [user, setUser] = useState<UserDTO>();
    const isAuthenticated = !!user;

    const [isAppLoading, setIsAppLoading] = useState(true);

    async function loadUserAuthenticated() {
        try {
            const storageUser = await getUserAuthenticated();
            setUser(storageUser);

            const token = await getUserToken();

            console.log(token)

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } finally {
            setIsAppLoading(false);
        }
    }

    async function signIn(email: string, password: string) {
        const { data } = await api.post("/sessions", { email, password });

        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

        setUser(data.user);

        await saveUserAuthenticated(data.user);
        await saveUserToken(data.token);
    }

    async function signOut() {

        await removeUserAuthenticated();
        await removeUserToken();

        setUser(undefined);
    }

    useEffect(() => {
        loadUserAuthenticated();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut, isAppLoading }}>
            {children}
        </AuthContext.Provider>
    );
}