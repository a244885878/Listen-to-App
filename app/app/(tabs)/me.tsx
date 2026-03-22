import { Button, Toast } from "@ant-design/react-native";
import { IconOutline } from "@ant-design/icons-react-native";
import { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "@/stores/useUserStore";
import { mockLogin, mockGetUserInfo } from "@/api";
import type { GridItem, RecentItem, PlaylistItem } from "@/api";
import { Loading } from "@/components/Loading";
import { styles, PRIMARY, TEXT_PRIMARY, TEXT_SECONDARY } from "@/styles/me";

const iconNameMap = {
  heart: "heart",
  download: "download",
  "customer-service": "customer-service",
  "shopping-cart": "shopping-cart",
} as const;

function getGridRenderData(
  items: GridItem[] | undefined,
  primaryColor: string
) {
  if (!items) return [];
  return items.map((item) => ({
    ...item,
    icon: (
      <IconOutline
        name={iconNameMap[item.icon as keyof typeof iconNameMap] ?? "heart"}
        size={24}
        color={primaryColor}
      />
    ),
  }));
}

export default function MeScreen() {
  const { isLoggedIn, user, login, logout } = useUserStore();
  const [loginLoading, setLoginLoading] = useState(false);
  const [userInfoLoading, setUserInfoLoading] = useState(false);
  const [userData, setUserData] = useState<{
    gridData: GridItem[];
    recentData: RecentItem[];
    playlistData: PlaylistItem[];
    balance: string;
  } | null>(null);

  const fetchUserInfo = async (userId: string) => {
    setUserInfoLoading(true);
    try {
      const res = await mockGetUserInfo(userId);
      setUserData({
        gridData: res.gridData,
        recentData: res.recentData,
        playlistData: res.playlistData,
        balance: res.balance,
      });
    } finally {
      setUserInfoLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && user && !userData) {
      fetchUserInfo(user.id);
    }
  }, [isLoggedIn, user?.id]);

  const handleLogin = async () => {
    setLoginLoading(true);
    try {
      const res = await mockLogin();
      await login(res.user, res.token);
      const detail = await mockGetUserInfo(res.user.id);
      setUserData({
        gridData: detail.gridData,
        recentData: detail.recentData,
        playlistData: detail.playlistData,
        balance: detail.balance,
      });
      Toast.success("登录成功");
    } finally {
      setLoginLoading(false);
    }
  };

  const gridData = getGridRenderData(
    userData?.gridData?.filter((i) => ["favorite", "local"].includes(i.key)),
    PRIMARY
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Loading loading={loginLoading}>
          <View style={styles.profileCard}>
            {!isLoggedIn ? (
              <View style={styles.loginPrompt}>
                <Text style={styles.loginTitle}>登录后享受更多服务</Text>
                <Text style={styles.loginDesc}>
                  收藏音乐、创建歌单、同步播放记录
                </Text>
                <Button
                  type="primary"
                  style={styles.loginBtn}
                  onPress={handleLogin}
                  disabled={loginLoading}
                >
                  请登录
                </Button>
              </View>
            ) : (
              <View style={styles.profileHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {user?.nickname?.slice(0, 1) || "?"}
                  </Text>
                </View>
                <View style={styles.headerTitleRow}>
                  <Text style={styles.userName}>{user?.nickname}</Text>
                  <TouchableOpacity
                    onPress={() => {
                      void logout();
                      setUserData(null);
                      Toast.info("已退出登录");
                    }}
                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  >
                    <IconOutline
                      name="logout"
                      size={14}
                      color={TEXT_SECONDARY}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </Loading>

        {isLoggedIn && (
          <Loading loading={userInfoLoading}>
            <View style={styles.sectionGap} />
            <View style={styles.gridCard}>
              <View style={styles.gridRow}>
                {gridData.map((item) => (
                  <View key={item.key} style={styles.gridItem}>
                    <View style={styles.gridIconWrap}>{item?.icon}</View>
                    <Text style={styles.gridText}>{item?.text ?? ""}</Text>
                    <Text style={styles.gridCount}>{item?.count ?? 0}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.sectionGap} />
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>最近播放</Text>
                <TouchableOpacity>
                  <Text style={styles.sectionMore}>更多 {">"}</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.recentScroll}
              >
                {(userData?.recentData ?? []).map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.recentCard}
                    activeOpacity={0.8}
                  >
                    <View style={styles.recentCover}>
                      <IconOutline
                        name="sound"
                        size={40}
                        color={TEXT_SECONDARY}
                      />
                    </View>
                    <Text style={styles.recentTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={styles.recentSubtitle}>{item.subtitle}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.sectionGap} />
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>自建歌单</Text>
                <TouchableOpacity>
                  <IconOutline
                    name="plus"
                    size={18}
                    color={TEXT_PRIMARY}
                  />
                </TouchableOpacity>
              </View>
              {(userData?.playlistData ?? []).map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.playlistItem}
                  activeOpacity={0.8}
                >
                  <View style={styles.playlistThumb}>
                    <IconOutline
                      name="unordered-list"
                      size={24}
                      color={PRIMARY}
                    />
                  </View>
                  <View style={styles.playlistItemContent}>
                    <Text style={styles.playlistItemTitle}>{item.title}</Text>
                    <Text style={styles.playlistMeta}>
                      {item.count} 首 · {item.creator}
                    </Text>
                  </View>
                  <View style={styles.playlistArrow}>
                    <IconOutline
                      name="right"
                      size={16}
                      color={TEXT_SECONDARY}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.sectionGapLg} />
          </Loading>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
