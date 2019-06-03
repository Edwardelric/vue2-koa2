<template>
  <div class="tips">
      <h1>组件之间的通讯</h1>
      <p>1. provide 与 inject 可以跨层级通信</p>
      <p>2. dispatch 与 boardcast 派发与广播事件开发</p>
      <p>3. bus派发和广播事件开发</p>
      
      <provider-com></provider-com>
      <div @click="boardcastEvent">广播传播</div>
      <!-- <h2>Form表单设置</h2> -->
      <!-- <k-form1 :model="model" :rules="rules" ref="loginForm">
          <k-form-item1 lable="用户名" prop="usename">
              <k-input1 v-model="model.username"></k-input1>
          </k-form-item1>
      </k-form1> -->
      <h2>Form表单设置</h2>
      <k-form :model="model" :rules="rules" ref="loginForm">
        <k-form-item label="用户名" prop="username">
            <k-input v-model="model.username"></k-input>
        </k-form-item>
        <k-form-item label="确认密码" prop="password">
            <k-input type="password" v-model="model.password"></k-input>
        </k-form-item>
        <k-form-item>
            <button @click="submitForm('loginForm')">确定</button>
        </k-form-item>
      </k-form>
      <h3>title: Learn1</h3>
        <learn1></learn1>
        <learn2></learn2>
       <button @click="message">点我</button> 
       <!-- <anchored-heading :level="4">Hello world!</anchored-heading> -->
       <!-- <kBox >
          哈哈
        </kBox> -->
        <tree></tree>
  </div>
</template>

<script type="text/ecmascript-6">
import ProviderCom from '../testComponents/Provide';
import KForm from '../testComponents/KForm';
import KForm1 from '../testComponents/KForm.1';
import KFormItem from '../testComponents/kFormItem';
import KFormItem1 from '../testComponents/kFormItem.1';
import KInput from '../testComponents/KInput';
import KInput1 from '../testComponents/KInput.1';
import Learn1 from '../testComponents/learnvuex/index1';
import Learn2 from '../testComponents/learnvuex/index2';
import KBox from '../testComponents/notice/Box';
import Tree from '../testComponents/Tree';

export default {
    provide() {
        return {
            title: this
        }
    },
    data() {
        return {
            title: 'Edward',
            name: 'formTxtName',
            model: {
                username: '',   
                password: ''
            },
            rules: {
                username: [
                    {required: true, message: '请输入用户名'},
                    {type: 'email', message: '邮箱格式不正确'}
                ],
                password: [
                    {required: true, message: '请输入密码'}
                ]
            }
        }
    },
    mounted() {
        this.$on('dispatch', msg => {
            this.title = 'Edward chagne2';
        })
        // this.$bus.$on('busClick', (data) => {
        //     console.log('22');
        //     console.log(this);
        //     this.title = 'Edward change';
        // })
    },
    methods: {
        message() {
            this.$Notice.init({
                content: '必须的1!',
                duration: 2
            })
        },
        boardcastEvent() {
            this.$boardcast('boardcast', 'edward')
        },
        submitForm(form) {
            console.log(this.$refs[form]);
            this.$refs[form].validate(valid => {
                if (valid) {
                    console.log('请求登录!');
                } else {
                    console.log('校验失败');
                }
            })
        }
    },
    components: {
        ProviderCom,
        KForm,
        KFormItem,
        KInput,
        KForm1,
        KFormItem1,
        KInput1,
        Learn1,
        Learn2,
        KBox,
        Tree
    }
}
</script>

<style lang="scss">
  .tips {
    height: 100%;
    background: #fff;
  }
</style>
