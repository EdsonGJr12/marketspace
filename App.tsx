import { Center, NativeBaseProvider, Text } from 'native-base';
import { Karla_400Regular, Karla_700Bold, useFonts } from "@expo-google-fonts/karla";

import { THEME } from "./src/theme";
import { SignIn } from '@screens/SignIn';

export default function App() {

  const [fontsLoaded] = useFonts({
    Karla_400Regular,
    Karla_700Bold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NativeBaseProvider theme={THEME}>
      <SignIn />
    </NativeBaseProvider>
  );
}
