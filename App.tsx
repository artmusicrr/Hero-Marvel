import React from "react"
import { Text, View } from 'react-native';
import {
  useFonts,
  Oswald_200ExtraLight,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from '@expo-google-fonts/oswald';

import Routes from "./routes";
export default function App() {
  let [fontsLoaded] = useFonts({
    Oswald_500Medium,
  });

  if (!fontsLoaded) {
    return <Text>carregando....</Text>
  }

  return <Routes />;
}


