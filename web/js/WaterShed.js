function onload(Cesium) {
    var viewer = new Cesium.Viewer('cesiumContainer', {
        infoBox: false,
        selectionIndicator: false,
        fullscreenButton:true
    });
    var viewer2 = new Cesium.Viewer('cesiumContainer2',{
        infoBox: false,
    });
    viewer._cesiumWidget._creditContainer.style.display = "none";
    viewer2._cesiumWidget._creditContainer.style.display = "none";
    //加载底图
    viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
        url: 'http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}',
        tilingScheme: new Cesium.WebMercatorTilingScheme()
    }));
    viewer2.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
        url: 'http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}',
        tilingScheme: new Cesium.WebMercatorTilingScheme()
    }));
    var scene = viewer2.scene;
    promise = scene.open(url.name);
    //设置相机视角
    viewer.camera.setView({
        destination: Cesium.Cartesian3.fromDegrees(129.38840188064577, 42.70417880491015, 150000), // 设置位置
        orientation: {
            heading: Cesium.Math.toRadians(-25.0), // 方向
            pitch: Cesium.Math.toRadians(-45.0),// 倾斜角度
            roll: 0
        }
    });
    //屏蔽双击选中
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    //创建KML polygon datasource,并设置贴对象属性
    //牡丹岭到江源镇
    var my_datasource_1 = viewer.dataSources.add(Cesium.KmlDataSource.load('../js/qly/mudanling.kml', {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToS3M: true//设置贴对象(s3m)
    })).then(function (dataSources,time) {


        setTimeout(function(){my_function_1(dataSources,time)}, 800);

    });
    //江源镇到红石水库
    var my_datasource_1 = viewer.dataSources.add(Cesium.KmlDataSource.load('../js/qly/jiangyuanzhen2.kml', {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToS3M: true//设置贴对象(s3m)
    })).then(function (dataSources,time) {


        setTimeout(function(){my_function_2(dataSources,time)}, 800);
    })
    //红石水库到敦化市
    var my_datasource_1 = viewer.dataSources.add(Cesium.KmlDataSource.load('../js/qly/hongshishuiku.kml', {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToS3M: true//设置贴对象(s3m)
    })).then(function (dataSources,time) {

        setTimeout(function(){my_function_3(dataSources,time)}, 800);
    })
    //敦化市到上沟水库
    var my_datasource_1 = viewer.dataSources.add(Cesium.KmlDataSource.load('../js/qly/dunhuashi.kml', {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToS3M: true//设置贴对象(s3m)
    })).then(function (dataSources,time) {


        setTimeout(function(){my_function_4(dataSources,time)}, 800);
    })

    //上沟水库到西崴子水库
    var my_datasource_1 = viewer.dataSources.add(Cesium.KmlDataSource.load('../js/qly/shanggoushuiku.kml', {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToS3M: true//设置贴对象(s3m)
    })).then(function (dataSources,time) {

        setTimeout(function(){my_function_5(dataSources,time)}, 800);

    })
    //西崴子水库到黑市水库
    var my_datasource_1 = viewer.dataSources.add(Cesium.KmlDataSource.load('../js/qly/xiwaizi.kml', {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToS3M: true//设置贴对象(s3m)
    })).then(function (dataSources,time) {

        setTimeout(function(){my_function_6(dataSources,time)}, 800);
    })
    //黑石水库到雁鸣湖
    var my_datasource_1 = viewer.dataSources.add(Cesium.KmlDataSource.load('../js/qly/heishishuiku.kml', {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToS3M: true//设置贴对象(s3m)
    })).then(function (dataSources,time) {
        setTimeout(function(){my_function_7(dataSources,time)}, 800);

    })


    //雁鸣湖到镜泊湖
    var my_datasource_1 = viewer.dataSources.add(Cesium.KmlDataSource.load('../js/qly/yanminghu.kml', {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToS3M: true//设置贴对象(s3m)
    })).then(function (dataSources,time) {
        setTimeout(function(){my_function_8(dataSources,time)},800);

    })

    //镜泊湖到宁安市
    var my_datasource_1 = viewer.dataSources.add(Cesium.KmlDataSource.load('../js/qly/jingpohu.kml', {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToS3M: true//设置贴对象(s3m)
    })).then(function (dataSources,time) {
        setTimeout(function(){my_function_9(dataSources,time)}, 800);

    })

    //宁安市到牡丹江
    var my_datasource_1 = viewer.dataSources.add(Cesium.KmlDataSource.load('../js/qly/ningan.kml', {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToS3M: true//设置贴对象(s3m)
    })).then(function (dataSources,time) {
        setTimeout(function(){my_function_10(dataSources,time)}, 800);

    })
    //牡丹江到莲花水电厂
    var my_datasource_1 = viewer.dataSources.add(Cesium.KmlDataSource.load('../js/qly/mudanjiang.kml', {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToS3M: true//设置贴对象(s3m)
    })).then(function (dataSources,time) {
        setTimeout(function(){my_function_11(dataSources,time)}, 800);

    })
    //莲花水电厂到乌斯浑河
    var my_datasource_1 = viewer.dataSources.add(Cesium.KmlDataSource.load('../js/qly/lianhua.kml', {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToS3M: true//设置贴对象(s3m)
    })).then(function (dataSources,time) {
        setTimeout(function(){my_function_12(dataSources,time)}, 800);
    })
    viewer.dataSources.add(Cesium.KmlDataSource.load('../js/newhbh.kml', {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToS3M : true//设置贴对象(s3m)
    })).then(function (dataSource) {
        entity_collection = dataSource.entities;
        my_entity_array = entity_collection.values;
        for (var i = 0; i < my_entity_array.length; i++) {
                if (Cesium.defined(my_entity_array[i].billboard)) {
                   my_entity_array[i].billboard.width = 150;  my_entity_array[i].billboard.height = 50;
                my_entity_array[i].billboard.distanceDisplayCondition= new Cesium.DistanceDisplayCondition(1.0, 20000000000.0);
                my_entity_array[i].billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;// 调整垂直方向的原点，保证图标里的针尖对着地表位置
                handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
                // 鼠标双击打开右侧菜单
                handler.setInputAction(function (click) {
                      var pick = viewer.scene.pick(click.position);
                     if (pick && pick.id) {
                          var jingwei = my_entity_array[pick.id.id].kml.extendedData.my_fileds.value;
                          //寻找第一个逗号
                          var douhao = jingwei.indexOf(",");
                          //寻找最后一个逗号
                          var douhao2 = jingwei.lastIndexOf(",");
                          //截取经度数值
                          var j1 = jingwei.substring(0, douhao);
                          var j=parseFloat(j1);
                          //截取纬度
                          var w1 = jingwei.substring(douhao + 1, douhao2);
                          var w=parseFloat(w1);
                          //右侧窗体相机视角
                          viewer2.camera.setView({
                              destination: new Cesium.Cartesian3.fromDegrees(j, w, 1000),
                              orientation: {
                                  heading: 30.255714027185674,
                                  pitch: -20,
                                  roll: 6.283090080629748
                              }
                          });
                        var p = $("#cc").layout("panel", "east")[0].clientWidth;
                        if (p > 0) {
                            return;
                        } else {
                            $('#cc').layout('expand', 'east');
                        }
                   }
                }, Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
            }
        }
    });

    /**
     * 测量
     */
    var clampMode = 0; // 空间模式
    var handlerDis, handlerArea, handlerHeight;
    var camera = scene.camera;

    promise.then(function (layers) {
        viewer2._cesiumWidget._creditContainer.style.display = "none";
        //初始化测量距离
        handlerDis = new Cesium.MeasureHandler(viewer2, Cesium.MeasureMode.Distance, clampMode);
        //注册测距功能事件
        handlerDis.measureEvt.addEventListener(function (result) {
            var dis = Number(result.distance);
            var distance = dis > 1000 ? (dis / 1000).toFixed(2) + '千米' : dis.toFixed(2) + '米';
            handlerDis.disLabel.text = '距离:' + distance;
        });

        handlerDis.activeEvt.addEventListener(function (isActive) {
            if (isActive == true) {
                viewer2.enableCursorStyle = false;
                viewer2._element.style.cursor = '';
                $('body').removeClass('measureCur').addClass('measureCur');
            } else {
                viewer2.enableCursorStyle = true;
                $('body').removeClass('measureCur');
            }
        });

        //初始化测量面积
        handlerArea = new Cesium.MeasureHandler(viewer2, Cesium.MeasureMode.Area, clampMode);
        handlerArea.measureEvt.addEventListener(function (result) {
            var mj = Number(result.area);
            var area = mj > 1000000 ? (mj / 1000000).toFixed(2) + '平方千米' : mj.toFixed(2) + '平方米'
            handlerArea.areaLabel.text = '面积:' + area;
        });
        handlerArea.activeEvt.addEventListener(function (isActive) {
            if (isActive == true) {
                viewer2.enableCursorStyle = false;
                viewer2._element.style.cursor = '';
                $('body').removeClass('measureCur').addClass('measureCur');
            } else {
                viewer2.enableCursorStyle = true;
                $('body').removeClass('measureCur');
            }
        });

        //初始化测量高度
        handlerHeight = new Cesium.MeasureHandler(viewer2, Cesium.MeasureMode.DVH);
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
                viewer2.enableCursorStyle = false;
                viewer2._element.style.cursor = '';
                $('body').removeClass('measureCur').addClass('measureCur');
            } else {
                viewer2.enableCursorStyle = true;
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
    })
}
function my_function_1(data,time)
{
    var xx = setInterval(function(){
        setTimeout(function(){data.show = false;}, 1000);
        setTimeout(function(){data.show = true;}, 100);}, 500);

}

