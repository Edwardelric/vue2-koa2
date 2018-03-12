<template>
    <transition :name="transitionName">
      <!--<div class="mask" v-if="visible" key="mask"></div>-->
      <div class="picker-wrapper" :className="className" v-if="visible" key="pickerwrapper">
        <ul class="btn-groups">
          <li v-if="!hideCancelBtn" @click="visible=false">{{cancelText}}</li>
          <li>{{confirmText}}</li>
        </ul>
        <div class="picker-container" :style="{height: calContainerHeight + 'px'}">
          <new-address-slot v-for="(slot, index) in slotsLists"
                            :key="index"
                            :values="slot.values"
                            :type="slot.type"
                            :content="slot.content"
                            :textAlign="slot.textAlign"
                            :showItemCount="showItemCount"
                            :loopIndex="index"
                            :selectedValues="slot.selectedValues || {}"
                            @setItemHeight = setItemHeight
                            @change = addressChange
          >
          </new-address-slot>
          <div class="selected-top-line" ref="selectedTopLine"></div>
          <div class="selected-bottom-line" ref="selectedBottomLine"></div>
        </div>
      </div>
    </transition>
</template>

<script type="text/ecmascript-6">
  import NewAddressSlot from "./newAddressSlot";

	export default {
	  name: "newaddress",
    props: {
      value: {
        type: Boolean,
        default: false
      },
      showItemCount: {
        type: Number,
        default: 5
      },
      slots: {
        type: Array,
        default: []
      },
      originData: {
        type: Array,
        default: []
      },
      transitionName: {
        type: String,
        default: false
      },
      className: {
        type: String,
        default: false
      },
      confirmText: {
	      type: String,
        default: "确定"
      },
      cancelText: {
	      type: String,
        default: "取消"
      },
      hideCancelBtn: {
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
        lineHeight: 0,
        visible: false,
        slotsLists: []
      };
		},
    watch: {
	    value(val) {
	      this.visible = val;
      },
      visible(val) {
	      this.visible = val;
      }
    },
    created() {
      let curData = this.originData;
      let keyNames = ["", "cities", "areas"];
      this.slots.forEach((item, index) => {
        if (item.selectedValues && (item.selectedValues.name || item.selectedValues.code)) {
          let selectedValues = item.selectedValues;
          curData.forEach((subItem, subIndex) => {
            if (subItem.code === selectedValues.code || subItem.name === selectedValues.name) {
              item.values = curData;
              curData = subItem[keyNames[index+1]];
              return false;
            }
          })
        } else {
          item.values = curData;
          curData = item.values[0][keyNames[index+1]];
          item.selectedValues.code = item.values[0].code;
          item.selectedValues.name = item.values[0].name;
        }
      });
      this.slotsLists = this.slots;
      console.log(this.slotsLists);
    },
    components: {
      NewAddressSlot
    },
    computed: {
      calContainerHeight() {
        return this.lineHeight * this.showItemCount;
      }
    },
    methods: {
      addressChange(changeIndex, selectedData) {
        let {code, name} = selectedData;
        this.slots[changeIndex].selectedValues = {
          code,
          name
        };
        let keyNames = ["", "cities", "areas"];
        let curData = this.address;
        this.slots.forEach((item, index) => {
          if (index >= changeIndex) {
            if (index === changeIndex) {
              curData = selectedData[keyNames[index+1]];
            } else {
              item.values = curData;
              curData = item.values[0] ? item.values[0][keyNames[index+1]] : [];
              item.selectedValues.code = item.values[0] ? (item.values[0].code || "") : "";
              item.selectedValues.name = item.values[0] ? (item.values[0].name || "") : "";
            }
          }
        })
        this.onChange([
          this.slots[0].selectedValues,
          this.slots[1].selectedValues,
          this.slots[2].selectedValues
        ]);
      },
      setItemHeight(height) {
        this.lineHeight = height;
      },
      maskClick() {
        this.onMaskClick();
      }
    }
	};
</script>

<style lang="scss">
  .picker-enter-active, .picker-leave-active {
    transition: all .3s;
    opacity: 1;
    transform: translate3d(0, 100%, 0);
  }
  .picker-enter-to, picker-leave-to{
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  .picker-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    background: #fff;
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
      justify-content: space-around;
      -webkit-mask-box-image: linear-gradient(0deg, transparent, transparent 5%, #fff 20%, #fff 80%, transparent 95%, transparent);
      line-height: 40px;
      .picker {
        flex: 1 0 0;
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
          color: #B3B3B3;
          font-size: 14px;
          text-align: center;
          &.selected {
            color: #404040;
          }
        }
      }
      .divider {
        flex: 0 0 auto;
        display: flex;
        align-self: stretch;
        align-items: center;
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
