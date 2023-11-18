
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Home from './src/views/Home';
import Routes from './src/routes/Routes';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Routes />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
  },
});
