import { View, StyleSheet } from "react-native";
import TabBar from "../components/TabBar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Index = () => {
  return (
    <View style={styles.container}>
      <TabBar />
    </View>
  );
};

export default Index;
