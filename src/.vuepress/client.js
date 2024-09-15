import { defineClientConfig } from "vuepress/client";
import equip from "./components/equip.vue";
import accessory from "./components/accessory.vue";

export default defineClientConfig({
  enhance: ({ app, router, siteData }) => {
    app.component("equip", equip);
    app.component("accessory", accessory);
  },
});