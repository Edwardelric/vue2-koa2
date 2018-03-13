<template>
  <div class="address">
    <!--<Picker :slotsLists="addressSlots" @change="addressChange" :address="address"></Picker>-->
    <div @click="showPicker">地区选择</div>
    <p>{{regions}}</p>
    <p>{{cities}} </p>
    <p>{{areas}}</p>
    <p>----</p>
    <p>{{slotArr[0].selectedValues}}</p>
    <p>{{slotArr[1].selectedValues}}</p>
    <p>{{slotArr[2].selectedValues}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  import Picker from "@/components/newAddress.js";
  import Regions from "@/mock/regions";

  export default {
    data() {
      return {
        addressSlots: [
          {
            textAlign: "center",
            values: Regions.map(x => x),
            className: "aaabb",
            selectedValues: {
              // code: "440000",
              // name: "广东省",
            }
          },
          {
            textAlign: "center",
            values: ["北京市"],
            className: "ccc",
            selectedValues: {
              // code: "440200",
              // name: "韶关市",
            }
          },
          {
            textAlign: "center",
            values: ["东城区"],
            selectedValues: {
              // code: "440233",
              // name: "新丰县"
            }
          }
        ],
        address: Regions,
        regions: null,
        cities: null,
        areas: null,
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
            // code: "440000",
            // name: "广东省",
          }
        },
        {
          textAlign: "center",
          values: [],
          className: "ccc",
          selectedValues: {
            // code: "440200",
            // name: "韶关市",
          }
        },
        {
          textAlign: "center",
          values: [],
          selectedValues: {
            // code: "440233",
            // name: "新丰县"
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
            this.regions = changeInfo[0];
            this.cities = changeInfo[1];
            this.areas = changeInfo[2];
            self.slotArr[0].selectedValues = changeInfo[0];
            self.slotArr[1].selectedValues = changeInfo[1];
            self.slotArr[2].selectedValues = changeInfo[2];
          },
          onChange: (instance, changeInfo) => {
            this.regions = changeInfo[0];
            this.cities = changeInfo[1];
            this.areas = changeInfo[2];
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
