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
import layoutAside from '../../components/home/layout_aside'
import layoutHeader from '../../components/home/layout_header'
export default {
  components: {
    layoutaside: layoutAside,
    layoutheader: layoutHeader
  }
}
</script>

<style lang="less" scoped>
</style>
