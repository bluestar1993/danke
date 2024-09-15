<script setup>
import { ref } from "vue";

const props = defineProps({
  name: {
    type: String,
    default: "精确制导系统",
  },
  quality: {
    type: String,
    default: "神器",
  },
  img: {
    type: String,
    default: ["/assets/img/bg_color_2.png", "/assets/img/ATK3_16-iGrRn6d2.png"],
  },
  attr: {
    type: Array,
    default: [
      "攻击 +30",
      "无人机：自动制导（导弹会自动跟踪射程范围内的敌人，但是会降低发射频率）",
      "攻击+200",
      "毁灭者专属：新型挂载弹头（恢复发射频率，并且导弹爆炸范围翻倍）",
      "无人机：初始2级毁灭者：追踪范围增加，导弹数量增加",
    ],
  },
  enchant: {
    type: Object,
    default: {
      50: "最终攻击+200，最终生命+800",
      100: "毁灭者附带1个攻击僚机（自动攻击最近目标）",
      150: "最终攻击+400，最终生命+1600",
      200: "攻击僚机+25%伤害",
      250: "最终攻击+600，最终生命+2400",
      300: "毁灭者附带1个强化僚机（间歇性强化毁灭者的伤害）",
      350: "最终攻击+800，最终生命+3200",
      400: "精确制导系统攻击+5%",
      450: "强化僚机伤害强化效果+10%",
      500: "最终攻击+1000，最终生命+4000",
      550: "精确制导系统攻击+5%",
      600: "攻击僚机的攻击间隔-2秒",
      700: "最终攻击+1200，最终生命+4800",
      800: "精确制导系统攻击+5%",
      900: "强化僚机伤害强化效果+10%",
      1000: "最终攻击+1400，最终生命+5600",
      1100: "精确制导系统攻击+5%",
      1200: "攻击僚机伤害+50%",
      1350: "最终攻击+1600，最终生命+6400",
      1500: "精确制导系统攻击+5%",
      1650: "强化僚机的强化间隔-1秒",
      1800: "最终攻击+1800，最终生命+7200",
      1950: "精确制导系统攻击+5%",
      2100: "攻击僚机单次发射子弹数量+5,攻击僚机的攻击间隔-1秒",
      2250: "最终攻击+2000，最终生命+8000",
      2400: "精确制导系统攻击+5%",
      2550: "强化僚机伤害强化效果+30%",
      2700: "最终攻击+2500，最终生命+10000",
      2850: "精确制导系统攻击+5%",
      3000: "额外召唤一个攻击僚机",
      3500: "最终攻击+3000，最终生命+12000",
      4000: "精确制导系统攻击+5%",
      4500: "攻击僚机伤害+25%，攻击僚机单次发射子弹数量+5",
      5000: "最终攻击+3500，最终生命+14000",
      5500: "精确制导系统攻击+5%",
      6000: "强化僚机的强化间隔-1秒",
      6500: "最终攻击+4000，最终生命+16000",
      7000: "精确制导系统攻击+5%",
      7500: "攻击僚机伤害+25%",
      8000: "最终攻击+6000，最终生命+24000",
      8500: "精确制导系统攻击+5%",
      9000: "强化僚机伤害强化效果+20%",
    },
  },
});

const quality_bg = {
  传奇: "#F42C50",
  神器: "linear-gradient(135deg,#4edff4 0%,#e279e0 45%,#ffffff 60%,#787ed6 100%)",
};

const show = ref(false);

const switch_button = ref(true);

const quality_and_enchant = ref([
  props.attr.length,
  Object.keys(props.enchant).length,
  // props.enchant_1.length,
  // props.enchant_2.length,
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
  <div class="accessory" v-if="show">
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
    </div>
    <div class="main">
      <div class="list">
        <div class="title">
          <span>{{ switch_button ? "品质技能" : "神铸效果" }}</span>
          <label class="switch" v-if="Object.keys(props.enchant).length">
            <input type="checkbox" @click="switch_button = !switch_button" />
            <span class="slider"></span>
          </label>
        </div>
        <ul class="attr" v-if="switch_button">
          <li v-for="i in attr" v-html="i"></li>
        </ul>

        <ul
          class="enchant"
          v-if="!switch_button && Object.keys(props.enchant).length"
        >
          <li
            :class="index < quality_and_enchant[1] ? '' : 'lock'"
            @click="lock(1, index + 1)"
            v-for="(v, k, index) in enchant"
            :key="index"
          >
            <span class="k">{{ k }}</span>
            <span class="v"  v-html="v"></span>
          </li>
        </ul>
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
  min-height: 135px;
  width: 120px;
  height: 135px;

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
      min-width: 60%;
      /* min-height: 60%; */
      width: 60%;
      /* height: 60%; */
      aspect-ratio: 1;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
  }

  @media (max-width: 719px) {
    & {
      min-width: 80px;
      min-height: 90px;
      width: 80px;
      height: 90px;
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
.accessory {
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
    justify-content: center;
    align-items: center;
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
            background-image: url("../public/assets/img/accessory_enchant.png");
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
          background-color: #0dbbff;
        }
        li:nth-child(2):before {
          background-color: #c705f9;
        }
        li:nth-child(3):before {
          background-color: #fef80c;
        }
        li:nth-child(4):before {
          background-color: #f42343;
        }
        li:nth-child(5):before {
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
        overflow-y: overlay;
        max-height: calc((0.8em + 20px) * 11);

        /* 1. 滚动条轨道（背景） */
        &::-webkit-scrollbar {
          width: 10px; /* 宽度 */
        }

        /* 2. 滚动条滑块 */
        &::-webkit-scrollbar-thumb {
          background-color: #888; /* 滚动条滑块的颜色 */
          border-radius: 8px; /* 滚动条滑块的圆角 */
        }

        /* 3. 滚动条轨道的背景 */
        ::-webkit-scrollbar-track {
          background-color: #f1f1f1; /* 滚动条轨道的颜色 */
          border-radius: 8px; /* 滚动条轨道的圆角 */
        }

        li:before {
          content: none;
        }

        li {
          margin: 1em 0;

          .k {
            width: 18%;
            text-align: center;
            padding-right: 3em;
            font-size: .9em;
          }

          .v {
            position: relative;
            padding: 3px 8px;
            border-radius: 8px;
            background: #2b3141;
            width: 82%;

            &::before {
              content: "";
              border-left: 4px #9ced0a solid;
              height: calc(100% + 1em + 2px);
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              left: calc(-2em + 4px);
            }

            &::after {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              content: "";
              display: block;
              width: 12px;
              height: 12px;
              border-radius: 50%;
              background-color: #9ced0a;
              left: -2em;
            }
          }
        }

        .lock {
          .k {
            filter: brightness(0.5);
          }
          .v {
            filter: brightness(0.5);
            background: #2b3141;
          }
        }
      }
    }
  }
}
</style>
