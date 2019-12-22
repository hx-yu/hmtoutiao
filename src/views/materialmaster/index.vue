<template>
  <el-card>
    <breadcrumb slot="header">
      <template slot="title">素材管理</template>
    </breadcrumb>
    <el-tabs v-model="activeName" @tab-click="allOrCollect">
      <el-tab-pane label="全部图片" name="all">
        <div class="img_list">
          <el-card v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <el-row type="flex" justify="space-around" align="middle">
              <i @click="collectOrCancel(item.id)" :style="{color:item.is_collected?'red':'#ccc'}" class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏图片" name="collect">
        <div class="img_list">
          <el-card v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: []
    }
  },
  methods: {
    collectOrCancel (id) {
      alert(id)
    },
    // 点击tabs请求全部列表或收藏列表
    allOrCollect () {
      this.getMaterial()
    },
    // 请求数据
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect' // 通过判断tabs名字查询是否为收藏的数据
        }
      }).then(result => {
        console.log(result)
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang="less" scoped>
.img_list {
  display: flex;
  flex-wrap: wrap;
  .el-card {
    width: 200px;
    height: 250px;
    margin: 20px 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .el-row {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      font-size: 20px;
      height: 40px;
      background-color: #f4f5f6;
      i {
        cursor: pointer;
      }
    }
  }
}
</style>
