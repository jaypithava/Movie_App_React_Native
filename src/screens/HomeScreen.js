import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Colors from '../constants/Colors';

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style="light"  translucent={false} backgroundColor={Colors.BASIC_BACKGROUND}/>
      <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Now Playing</Text>
      <Text style={styles.headerSubTitle}>VIEW ALL</Text>
      </View>
      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BASIC_BACKGROUND,
  },
  headerContainer: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 28,
  },
  headerSubTitle: {
    fontSize: 13,
    color: Colors.ACTIVE,
  },

});


export default HomeScreen;