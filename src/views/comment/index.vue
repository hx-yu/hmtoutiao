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
          <el-button @click="openOrClose(obj.row)" size="small" type="text">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles',
        params: { response_type: 'comment' }
      }).then(result => {
        this.list = result.data.results
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
