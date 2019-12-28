<template>
  <el-container>
    <!-- 左右布局 -->
    <el-aside :style="{'width':collapse?'60px':'230px'}" style="min-height:100vh;transition:all 1s">
      <!-- 左侧导航 -->
      <layoutaside :collapse="collapse"></layoutaside>
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
import eventBus from '../../utils/eventBus'
export default {
  data () {
    return {
      collapse: false
    }
  },
  created () {
    eventBus.$on('collapseOrClose', () => {
      this.collapse = !this.collapse
    })
  }

}
</script>

<style lang="less" scoped>
</style>
