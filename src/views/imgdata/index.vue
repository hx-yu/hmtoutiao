<template>
  <el-card>
      <breadcrumb slot="header">
        <template slot="title">
            <span>图文数据</span>
        </template>
      </breadcrumb>
      <div ref="echarts1" style="width:900px;height:400px;"></div>
      <div ref="echarts2" style="width:900px;height:400px;"></div>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {}
  },
  mounted () {
    let myChart1 = echarts.init(this.$refs.echarts1)
    let myChart2 = echarts.init(this.$refs.echarts2)
    myChart1.setOption({
      title: {
        text: '粉丝增长数据'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {}
      }]
    })
    myChart2.setOption({
      title: {
        text: '粉丝增长来源'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        x: 'right',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold'
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ]
        }
      ]
    })
  }
}
</script>

<style>

</style>
