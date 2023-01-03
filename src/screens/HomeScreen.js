import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GenreCard from "../components/GenreCard";
import ItemSeparator from "../components/ItemSeparator";
import MovieCard from "../components/MovieCard";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import { getAllGenres, getNowPlayingMovies, getUpcomingMovies , getMovieById } from "../services/MovieService";

const Genres = ["All", "Action", "Comedy", "Romance", "Horror", "Sci-Fi"];

const HomeScreen = ({navigation}) => {
  const [activeGenres, setActiveGenres] = useState("All");
  const [nowPlayingMovie, setNowPlayingMovie] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState({});
  const [genres, setGenres] = useState([{id: 10110, name: "All"}]);

  useEffect(() => {
    getNowPlayingMovies().then((movieResponse) =>
      setNowPlayingMovie(movieResponse.data)
    );
    getUpcomingMovies().then((movieResponse) =>
    setUpcomingMovies(movieResponse.data)
    );
    getAllGenres().then((genresResponse) =>
    setGenres([...genres,...genresResponse.data.genres])
    );
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        style='light'
        translucent={false}
        backgroundColor={Colors.BASIC_BACKGROUND}
      />

      <SafeAreaView style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Now Playing</Text>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </SafeAreaView>

      <View style={styles.generalListContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={genres}
          initialNumToRender={4}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          keyExtractor={(item) => item.id.toString()}
          //renderItem is used for the title for api
          renderItem={({ item }) => (
            <GenreCard
              genreName={item.name}
              active={item.name === activeGenres ? true : false}
              onPress={setActiveGenres}
            />
          )}
        />
      </View>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={nowPlayingMovie.results}
          initialNumToRender={4}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          keyExtractor={(item) => item.id.toString()}
          //renderItem is used for the title for api
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              heartLess={false}
              onPress={() => navigation.navigate("movie", { movieId: item.id })}
            />
          )}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Coming Soon</Text>
        <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </View>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={upcomingMovies.results}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          keyExtractor={(item) => item.id.toString()}
          //renderItem is used for the title for api
          renderItem={({ item }) => (
            <MovieCard
              title={item.title}
              initialNumToRender={4}
              language={item.original_language}
              voteAverage={item.vote_average}
              voteCount={item.vote_count}
              poster={item.poster_path}
              size={0.7}
              heartLess={true}
              onPress={() => navigation.navigate("movie", { movieId: item.id })}
            />
          )}
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
    fontFamily: "Bold",
  },
  generalListContainer: {
    paddingVertical: 10,
  },
});

export default HomeScreen;
