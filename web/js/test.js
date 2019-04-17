var flyManager;
var audio = document.getElementById("aa");
function onload(Cesium) {
    audio.pause();
    var toolbar = document.getElementById('toolbar');
   var  viewer = new Cesium.Viewer('cesiumContainer');
   //添加地形
    var terrainProvider = new Cesium.CesiumTerrainProvider({
        url : 'https://www.supermapol.com/realspace/services/3D-stk_terrain/rest/realspace/datas/info/data/path',
       // requestVertexNormals: true,
        requestWaterMask: true
        });
    viewer.terrainProvider = terrainProvider;
    viewer.scene.globe.enableLighting = true;
    //去掉logo
    viewer._cesiumWidget._creditContainer.style.display = "none";
    //加载底图
    viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
        url: 'http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}',
        tilingScheme: new Cesium.WebMercatorTilingScheme()
    }));
    var scene = viewer.scene;
    /*在场景中使用的globe。如果设置为false，则不会添加地球仪。2如果广告牌，折线，标签等基元应该对地形表面进行深度测试，则为真;如果这些基元应始终绘制在地形之上，则为真，除非它们位于地球的另一侧。针对地形的深度测试基元的缺点在于，轻微的数字噪声或地形细节水平的切换有时会使表面上应该消失的基元消失。*/
    scene.globe.depthTestAgainstTerrain = false;
    var camera = scene.camera;
    //添加S3M图层服务
      promise = scene.open(url.name);
      promise.then(function (layers) {
          viewer.camera.setView({
              destination: Cesium.Cartesian3.fromDegrees(116.380116005574, 39.987407826007498, 13000000.939740588888501), // 设置位置
              orientation: {
                  heading: Cesium.Math.toRadians(20.0), // 方向
                  pitch: Cesium.Math.toRadians(-90.0),// 倾斜角度
                  roll: 0
              }
          });

//模型贴地---------------------------------------------------------------------------------------------------------
  /*    for(var i=0; i<layers.length; i++)  //模型贴地，这里电塔有问题，降高度后位置错乱，做数据的没做好
        {
            if(layers[i].name.indexOf("ModelEdit_px@3dmax") >= 0 )
            {
                layers[i].style3D.bottomAltitude = -170;
            }
            else
            {
                layers[i].style3D.bottomAltitude = -150;
            }
            layers[i].refresh();
        }*/

        //音乐播放与飞行开始--------------------------------------------------------------------------------------------------------
        function bofang() {
            if (audio.paused) { //判读是否播放  
                audio.paused = false;
                audio.play(); //没有就播放 
                flyManager.play();
            }
        }
        //相机飞行
            viewer.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(127.926851720275,43.04191276552714, 1500), // 设置位置
                duration: 10, // 设置飞行持续时间，默认会根据距离来计算
                pitchAdjustHeight: -90, // 如果摄像机飞越高于该值，则调整俯仰俯仰的俯仰角度，并将地球保持在视口中。
                //maximumHeight:5000, // 相机最大飞行高度
                //flyOverLongitude: 100, // 如果到达目的地有2种方式，设置具体值后会强制选择方向飞过这个经度
                // 到达位置后执行的回调函数
                complete: function () {
                setTimeout(bofang, 50);
                }
            });

        //创建飞行路线集合对象。（个人感觉参数的作用只是为了展示实体）
        var routes = new Cesium.RouteCollection(viewer.entities);
        //添加fpf飞行文件，fpf由SuperMap iDesktop生成
        routes.fromFile('../js/lh.fpf');
        //初始化飞行管理
        var flyManager = new Cesium.FlyManager({
            /*场景对象*/
            scene: scene,
            /*飞行路线集合对象（从飞行文件中读取的）。*/
            routes: routes,
        });

        //注册站点到达事件
        flyManager.stopArrived.addEventListener(function (routeStop) {
            routeStop.waitTime = 0.0; // 在每个站点处停留1s
        });
        flyManager.readyPromise.then(function () { // 飞行路线就绪
            var currentRoute = flyManager.currentRoute;
            currentRoute.isLineVisible = false;
            currentRoute.isStopVisible = false;
            //生成飞行文件中的所有站点列表
            var allStops = flyManager.getAllRouteStops();
            var menu = document.getElementById('stopList');
            for (var i = 0, j = allStops.length; i < j; i++) {
                var option = document.createElement('option');
                option.innerHTML = "站点 " + (i + 1);
                option.value = allStops[i].index;
                menu.appendChild(option);
            }
            $('#stopList').change(function () { //注册站点切换事件
                flyManager && flyManager.stop();
                var index = parseInt($(this).val()); // 站点的索引
                var route = flyManager.currentRoute;
                var stop = route.get(index);
                flyManager.currentStopIndex = index;
                flyManager.viewToStop(stop);
            });

            $('#play').click(function () {
                flyManager && flyManager.play();
                audio.play();
            });
            $('#pause').click(function () {
                flyManager && flyManager.pause();
                audio.pause();
            });
            $('#stop').click(function () {
                flyManager && flyManager.stop();
                audio.load();
            });
            /* $('#show-line').change(function () {
                currentRoute.isLineVisible = $(this).prop('checked');
            });
            $('#show-stop').change(function () {
                currentRoute.isStopVisible = $(this).prop('checked');
            });*/
            $('#loadingbar').remove();
        });
        //循环页面到达最后一个站点刷新
          flyManager.stopArrived.addEventListener(function(routeStop){
              if (routeStop.index==72) {
                setTimeout(function(){location.reload()},1000);
              };
              //显示实体
              //添加敦化市
              if (routeStop.index==9) {
                  viewer.entities.add({
                      position : Cesium.Cartesian3.fromDegrees(128.240069243566,43.36069446521731),
                      billboard :{
                          id:'dhs',
                          image : '../images/dhs2.png'
                      }
                  });
              };
              //添加黑石水库
              if (routeStop.index==16) {
                  viewer.entities.add({
                      position : Cesium.Cartesian3.fromDegrees(128.1980810188602,43.62255476688145),
                      billboard :{
                          image : '../images/hssk2.png'
                      }
                  });
              };
              //添加镜泊湖水库
              if (routeStop.index==30) {
                  viewer.entities.add({
                      position : Cesium.Cartesian3.fromDegrees(128.8530677190901,43.82758954102775),
                      billboard :{
                          image : '../images/jbhsk2.png'
                      }
                  });
              };
              //添加老厂
              if (routeStop.index==39) {
                  viewer.entities.add({
                      position : Cesium.Cartesian3.fromDegrees(128.9529959316699,44.03916403563529),
                      billboard :{
                          image : '../images/lc2.png'
                      }
                  });
              };
              //添加宁安市
              if (routeStop.index==48) {
                  viewer.entities.add({
                      position : Cesium.Cartesian3.fromDegrees(129.4945007214383,44.34002664299258),
                      billboard :{
                          image : '../images/nas2.png'
                      }
                  });
              };
              //添加牡丹江市
              if (routeStop.index==50) {
                  viewer.entities.add({
                      position : Cesium.Cartesian3.fromDegrees(129.6116084240439,44.56861057536652),
                      billboard :{
                          image : '../images/mdjs2.png'
                      }
                  });
              };
              //添加莲花水电厂
              if (routeStop.index==61) {
                  viewer.entities.add({
                      position : Cesium.Cartesian3.fromDegrees(129.7971687066846,45.42213927363305,300),
                      billboard :{
                          image : '../images/lhsdc2.png'
                      }
                  });
              };
          });
    });
}