function my_function_2(data,time)
{

    var xx = setInterval(function(){
        setTimeout(function(){data.show = false;}, 1000);
        setTimeout(function(){data.show = true;}, 100); }, 498);

}


function my_function_3(data,time)
{
    var xx = setInterval(function(){
        setTimeout(function(){data.show = false;}, 1000);
        setTimeout(function(){data.show = true;}, 100); }, 498);
    // setTimeout(function(){clearInterval(xx);}, time);
}
function my_function_4(data,time)
{
    var xx = setInterval(function(){
        setTimeout(function(){data.show = false;}, 1000);
        setTimeout(function(){data.show = true;}, 100);}, 500);
}

function my_function_5(data,time)
{
    var xx = setInterval(function(){
        setTimeout(function(){data.show = false;}, 1000);
        setTimeout(function(){data.show = true;}, 100); }, 498);
}
function my_function_6(data,time)
{
    var xx = setInterval(function(){
        setTimeout(function(){data.show = false;}, 1000);
        setTimeout(function(){data.show = true;}, 100); }, 498);
}

function my_function_7(data,time)
{
    var xx = setInterval(function(){
        setTimeout(function(){data.show = false;}, 1000);
        setTimeout(function(){data.show = true;}, 100); }, 498);
}


function my_function_8(data,time)
{
    var xx = setInterval(function(){
        setTimeout(function(){data.show = false;}, 1000);
        setTimeout(function(){data.show = true;}, 100); }, 498);
}


function my_function_9(data,time)
{
    var xx = setInterval(function(){
        setTimeout(function(){data.show = false;}, 1000);
        setTimeout(function(){data.show = true;}, 100); }, 498);
}


function my_function_10(data,time)
{
    var xx = setInterval(function(){
        setTimeout(function(){data.show = false;}, 1000);
        setTimeout(function(){data.show = true;}, 100); }, 498);
}


function my_function_11(data,time)
{
    var xx = setInterval(function(){
        setTimeout(function(){data.show = false;}, 1000);
        setTimeout(function(){data.show = true;}, 100); }, 498);
}

function my_function_12(data,time)
{
    var xx = setInterval(function(){
        setTimeout(function(){data.show = false;}, 1000);
        setTimeout(function(){data.show = true;}, 100); }, 498);
}






