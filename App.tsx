import { NativeBaseProvider, Text } from 'native-base';
import { Karla_400Regular, Karla_700Bold, useFonts } from "@expo-google-fonts/karla";

import { THEME } from "./src/theme";
import { Routes } from '@routes/index';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '@contexts/AuthContext';


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
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
