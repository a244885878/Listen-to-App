import {
  View,
  StyleSheet,
  ActivityIndicator,
  Modal,
} from "react-native";

interface LoadingProps {
  loading: boolean;
  children: React.ReactNode;
}

/**
 * 全屏 Loading 组件，遮罩覆盖整个屏幕，加载动画居中显示
 */
export function Loading({ loading, children }: LoadingProps) {
  return (
    <View style={styles.container}>
      {children}
      <Modal
        visible={loading}
        transparent
        statusBarTranslucent
        animationType="none"
      >
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
});
