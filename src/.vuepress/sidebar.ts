import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      text: "图鉴",
      icon: "laptop-code",
      prefix: "encyclopedia/",
      children: "structure",
    }
  ],
});
