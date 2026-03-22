# Listen-to-App

音乐播放器全栈项目。Web：React 19 + antd、App：Expo + React Native、服务器：Nest.js + MySql

## App（移动端）

基于 Expo + React Native 的跨平台音乐播放器应用，支持 iOS、Android 和 Web。技术栈：React 19、Expo 55、Ant Design Mobile RN、Expo Router、Zustand。底部 Tab 导航：首页、音乐馆、我的。

### 目录结构

```
app/
├── app/                    # Expo Router 路由
│   ├── _layout.tsx         # 根布局：Provider、字体、SafeAreaProvider、启动时恢复登录状态
│   ├── (tabs)/             # Tab 导航组
│   │   ├── _layout.tsx     # Tab 配置（首页、音乐馆、我的）
│   │   ├── index.tsx       # 首页
│   │   ├── music.tsx       # 音乐馆
│   │   └── me.tsx          # 我的（登录、个人信息、歌单等）
│   └── pages/              # 预留目录，后续路由页面可放此处
├── styles/                 # 页面样式（在 app 路由外，避免被 Expo Router 扫描）
│   ├── home.ts             # 首页
│   ├── me.ts               # 我的
│   └── music.ts            # 音乐馆
├── stores/                 # Zustand 状态管理
│   ├── usePlayerStore.ts   # 播放器状态（当前曲目、播放进度等）
│   └── useUserStore.ts     # 用户状态（登录态、用户信息、token 持久化）
├── utils/                  # 工具函数
│   └── authStorage.ts      # 跨平台认证存储（Native 用 SecureStore，Web 用 localStorage）
├── assets/                 # 图标、启动图等静态资源
├── app.json                # Expo 应用配置（名称、图标、splash 等）
├── babel.config.js         # Babel 配置（含 Reanimated 等插件）
├── package.json            # 依赖与脚本
└── tsconfig.json           # TypeScript 配置（含路径别名 @/*）
```

### 路径别名

在 `tsconfig.json` 中配置了 `baseUrl` 与 `paths`，`@/*` 指向项目根目录（与 `package.json` 同级）。示例：`import { styles } from "@/styles/me"`、`import { useUserStore } from "@/stores/useUserStore"`。Metro 通过 `babel-plugin-module-resolver` 解析。

### 运行

```bash
cd app
pnpm install
pnpm start
```
