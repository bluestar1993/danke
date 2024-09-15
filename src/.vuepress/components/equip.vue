<script setup>
import {  ref } from "vue";

const props = defineProps({
  name: {
    type: String,
    // default: "双绝枪 • 创星破灭",
  },
  quality: {
    type: String,
    // default: "神器",
  },
  img: {
    type: String,
    default: [
      // "/assets/image/gear/gear_bg_color.png",
      // "/assets/image/gear/gear_ss_weapon.png",
    ],
  },
  description: {
    type: String,
    // default:
    //   "拥有两种互相对立却又相辅相成的力量。永恒水晶赋予它稳固与守护的属性，而破坏之力则使其充斥着无尽的攻击潜能。",
  },
  attr: {
    type: Array,
    default: [
      // "攻击 +15%",
      // "创星：每发射 2 次永恒之耀触发一次能量过载，增加自身技能伤害 30% 持续 10s 可以叠加 2 次",
      // "创星破灭：血量越低突刺伤害越高",
      // "攻击 +25%",
      // "破灭新生：突刺时会发出破坏能量，被毁灭之痕命中的目标额外受到 10% 伤害",
      // "破灭新生：永恒之耀的最外圈会生压制之力",
    ],
  },
  enchant: {
    type: Array,
    default: [],
  },
  enchant_1: {
    type: Array,
    default: [],
  },
  enchant_2: {
    type: Array,
    default: [],
  },
});

const quality_bg = {
  传奇: "#F42C50",
  神器: "linear-gradient(135deg,#4edff4 0%,#e279e0 45%,#ffffff 60%,#787ed6 100%)",
};

// 显示装备详情
const show = ref(false);

const switch_button = ref(true);

const enchant_1_close = ref(false);
const enchant_2_close = ref(false);

const quality_and_enchant = ref([
  props.attr.length,
  props.enchant.length,
  props.enchant_1.length,
  props.enchant_2.length,
  // 0,
  // 0,
  // 0,
]);

function lock(quality_and_enchant_index, index) {
  //   console.log(quality_and_enchant_index, index);

  if (index == 1 && quality_and_enchant.value[quality_and_enchant_index] == 1) {
    quality_and_enchant.value[quality_and_enchant_index] = 0;
  } else {
    quality_and_enchant.value[quality_and_enchant_index] = index;
  }
}
</script>
<template>
  <div class="button" @click="show = !show" v-if="!show">
    <div class="root">
      <div class="bg" :style="{ backgroundImage: `url(${img[0]})` }">
        <div class="img" :style="{ backgroundImage: `url(${img[1]})` }"></div>
      </div>
    </div>
    <div class="name">{{ name.split("•")[0] }}</div>
  </div>

  <div class="mask" @click="show = !show" v-if="show"></div>
  <div class="equip" v-if="show">
    <div class="quality" :style="{ background: quality_bg[quality] }">
      {{ quality }}
    </div>
    <div class="name">{{ name }}</div>
    <div class="close" @click="show = !show">
      <i class="icon-close"></i>
    </div>
    <div class="header">
      <div class="root">
        <div class="bg" :style="{ backgroundImage: `url(${img[0]})` }">
          <div class="img" :style="{ backgroundImage: `url(${img[1]})` }"></div>
        </div>
      </div>
      <div class="gear-info">
        <div class="description">{{ description }}</div>
      </div>
    </div>
    <div class="main">
      <div class="list">
        <div class="title">
          <span>{{ switch_button ? "品质技能" : "神铸效果" }}</span>
          <label class="switch">
            <input type="checkbox" @click="switch_button = !switch_button" />
            <span class="slider"></span>
          </label>
        </div>
        <ul class="attr" v-if="switch_button">
          <li v-for="i in attr">{{ i }}</li>
        </ul>

        <ul class="enchant" v-if="!switch_button && enchant.length">
          <li
            :class="index < quality_and_enchant[1] ? '' : 'lock'"
            @click="lock(1, index + 1)"
            v-for="(i, index) in enchant"
            :key="index"
          >
            {{ i }}
          </li>
        </ul>

        <div class="list" v-if="!switch_button && enchant_1.length">
          <div class="title">
            <span>永恒神铸效果</span>
            <div
              class="arrows"
              :class="{ 'arrows-close': enchant_1_close }"
              @click="enchant_1_close = !enchant_1_close"
            ></div>
          </div>
          <ul class="enchant" v-if="!enchant_1_close">
            <li
              :class="index < quality_and_enchant[2] ? '' : 'lock'"
              @click="lock(2, index + 1)"
              v-for="(i, index) in enchant_1"
              :key="index"
            >
              {{ i }}
            </li>
          </ul>
        </div>

        <div class="list" v-if="!switch_button && enchant_2.length">
          <div class="title">
            <span>破坏神铸效果</span>
            <div
              class="arrows"
              :class="{ 'arrows-close': enchant_2_close }"
              @click="enchant_2_close = !enchant_2_close"
            ></div>
          </div>
          <ul class="enchant" v-if="!enchant_2_close">
            <li
              :class="index < quality_and_enchant[3] ? '' : 'lock'"
              @click="lock(3, index + 1)"
              v-for="(i, index) in enchant_2"
              :key="index"
            >
              {{ i }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
  li {
    margin: 0;
    padding: 0;
  }
}

