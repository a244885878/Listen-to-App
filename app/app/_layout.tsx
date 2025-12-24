import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, //  隐藏所有路由自带的导航栏
      }}
    />
  );
}
