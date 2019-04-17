function shouye(echarts) {
    var myChart1 = echarts.init(document.getElementById('main1'));
    var myChart2 = echarts.init(document.getElementById('main2'));
    // 绘制图表。
    var option1 = {
        title:[{
            text:'莲花、镜泊湖水电站同年发电量比例',
            x : '50%',
            y : '45%',
            textAlign : 'center'
        }],
        legend : {},
        tooltip : {
            trigger : 'axis',
            showContent : false
        },
        dataset : {
            source : [
                [ 'product',  '2010', '2011','2012', '2013', '2014', '2015', '2016',
                    '2017' ],
                [ '莲花', 40.7,59.4,76.5,34.7, 65.1, 53.3, 83.8, 98.7 ],
                [ '镜泊湖', 34.7,50.4, 32.4, 65.1, 85.7, 83.1, 73.4, 55.1 ]]
        },
        xAxis : {
            type : 'category'
        },
        yAxis : {
            gridIndex : 0
        },
        grid : {
            top : '50%'
        },
        series : [ {
            type : 'line',
            seriesLayoutBy : 'row',
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            }
        }, {
            type : 'line',
            seriesLayoutBy : 'row',
            markPoint: {
                data: [
                    {type: 'max', name: '最大值'},
                    {type: 'min', name: '最小值'}
                ]
            }
        }, {
            type : 'pie',
            id : 'pie',
            radius : '30%',
            center : [ '50%', '25%' ],
            label : {
                formatter : '{b}: {@2010} ({d}%)'
            },
            encode : {
                itemName : 'product',
                value : '2010',
                tooltip : '2010'
            }
        } ]
    };
    myChart1.on('updateAxisPointer', function (event) {
        var xAxisInfo = event.axesInfo[0];
        if (xAxisInfo) {
            var dimension = xAxisInfo.value + 1;
            myChart1.setOption({
                series: {
                    id: 'pie',
                    label: {
                        formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                    },
                    encode: {
                        value: dimension,
                        tooltip: dimension
                    }
                }
            });
        }
    });

    var builderJson = {
        "all" : 10887,
        "charts" : {
            "2010年" : 2405,
            "2011年" : 1842,
            "2012年" : 2090,
            "2013年" : 1762,
            "2014年" : 1593,
            "2015年" : 2060,
            "2016年" : 1537,
            "2017年" : 3237
        },
        "components" : {
            "2010年" : 9266,
            "2011年" : 3419,
            "2012年" : 2984,
            "2013年" : 2739,
            "2014年" : 2744,
            "2015年" : 2466,
            "2016年" : 3034,
            "2017年" : 1945
        },
        "ie" : 9743
    };


    var option2 = {
        legend: {
            orient: 'horizontal',
            x:'center',
            y:'46%',
            icon: "circle"
        },
        tooltip : {},
        title : [
            {
                text : '莲花水电站历年发电量比例',
                x : '50%',
                y : '0%',
                textAlign : 'center'
            },
            {
                text : '镜泊湖水电站历年发电量比例',
                x : '50%',
                y : '50%',
                textAlign : 'center'
            } ],
        grid : [ {
            top : '5%',
            width : '50%',
            bottom : '55%',
            left : 10,
            containLabel : true
        }, {
            top : '55%',
            width : '50%',
            bottom : 0,
            left : 10,
            containLabel : true
        } ],
        xAxis : [ {
            type : 'value',
            max : builderJson.all,
            splitLine : {
                show : false
            }
        }, {
            type : 'value',
            max : builderJson.all,
            gridIndex : 1,
            splitLine : {
                show : false
            }
        } ],
        yAxis : [ {
            type : 'category',
            data : Object.keys(builderJson.charts),
            axisLabel : {
                interval : 0,
                rotate : 30
            },
            splitLine : {
                show : false
            }
        }, {
            gridIndex : 1,
            type : 'category',
            data : Object.keys(builderJson.components),
            axisLabel : {
                interval : 0,
                rotate : 30
            },
            splitLine : {
                show : false
            }
        } ],
        series : [ {
            type : 'bar',
            stack : 'chart',
            z : 3,
            itemStyle:{
                normal:{
                    color: function(params) {
                        var colorList = [
                            '#C1232B','#2f4554','#61a0a8','#d48265','#91c7ae',
                            '#749f83','#ca8622','#bda29a'
                        ];
                        return colorList[params.dataIndex]
                    }
                }
            },
            label : {
                normal : {
                    position : 'right',
                    show : true
                }
            },
            data : Object.keys(builderJson.charts).map(function(key) {
                return builderJson.charts[key];
            })
        }, {
            type : 'bar',
            stack : 'chart',
            silent : true,
            itemStyle : {
                normal : {
                    color : '#eee'
                }
            },
            data : Object.keys(builderJson.charts).map(function(key) {
                return builderJson.all - builderJson.charts[key];
            })
        }, {
            type : 'bar',
            stack : 'component',
            xAxisIndex : 1,
            yAxisIndex : 1,
            z : 3,
            itemStyle:{
                normal:{
                    color: function(params) {
                        var colorList = [
                            '#C1232B','#2f4554','#61a0a8','#d48265','#91c7ae',
                            '#749f83','#ca8622','#bda29a'
                        ];
                        return colorList[params.dataIndex]
                    }
                }
            },
            label : {
                normal : {
                    position : 'right',
                    show : true
                }
            },
            data : Object.keys(builderJson.components).map(function(key) {
                return builderJson.components[key];
            })
        }, {
            type : 'bar',
            stack : 'component',
            silent : true,
            xAxisIndex : 1,
            yAxisIndex : 1,
            itemStyle : {
                normal : {
                    color : '#eee'
                }
            },
            data : Object.keys(builderJson.components).map(function(key) {
                return builderJson.all - builderJson.components[key];
            })
        }, {
            type : 'pie',
            radius : [ 0, '30%' ],
            center : [ '75%', '25%' ],
            data : Object.keys(builderJson.charts).map(function(key) {
                return {
                    name: key.replace('', ''),
                    value: builderJson.charts[key]
                }
            })
        }, {
            type : 'pie',
            radius : [ 0, '30%' ],
            center : [ '75%', '75%' ],
            data : Object.keys(builderJson.components).map(function(key) {
                return {
                    name: key.replace('', ''),
                    value: builderJson.components[key]
                }
            })
        } ]
    };

    myChart1.setOption(option1);
    myChart2.setOption(option2);
}