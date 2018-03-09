<template>
  <div class="picker-wrapper">
    <div class="picker-container">
      <PickerSlot v-for="(item, index) in slotsLists" :key="index" :divider="!!item.divider" :values="item.values || []" :selectedValues="item.selectedValues || {}" :class="[item.className, item.textAlign]" :loopIndex="index" @change="addressChange"></PickerSlot>
      <div class="selected-top-line"></div>
      <div class="selected-bottom-line"></div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import PickerSlot from "./PickerRegionsSlot";

	export default {
	  name: "picker-regions",
    props: {
      slotsLists: {
        type: Array,
        default: [],
        required: false
      },
      address: {
        type: Array,
        default: [],
        required: false
      }
    },
		data() {
			return {

      };
		},
    created() {
      let curData = this.address;
      let keyNames = ["", "cities", "areas"];
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
      }
    },
    components: {
      PickerSlot
    }
	};
</script>

<style lang="scss">
  .picker-wrapper {
    position: relative;
    .picker-container {
      overflow: hidden;
      height: 240px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-around;
      -webkit-mask-box-image: linear-gradient(0deg, transparent, transparent 5%, #fff 20%, #fff 80%, transparent 95%, transparent);
      .picker {
        flex: 1 0 0;
        margin-top: 100px;
        transition: transform 0.45s ease;
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
          height: 40px;
          color: #B3B3B3;
          font-size: 14px;
          line-height: 40px;
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
      transform: translateY(-20px);
    }
    .selected-bottom-line {
      transform: translateY(20px);
    }
  }
</style>