.root {
  min-width: 120px;
  min-height: 120px;
  width: 120px;
  height: 120px;

  .bg {
    display: flex;
    justify-content: center;
    align-items: center;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    min-width: 100%;
    min-height: 100%;
    width: 100%;
    height: 100%;

    .img {
      min-width: 73.75%;
      min-height: 73.75%;
      width: 73.75%;
      height: 73.75%;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }

  @media (max-width: 719px) {
    & {
      min-width: 80px;
      min-height: 80px;
      width: 80px;
      height: 80px;
    }
  }
}

.button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .root {
    cursor: pointer;
    transition: all 0.4s;

    &:hover {
      transform: scale(1.1);
    }
  }

  .name {
    font-size: 1em;
    text-align: center;
    line-height: 1.5;
    margin-top: 0.5em;
    white-space: pre-wrap;
  }
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 999;
}
.equip {
  color: #fff;
  background-color: #798093;
  position: relative;
  z-index: 1000;

  .quality {
    color: #000;
    height: 1.5em;
    width: 8em;
    border-radius: 8px;
    border: #000 solid;
    text-align: center;
    line-height: 1.5em;
    position: absolute;
    left: 50%;
    top: -0.75em;
    transform: translateX(-50%);
  }
  .name {
    -webkit-text-stroke: 1px #000;
    text-shadow: 1px 1px 2px #000, 3px 3px 2px #000;
    font-size: 1.5em;
    font-weight: bolder;
    background: linear-gradient(90deg, #fdee5f 0%, #f7af05 100%);
    text-align: center;
    line-height: 3;
    box-shadow: rgba(243, 242, 178, 0.3) 2px 6px 7px 2px inset,
      rgba(0, 0, 0, 0.5) -2px -6px 7px 0px inset,
      rgba(0, 0, 0, 0.8) 2px 6px 16px 0px;
  }
  .close {
    padding: 0;
    margin: 0;
    background-color: #575e6e;
    border: #000 solid;
    border-radius: 8px;
    position: absolute;
    width: 3em;
    cursor: pointer;
    aspect-ratio: 1.47;
    top: -0.75em;
    right: -0.75em;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(255, 255, 255, 0.5) 1px 2px 4px 2px inset,
      rgba(0, 0, 0, 0.5) -1px -2px 4px 2px inset,
      rgba(0, 0, 0, 0.8) 1px 2px 3px 0px;
    transition: all 0.3s;

    &:hover {
      filter: brightness(1.3);
    }
    .icon-close {
      display: block;
      width: 80%;
      height: 80%;
      background: url("../public/assets/img/close.svg");
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
  .header {
    display: flex;
    padding: 15px;

    .gear-info {
      margin-left: 15px;
      .description {
        padding: 0.5em;
        background-color: #656d84;
        border-radius: 8px;
      }
    }
  }
  .main {
    .list {
      margin: 15px;
      background-color: #636b82;
      border-radius: 8px;

      &:after {
        content: "";
        display: table;
        clear: both;
      }

      :first-child {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }

      :last-child {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }

      .title {
        background-color: #495166;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 1.25em;
        line-height: calc(1.5em + 6px);
        padding: 3px 15px;

        .switch {
          position: relative;
          display: inline-block;
          width: 3em;
          height: 1.5em;
          input {
            display: none;
          }
          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #31394c;
            transition: 0.4s;
            border-radius: 1.5em;
            box-shadow: rgba(0, 0, 0, 0.7) 0px 3px 6px 0px inset;

            &:before {
              position: absolute;
              content: "";
              height: calc(1.5em - 4px);
              width: calc(1.5em - 4px);
              left: 2px;
              bottom: 2px;
              background-image: url("../public/assets/img/attr.png");
              background-position: center;
              background-size: cover;
              background-repeat: no-repeat;
              transition: 0.4s;

              box-shadow: rgba(255, 255, 255, 0.5) 1px 2px 2px 0px inset,
                rgba(0, 0, 0, 0.5) -1px -2px 2px 0px inset,
                rgba(0, 0, 0, 0.5) 1px 2px 4px 0px;
              border-radius: 50%;
            }
          }

          input:checked + .slider {
            background-color: #f9b512;
          }

          input:checked + .slider:before {
            transform: translateX(1.5em);
            background-image: url("../public/assets/img/enchant.png");
          }
        }

        .arrows {
          width: 1em;
          height: 1em;
          background: url("../public/assets/img/arrows.svg");
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          cursor: pointer;

          transition: all 0.5s;
        }

        .arrows-close {
          transform: rotate(-180deg);
        }
      }
      ul {
        li {
          cursor: pointer;
          padding: 1px 15px;
          display: flex;
          align-items: center;

          &:hover {
            filter: brightness(0.7);
          }

          &:before {
            content: "";
            display: inline-block;
            flex-shrink: 0;
            width: 1em;
            height: 1em;
            border-radius: 50%;
            margin-right: 0.5em;
            border: #000 solid;
          }
        }
      }
      .attr {
        li:nth-child(1):before {
          background-color: #b7f305;
        }
        li:nth-child(2):before {
          background-color: #0dbbff;
        }
        li:nth-child(3):before {
          background-color: #c705f9;
        }
        li:nth-child(4):before {
          background-color: #fef80c;
        }
        li:nth-child(5):before {
          background-color: #f42343;
        }
        li:nth-child(6):before {
          background: linear-gradient(
            135deg,
            #4edff4 0%,
            #e279e0 45%,
            #ffffff 60%,
            #787ed6 100%
          );
        }
      }
      .enchant {
        li:before {
          content: "";
          display: inline-block;
          flex-shrink: 0;
          width: 1.25em;
          height: 1.25em;
          border: none;
          background-color: transparent;
          background-size: cover;
          background-image: url("../public/assets/img/star.svg");
        }
        .lock:before {
          background-image: url("../public/assets/img/lock.svg") !important;
        }
      }
    }
  }
}
</style>
