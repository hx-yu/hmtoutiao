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
      <el-main>主体内容</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style lang="less" scoped>
</style>
