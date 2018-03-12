<template>
  <div class="address">
    <!--<Picker :slotsLists="addressSlots" @change="addressChange" :address="address"></Picker>-->
    <div @click="showPicker">地区选择</div>
    <p>
      {{regions}}
    </p>
    <p> {{cities}} </p>
    <p>{{areas}}</p>
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
              code: "440000",
              name: "广东省",
            }
          },
          {
            textAlign: "center",
            values: ["北京市"],
            className: "ccc",
            selectedValues: {
              code: "440200",
              name: "韶关市",
            }
          },
          {
            textAlign: "center",
            values: ["东城区"],
            selectedValues: {
              code: "440233",
              name: "新丰县"
            }
          }
        ],
        address: Regions,
        regions: null,
        cities: null,
        areas: null
      };
    },
    created() {
      this.showPicker();
    },
    mounted() {},
    methods: {
      showPicker() {
        let a = this.$Picker({
          slots: [
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
              textAlign: "center",
              values: [],
              className: "ccc",
              selectedValues: {
                code: "440200",
                name: "韶关市",
              }
            },
            {
              textAlign: "center",
              values: [],
              selectedValues: {
                code: "440233",
                name: "新丰县"
              }
            }
          ],
          originData: Regions,
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
