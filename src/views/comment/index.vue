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
          <el-button @click="openOrClose" size="small" type="text">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
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
        console.log(result)
      })
    },
    transState (row, column, cellValue, index) {
      return row.comment_status ? '正常' : '关闭'
    },
    openOrClose () {
      this.$axios({
        url: '/comments/status',
        method: 'put'
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
