import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import MovieScreen from './src/screens/MovieScreen';
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

export default () => {
  const [fontLoaded] = useFonts({
    Regular: require('./assets/fonts/NunitoSans-Regular.ttf'),
    Bold: require('./assets/fonts/NunitoSans-Bold.ttf'),
    black: require('./assets/fonts/NunitoSans-Black.ttf'),
    ExtraBold: require('./assets/fonts/NunitoSans-ExtraBold.ttf'),
    ExtraLight: require('./assets/fonts/NunitoSans-ExtraLight.ttf'),
    Light: require('./assets/fonts/NunitoSans-Light.ttf'),
    SemiBold: require('./assets/fonts/NunitoSans-SemiBold.ttf'),
  });
  return fontLoaded ? (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} 
          options={{headerShown:false}} 
        />
        <Stack.Screen name="movie" component={MovieScreen}
         options={{headerShown:false}} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  ) : null;
}
