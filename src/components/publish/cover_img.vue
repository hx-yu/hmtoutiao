<template>
  <div class="cover_img">
      <div class="cover_item" v-for="(item,index) in list" :key="index" @click="addCover">
          <span>点击添加图片</span>
          <img :src="item?item:defaultImg" alt="">
      </div>
      <el-dialog title="请选择封面图片" :visible="dialogVisible" :before-close="handleClose"></el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      dialogVisible: false,
      defaultImg: require('../../assets/img/pic_bg.png')
    }
  },
  methods: {
    // 打开封面弹窗
    addCover () {
      this.dialogVisible = true
    },
    // 关闭封面弹窗
    handleClose () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.cover_img{
  display: flex;
  margin-left: 80px;
    .cover_item{
    border: 1px solid #cccccc;
    height: 250px;
    width: 250px;
    padding: 20px 20px;
    text-align: center;
    color: #cccccc;
      img{
        width: 100%;
        height: 100%;
      }
    }
}
</style>
