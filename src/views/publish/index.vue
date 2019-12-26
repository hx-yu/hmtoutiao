<template>
  <el-card>
      <!-- 面包屑 -->
      <breadcrumb slot="header">
        <template slot="title">发布文章</template>
      </breadcrumb>
      <!-- 表单区域 -->
      <el-form ref="pubdata" :model="dataForm" :rules="dataRules" style="margin-left:50px;" label-width="80px">
          <el-form-item prop="title" label="标题">
              <el-input v-model="dataForm.title" style="width:60%;"></el-input>
          </el-form-item>
          <el-form-item prop="content" label="内容">
              <el-input v-model="dataForm.content" type="textarea" rows="4"></el-input>
          </el-form-item>
          <el-form-item prop="cover" label="封面">
              <el-radio-group>
                  <el-radio label="单图"></el-radio>
                  <el-radio label="三图"></el-radio>
                  <el-radio label="无图"></el-radio>
                  <el-radio label="自动"></el-radio>
              </el-radio-group>
          </el-form-item>
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
        channel_id: ''
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
    // 获取指定文章信息
    getArticleById (id) {
      this.$axios({
        url: `/articles/${id}`
      }).then(result => {
        this.dataForm = result.data
      })
    },
    // 发表文章
    articlePublish (draft) {
      this.$refs.pubdata.validate(isOk => {
        if (isOk) {
          this.$axios({
            url: '/articles',
            method: 'post',
            params: {
              draft
            },
            data: this.dataForm
          }).then(result => {
            this.$message({
              type: 'success',
              message: '发表成功'
            })
            this.$router.push('/home/contentlist')
          })
        }
      })
    },
    // 获取频道列表
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        this.channels = result.data.channels
      })
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
          channel_id: ''
        }
      }
    }
  }
}
</script>

<style>

</style>
