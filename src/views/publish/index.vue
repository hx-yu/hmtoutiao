<template>
  <el-card>
      <!-- 面包屑 -->
      <breadcrumb slot="header">
        <template slot="title">发布文章</template>
      </breadcrumb>
      <!-- 表单区域 -->
      <el-form ref="pubdata" :model="dataForm" :rules="dataRules" style="margin-left:30px;" label-width="80px">
          <el-form-item prop="title" label="标题">
              <el-input v-model="dataForm.title" style="width:60%;"></el-input>
          </el-form-item>
          <el-form-item prop="content" label="内容">
              <quilleditor v-model="dataForm.content" style="height:300px;"></quilleditor>
          </el-form-item>
          <el-form-item prop="cover" label="封面" style="margin-top:130px;">
              <el-radio-group v-model="dataForm.cover.type">
                  <el-radio :label="1">单图</el-radio>
                  <el-radio :label="3">三图</el-radio>
                  <el-radio :label="0">无图</el-radio>
                  <el-radio :label="-1">自动</el-radio>
              </el-radio-group>
          </el-form-item>
          <coverimg @disImg="saveImg" :list="dataForm.cover.images"></coverimg>
          <el-form-item prop="channel_id" label="频道">
              <el-select v-model="dataForm.channel_id">
                  <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button @click="articlePublish()" type="primary">发表</el-button>
              <el-button @click="articlePublish(true)">存入草稿箱</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      dataForm: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      dataRules: {
        title: [{ required: true, message: '请输入标题' }, { min: 5, max: 30, message: '输入字符请在5-30字符之间' }],
        content: [{ required: true, message: '请输入文章内容' }],
        channel_id: [{ required: true, message: '文章频道不能为空' }]
      },
      channels: []
    }
  },
  methods: {
    // 接收子组件传来的url和index
    saveImg (url, index) {
      this.dataForm.cover.images.splice(index, 1, url)
    },
    // 获取指定文章信息
    async getArticleById (id) {
      let result = await this.$axios({
        url: `/articles/${id}`
      })
      this.dataForm = result.data
    },
    // 发表文章
    async articlePublish (draft) {
      try {
        let isOk = await this.$refs.pubdata.validate()
        if (isOk) {
          let { articleId } = this.$route.params
          await this.$axios({
            url: articleId ? `/articles/${articleId}` : '/articles',
            method: articleId ? 'put' : 'post',
            params: {
              draft
            },
            data: this.dataForm
          })
          this.$message({
            type: 'success',
            message: '发表成功'
          })
          this.$router.push('/home/contentlist')
        }
      } catch (error) {
        this.$message({
          message: '信息填写不完整',
          type: 'warning'
        })
      }
    },
    // 获取频道列表
    async getChannel () {
      let result = await this.$axios({
        url: '/channels'
      })
      this.channels = result.data.channels
    }
  },
  created () {
    this.getChannel()
    let { articleId } = this.$route.params
    articleId && this.getArticleById(articleId)
  },
  watch: {
    $route: function (to, from) {
      if (to.params.articleId) {
        // 是修改
      } else {
        // 是发表文章
        this.dataForm = {
          title: '',
          content: '',
          cover: {
            type: 0,
            images: []
          },
          channel_id: null
        }
      }
    },
    'dataForm.cover.type': function () {
      switch (this.dataForm.cover.type) {
        // 封面类型 -1:自动，0-无图，1-1张，3-3张
        case 0:
          this.dataForm.cover.images = []
          break
        case -1:
          this.dataForm.cover.images = []
          break
        case 1:
          this.dataForm.cover.images = this.dataForm.cover.images.length === 1 ? this.dataForm.cover.images : ['']
          break
        case 3:
          this.dataForm.cover.images = this.dataForm.cover.images.length === 3 ? this.dataForm.cover.images : ['', '', '']
          break
        default:
          break
      }
    }
  }
}
</script>

<style>
</style>
