<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane class="all" label="全部图片" name="all">
        <el-card v-for="item in list" :key="item.id">
          <img @click="disImg(item.url)" :src="item.url" alt />
        </el-card>
        <el-row type="flex" justify="center">
          <el-pagination background layout="prev, pager, next"
          @current-change="changePage"
          :page-size="page.pageSize"
          :current-page="page.currentPage"
          :total="page.total"></el-pagination>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="上传" name="upload"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        pageSize: 8,
        currentPage: 1,
        total: 0
      }
    }
  },
  methods: {
    // 子传父url
    disImg (url) {
      this.$emit('disImg', url)
    },
    // 页码改变事件
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getImg()
    },
    // 获取图片信息
    getImg () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false,
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    }
  },
  created () {
    this.getImg()
  }
}
</script>

<style lang="less" scoped>
.all {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .el-card {
    width: 150px;
    height: 150px;
    margin: 10px 0;
    border: 1px solid #ccc;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
