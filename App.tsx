import { Center, NativeBaseProvider, Text } from 'native-base';
import { Karla_400Regular, Karla_700Bold, useFonts } from "@expo-google-fonts/karla";

import { THEME } from "./src/theme";
import { SignIn } from '@screens/SignIn';

import { NavigationContainer } from '@react-navigation/native';
import { Routes } from '@routes/index';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


export default function App() {

  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={THEME}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
