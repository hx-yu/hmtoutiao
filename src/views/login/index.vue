<template>
  <div class="login">
    <el-card class="login_card">
      <div class="login_header">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <el-form ref="myForm" :model="formData" :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="formData.mobile" placeholder="请输入您的手机号码"></el-input>
        </el-form-item>
        <el-form-item  prop="code">
          <el-input v-model="formData.code" style="width:65%;" placeholder="验证码"></el-input>
          <el-button style="float:right;" plain>发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="check">
          <el-checkbox v-model="formData.check">我已阅读并同意用户协议和隐私政策</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="loginCheck" style="width:100%;" type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        mobile: '',
        code: '',
        check: false
      },
      rules: {
        mobile: [{ required: true, message: '请输入手机号码' }, { pattern: /^1[3456789]\d{9}$/, message: '手机号码格式不正确' }],
        code: [{ required: true, message: '请输入验证码' }, { pattern: /^\d{6}$/, message: '验证码格式不正确' }],
        check: [{ validator (rule, value, callback) {
          value ? callback() : callback(new Error('请勾选'))
        } }]
      }
    }
  },
  methods: {
    loginCheck () {
      this.$refs.myForm.validate(isOk => {
        if (isOk) {
          this.$axios({
            url: '/authorizations',
            method: 'post',
            data: this.formData
          }).then(result => {
            let token = result.data.token
            window.localStorage.setItem('user_token', token)
            this.$router.push('/home')
          }).catch(() => {
            this.$message({
              message: '手机号或验证码不正确',
              type: 'warning'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login{
  height: 100vh;
  background: url('../../assets/img/login_bg.jpg');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_card{
    width: 400px;
    height: 360px;
    .login_header{
      text-align: center;
      margin-bottom:50px;
      img{
        height: 40px;
        vertical-align: top;
      }
    }
  }
}

</style>
