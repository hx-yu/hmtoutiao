<template>
  <el-card v-loading="loading">
    <breadcrumb slot="header">
      <template slot="title">评论列表</template>
    </breadcrumb>
    <el-table :data="list">
      <el-table-column prop="title" width="500" label="标题"></el-table-column>
      <el-table-column :formatter="transState" prop="comment_status" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="obj">
          <el-button size="small" type="text">修改</el-button>
          <el-button
            @click="openOrClose(obj.row)"
            size="small"
            type="text"
          >{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="height:80px;" type="flex" justify="center" align="middle">
      <el-pagination
      background
      layout="prev, pager, next"
      @current-change="changePage"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      :total="page.total"></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
import { getComment, openOrClose } from '../../actions/articles'
export default {
  data () {
    return {
      list: [],
      page: {
        pageSize: 10, // 每页显示的条数
        total: 0, // 评论总条数
        currentPage: 1 // 当前页数
      },
      loading: false
    }
  },
  methods: {
    // 页码改变方法
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    // 获取评论
    async getComment () {
      // 加载开始
      this.loading = true
      let params = {
        response_type: 'comment',
        page: this.page.currentPage,
        per_page: this.page.pageSize
      }
      let result = await getComment(params)
      this.list = result.data.results
      this.page.total = result.data.total_count
      // 加载结束
      this.loading = false
    },
    transState (row, column, cellValue, index) {
      return row.comment_status ? '正常' : '关闭'
    },
    // 打开或关闭评论
    async openOrClose (obj) {
      try {
        let state = obj.comment_status
        await this.$confirm(`您是否确定要${state ? '关闭' : '打开'}评论么?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await openOrClose(obj.id, state)
        this.getComment()
        this.$message({
          type: 'success',
          message: `${state ? '关闭' : '打开'}成功`
        })
      } catch (error) {
        this.$message({
          type: 'warning',
          message: '取消了操作评论'
        })
      }
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
