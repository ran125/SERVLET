/**
 * 测量
 */
function onload(Cesium) {
    viewer = new Cesium.Viewer('cesiumContainer',{infoBox:false,selectionIndicator: false});
    var clampMode = 0; // 空间模式
    var handlerDis, handlerArea, handlerHeight;
    scene = viewer.scene;
    var camera = scene.camera;

    var dataServiceUrl = 'http://192.168.1.103:8090/iserver/services/data-lh6/rest/data/featureResults.rjson?returnContent=true'; // 数据服务URL
    var dataSourceName = 'px_shy'; // 数据源名称
    var dataSetName = 'BackUp_IsoLine_1'; // 数据集名称
    //添加S3M图层服务
    promise = scene.open(url.name);
    //去掉地图logo
    viewer._cesiumWidget._creditContainer.style.display = "none";


    promise.then(function (layers) {

        viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(116.380116005574, 39.987407826007498, 10000000.939740588888501), // 设置位置
        });
        viewer._cesiumWidget._creditContainer.style.display = "none";
        //初始化测量距离
        handlerDis = new Cesium.MeasureHandler(viewer, Cesium.MeasureMode.Distance, clampMode);
        //注册测距功能事件
        handlerDis.measureEvt.addEventListener(function (result) {
            var dis = Number(result.distance);
            var distance = dis > 1000 ? (dis / 1000).toFixed(2) + '千米' : dis.toFixed(2) + '米';
            handlerDis.disLabel.text = '距离:' + distance;

        });


        handlerDis.activeEvt.addEventListener(function (isActive) {
            if (isActive == true) {
                viewer.enableCursorStyle = false;
                viewer._element.style.cursor = '';
                $('body').removeClass('measureCur').addClass('measureCur');
            } else {
                viewer.enableCursorStyle = true;
                $('body').removeClass('measureCur');
            }
        });

        //初始化测量面积
        handlerArea = new Cesium.MeasureHandler(viewer, Cesium.MeasureMode.Area, clampMode);
        handlerArea.measureEvt.addEventListener(function (result) {
            var mj = Number(result.area);
            var area = mj > 1000000 ? (mj / 1000000).toFixed(2) + '平方千米' : mj.toFixed(2) + '平方米'
            handlerArea.areaLabel.text = '面积:' + area;
        });
        handlerArea.activeEvt.addEventListener(function (isActive) {
            if (isActive == true) {
                viewer.enableCursorStyle = false;
                viewer._element.style.cursor = '';
                $('body').removeClass('measureCur').addClass('measureCur');
            } else {
                viewer.enableCursorStyle = true;
                $('body').removeClass('measureCur');
            }
        });

        //初始化测量高度
        handlerHeight = new Cesium.MeasureHandler(viewer, Cesium.MeasureMode.DVH);
        handlerHeight.measureEvt.addEventListener(function (result) {
            var distance = result.distance > 1000 ? (result.distance / 1000).toFixed(2) + '千米' : result.distance + '米';
            var vHeight = result.verticalHeight > 1000 ? (result.verticalHeight / 1000).toFixed(2) + '千米' : result.verticalHeight + '米';
            var hDistance = result.horizontalDistance > 1000 ? (result.horizontalDistance / 1000).toFixed(2) + '千米' : result.horizontalDistance + '米';
            handlerHeight.disLabel.text = '空间距离:' + distance;
            handlerHeight.vLabel.text = '垂直高度:' + vHeight;
            handlerHeight.hLabel.text = '水平距离:' + hDistance;
        });
        handlerHeight.activeEvt.addEventListener(function (isActive) {
            if (isActive == true) {
                viewer.enableCursorStyle = false;
                viewer._element.style.cursor = '';
                $('body').removeClass('measureCur').addClass('measureCur');
            } else {
                viewer.enableCursorStyle = true;
                $('body').removeClass('measureCur');
            }
        });

        $('#distance').click(function () {
            handlerDis && handlerDis.activate();
        });

        $('#area').click(function () {
            handlerArea && handlerArea.activate();
        });
        $('#height').click(function () {
            handlerHeight && handlerHeight.activate();
        });
        $('#clear').click(function () {
            clearAll();
        });

        //清除
        function clearAll() {
            handlerDis && handlerDis.clear();
            handlerArea && handlerArea.clear();
            handlerHeight && handlerHeight.clear();
        }


        $("#qiao").click(function () {
            camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(129.786853530306,45.4220917653681 ,262.840420007114),
                orientation: {
                    heading: Cesium.Math.toRadians(10.0), // 方向
                    pitch: Cesium.Math.toRadians(-35.0),// 倾斜角度
                    roll: 0
                }
            });
            var a = document.getElementById("tts");
            a.style.display = "block";
        });


        $("#gc").click(function () {
            camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(  129.798056884294,   45.4450013775208,  200.693684695289
                ),
                orientation: {
                    heading: Cesium.Math.toRadians(10.0), // 方向
                    pitch: Cesium.Math.toRadians(-35.0),// 倾斜角度
                    roll: 0
                }
            });
            var a = document.getElementById("tts");
            a.style.display = "block";
        });

        $("#tx").click(function () {
            camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(  129.785853530306 ,   45.4170917653681 ,   362.840420007114),
                orientation: {
                    heading: Cesium.Math.toRadians(20.0), // 方向
                    pitch: Cesium.Math.toRadians(-35.0),// 倾斜角度
                    roll: 0
                }
            });
            var a = document.getElementById("tts");
            a.style.display = "block";
        });
    })

    //属性查询
    promise.then(function (obliqueLayers) {
        var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
        handler.setInputAction(function (e) {
            // 首先移除之前添加标识实体
            viewer.entities.removeById('identify-area');
            // 获取点击位置笛卡尔坐标
            var position = scene.pickPosition(e.position);
            // 从笛卡尔坐标获取经纬度
            var cartographic = Cesium.Cartographic.fromCartesian(position);
            var longitude = Cesium.Math.toDegrees(cartographic.longitude);
            var latitude = Cesium.Math.toDegrees(cartographic.latitude);


            var queryPoint = { // 查询点对象
                x: longitude,
                y: latitude
            };

            queryByPoint(queryPoint);

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);


        // 去除加载动画
        $('#toolbar').show();
        $('#loadingbar').remove();
    });

    // 通过点击查询用于表示单体化的面要素，添加到场景中高亮显示。
    function queryByPoint(queryPoint) {
        var queryObj = {
            "getFeatureMode": "SPATIAL",
            "spatialQueryMode": "INTERSECT",
            "datasetNames": [dataSourceName + ":" + dataSetName],
            "geometry": {
                id: 0,
                parts: [1],
                points: [queryPoint],
                type: "POINT"
            }
        };

        queryObjJSON = JSON.stringify(queryObj); // 转化为JSON字符串作为查询参数

        $.ajax({
            type: "post",
            url: dataServiceUrl,
            data: queryObjJSON,
            success: function (result) {
                var resultObj = JSON.parse(result);
                if (resultObj.featureCount > 0) {
                    addClapFeature(resultObj.features[0]);
                }
            }
        })
    }

    // 将数据服务查询到的要素添加到场景中高亮显示，表示选中效果。
    function addClapFeature(feature) {
        var lonLatArr = getLonLatArray(feature.geometry.points);
        viewer.entities.add({
            id: 'identify-area',
            name: '单体化标识面',
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArray(lonLatArr),
                material: new Cesium.Color(1.0, 0.0, 0.0, 0.0),
            },
            clampToS3M: true // 贴在S3M模型表面
        });
        var title = Cesium.defaultValue(feature.fieldValues[6]);
        var content = Cesium.defaultValue(feature.fieldValues[7]);


        //创建弹出框信息
        var entity = new Cesium.Entity({
            name: "详细信息",
            description: createDescription(Cesium, [title,content]),

        });
        viewer.selectedEntity = entity;
        $('#win').panel({title:title});
        //在点击位置添加对应点
        viewer.entities.add(new Cesium.Entity({
            point: new Cesium.PointGraphics({
                color: new Cesium.Color(1, 1, 0),
                pixelSize: 10,
                outlineColor: new Cesium.Color(0, 1, 1)
            }),
            position: Cesium.Cartesian3.fromDegrees(title,content),
        }));

    }


    //创建描述信息的对话框
    function createDescription(Cesium, properties) {

        var simpleStyleIdentifiers = ["内容"];
        var html = '';
        var html1='';
        // for (var key in properties) {
        //     if (properties.hasOwnProperty(key)) {
                // if (simpleStyleIdentifiers.indexOf(key) !== -1) {
                //     continue;
                // }

                // var value = properties[key];


                // if (Cesium.defined(value) && value !== '') {
                    html += '<h1 align="center">' + properties[0] + '</h1>';

                    $('#win').window('open');
        // html += '<tr><td><font size="3" color="red">' + simpleStyleIdentifiers[0] +":"+ '</td></font><td align="center">' + properties[1] + '</td></tr>';


        document.getElementById("win").innerHTML=properties[2];
                // }
            // }

        // }

        if (properties[1]=="莲花大桥"){
            var img='<img src="../images/qiao.PNG" style="width: 100%;height: 150px">'
            html += '<h1>' + img + '</h1>';
            html += '<p style="font-weight:bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;水库位于区域构造相对稳定的地区，区内出露的地层主要有下元古界的混合花岗岩、混合岩及角闪斜长片麻岩等，侵入岩主要有元古界的混合花岗岩、花岗闪长岩等。区内构造断裂以南北向断裂为主，规模较大，其次为北东向、东西向及北西向断裂。区域性的牡丹江断裂通过坝址左岸垭口，向南伸入库区，向北延至下游，但无现代活动迹象。经辽宁省地震局鉴定，基本地震烈度为6度。</p>';
        }
        if (properties[1]=="莲花酒店"){
            var img='<img src="../images/jiudian.png"  style="width: 100%;height: 150px">'
            html += '<h1>' + img + '</h1>';
            html += '<p style="font-weight:bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;水库位于区域构造相对稳定的地区，区内出露的地层主要有下元古界的混合花岗岩、混合岩及角闪斜长片麻岩等，侵入岩主要有元古界的混合花岗岩、花岗闪长岩等。区内构造断裂以南北向断裂为主，规模较大，其次为北东向、东西向及北西向断裂。区域性的牡丹江断裂通过坝址左岸垭口，向南伸入库区，向北延至下游，但无现代活动迹象。经辽宁省地震局鉴定，基本地震烈度为6度。</p>';
        }

        if (properties[1]=="莲花闸口"){
            var img='<img src="../images/zhakou.PNG"  style="width: 100%;height: 150px">'
            html += '<h1>' + img + '</h1>';
            html += '<p style="font-weight:bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;水库位于区域构造相对稳定的地区，区内出露的地层主要有下元古界的混合花岗岩、混合岩及角闪斜长片麻岩等，侵入岩主要有元古界的混合花岗岩、花岗闪长岩等。区内构造断裂以南北向断裂为主，规模较大，其次为北东向、东西向及北西向断裂。区域性的牡丹江断裂通过坝址左岸垭口，向南伸入库区，向北延至下游，但无现代活动迹象。经辽宁省地震局鉴定，基本地震烈度为6度。</p>';
            html+=' <div id="main4" style="width:100%;height:100%;"></div>';
            require([
                'echarts'
            ], function (echarts) {
                var chart2 = echarts.init(document.getElementById('main4'), null, {});
                chart2.setOption({
                    title: [
                        {
                            text: '莲花闸门历年排水量比例',
                            x: '50%',
                            y: '0%',
                            textAlign: 'center'
                        }],
                    tooltip : {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['排水量'],
                        y:'7%'
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['2010年','2011年','2012年','2013年','2014年','2015年','2016年','2017年']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            name : '水量',
                            axisLabel : {
                                formatter: '{value} t'
                            }
                        }
                    ],
                    series : [
                        {
                            name:'排水量',
                            type:'bar',
                            data:[12.6, 15.9, 19.0, 46.4, 38.7, 70.7, 175.6, 182.2]
                        }
                    ]
                });

            });
        }
        if (properties[1]=="这是内容"){
            var img='<img src="../images/qqq.PNG"  style="width: 100%;height: 150px">'
            html += '<h1>' + img + '</h1>';
            html += '<p style="font-weight:bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;水库位于区域构造相对稳定的地区，区内出露的地层主要有下元古界的混合花岗岩、混合岩及角闪斜长片麻岩等，侵入岩主要有元古界的混合花岗岩、花岗闪长岩等。区内构造断裂以南北向断裂为主，规模较大，其次为北东向、东西向及北西向断裂。区域性的牡丹江断裂通过坝址左岸垭口，向南伸入库区，向北延至下游，但无现代活动迹象。经辽宁省地震局鉴定，基本地震烈度为6度。</p>';
        }
        if (properties[1]=="莲花电力"){
            var img='<img src="../images/lhdianli.PNG"  style="width: 100%;height: 150px">'
            html += '<h1>' + img + '</h1>';
            html += '<p style="font-weight:bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;莲花发电厂共装有四台水轮发电机组，单机容量为137.5MW 总装机容量为 550MW ，设计年发电量 7.97 亿 KWh ，年可利用小时 1449 小时，莲花发电厂于 1992 年开工兴建， 1994 年大江截流， 1996 年首台机组发电， 1998 年四台机组全部投产发电。提前两年完成了投产发电计划。\n'+
                '在每年只有八个月施工期的高寒地区，只用六年的时间就实现了二、四、六、八的奋斗目标，提前两年完成了投产发电计划，博得了“南有广蓄，北有莲花”的殊荣。</p>';
            html+= '<div id="main3" style="width:100%;height:100%;"></div>';
            require([
                'echarts'
            ], function (echarts) {
                var chart1 = echarts.init(document.getElementById('main3'), null, {});
                var builderJson = {
                    "all": 10887,
                    "charts": {
                        "2010年": 2405,
                        "2011年": 1842,
                        "2012年": 2090,
                        "2013年": 1762,
                        "2014年": 1593,
                        "2015年": 2060,
                        "2016年": 1537,
                        "2017年": 3237
                    },
                    "ie": 97434
                };

                chart1.setOption({
                    tooltip: {},
                    title: [
                        {
                            text: '莲花水电站历年发电量比例',
                            x: '50%',
                            y: '0%',
                            textAlign: 'center'
                        }],
                    grid: [{
                        top: '10%',
                        width: '60%',
                        height:'80%',
                        left:1,
                        containLabel: true
                    }],
                    xAxis: [{
                        type: 'value',
                        max: builderJson.all,
                        splitLine: {
                            show: false
                        }
                    }],
                    yAxis: [{
                        type: 'category',
                        data: Object.keys(builderJson.charts),
                        axisLabel: {
                            interval: 0,
                            rotate: 30
                        },
                        splitLine: {
                            show: false
                        }
                    }],
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        z: 3,
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorList = [
                                        '#C1232B', '#2f4554', '#61a0a8', '#d48265', '#91c7ae',
                                        '#749f83', '#ca8622', '#bda29a'
                                    ];
                                    return colorList[params.dataIndex]
                                }
                            }
                        },
                        label: {
                            normal: {
                                position: 'right',
                                show: true
                            }
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.charts[key];
                        })
                    }, {
                        type: 'bar',
                        stack: 'chart',
                        silent: true,
                        itemStyle: {
                            normal: {
                                color: '#eee'
                            }
                        },
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return builderJson.all - builderJson.charts[key];
                        })
                    }, {
                        type: 'pie',
                        radius: [0, '40%'],
                        center: ['75%', '45%'],
                        data: Object.keys(builderJson.charts).map(function (key) {
                            return {
                                name: key.replace('', ''),
                                value: builderJson.charts[key]
                            }
                        })
                    }]
                });
            });


        }
        if (properties[1]=="莲花主楼"){
            var img='<img src="../images/zhulou.PNG"  style="width: 100%;height: 150px">'
            html += '<h1>' + img + '</h1>';
            html += '<p style="font-weight:bold">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;水库位于区域构造相对稳定的地区，区内出露的地层主要有下元古界的混合花岗岩、混合岩及角闪斜长片麻岩等，侵入岩主要有元古界的混合花岗岩、花岗闪长岩等。区内构造断裂以南北向断裂为主，规模较大，其次为北东向、东西向及北西向断裂。区域性的牡丹江断裂通过坝址左岸垭口，向南伸入库区，向北延至下游，但无现代活动迹象。经辽宁省地震局鉴定，基本地震烈度为6度。</p>';
        }
        if (html.length > 0) {
            html = '<table class="zebra"><tbody>' + html + '</tbody></table>';
            document.getElementById("win").innerHTML=html;


        }

        return html;

    }



    // 得到[经度,纬度,经度,纬度...]形式的数组，用于构造面。
    function getLonLatArray(points) {
        var point3D = [];
        points.forEach(function (point) {
            point3D.push(point.x);
            point3D.push(point.y);
        });
        return point3D;
    }
    screen1();

}

//窗体范围
$("#createSchoolWindow").window({
    onMove: function (left, top) {

        //console.log(this.left+" - "+top);
        if (left < 0) {
            $("#createSchoolWindow").window("move", {left: 0});
        }
        if (top < 0) {
            $("#createSchoolWindow").window("move", {top: 0});
        }
        if (left > 1109) {
            $("#createSchoolWindow").window("move", {left: 1109});
        }
        if (top > 680) {
            $("#createSchoolWindow").window("move", {top: 680});
        }


    },
    onResize: function (width, height) {
        var w = $(window).width();//可视宽度
        var h = $(window).height();//可视高度

        var left = $("#createSchoolWindow").window("options").left;//窗体左边距离
        var top = $("#createSchoolWindow").window("options").top;//窗体上边距离


        if ((width + left) > w) {
            $("#createSchoolWindow").window("resize", {width: w - left});
        }
        if ((height + top) > h) {
            $("#createSchoolWindow").window("resize", {height: h - top});
        }

    }

});