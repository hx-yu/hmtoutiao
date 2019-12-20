<template>
  <el-container>
    <!-- 左右布局 -->
    <el-aside>
      <!-- 左侧导航 -->
      <layoutaside></layoutaside>
    </el-aside>
    <el-container>
        <!-- 右侧布局 -->
      <el-header>
          <!-- 头部 -->
        <layoutheader></layoutheader>
      </el-header>
      <el-main>
        <!-- 二级路由容器 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {}
  },
  components: {
  }
}
</script>

<style lang="less" scoped>
</style>
