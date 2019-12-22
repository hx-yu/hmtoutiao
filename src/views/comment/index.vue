<template>
  <el-card>
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
export default {
  data () {
    return {
      list: [],
      page: {
        pageSize: 10, // 每页显示的条数
        total: 0, // 评论总条数
        currentPage: 1 // 当前页数
      }
    }
  },
  methods: {
    // 页码改变方法
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getComment()
    },
    // 获取评论
    getComment () {
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment',
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        console.log(result)
        this.list = result.data.results
        this.page.total = result.data.total_count
      })
    },
    transState (row, column, cellValue, index) {
      return row.comment_status ? '正常' : '关闭'
    },
    openOrClose (obj) {
      let state = obj.comment_status
      this.$confirm(`您是否确定要${state ? '关闭' : '打开'}评论么?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: {
            article_id: obj.id.toString()
          },
          data: {
            allow_comment: !obj.comment_status
          }
        }).then(result => {
          this.getComment()
        })
      })
    }
  },
  created () {
    this.getComment()
  }
}
</script>

<style>
</style>
