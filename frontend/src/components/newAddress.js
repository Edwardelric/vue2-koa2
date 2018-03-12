import Vue from 'vue'
import PickerComponent from './newAddress.vue'

const PickerConstructor = Vue.extend(PickerComponent)

const init = (propsData) => {
  return new PickerConstructor({
    propsData
  }).$mount(document.createElement('div'))
}

const Picker = (options = {}) => {
  const instance = init({
    showItemCount: options.showItemCount || 5,
    slots: options.slots,
    originData: options.originData || [],
    transitionName: options.transition || "picker",
    className: options.className || "",
    confirmText: options.confirmText || "确定",
    cancelText: options.cancelText || "取消",
    hideCancelBtn: options.hideCancelBtn || false,
    maskOpacity: options.maskOpacity,
    maskColor: options.maskColor || "#ccc"
  })
  instance.onShow = options.onShow ? options.onShow.bind(null, instance) : (() => {})
  instance.onHide = options.onHide ? options.onHide.bind(null, instance) : (() => {})
  instance.onChange = options.onChange ? options.onChange.bind(null, instance) : (() => {})
  instance.onConfirm = options.onConfirm ? options.onConfirm.bind(null, instance, instance.datas) : (() => {instance.value = false});
  instance.onCancel = options.onCancel ? options.onCancel.bind(null, instance) : (() => {instance.value = false})
  
  instance.value = options.open || true;
  instance.onMaskClick = options.onMaskClick ? options.onMaskClick.bind(null, instance) : (() => {});
  
  document.body.appendChild(instance.$el);
  return instance
}

Vue.$Picker = Vue.prototype.$Picker = Picker;

export default Picker
