<template>
    <div class="address">
      <p class="btn"><router-link to="/transition">跳转到地区选择demo页</router-link></p>
      <p @click="showAddressPopupFn">点击是否显示地区选择弹窗</p>
      <!--showAddress  是否开启弹窗选择三级联动-->
      <!--addressSlots 是三级联动数据-->
      <!--className picker-wrapper dom 节点的样式名-->
      <!--change 三级联动选择后的callback-->
      <PickerRegions
        :showAddress="showAddressPopup"
        :slotsLists="addressSlots"
        :address="address"
        :className="'pickerWrapper'"
        @cancel="cancelFn"
        @confirm="confirm"
        @change="addressChange"
      ></PickerRegions>
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
      <div class="mask" v-if="showAddressPopup"></div>
    </div>
</template>

<script type="text/ecmascript-6">
  import PickerRegions from "@/components/PickerRegions";
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
//              code: "440000",
//              name: "广东省",
            }
          },
          {
            textAlign: "center",
            values: ["北京市"],
            className: "ccc",
            selectedValues: {
//              code: "440200",
//              name: "韶关市",
            }
          },
          {
            textAlign: "center",
            values: ["东城区"],
            selectedValues: {
//              code: "440233",
//              name: "新丰县"
            }
          }
        ],
        address: Regions,
        showAddressPopup: false
      };
		},
    created() {

    },
    mounted() {

    },
    methods: {
      addressChange(...data) {
//        console.log(data);
      },
      showAddressPopupFn() {
        this.showAddressPopup = !this.showAddressPopup;
      },
      cancelFn(...args) {
//        this.showAddressPopup = false;
//        this.addressSlots[0] = args[0]
//        this.addressSlots[1] = args[1]
//        this.addressSlots[2] = args[2];
        this.showAddressPopup = false;
      },
      confirm(...args) {
        console.log(args);
        this.showAddressPopup = false;
      }
    },
    components: {
      PickerRegions
    }
	};
</script>

<style lang="scss">
  .pickerWrapper {
    div.picker-container {
      /*line-height: 30px!important;*/
    }
  }
</style>
