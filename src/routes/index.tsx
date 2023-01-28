import { AuthRoutes } from "@routes/auth.routes";
import { AppRoutes } from "@routes/app.routes";
import { useAuth } from "@hooks/useAuth";

import { NavigationContainer } from '@react-navigation/native';
import { Loading } from "@components/Loading";

export function Routes() {

    const { isAuthenticated, isAppLoading } = useAuth();

    if (isAppLoading) {
        return <Loading />
    }

    return (
        <NavigationContainer>
            {isAuthenticated ? (
                <AppRoutes />
            ) : (
                <AuthRoutes />
            )}
        </NavigationContainer>

    );
}