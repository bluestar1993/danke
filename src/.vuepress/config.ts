import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "蛋壳 life station",
  description: "不肝不氪享受游戏从我做起",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
