import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import GenreCard from "../components/GenreCard";
import ItemSeparator from "../components/ItemSeparator";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";


const Genres = ["All", "Action", "Comedy", "Romance", "Horror", "Sci-Fi"];

const HomeScreen = () => {
  const [activeGenres, setActiveGenres] = useState("All");
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar
        style='light'
        translucent={false}
        backgroundColor={Colors.BASIC_BACKGROUND}
      />

      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </View>

      <View style={styles.generalListContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={Genres}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          keyExtractor={(item) => item}
          renderItem={({ item }) => <GenreCard genreName={item} 
          active={item === activeGenres ? true : false}
          onPress={setActiveGenres}
          />
        }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BASIC_BACKGROUND,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: Fonts.REGULAR,
  },
  headerSubTitle: {
    fontSize: 13,
    color: Colors.ACTIVE,
    fontFamily: 'Bold',
  },
  generalListContainer: {
    paddingVertical: 10,
  },
});

export default HomeScreen;
