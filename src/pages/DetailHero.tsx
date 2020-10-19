import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
} from "react-native";

import MarvelApi from "../services/api";

interface DetailHeroRoutsParams {
  id: number;
}

interface DetailHeroType {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  resourceURI: string;
  comics: {
    items: [{
      name: string;
      resourceURI: string;
    }]
  };
  series: {};
  stories: {};
}

export default function DetailHero() {
  const route = useRoute();

  const params = route.params as DetailHeroRoutsParams;
  const [detailHero, setDetailHero] = useState<DetailHeroType[]>();


  useEffect(() => {
    let detail: DetailHeroType[] = [];
    MarvelApi.getDetailCharacters(params.id, (heroDetail: any) => {
      detail = heroDetail.data.data.results;
      setDetailHero(detail);


      

    });
  }, []);

  return (
    <ScrollView>
      {detailHero?.map((item) => {
        return (
          <View style={styles.container} key={item.id}>
            <Text style={styles.nameHero}> {item.name} </Text>
            <Text style={styles.descriptionHero}> {item.description} </Text>

            <Image
              key={`${item.name}${item.id}`}
              style={styles.image}
              source={{
                uri: `${item.thumbnail.path}.${item.thumbnail.extension}`,
              }}
            />
<View style={styles.nameComic}>
                {
                  item.comics.items.map((comic, index)=> {
                    return(
                      <Text style={styles.textComic} key={ index} > {comic.name} </Text>
                    )

                  })
                }
</View>

          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(30,144,255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
   
  },

  image: {
    width: Dimensions.get("window").width,
    height: 400,
    borderRadius: 10,
    resizeMode: "cover",
  },

  nameHero: {
    fontFamily: 'Oswald_500Medium',
    color: "#1E0A40",
    lineHeight: 24,
    marginTop: 10,
    fontSize: 22,
  },
  nameComic: {
    lineHeight: 20,
    marginTop: 10,
    textAlign: "left",
    padding: 20,
  },
  textComic: {
    fontSize: 18,
    fontFamily: 'Oswald_500Medium',
    color: "#1E0A40",
  },

  

  descriptionHero: {
    fontFamily: 'Oswald_500Medium',
    color: "#000",
    lineHeight: 24,
    marginTop: 10,
    fontSize: 18,
    textAlign: "center",
    padding: 5,
  
    
  },
});
