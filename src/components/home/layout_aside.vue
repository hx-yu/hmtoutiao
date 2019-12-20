<template>
  <div class="layout_aside">
        <div class="title">
          <img src="../../assets/img/logo_admin.png" alt />
        </div>
        <el-menu router background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b">
          <el-menu-item>首页</el-menu-item>
          <el-submenu index="1">
            <template slot="title">内容管理</template>
            <el-menu-item index="/home/publish">发布文章</el-menu-item>
            <el-menu-item index="/home/contentlist">内容列表</el-menu-item>
            <el-menu-item index="/home/commentlist">评论列表</el-menu-item>
            <el-menu-item index="/home/materialmaster">素材管理</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">粉丝管理</template>
            <el-menu-item index="/home/imgdata">图文数据</el-menu-item>
            <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
            <el-menu-item index="/home/fanspic">粉丝图像</el-menu-item>
            <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item>
          </el-submenu>
          <el-menu-item>账户信息</el-menu-item>
        </el-menu>
      </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.layout_aside {
  height: 100vh;
  background-color: #323745;
  .title {
    text-align: center;
    background-color: #2e2f32;
    padding: 10px 0;
    img {
      height: 35px;
    }
  }
  .el-menu {
    border-right: none;
  }
}
</style>
