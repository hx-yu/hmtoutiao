<template>
  <el-card v-loading="loading">
    <breadcrumb slot="header">
      <template slot="title">素材管理</template>
    </breadcrumb>
    <el-row type="flex" justify="end">
      <el-upload action :http-request="uploadImg" :show-file-list="false">
        <el-button size="small" type="primary">上传素材</el-button>
      </el-upload>
    </el-row>
    <el-tabs v-model="activeName" @tab-click="allOrCollect">
      <el-tab-pane label="全部图片" name="all">
        <div class="img_list">
          <el-card v-for="(item,index) in list" :key="index">
            <img @click="openDialog(index)" :src="item.url" alt />
            <el-row type="flex" justify="space-around" align="middle">
              <i
                @click="collectOrCancel(item)"
                :style="{color:item.is_collected?'red':'#ccc'}"
                class="el-icon-star-on"
              ></i>
              <i @click="deleteImg(item.id)" class="el-icon-delete-solid"></i>
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
    <el-row style="height:60px;" type="flex" align="middle" justify="center">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="page.pageSize"
        :current-page="page.currentPage"
        :total="page.total"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
    <el-dialog @opened="openEnd" @close="closeDialog" :visible="diaVisible">
      <el-carousel ref="myCarousel" :autoplay="false" height="500px">
        <el-carousel-item v-for="(item,index) in list" :key="index">
          <img style="width:100%;height:100%;" :src="item.url" alt="">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </el-card>
</template>

<script>
import { getMaterial, uploadImg, collectOrCancel, deleteImg } from '../../actions/articles'
export default {
  data () {
    return {
      activeName: 'all',
      list: [],
      page: {
        total: 0,
        pageSize: 8,
        currentPage: 1
      },
      loading: false,
      diaVisible: false,
      index: -1
    }
  },
  methods: {
    // 弹层加载事件
    openEnd () {
      this.$refs.myCarousel.setActiveItem(this.index)
    },
    // 关闭弹层
    closeDialog () {
      this.diaVisible = false
    },
    // 弹出弹层
    openDialog (index) {
      this.diaVisible = true
      this.index = index
    },
    // 点击页码
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getMaterial()
    },
    // 删除图片
    async deleteImg (id) {
      try {
        await this.$confirm('您真的要删除图片么？')
        await deleteImg(id)
        this.getMaterial()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      } catch (error) {
        this.$message({
          message: '删除失败',
          type: 'warning'
        })
      }
    },
    // 收藏或取消收藏
    async collectOrCancel (item) {
      await collectOrCancel(item.id, item.is_collected)
      this.getMaterial()
    },
    // 上传图片
    async uploadImg (params) {
      this.loading = true
      let fd = new FormData()
      fd.append('image', params.file)
      await uploadImg(fd)
      this.loading = false
      this.getMaterial()
    },
    // 点击tabs请求全部列表或收藏列表
    allOrCollect () {
      this.page.currentPage = 1
      this.getMaterial()
    },
    // 请求素材数据
    async getMaterial () {
      let params = {
        collect: this.activeName === 'collect', // 通过判断tabs名字查询是否为收藏的数据
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      let result = await getMaterial(params)
      this.list = result.data.results
      this.page.total = result.data.total_count
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
