import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const { Navigator, Screen } = createStackNavigator();

import ListHeros from "./src/pages/ListHeros";
import DetailHero from "./src/pages/DetailHero";

export default function Routes() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="ListHeros" component={ListHeros} />

        <Screen name="DetailHero" component={DetailHero} />
      </Navigator>
    </NavigationContainer>
  );
}
