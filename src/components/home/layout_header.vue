<template>
  <div>
    <el-row class="layout_header" type="flex" align="middle">
      <el-col class="left" :span="12">
        <i class="el-icon-s-fold"></i>
        <span>江苏传智博客教育科技股份有限公司</span>
      </el-col>
      <el-col class="right" :span="12">
        <el-row type="flex" justify="end" align="middle">
          <img class="user_pic" :src="userInfo.photo?userInfo.photo:userImg" alt />
          <el-dropdown @command="handlerCommand">
            <span class="el-dropdown-link">{{userInfo.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="info">个人信息</el-dropdown-item>
              <el-dropdown-item command="git">git地址</el-dropdown-item>
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {},
      userImg: require('../../assets/img/avatar.jpg')
    }
  },
  methods: {
    handlerCommand (command) {
      if (command === 'info') {

      } else if (command === 'git') {
        window.location.href = 'https://github.com/YHX0507'
      } else {
        window.localStorage.removeItem('user_token')
        this.$router.push('/login')
      }
    }
  },
  created () {
    let token = window.localStorage.getItem('user_token')
    this.$axios({
      url: '/user/profile',
      method: 'get',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(result => {
      this.userInfo = result.data.data
    })
  }
}
</script>

<style lang="less" scoped>
.layout_header {
  height: 60px;
  .left {
    line-height: 60px;
    i {
      font-size: 18px;
    }
    span {
      font-size: 16px;
      margin-left: 5px;
    }
  }
  .right {
    .user_pic {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    .el-dropdown-link {
      margin-left: 10px;
      cursor: pointer;
      color: #409eff;
    }
    .el-icon-arrow-down {
      margin-right: 15px;
      font-size: 12px;
      color: #409eff;
    }
  }
}
</style>
