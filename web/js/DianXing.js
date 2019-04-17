/**
 * 典型场景
 */
function dianxing() {
    var scene = viewer.scene;
    var camera = scene.camera;


    //添加S3M图层服务


    //去掉地图logo
    viewer._cesiumWidget._creditContainer.style.display = "none";


    promise.then(function (layers) {
        viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(116.380116005574, 39.987407826007498, 10000000.939740588888501), // 设置位置
        });


        $("#shuiba").click(function () {
            camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(129.794400989007, 45.4251357745623, 206.587566),
                orientation: {
                    heading: Cesium.Math.toRadians(20.0), // 方向
                    pitch: Cesium.Math.toRadians(-90.0),// 倾斜角度
                    roll: 0
                }
            });
        });
    })


}

//窗体范围
$("#lianhua").window({
    onMove: function (left, top) {

        //console.log(this.left+" - "+top);
        if (left < 0) {
            $("#lianhua").window("move", {left: 0});
        }
        if (top < 0) {
            $("#lianhua").window("move", {top: 0});
        }
        if (left > 160) {
            $("#lianhua").window("move", {left: 160});
        }
        if (top > 175) {
            $("#lianhua").window("move", {top: 175});
        }


    },
    onResize: function (width, height) {
        var w = $(window).width();//可视宽度
        var h = $(window).height();//可视高度

        var left = $("#lianhua").window("options").left;//窗体左边距离
        var top = $("#lianhua").window("options").top;//窗体上边距离


        if ((width + left) > w) {
            $("#lianhua").window("resize", {width: w - left});
        }
        if ((height + top) > h) {
            $("#lianhua").window("resize", {height: h - top});
        }
    }

});
