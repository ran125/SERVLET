var entity=null;
function onload(Cesium) {
    var viewer = new Cesium.Viewer('cesiumContainer',{
        infoBox: false,
        selectionIndicator: false,
        trackedEntityChanged:false,
    });
    //移除双击事件
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    viewer._cesiumWidget._creditContainer.style.display = "none";
    var scene = viewer.scene;
    var  promise = scene.open(url.name);
    promise.then(function (layers) {
        viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(129.792674032311,45.425990036572,1200.693684695289), // 设置位置
            orientation: {
                heading: Cesium.Math.toRadians(90.0), // 方向
                pitch: Cesium.Math.toRadians(-60.0),// 倾斜角度
            }
        });
    });


    viewer.dataSources.add(Cesium.KmlDataSource.load('../js/shipin234.kml', {
        camera: viewer.scene.camera,
        canvas: viewer.scene.canvas,
        clampToS3M : true//设置贴对象(s3m)

    })).then(function (dataSource) {
        entity=dataSource.entities.values;
        entity_collection = dataSource.entities;
        my_entity_array = entity_collection.values;
        for (var i = 0; i < my_entity_array.length; i++) {
            if (Cesium.defined(my_entity_array[i].billboard)) {
                my_entity_array[i].billboard.width = 50;  my_entity_array[i].billboard.height = 40;
                my_entity_array[i].billboard.distanceDisplayCondition= new Cesium.DistanceDisplayCondition(100.0, 10000.0);
                my_entity_array[i].billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;// 调整垂直方向的原点，保证图标里的针尖对着地表位置
            }
            handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
            handler.setInputAction(function (click) {
                var pick = viewer.scene.pick(click.position);
                var html="";

                if (pick && pick.id.name=="A000001"){
                    my_entity_array[1].billboard.color = Cesium.Color.BLUE;
                    my_entity_array[2].billboard.color = Cesium.Color.WHITE;
                    my_entity_array[3].billboard.color = Cesium.Color.WHITE;
                    $('#win11').window('open');
                    // alert("dsaa")name
                    html+='<h3  align="center">A区摄像头传感器</h3>'
                    html+='<p align="center" style="font-weight:bold">传感器编号：A000001,传感器状态:正常</p>'
                    html+='<video src="../video/daba.mp4" autoplay="autoplay" loop="loop" muted="muted" style="width: 100%;">您的浏览器不支持video标签</video>'
                    document.getElementById("win11").innerHTML=html;
                }
                if (pick && pick.id.name=="A000002"){
                    my_entity_array[1].billboard.color = Cesium.Color.WHITE;
                    my_entity_array[2].billboard.color = Cesium.Color.BLUE;
                    my_entity_array[3].billboard.color = Cesium.Color.WHITE;
                    $('#win11').window('open');
                    // alert("dsaa")name
                    html+='<h3  align="center">A区摄像头传感器</h3>'
                    html+='<p align="center" style="font-weight:bold">传感器编号：A000002,传感器状态:正常</p>'
                    html+='<video src="../video/dianchang.mp4" autoplay="autoplay" loop="loop" muted="muted" style="width: 100%;">您的浏览器不支持video标签</video>'
                    document.getElementById("win11").innerHTML=html;
                }
                if (pick && pick.id.name=="A000003"){
                    my_entity_array[1].billboard.color = Cesium.Color.WHITE;
                    my_entity_array[2].billboard.color = Cesium.Color.WHITE;
                    my_entity_array[3].billboard.color = Cesium.Color.BLUE;
                    $('#win11').window('open');
                    // alert("dsaa")name
                    html+='<h3  align="center">A区摄像头传感器</h3>'
                    html+='<p align="center" style="font-weight:bold">传感器编号：A000003,传感器状态:正常</p>'
                    html+='<video src="../video/daba2.mp4" autoplay="autoplay" loop="loop" muted="muted" style="width: 100%;">您的浏览器不支持video标签</video>'
                    document.getElementById("win11").innerHTML=html;
                }
            },Cesium.ScreenSpaceEventType.LEFT_CLICK);

        }

    });

}