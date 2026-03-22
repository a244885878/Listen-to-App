import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Toast } from "@ant-design/react-native";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { styles } from "@/styles/home";

export default function HomeScreen() {
  const { isPlaying, setPlaying } = usePlayerStore();
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.content}>
        <Text style={styles.title}>首页</Text>
        <Text style={styles.subtitle}>Welcome to Listen</Text>
        <Button
          type="primary"
          onPress={() => {
            setPlaying(!isPlaying);
            Toast.success(isPlaying ? "已暂停" : "正在播放");
          }}
        >
          {isPlaying ? "暂停" : "播放"}
        </Button>
      </View>
    </SafeAreaView>
  );
}
