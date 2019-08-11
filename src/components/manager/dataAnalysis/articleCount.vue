<!--发帖统计-->
<template>
  <section style="width: 100%;height: 100%">
    <div style="padding: 10px">
      <el-row :gutter="20">
        <el-col :span="12">
          <div id="postsCnt" style="width: 95%;height: 400px"></div>
        </el-col>
        <el-col :span="12">
          <div id="visitFrom" style="width: 95%;height: 400px"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div id="cateCnt" style="width: 95%;height: 300px"></div>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
    let echarts = require('echarts')
    export default {
        name: "articleCount",
        mounted() {
            //站点访问来源部门分布
            let visitChart=echarts.init(document.getElementById('visitFrom'));
            visitChart.setOption({
                title : {
                    text: '平台部门访问来源',
                    subtext: '今日',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'left',
                    data:['营销部','政客事业部','网络发展部','网络运营部','办公室','财务部','人力资源部']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    width: '50%',
                                    funnelAlign: 'left',
                                    max: 1548
                                }
                            }
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                    {
                        name:'访问来源',
                        type:'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {value:335, name:'营销部'},
                            {value:310, name:'政客事业部'},
                            {value:234, name:'网络发展部'},
                            {value:135, name:'网络运营部'},
                            {value:344, name:'办公室'},
                            {value:563, name:'财务部'},
                            {value:32, name:'人力资源部'},
                        ]
                    }
                ]
            });
            //每周发帖数
            let weekPostChart = echarts.init(document.getElementById('postsCnt'));
            weekPostChart.setOption({
                title : {
                    text: '发帖数量统计',
                    subtext: '每周'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['论坛','博客','会议']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'论坛',
                        type:'bar',
                        data:[20, 40, 7, 23, 25, 76, 135],
                        markPoint : {
                            data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name:'博客',
                        type:'bar',
                        data:[23, 42, 23, 12, 17, 90, 45],
                        markPoint : {
                            data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name:'会议',
                        type:'bar',
                        data:[12, 13, 12, 7, 3, 8, 4],
                        markPoint : {
                            data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                            ]
                        },
                        markLine : {
                            data : [
                                {type : 'average', name: '平均值'}
                            ]
                        }
                    },

                ]
            });
            //每类发帖数
            let catePostChart = echarts.init(document.getElementById('cateCnt'));
            catePostChart.setOption({
                title: {
                    text: '栏目发帖数量统计',
                    subtext: '本周'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['树洞', 'Python', 'Java', 'SQL', 'Android', 'JavaScript', '前端', '区块链', '游戏开发']
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
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '树洞',
                        type: 'line',
                        data: [5, 3, 1, 4, 4, 6, 1, 5, 6],
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
                    },
                    {
                        name: '程序人生',
                        type: 'line',
                        data: [2, 3, 1, 3, 6, 6, 8, 8, 6,],
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
                    },
                    {
                        name: 'Python',
                        type: 'line',
                        data: [5, 3, 1, 4, 4, 6, 1, 5, 6],
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
                    },
                    {
                        name: 'Java',
                        type: 'line',
                        data: [4, 3, 5, 6, 8, 4, 9, 5, 4],
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
                    },
                    {
                        name: 'SQL',
                        type: 'line',
                        data: [5, 3, 1, 4, 4, 6, 1, 5, 6],
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
                    },
                    {
                        name: 'Android',
                        type: 'line',
                        data: [4, 4, 3, 4, 3, 1, 3, 5, 6],
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
                    },
                    {
                        name: 'JavaScript',
                        type: 'line',
                        data: [1, 2, 1, 3, 4, 5, 6, 7, 4],
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
                    },
                    {
                        name: '前端',
                        type: 'line',
                        data: [5, 3, 1, 4, 4, 6, 1, 5, 6],
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
                    },
                    {
                        name: '区块链',
                        type: 'line',
                        data: [1, 1, 3, 4, 2, 2, 3, 2, 1],
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
                    },
                    {
                        name: '游戏开发',
                        type: 'line',
                        data: [0, 0, 1, 0, 0, 1, 1, 0, 0],
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
            });
        }
    }

</script>

<style scoped>

</style>
