import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { Home } from '@screens/Home';
import { MyPosts } from '@screens/MyPosts';
import { useTheme } from 'native-base';

import { HouseSimple, Tag, SignOut } from "phosphor-react-native";

type AppRoutesProps = {
    Home: undefined,
    MyPosts: undefined,
    Logout: undefined;
};

const Logout = function () {
    return null;
};

export type AuthNavigatorRouteProps = BottomTabNavigationProp<AppRoutesProps>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>();

export function AppRoutes() {

    const theme = useTheme();

    return (
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: theme.colors.gray['200'],
                tabBarInactiveTintColor: theme.colors.gray['400'],
                tabBarStyle: {
                    backgroundColor: theme.colors.gray["700"],
                    borderTopWidth: 0,
                    height: 60
                }
            }}
        >
            <Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HouseSimple
                            color={color}
                        />
                    )
                }}
            />

            <Screen
                name="MyPosts"
                component={MyPosts}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Tag
                            color={color}
                        />
                    )
                }}
            />

            <Screen
                name="Logout"
                component={Logout}
                options={{
                    tabBarIcon: ({ color }) => (
                        <SignOut
                            color={color}
                        />
                    )
                }}
            />
        </Navigator>
    );
}