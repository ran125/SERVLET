var entity=null;
function onload(Cesium) {
    var viewer = new Cesium.Viewer('cesiumContainer',{
        infoBox: false,
        selectionIndicator: false});
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    viewer._cesiumWidget._creditContainer.style.display = "none";
    var scene = viewer.scene;

    var  promise = scene.open(url.name);
    promise.then(function (layers) {
        viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(129.80814674916 ,  45.4272756086028 ,  800), // 设置位置
            orientation: {
                heading: Cesium.Math.toRadians(-80.0), // 方向
                pitch: Cesium.Math.toRadians(-50.0),// 倾斜角度
                roll: 0,
                duration: 10
            }
        });
    });

    viewer.dataSources.add(Cesium.KmlDataSource.load('../js/huozai.kml', {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToS3M : true//设置贴对象(s3m)

    })).then(function (dataSource) {
        entity=dataSource.entities.values;
        entity_collection = dataSource.entities;
        my_entity_array = entity_collection.values;
        for (var i = 0; i < my_entity_array.length; i++) {
            if (Cesium.defined(my_entity_array[i].billboard)) {
                my_entity_array[i].billboard.width = 40;  my_entity_array[i].billboard.height = 50;
                my_entity_array[i].billboard.distanceDisplayCondition= new Cesium.DistanceDisplayCondition(500.0, 10000.0);
                my_entity_array[i].billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;// 调整垂直方向的原点，保证图标里的针尖对着地表位置
            }
            handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
            handler.setInputAction(function (click) {
                var pick = viewer.scene.pick(click.position);
                var html="";
                if (pick && pick.id.name=="B000001"){
                    my_entity_array[1].billboard.color = Cesium.Color.BLUE;
                    my_entity_array[2].billboard.color = Cesium.Color.WHITE;
                    my_entity_array[3].billboard.color = Cesium.Color.WHITE;
                    $('#huozai').window('open');
                    html+='<h3  align="center">B区摄像头传感器</h3>';
                    html+='<p align="center" style="font-weight:bold">传感器编号：B000001, 传感器状态: 正常, 当前无火灾情况：&nbsp;<img src="../images/fire.png" width="20px" height="20px" /></p>';
                    html+='<video src="../video/huozai1.mp4" autoplay="autoplay" loop="loop" muted="muted" style="width: 100%;">您的浏览器不支持video标签</video>';
                    document.getElementById("huozai").innerHTML=html;
                }
                if (pick && pick.id.name=="B000002"){
                    my_entity_array[1].billboard.color = Cesium.Color.WHITE;
                    my_entity_array[2].billboard.color = Cesium.Color.BLUE;
                    my_entity_array[3].billboard.color = Cesium.Color.WHITE;
                    $('#huozai').window('open');
                    html+='<h3  align="center">B区摄像头传感器</h3>';
                    html+='<p align="center" style="font-weight:bold">传感器编号：B000001, 传感器状态: 正常, 当前无火灾情况：&nbsp;<img src="../images/fire.png" width="20px" height="20px" /></p>';
                    html+='<video src="../video/huozai2.mp4" autoplay="autoplay" loop="loop" muted="muted" style="width: 100%;">您的浏览器不支持video标签</video>';
                    document.getElementById("huozai").innerHTML=html;
                }
                if (pick && pick.id.name=="B000003"){
                    my_entity_array[1].billboard.color = Cesium.Color.WHITE;
                    my_entity_array[2].billboard.color = Cesium.Color.WHITE;
                    my_entity_array[3].billboard.color = Cesium.Color.BLUE;
                    $('#huozai').window('open');
                    html+='<h3  align="center">B区摄像头传感器</h3>';
                    html+='<p align="center" style="font-weight:bold">传感器编号：B000001, 传感器状态: 正常, 当前无火灾情况：&nbsp;<img src="../images/fire.png" width="20px" height="20px" /></p>';
                    html+='<video src="../video/huozai3.mp4" autoplay="autoplay" loop="loop" muted="muted" style="width: 100%;">您的浏览器不支持video标签</video>';
                    document.getElementById("huozai").innerHTML=html;
                }
            },Cesium.ScreenSpaceEventType.LEFT_CLICK);
        }
    });
}