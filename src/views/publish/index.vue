<template>
  <el-card>
      <breadcrumb slot="header">
        <template slot="title">发布文章</template>
      </breadcrumb>
      <el-form style="margin-left:50px;" label-width="80px">
          <el-form-item label="标题">
              <el-input style="width:60%;"></el-input>
          </el-form-item>
          <el-form-item label="内容">
              <el-input type="textarea" rows="4"></el-input>
          </el-form-item>
          <el-form-item label="封面">
              <el-radio-group>
                  <el-radio label="单图"></el-radio>
                  <el-radio label="三图"></el-radio>
                  <el-radio label="无图"></el-radio>
                  <el-radio label="自动"></el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="频道">
              <el-select>
                  <el-option></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button type="primary">发表</el-button>
              <el-button>存入草稿箱</el-button>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {

}
</script>

<style>

</style>
