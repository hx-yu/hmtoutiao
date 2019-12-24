<template>
  <el-card class="contentmaster">
      <breadcrumb slot="header">
        <template slot="title">内容管理</template>
      </breadcrumb>
      <el-form>
        <el-form-item label="文章状态：">
          <el-radio-group v-model="searchForm.radio">
            <el-radio :label="5">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表：">
          <el-select v-model="searchForm.channel" placeholder="请选择频道">
            <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择：">
          <el-date-picker v-model="searchForm.dateRange" type="daterange"></el-date-picker>
        </el-form-item>
      </el-form>
      <el-row type="flex" align="middle" class="finddata">
        <p>共找到10000条数据</p>
      </el-row>
      <div class="contentlist" v-for="item in contentList" :key="item.id.toString()">
        <div class="left">
          <img :src="item.cover.images.length?item.cover.images[0]:defaultImg" alt="">
          <div class="info">
            <span>{{item.title}}</span>
            <el-tag :type="item.status | filterButton" class="status">{{item.status | filterStatus}}</el-tag>
            <span class="date">{{item.pubdate}}</span>
          </div>
        </div>
        <div class="right">
          <span><i class="el-icon-edit"></i>修改</span>
          <span><i class="el-icon-delete"></i>删除</span>
        </div>
      </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      contentList: [],
      channels: [],
      searchForm: {
        radio: 5,
        channel: null,
        dateRange: []
      },
      defaultImg: require('../../assets/img/back.jpeg')
    }
  },
  methods: {
    // 获取内容列表
    getContentList () {
      this.$axios({
        url: '/articles'
      }).then(result => {
        this.contentList = result.data.results
      })
    },
    // 获取频道列表
    gteChannel () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
    }
  },
  filters: {
    // 过滤文章发表状态按钮
    filterButton (value) {
      switch (value) {
        case 0:
          return 'info'
        case 1:
          return 'warning'
        case 2:
          return 'success'
        case 3:
          return 'danger'
        default:
          break
      }
    },
    // 过滤文章发表状态
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发布'
        case 3:
          return '审核失败'
        default:
          break
      }
    }
  },
  created () {
    this.gteChannel()
    this.getContentList()
  }
}
</script>

<style lang="less" scoped>
.contentmaster{
  .finddata{
    height: 60px;
    border-bottom: 1px dashed #cccccc;
  }
  .contentlist{
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #f2f3f5;
    .left{
      display: flex;
      img{
      width: 160px;
      height: 120px;
      }
      .info{
        margin-left: 10px;
        height: 120px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .status{
          width: 60px;
          text-align: center;
        }
        .date{
          font-size: 12px;
          color: #999;
        }
      }
    }
    .right{
      display: flex;
      span{
        font-size: 14px;
        margin-right: 8px;
        cursor: pointer;
      }
    }
  }
}
</style>
