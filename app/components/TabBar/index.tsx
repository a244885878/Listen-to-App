import { View, StyleSheet, ScrollView } from "react-native";
import { Icon, TabBar } from "@ant-design/react-native";
import { useState, createContext, useContext } from "react";
import Home from "@/app/tabBar/home";
import My from "@/app/tabBar/my";

// 创建 Tab 激活状态 Context
export const TabActiveContext = createContext<boolean>(true);

// 自定义 Hook，子组件可以用来判断当前 Tab 是否激活
export const useTabActive = () => useContext(TabActiveContext);

const TAB_BAR_HEIGHT = 50;

const TabBarOptions = [
  {
    title: "首页",
    icon: <Icon name="home" />,
    key: "home",
    Component: Home,
  },
  {
    title: "我的",
    icon: <Icon name="user" />,
    key: "my",
    Component: My,
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentArea: {
    flex: 1,
    paddingBottom: TAB_BAR_HEIGHT,
  },
  pageContainer: {
    ...StyleSheet.absoluteFillObject,
    paddingBottom: TAB_BAR_HEIGHT,
  },
  pageHidden: {
    display: "none",
  },
  pageVisible: {
    display: "flex",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  tabBarWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: TAB_BAR_HEIGHT,
    backgroundColor: "#fff",
  },
});

const TabBarCom: React.FC = () => {
  const [activeTab, setActiveTab] = useState(TabBarOptions[0].key);
  // 记录已访问过的 Tab，实现懒加载
  const [visitedTabs, setVisitedTabs] = useState<Set<string>>(
    () => new Set([TabBarOptions[0].key])
  );

  const handleTabPress = (key: string) => {
    setActiveTab(key);
    // 首次访问时加入已访问集合
    if (!visitedTabs.has(key)) {
      setVisitedTabs((prev) => new Set(prev).add(key));
    }
  };

  return (
    <View style={styles.container}>
      {/* 内容区域 - 只渲染访问过的页面，通过显示/隐藏切换 */}
      <View style={styles.contentArea}>
        {TabBarOptions.map((item) => {
          // 未访问过的 Tab 不渲染
          if (!visitedTabs.has(item.key)) {
            return null;
          }

          const isActive = activeTab === item.key;

          return (
            <View
              key={item.key}
              style={[
                styles.pageContainer,
                isActive ? styles.pageVisible : styles.pageHidden,
              ]}
            >
              {/* 通过 Context 传递激活状态，子组件可以根据这个状态控制副作用 */}
              <TabActiveContext.Provider value={isActive}>
                <ScrollView
                  style={styles.scrollView}
                  contentContainerStyle={styles.scrollContent}
                  showsVerticalScrollIndicator={true}
                >
                  <item.Component />
                </ScrollView>
              </TabActiveContext.Provider>
            </View>
          );
        })}
      </View>

      {/* 底部固定TabBar */}
      <View style={styles.tabBarWrapper}>
        <TabBar>
          {TabBarOptions.map((v) => (
            <TabBar.Item
              onPress={() => handleTabPress(v.key)}
              selected={activeTab === v.key}
              key={v.key}
              title={v.title}
              icon={v.icon}
            />
          ))}
        </TabBar>
      </View>
    </View>
  );
};

export default TabBarCom;
