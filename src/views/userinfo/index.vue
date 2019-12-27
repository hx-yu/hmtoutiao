<template>
  <el-card>
    <breadcrumb slot="header">
      <template slot="title">用户信息</template>
    </breadcrumb>
    <el-form style="margin-left:100px;" label-width="100px">
        <el-form-item label="用户名：" style="width:40%">
            <el-input v-model="dataForm.name"></el-input>
        </el-form-item>
        <el-form-item label="简介：" style="width:40%">
            <el-input v-model="dataForm.intro"></el-input>
        </el-form-item>
        <el-form-item label="邮箱：" style="width:40%">
            <el-input v-model="dataForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" style="width:40%">
            <el-input disabled v-model="dataForm.mobile"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary">保存</el-button>
        </el-form-item>
    </el-form>
    <el-upload class="uesrImg" action="" :http-request="uploadUserImg">
        <img src="../../assets/img/avatar.jpg" alt="">
    </el-upload>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      dataForm: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      }
    }
  },
  methods: {
    //   获取用户信息
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        this.dataForm = result.data
      })
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.uesrImg{
    position: absolute;
    top: 200px;
    right: 200px;
    img{
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }
}
</style>
