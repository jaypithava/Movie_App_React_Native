import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import MovieScreen from './src/screens/MovieScreen';

const Stack = createNativeStackNavigator();

export default () => {
  return (
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
  );
}
