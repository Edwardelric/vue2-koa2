<template>
    <div class="address">
      <Picker :slotsLists="addressSlots" @change="addressChange" :address="address"></Picker>
      <p>
        {{addressSlots[0].selectedValues ? addressSlots[0].selectedValues.code : ""}} :
        {{addressSlots[0].selectedValues ? addressSlots[0].selectedValues.name: ""}}
      </p>
      <p>
        {{addressSlots[1].selectedValues ? addressSlots[1].selectedValues.code : ""}} :
        {{addressSlots[1].selectedValues ? addressSlots[1].selectedValues.name: ""}}
      </p>
      <p>
        {{addressSlots[2].selectedValues ? addressSlots[2].selectedValues.code : ""}} :
        {{addressSlots[2].selectedValues ? addressSlots[2].selectedValues.name: ""}}
      </p>
    </div>
</template>

<script type="text/ecmascript-6">
  import Picker from "@/components/PickerRegions";
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
        address: Regions
      };
		},
    created() {

    },
    mounted() {},
    methods: {
      addressChange(...data) {
        console.log(data);
      }
    },
    components: {
		  Picker
    }
	};
</script>

<style lang="scss">


</style>
