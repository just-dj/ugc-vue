<template>
  <section style="width: 100%;height: 100%">

    <div style="width: 100%;height: 100%;display:flex;flex-wrap: wrap">
      <div id="chart1" style="width: 50%;height: 50%;">

      </div>
      <div id="chart2" style="width: 50%;height: 50%;">

      </div>
      <div style="width: 50%;height: 50%">

      </div>
      <div style="width: 50%;height: 50%;">

      </div>
    </div>

  </section>
</template>

<script>
  import * as util from "../common/utils/util"
  import store from "../vuex/store"
  import {VueEditor} from 'vue2-editor'
  import {getJobTypeAnalyseApi, getJobTypeHotAnalyseApi} from "../api/job";

  export default {
    name: "dataAnalysePage",
    data() {
      return {
        chart1:{},
        xAxisData1: [],
        seriesData1: [],
        chart2:{},
        xAxisData2: [],
        seriesData2: []
      }
    },
    computed: {
      user: {
        get: function () {
          return this.$store.state.user;
        },
        set: function () {

        }
      },
    },
    methods: {
      initMain1: function () {
        this.chart1 = this.$echarts.init(document.getElementById("chart1"));
        let option = {
          title: {
            text: '兼职类别下属兼职数量',
            subtext: '显示前十'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['下属兼职数量']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: this.xAxisData1,
              axisLabel:{
                interval:0,
                rotate:45,
              },
            },
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '下属兼职数量',
              type: 'bar',
              data: this.seriesData1,
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }
          ]
        };
        this.chart1.setOption(option);
      },

      initMain2: function () {
        this.chart2 = this.$echarts.init(document.getElementById("chart2"));
        let option = {
          title: {
            text: '兼职类别点击热度统计',
            subtext: '显示前十'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['类别点击热度']
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: this.xAxisData2,
              axisLabel:{
                interval:0,
                rotate:45,
              },
            },
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '类别点击热度',
              type: 'bar',
              data: this.seriesData2,
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
              markLine: {
                data: [
                  {type: 'average', name: '平均值'}
                ]
              }
            }
          ]
        };
        this.chart2.setOption(option);
      }
    },
    mounted() {

      getJobTypeAnalyseApi("").then(res => {
        if (res.code === 200) {
          if (!util.isEmpty(res.data)) {
            res.data.forEach(a => {
              this.xAxisData1.push(a.name);
              this.seriesData1.push(a.num);
            })
          }
          this.initMain1();
        } else if (res.code === 2) {
          this.$store.commit('signInDialogVisibleTrue');
        } else {
          this.$message.error(res.msg)
        }
      });

      getJobTypeHotAnalyseApi("").then(res =>{
           if (res.code === 200){
             if (!util.isEmpty(res.data)){
               res.data.forEach(a => {
                 this.xAxisData2.push(a.name);
                 this.seriesData2.push(a.heat);
               })
             }
             this.initMain2();
           }else if (res.code === 2) {
             this.$store.commit('signInDialogVisibleTrue');
           } else {
             this.$message.error(res.msg)
           }
        }
      )

    }
  }
</script>

<style scoped>

</style>
