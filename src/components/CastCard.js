import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { getPoster } from "../services/MovieService";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import Images from "../constants/Images";

const CastCard = ({ originalName, image, characterName }) => {
  return (
    <View style={styles.container}>
      <Image 
      source={image ? {uri: getPoster(image)}  : Images.NO_IMAGES} 
      resizeMode={image ? "cover" : "contain"}
      style={styles.image}
      />
      <Text style={styles.originalName} numberOfLines={2}>{originalName}</Text>
      <Text style={styles.characterName} numberOfLines={2}>{characterName}</Text>
    </View>
  );
};

export default CastCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    height:120,
    width: 100,
    borderRadius: 10,
  },
  originalName:{
    width: 80,
    color: Colors.BLACK,
    fontFamily: Fonts.BOLD,
    fontSize: 12,
  },
  characterName:{
    width: 80,
    color: Colors.LIGHT_GRAY,
    fontFamily:Fonts.BOLD,
    fontSize: 10,
  },
});
