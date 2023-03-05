import { Pressable } from 'react-native';
import { useAuth } from '@hooks/useAuth';
import { createBottomTabNavigator, BottomTabNavigationProp, BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Home } from '@screens/Home';
import { MyPosts } from '@screens/MyPosts';
import { NewPost } from '@screens/NewPost';
import { useTheme } from 'native-base';

import { HouseSimple, Tag, SignOut } from "phosphor-react-native";

import type { CompositeNavigationProp } from '@react-navigation/native';
import { NewPostPreview } from '@screens/NewPostPreview';

type StackRoutesProps = {
    HomeNavigator: undefined;
    NewPost: undefined;
    NewPostPreview: NewPostDTO;
};

type BottomTabRoutesProps = {
    Home: undefined,
    MyPosts: undefined,
    Logout: undefined;
};

const Logout = function () {
    return null;
};

export type AppNavigatorRouteProps = CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabRoutesProps, "Home">,
    NativeStackNavigationProp<StackRoutesProps>
>;

const BottomTabNavigator = createBottomTabNavigator<BottomTabRoutesProps>();
const StackNavigator = createNativeStackNavigator<StackRoutesProps>();

export function AppRoutes() {

    return (
        <StackNavigator.Navigator
            screenOptions={{
                headerShown: false,
                animation: "slide_from_right"
            }}
        >
            <StackNavigator.Screen
                name="HomeNavigator"
                component={HomeNavigator}
            />

            <StackNavigator.Screen
                name="NewPost"
                component={NewPost}

            />

            <StackNavigator.Screen
                name="NewPostPreview"
                component={NewPostPreview}
            />
        </StackNavigator.Navigator>
    );


}

function HomeNavigator() {

    const theme = useTheme();

    const { signOut } = useAuth();

    return (
        <BottomTabNavigator.Navigator
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
            <BottomTabNavigator.Screen
                name="Home"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <HouseSimple
                            color={color}
                        />
                    )
                }}
            />

            <BottomTabNavigator.Screen
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

            <BottomTabNavigator.Screen
                name="Logout"
                component={Logout}
                options={{
                    tabBarIcon: () => (
                        <SignOut
                            color={theme.colors.lightRed['500']}

                        />
                    ),

                    tabBarButton: (props: BottomTabBarButtonProps) => (
                        <Pressable
                            {...props}
                            onPress={signOut}
                        />
                    )

                }}
            />
        </BottomTabNavigator.Navigator>
    );
}