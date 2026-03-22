import { Tabs } from 'expo-router';
import { IconOutline } from '@ant-design/icons-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1677ff',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
      }}
      initialRouteName="index/index"
    >
      <Tabs.Screen
        name="index/index"
        options={{
          title: '首页',
          tabBarIcon: ({ color, size }) => (
            <IconOutline name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="music/index"
        options={{
          title: '音乐馆',
          tabBarIcon: ({ color, size }) => (
            <IconOutline name="sound" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="me/index"
        options={{
          title: '我的',
          tabBarIcon: ({ color, size }) => (
            <IconOutline name="user" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
