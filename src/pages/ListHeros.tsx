import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MarvelApi from "../services/api";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

interface TypeHero {
  id: number;
  name: string;
  urlImg: string;
}

export default function ListHeros() {
  const [listHeros, setListHeros] = useState<TypeHero[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    MarvelApi.getAllCharacters(30, (herois: any) => {
      let list: TypeHero[] = [];

      herois.data.data.results.map((itemHero: any) => {
        let item: TypeHero = {
          id: itemHero.id,
          name: itemHero.name,
          urlImg: `${itemHero.thumbnail.path}.${itemHero.thumbnail.extension}`,
        };
        list.push(item);
      });

      setListHeros(list);
    });
  }, []);

  function handleDetailHero(id: number) {
    navigation.navigate("DetailHero", { id });
  }

  return (
    <ScrollView >
      {listHeros.map((itemHero) => {
        return (
          <TouchableOpacity
            style={styles.buttonHero}
            onPress={() => handleDetailHero(itemHero.id)}
            key={`${itemHero.id}${itemHero.name}`}
          >
            <Image
              key={`${itemHero.name}${itemHero.id}`}
              style={styles.image}
              source={{ uri: itemHero.urlImg }}
            />
            <Text style={styles.titleHero}> {itemHero.name} </Text>
          </TouchableOpacity>
        );
      })}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },

  titleHero: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E0A40",
    fontFamily: 'Oswald_500Medium',
  },

  buttonHero: {
    backgroundColor: "rgba(30,144,255, 0.3)",
    borderWidth: 1,
    borderColor: "#1E0A40",
    borderRadius: 10,
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    marginTop: 5
  },
});
