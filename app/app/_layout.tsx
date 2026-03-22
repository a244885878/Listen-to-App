import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Provider } from '@ant-design/react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useUserStore } from '@/stores/useUserStore';

// 阻止启动图自动隐藏，等字体和登录状态恢复完成后再关闭
SplashScreen.preventAutoHideAsync();

// Ant Design 图标字体，用于 Tab 栏等图标的显示
const antOutlineFont = require('@ant-design/icons-react-native/fonts/antoutline.ttf');

export default function RootLayout() {
  const [authRestored, setAuthRestored] = useState(false);
  const restoreAuth = useUserStore((s) => s.restoreAuth);

  // 加载 antd 图标字体，fontsLoaded 为 true 时表示加载完成
  const [fontsLoaded] = useFonts({
    antoutline: antOutlineFont,
  });

  // 启动时恢复本地登录状态（免登录）
  useEffect(() => {
    restoreAuth().finally(() => setAuthRestored(true));
  }, [restoreAuth]);

  // 字体和登录状态都就绪后关闭启动图
  useEffect(() => {
    if (fontsLoaded && authRestored) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, authRestored]);

  // 加载期间返回 null，避免图标显示为方框
  if (!fontsLoaded || !authRestored) {
    return null;
  }

  return (
    <SafeAreaProvider>
      {/* 为整 App 提供安全区域上下文，供 SafeAreaView 等使用 */}
      {/* Ant Design 的 Provider，用于 Toast、Modal 等组件的挂载 */}
      <Provider>
        <StatusBar style="dark" />
        {/* Stack 导航器，headerShown: false 隐藏默认顶栏 */}
        <Stack screenOptions={{ headerShown: false }}>
          {/* (tabs) 为底部 Tab 导航组：首页、音乐馆、我的 */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </Provider>
    </SafeAreaProvider>
  );
}
