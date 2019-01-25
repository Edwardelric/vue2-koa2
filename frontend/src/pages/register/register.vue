<template>
  <div>
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    ></van-nav-bar>
    <div class="register-panel">
      <van-field
        v-model="userName"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="userName=''"
        :error-message = "userNameErrorMsg"
      ></van-field>
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        @click-icon="password=''"
        :error-message = "passwordErrorMsg"
      ></van-field>
      <div class="register-button">
        <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">马上注册</van-button>
      </div>
    </div>
    <div class="login">
      <router-link to="/login">已有账号? 点击登录</router-link>
    </div>
  </div>
</template>

<script>
  import {URL} from '@/utils/serviceAPI.js';
  import {Toast} from 'vant';

  export default {
    data() {
      return {
        userName: '',
        password: '',
        openLoading: false,   //是否开启按钮loading状态
        userNameErrorMsg: '', // 当前用户出现错误时的提示
        passwordErrorMsg: ''  // 当前用户密码错误提示
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      checkForm() {
        let isOk = true;
        if (this.userName.length < 5) {
          this.userNameErrorMsg = "用户名不能少于5位";
          isOk = false;
        } else {
          this.userNameErrorMsg = '';
        }
        if (this.password.length < 6) {
          this.passwordErrorMsg = "密码不能少于6位";
          isOk = false;
        } else {
          this.passwordErrorMsg = '';
        }
        return isOk;
      },
      registerAction() {
        this.checkForm() && this.axiosRegister();
      },
      axiosRegister() {
        this.openLoading = true;
        this.$ajax.post(URL.register, {
          userName: this.userName,
          password: this.password
        }).then(res => {
          if (!res.errorCode) {
            Toast.success(res.message);
          } else {
            Toast.fail('注册失败');
          }
          this.openLoading = false;
        }).catch(err => {
          Toast.fail('注册失败');
          this.openLoading = false;
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/_mixins";
  .register-panel {
    width: 96%;
    border-radius: 5px;
    margin: rem(20) auto;
  }
  .register-button {
    padding-top: rem(10);
  }
  .login {
    padding: 0 rem(10);
    text-align: right;
  }
</style>
