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
          <el-select v-model="searchForm.value" placeholder="请选择频道">
            <el-option v-for="item in 3" :key="item.id" :label="item.lable" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间选择：">
          <el-date-picker v-model="searchForm.dateRange" type="daterange"></el-date-picker>
        </el-form-item>
      </el-form>
      <el-row type="flex" align="middle" class="finddata">
        共找到10000条数据
      </el-row>
      <div class="contentlist">
        <div class="left">
          <img src="../../assets/img/back.png" alt="">
          <div class="info">
            <span>这是什么玩意啊  太好吃了</span>
            <el-tag class="status">已发布</el-tag>
            <span class="date">2019-12-23</span>
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
      searchForm: {
        radio: 5,
        value: '',
        dateRange: ''
      }
    }
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
