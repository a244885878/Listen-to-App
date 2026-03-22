/**
 * Mock 请求延迟
 */
const delay = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export interface GridItem {
  key: string;
  icon: string;
  text: string;
  count: number;
}

export interface RecentItem {
  id: string;
  title: string;
  subtitle: string;
}

export interface PlaylistItem {
  id: string;
  title: string;
  count: number;
  creator: string;
}

export interface UserInfo {
  id: string;
  nickname: string;
  avatar?: string;
}

export interface LoginResult {
  user: UserInfo;
  token: string;
}

export interface UserDetailResult {
  user: UserInfo;
  balance: string;
  gridData: GridItem[];
  recentData: RecentItem[];
  playlistData: PlaylistItem[];
}

/**
 * 模拟登录
 */
export async function mockLogin(): Promise<LoginResult> {
  await delay(1000);
  return {
    user: { id: "1", nickname: "范特西" },
    token: "mock-token",
  };
}

/**
 * 模拟获取个人信息（含收藏、最近播放、歌单等）
 */
export async function mockGetUserInfo(userId: string): Promise<UserDetailResult> {
  await delay(800);
  return {
    user: { id: userId, nickname: "范特西" },
    balance: "0.00",
    gridData: [
      { key: "favorite", icon: "heart", text: "收藏", count: 12 },
      { key: "local", icon: "download", text: "本地", count: 0 },
      { key: "podcast", icon: "customer-service", text: "播客", count: 0 },
      { key: "purchased", icon: "shopping-cart", text: "已购", count: 0 },
    ],
    recentData: [
      { id: "1", title: "播放列表", subtitle: "2500 首" },
      { id: "2", title: "最近喜欢", subtitle: "32 首" },
    ],
    playlistData: [
      { id: "1", title: "我喜欢的音乐", count: 128, creator: "范特西" },
      { id: "2", title: "跑步必备", count: 45, creator: "范特西" },
    ],
  };
}
