<template>
    <transition :name="transitionName">
      <div class="picker-wrapper" :className="className" v-if="visible">
        <div class="mask"></div>
        <div class="wrapper">
          <ul class="btn-groups">
            <li v-if="!hideCancelBtn" @click="cancelFn">{{cancelText}}</li>
            <li @click="confirmFn">{{confirmText}}</li>
          </ul>
          <div class="picker-container" :style="{height:  showItemCount * lineHeight + 'px'}">
            <new-address-slot v-for="(slot, index) in slotsLists" :key="index"
              :values="slot.values"
              :selectedValues="slot.selectedValues || {}"
              :type="slot.type"
              :content="slot.content"
              :textAlign="slot.textAlign"
              :loopIndex="index"
              :lineHeight="lineHeight"
              :style="{
                'height': slot.values.length * lineHeight + 'px',
                'marginTop': (showItemCount - 1) / 2 * lineHeight + 'px'
              }"
              @change = "addressChange"
            >
            </new-address-slot>
            <div class="selected-top-line" ref="selectedTopLine"></div>
            <div class="selected-bottom-line" ref="selectedBottomLine"></div>
          </div>
        </div>
      </div>
    </transition>
</template>

<script type="text/ecmascript-6">
  import NewAddressSlot from "./newAddressSlot";

	export default {
	  name: "newaddress",
    props: {
      slots: {                      // 联动数据结构
        type: Array,
        default: []
      },
      originData: {                 // 原始数据
        type: Array,
        default: []
      },
      showItemCount: {              // 显示个数
        type: Number,
        default: 5
      },
      lineHeight: {
        type: Number,
        default: 40
      },
      transitionName: {             // transitionName className
        type: String,
        default: false
      },
      className: {                  // picker-wrapper添加自定义className
        type: String,
        default: false
      },
      confirmText: {                // 确认文案
	      type: String,
        default: "确定"
      },
      cancelText: {                 // 取消文案
	      type: String,
        default: "取消"
      },
      hideCancelBtn: {              // 是否隐藏取消按钮
	      type: Boolean,
        default: false
      },
      value: {                      // 是否显示弹窗
        type: Boolean,
        default: false
      },
      onShow: {
	      type: Function,
        default: () => {}
      },
      onHide: {
	      type: Function,
        default: () => {}
      },
      onInit: {
        type: Function,
        default: () => {}
      },
      onChange: {
        type: Function,
        default: () => {}
      },
      onConfirm: {
	      type: Function,
        default: () => {}
      },
      onCancel: {
	      type: Function,
        default: () => {}
      }
    },
		data() {
			return {
        visible: false,
        slotsLists: []
      };
		},
    watch: {
	    value(val) {
	      this.visible = val;
      }
    },
    created() {
      let curData = this.originData;
      this.slotsLists = JSON.parse(JSON.stringify(this.slots));
      this.slotsLists.forEach((item, index) => {
        if (item.type !== "divider") {
          if (item.selectedValues && (item.selectedValues.name || item.selectedValues.code)) {
            let selectedValues = item.selectedValues;
            curData.forEach((subItem, subIndex) => {
              if (subItem.code === selectedValues.code || subItem.name === selectedValues.name) {
                item.values = curData;
                curData = subItem[this.getKeyName(index+1)];
                return false;
              }
            })
          } else {
            item.values = curData;
            if (item.values[0]) {
              curData = item.values[0][this.getKeyName(index+1)];
              item.selectedValues.code = item.values[0].code;
              item.selectedValues.name = item.values[0].name;
            }
          }
        }
      });
      setTimeout(() => {
        this.onComplete(this.filterVal());
      }, 30);
    },
    components: {
      NewAddressSlot
    },
    methods: {
	    filterVal() {
        let arr = [];
        this.slotsLists.forEach((item, index) => {
          if (item.selectedValues && (item.selectedValues.code || item.selectedValues.name)) {
            arr[index] = Object.assign({}, item.selectedValues);
          } else {
            arr[index] = {};
          }
        });
        return arr;
      },
	    getKeyName(index) {
	      let step = index;
        while(this.slotsLists[step] && (!this.slotsLists[step].keyName)) {
          step += 1;
        }
        if (this.slotsLists[step]) {
          let keyname = this.slotsLists[step].keyName || "";
          return keyname;
        } else {
          return ""
        }
      },
      addressChange(changeIndex, selectedData) {
        let {code, name} = selectedData;
        this.slotsLists[changeIndex].selectedValues = {
          code,
          name
        };
        let curData = this.address;
        this.slotsLists.forEach((item, index) => {
          if (index >= changeIndex && (item.type !== "divider")) {
            if (index === changeIndex) {
              curData = selectedData[this.getKeyName(index+1)];
            } else {
              item.values = curData;
              if (item.values[0]) {
                curData = item.values[0][this.getKeyName(index+1)];
              }
              item.selectedValues.code = item.values[0] ? item.values[0].code || "" : "";
              item.selectedValues.name = item.values[0] ? item.values[0].name || "" : "";
            }
          }
        });
        this.onChange(this.filterVal());
      },
      confirmFn() {
        this.visible = false;
        this.onConfirm(this.filterVal());
      },
      cancelFn() {
        this.visible = false;
        this.onCancel(this.filterVal());
      },
      maskClick() {
        this.onMaskClick();
      },
      logFn(txt) {
//        console.log(txt);
      }
    }
	};
</script>

<style lang="scss">
  .picker-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    background: #fff;
    .wrapper {
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 100;
      width: 100%;
      background: #fff;
      transition: all .5s ease-in;
    }
    .mask {
      transition: all .4s ease-in;
    }
    &.picker-enter-active, &.picker-leave-active {
      .wrapper {
        opacity: 1;
        transform: translate3d(0, 100%, 0);
      }
      .mask {
        opacity: 1;
      }
    }
    &.picker-enter-to, &.picker-leave {
      .wrapper {
        transform: translate3d(0, 0, 0);
        opacity: 0;
      }
      .mask {

        opacity: 0;
      }
    }
    .btn-groups {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      padding: 20px 20px 0 20px;
      font-size: 17px;
      color: #4990E2;
      text-align: center;
    }
    .picker-container {
      overflow: hidden;
      position: relative;
      height: 200px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      -webkit-mask-box-image: linear-gradient(0deg, transparent, transparent 5%, #fff 20%, #fff 80%, transparent 95%, transparent);
      line-height: 40px;
      .picker {
        flex: 1 0 0;
        overflow: hidden;
        transition: transform .45s ease;
        &.left {
          li {
            text-align: left;
          }
        }
        &.right {
          li {
            text-align: right;
          }
        }
        &.center {
          li {
            text-align: center;
          }
        }
        li {
          backface-visibility: hidden;
          p {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #B3B3B3;
            font-size: 14px;
            text-align: center;
            position: relative;
            top: 0;
            left: 0;
          }
          &.selected {
            color: #404040;
          }
        }
      }
      .divider {
        flex: 0 0 auto;

      }
    }
    .selected-top-line, .selected-bottom-line {
      position: absolute;
      top: 50%;
      left: 0;
      width: 100%;
      border-top: 1px solid #ccc;
    }
    .selected-top-line {
      transform: translate(0, -20px);
    }
    .selected-bottom-line {
      transform: translate(0, 20px);
    }
  }
</style>
