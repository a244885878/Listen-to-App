import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "@/styles/music";

export default function MusicScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.content}>
        <Text style={styles.title}>音乐馆</Text>
        <Text style={styles.subtitle}>发现好音乐</Text>
      </View>
    </SafeAreaView>
  );
}
