<template>
  <div class="cover_img">
      <div class="cover_item" v-for="(item,index) in list" :key="index" @click="addCover(index)">
          <img :src="item?item:defaultImg" alt="">
      </div>
      <el-dialog title="请选择封面图片" :visible="dialogVisible" :before-close="handleClose">
        <previewimg @disImg="saveImg"></previewimg>
      </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'],
  data () {
    return {
      dialogVisible: false,
      defaultImg: require('../../assets/img/pic_bg.png'),
      index: -1
    }
  },
  methods: {
    // 接收子组件传来的url地址
    saveImg (url) {
      this.$emit('disImg', url, this.index)
      this.dialogVisible = false
    },
    // 打开封面弹窗
    addCover (index) {
      this.dialogVisible = true
      this.index = index
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
