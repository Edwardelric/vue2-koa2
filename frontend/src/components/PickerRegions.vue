<template>
    <transition name="showAddress" :class="className"  v-if="showAddress">
      <div class="picker-wrapper" :class="className">
        <ul class="btn-lists">
          <li @click="cancelFn">取消</li>
          <li @click="confirmFn">确定</li>
        </ul>
        <div class="picker-container">
          <PickerSlot v-for="(item, index) in slotsLists" :key="index" :divider="!!item.divider" :values="item.values || []" :selectedValues="item.selectedValues || {}" :class="[item.className, item.textAlign]" :loopIndex="index" @change="addressChange" @setLinePosition="setLinePosition"></PickerSlot>
          <div class="selected-top-line" ref="selectedTopLine"></div>
          <div class="selected-bottom-line" ref="selectedBottomLine"></div>
        </div>
      </div>
    </transition>
</template>

<script type="text/ecmascript-6">
  import PickerSlot from "./PickerRegionsSlot";

	export default {
	  name: "picker-regions",
    props: {
      showAddress: {
	      type: Boolean,
        default: false,
        required: false
      },
      slotsLists: {
        type: Array,
        default: [],
        required: false
      },
      address: {
        type: Array,
        default: [],
        required: false
      },
      className: {
        type: String,
        default: "",
        required: false
      }
    },
		data() {
			return {};
		},
    created() {
      let curData = this.address;
      let keyNames = ["", "cities", "areas"];
      this.slotsCopy = this.slotsLists.slice();
      this.slotsLists.forEach((item, index) => {
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
    },
    methods: {
      addressChange(changeIndex, selectedData) {
        let {code, name} = selectedData;
        this.slotsLists[changeIndex].selectedValues = {
          code,
          name
        };
        let keyNames = ["", "cities", "areas"];
        let curData = this.address;
        this.slotsLists.forEach((item, index) => {
          if (index >= changeIndex) {
            if (index === changeIndex) {
              curData = selectedData[keyNames[index+1]];
            } else {
              item.values = curData;
              curData = item.values[0][keyNames[index+1]];
              item.selectedValues.code = item.values[0] ? (item.values[0].code || "") : "";
              item.selectedValues.name = item.values[0] ? (item.values[0].name || "") : "";
            }
          }
        });
        this.$emit("change",
          this.slotsLists[0].selectedValues,
          this.slotsLists[1].selectedValues,
          this.slotsLists[2].selectedValues,
        );
      },
      setLinePosition(val) {
        // tips 如果开发强行设置了li的高度或picker-container的高度,则必须重新计算
        if (val !== 40) {
          this.$refs.selectedTopLine.style.cssText = `transform: translate(0, -${val / 2}px)`;
          this.$refs.selectedBottomLine.style.cssText = `transform: translate(0, ${val / 2}px)`;
        }
      },
      cancelFn() {
//        this.slotsLists[0] = this.slotsCopy[0];
//        this.slotsLists[1] = this.slotsCopy[1];
//        this.slotsLists[2] = this.slotsCopy[2];
//        console.log(this.slotsCopy);
        this.$emit("cancel");
      },
      confirmFn() {
        this.$emit("confirm",
          this.slotsLists[0].selectedValues,
          this.slotsLists[1].selectedValues,
          this.slotsLists[2].selectedValues
        );
      }
    },
    components: {
      PickerSlot
    }
	};
</script>

<style lang="scss">
  .showAddress-enter-active, .showAddress-leave-active {
    transition: all .4s ease;
    opacity: 1;
    transform: translate(0, 0);
  }
  .showAddress-enter{
    transform: translate(0, 100%);
    opacity: 0;
  }

  .picker-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    background: #fff;
    .btn-lists {
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
        margin-top: 80px;
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
