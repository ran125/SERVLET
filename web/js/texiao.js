function onload(Cesium) {
  viewer = new Cesium.Viewer('cesiumContainer',{infoBox:false});
    scene = viewer.scene;
    camera =  scene.camera;
    //添加S3M图层服务
   promise = scene.open(url.name);
    //去掉地图logo
    viewer._cesiumWidget._creditContainer.style.display = "none";
    promise.then(function (layers) {
        viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(116.380116005574, 39.987407826007498, 10000000.939740588888501) // 设置位置
        });
    });
    moxing(viewer,Cesium,scene,promise);
    $("#Car").click(function () {
        CarShow(viewer, promise, Cesium, scene);
    });
    $("#dianliu").click(function () {
        var evt = new Cesium.Event();
        xianshi(viewer, evt, point);
    });
    $("#qiao").click(function () {
        camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(129.786853530306 ,   45.4220917653681 ,   262.840420007114 ),
            orientation: {
                heading: Cesium.Math.toRadians(10.0), // 方向
                pitch: Cesium.Math.toRadians(-30.0),// 倾斜角度
                roll: 0
            }
        });
        var a=document.getElementById("ttc");
        a.style.display="block";
    });
    $("#gc").click(function () {
        camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(  129.798056884294,   45.4450013775208,  200.693684695289
        ),
            orientation: {
                heading: Cesium.Math.toRadians(10.0), // 方向
                pitch: Cesium.Math.toRadians(-30.0),// 倾斜角度
                roll: 0
            }
        });
        var a=document.getElementById("ttc");
        a.style.display="block";
    });
    $("#tx").click(function () {
        camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(129.785853530306 ,   45.4170917653681 ,   362.840420007114),
            orientation: {
                heading: Cesium.Math.toRadians(20.0), // 方向
                pitch: Cesium.Math.toRadians(-10.0),// 倾斜角度
                roll: 0
            }
        });
        var a=document.getElementById("ttc");
        a.style.display="block";
    });

    onload1();
}
