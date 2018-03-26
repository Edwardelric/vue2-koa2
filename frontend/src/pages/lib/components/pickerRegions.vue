<template>
  <div class="address">
    <div @click="showPicker">地区选择</div>
    <p>原始</p>
    <p>{{slotArr[0]?slotArr[0].selectedValues:"0"}}</p>
    <p>{{slotArr[1]?slotArr[1].selectedValues:"0"}}</p>
    <p>{{slotArr[2]?slotArr[2].selectedValues:"0"}}</p>
    <p>{{slotArr[3]?slotArr[3].selectedValues:"0"}}</p>
    <p>{{slotArr[4]?slotArr[4].selectedValues:"0"}}</p>
    <p>----</p>
    <p>选择后的</p>
    <p>{{regions}}</p>
    <p>{{cities}} </p>
    <p>{{areas}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  import Picker from "@/components/picker/pickerRegions.js";
  import Regions from "./regions";

  export default {
    data() {
      return {
        address: Regions,
        regions: {},
        cities: {},
        areas: {},
        slotArr: null
      };
    },
    created() {
      this.slotArr = [
        {
          textAlign: "center",
          values: Regions.map(x => x),
          className: "aaabb",
          selectedValues: {
            code: "440000",
            name: "广东省",
          }
        },
        {
          values: [],
          type: "divider",
          content: "+"
        },
        {
          textAlign: "center",
          values: [],
          className: "ccc",
          keyName: "cities",
          selectedValues: {
            code: "440100",
            name: "广州市",
          }
        },
        {
          values: [],
          type: "divider",
          content: "-"
        },
        {
          textAlign: "center",
          values: [],
          keyName: "areas",
          selectedValues: {
            code: "440104",
            name: "越秀区"
          }
        }
      ];
      this.showPicker();
    },
    mounted() {

    },
    methods: {
      showPicker() {
        let self = this;
        let a = this.$Picker({
          slots: self.slotArr,
          originData: Regions,
          onComplete: (instance, changeInfo) => {
            this.regions = changeInfo[0];
            this.cities = changeInfo[2];
            this.areas = changeInfo[4];
          },
          onChange: (instance, changeInfo) => {
            this.regions = changeInfo[0];
            this.cities = changeInfo[2];
            this.areas = changeInfo[4];
          },
          onConfirm: (instance, changeInfo) => {
            self.slotArr[0].selectedValues = {
              code: changeInfo[0].code,
              name: changeInfo[0].name
            };
            self.slotArr[2].selectedValues = {
              code: changeInfo[2].code,
              name: changeInfo[2].name
            };
            self.slotArr[4].selectedValues = {
              code: changeInfo[4].code,
              name: changeInfo[4].name
            }
          },
          onCancel: (instance, changeInfo) => {
            console.log(changeInfo);
          }
        });
      }
    },
    components: {

    }
  };


</script>

<style lang="scss">


</style>
