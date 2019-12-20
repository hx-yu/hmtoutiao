<template>
<div>
    <el-carousel :interval="4000" type="card" height="300px">
    <el-carousel-item v-for="item in ImgURL" :key="item">
        <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
export default {
  data () {
    return {
      ImgURL: ['http://img5.imgtn.bdimg.com/it/u=3720661285,1522818110&fm=26&gp=0.jpg', 'http://img2.imgtn.bdimg.com/it/u=2171938763,1005411525&fm=26&gp=0.jpg', 'http://img1.imgtn.bdimg.com/it/u=482823002,2048659319&fm=26&gp=0.jpg', 'http://img2.imgtn.bdimg.com/it/u=1485165718,2220658900&fm=26&gp=0.jpg', 'http://img4.imgtn.bdimg.com/it/u=4115246281,1172513023&fm=26&gp=0.jpg']
    }
  }
}
</script>

<style lang="less" scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
