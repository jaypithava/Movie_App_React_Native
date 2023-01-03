import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
  FlatList,
  Share,
} from "react-native";
import Colors from "../constants/Colors";
import {
  getMovieById,
  getPoster,
  getVideo,
  getLanguage,
} from "../services/MovieService";
import ItemSeparator from "../components/ItemSeparator";
import { LinearGradient } from "expo-linear-gradient";
import Fonts from "../constants/Fonts";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { APPEND_TO_RESPONSE as AR } from "../constants/Urls";
import CastCard from "../components/CastCard";
import MovieCard from "../components/MovieCard";

const { height, width } = Dimensions.get("screen");

const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const MovieScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const [movie, setMovie] = useState({});
  const [isCastSelected, setIsCastSelected] = useState(true);

  useEffect(() => {
    getMovieById(
      movieId,
      `${AR.VIDEOS},${AR.CREDITS},${AR.RECOMMENDATIONS},${AR.SIMILAR}`
    ).then((response) => setMovie(response?.data));
  }, []);

  return (
    <ScrollView>
      <StatusBar
        style='light'
        translucent={false}
        backgroundColor={Colors.BASIC_BACKGROUND}
      />
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "rgba(217,217,217,0)"]}
        start={[0, 0.3]}
        style={styles.linearGradient}
      />
      <View style={styles.moviePosterImageContainer}>
        <Image
          style={styles.moviePosterImage}
          resizeMode='cover'
          source={{ uri: getPoster(movie?.backdrop_path) }}
        />
      </View>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.goBack()}
        >
          <Feather name='chevron-left' size={35} color={Colors.WHITE} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() =>
            Share.share({ message: `${movie?.title}\n\n${movie?.homepage}` })
          }
        >
          <Text style={styles.headerText}>Share</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.playButton}
        //Direct Redirect to the youtube video player
        onPress={() => Linking.openURL(getVideo(movie?.videos.results[0].key))}
      >
        <Ionicons name='play-circle-outline' size={70} color={Colors.WHITE} />
      </TouchableOpacity>
      <ItemSeparator height={setHeight(37)} />
      <View style={styles.movieTitleContainer}>
        <Text style={styles.movieTitle} numberOfLines={2}>
          {movie?.original_title}
        </Text>
        <View style={styles.row}>
          <Ionicons name='heart' size={22} color={Colors.HEART} />
          <Text style={styles.ratingText}>{movie?.vote_average}</Text>
        </View>
      </View>
      <Text style={styles.genreText}>
        {movie?.genres?.map((genre) => genre?.name)?.join(", ")} |{" "}
        {movie?.runtime} Min
      </Text>
      <Text style={styles.genreText}>
        {getLanguage(movie?.original_language)?.english_name}
      </Text>
      <View style={styles.overviewContainer}>
        <Text style={styles.overViewTitle}>OverView</Text>
        <Text style={styles.overViewText}>{movie?.overview}</Text>
      </View>
      <View>
        <Text style={styles.cast}>Cast</Text>
        <View style={styles.castSubMenuContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsCastSelected(true)}
          >
            <Text
              style={{
                ...styles.castSubMenuText,
                color: isCastSelected ? Colors.BLACK : Colors.LIGHT_GRAY,
              }}
            >
              Cast
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setIsCastSelected(false)}
          >
            <Text
              style={{
                ...styles.castSubMenuText,
                color: isCastSelected ? Colors.LIGHT_GRAY : Colors.BLACK,
              }}
            >
              Crew
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{ marginVertical: 5 }}
          data={isCastSelected ? movie?.credits?.cast : movie?.credits?.crew}
          keyExtractor={(item) => item?.credit_id}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <ItemSeparator width={20} />}
          ListHeaderComponent={() => <ItemSeparator width={20} />}
          ListFooterComponent={() => <ItemSeparator width={20} />}
          renderItem={({ item }) => (
            <CastCard
              originalName={item?.name}
              image={item?.profile_path}
              characterName={isCastSelected ? item?.character : item?.job}
            />
          )}
        />
      </View>
      <Text style={styles.extraListTitle}>Recommended Movies</Text>
      <FlatList
        style={{ marginVertical: 5 }}
        data={movie?.recommendations?.results}
        keyExtractor={(item) => item?.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListHeaderComponent={() => <ItemSeparator width={20} />}
        ListFooterComponent={() => <ItemSeparator width={20} />}
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
      <Text style={styles.extraListTitle}>Similar Movies</Text>
      <FlatList
        style={{ marginVertical: 5 }}
        data={movie?.similar?.results}
        keyExtractor={(item) => item?.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator width={20} />}
        ListHeaderComponent={() => <ItemSeparator width={20} />}
        ListFooterComponent={() => <ItemSeparator width={20} />}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  moviePosterImageContainer: {
    height: setHeight(35),
    width: setWidth(145),
    alignItems: "center",
    position: "absolute",
    left: setWidth((100 - 145) / 2),
    top: 0,
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    elevation: 8,
  },
  moviePosterImage: {
    borderBottomRightRadius: 300,
    borderBottomLeftRadius: 300,
    height: setHeight(35),
    width: setWidth(145),
  },
  linearGradient: {
    width: setWidth(100),
    height: setHeight(6),
    position: "absolute",
    top: 0,
    elevation: 9,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    position: "absolute",
    right: 0,
    left: 0,
    top: 50,
    elevation: 20,
  },
  headerText: {
    color: Colors.WHITE,
    fontFamily: Fonts.BOLD,
  },
  playButton: {
    position: "absolute",
    top: 110,
    left: setWidth(50) - 70 / 2,
    elevation: 10,
  },
  movieTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  movieTitle: {
    Colors: Colors.BLACK,
    fontFamily: Fonts.EXTRA_BOLD,
    fontSize: 18,
    width: setWidth(60),
  },
  ratingText: {
    marginLeft: 5,
    Colors: Colors.BLACK,
    fontFamily: Fonts.EXTRA_BOLD,
    fontSize: 15,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  genreText: {
    color: Colors.LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingTop: 5,
    fontFamily: Fonts.BOLD,
    fontSize: 13,
  },
  overviewContainer: {
    color: Colors.EXTRA_LIGHT_GRAY,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginVertical: 10,
  },
  overViewTitle: {
    color: Colors.BLACK,
    fontFamily: Fonts.BOLD,
    fontSize: 18,
  },
  overViewText: {
    color: Colors.LIGHT_GRAY,
    paddingVertical: 5,
    fontFamily: Fonts.BOLD,
    fontSize: 13,
    textAlign: "justify",
  },
  cast: {
    marginLeft: 20,
    color: Colors.BLACK,
    fontFamily: Fonts.BOLD,
    fontSize: 18,
  },
  castSubMenuContainer: {
    marginLeft: 20,
    flexDirection: "row",
    marginVertical: 5,
  },
  castSubMenuText: {
    marginRight: 10,
    color: Colors.BLACK,
    fontFamily: Fonts.BOLD,
    fontSize: 13,
  },
  extraListTitle: {
    marginLeft: 20,
    color: Colors.BLACK,
    fontFamily: Fonts.BOLD,
    fontSize: 18,
    marginVertical: 8,
  },
});

export default MovieScreen;
