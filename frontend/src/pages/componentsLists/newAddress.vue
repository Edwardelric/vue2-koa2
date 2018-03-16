<template>
  <div class="address">
    <!--<Picker :slotsLists="addressSlots" @change="addressChange" :address="address"></Picker>-->
    <div @click="showPicker">地区选择</div>
    <p>原始</p>
    <p>{{slotArr[0].selectedValues}}</p>
    <p>{{slotArr[1].selectedValues}}</p>
    <p>{{slotArr[2].selectedValues}}</p>
    <p>----</p>
    <p>选择后的</p>
    <p>{{regions}}</p>
    <p>{{cities}} </p>
    <p>{{areas}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  import Picker from "@/components/newAddress.js";
  import Regions from "@/mock/regions";

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
            code: "460000",
            name: "海南省",
          }
        },
        {
          textAlign: "center",
          values: [],
          className: "ccc",
          selectedValues: {
            code: "460200",
            name: "三亚市",
          }
        },
        {
          textAlign: "center",
          values: [],
          selectedValues: {

          }
        }
      ];
      this.showPicker();
    },
    mounted() {},
    methods: {
      showPicker() {
        let self = this;
        let a = this.$Picker({
          slots: self.slotArr,
          originData: Regions,
          onComplete: (instance, changeInfo) => {
            console.log(changeInfo);
            this.regions = changeInfo[0];
            this.cities = changeInfo[1];
            this.areas = changeInfo[2];
          },
          onChange: (instance, changeInfo) => {
            this.regions = changeInfo[0];
            this.cities = changeInfo[1];
            this.areas = changeInfo[2];
          },
          onConfirm: (instance, changeInfo) => {
            console.log(changeInfo);
            self.slotArr[0].selectedValues = changeInfo[0];
            self.slotArr[1].selectedValues = changeInfo[1];
            self.slotArr[2].selectedValues = changeInfo[2];
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
