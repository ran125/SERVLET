var length = 100;
var xs = 0;
var animationObj;
function xianshi(viewer,evt,point){
    animationObj = {
        type : 'time',
        stepsRange : {
            start : 0,
            end : 300
        },
        trails : 50,
        duration : 10,
        event : evt
    };
    if (xs % 2 == 0) {
        point2=point[1];
        point1=point[0];
        yi(viewer,point2);
        er(viewer,point1);
    }else{
        viewer.entities.removeAll();
    }
    xs++;
}
function yi(viewer,point2){
    for ( var j = 0; j < point2.length; j++) {
        if (j + 1 == point2.length) {
            return;
        }
        var start = point2[j][0];
        var end = point2[j + 1][0];
        var lat = [ point2[j][1], point2[j + 1][1] ];
        var height = point2[j][2];
        for ( var i = 0; i < length; i++) {

            var lon = Cesium.Math.lerp(start, end, i / (length - 1));
            var la = Cesium.Math.lerp(lat[0], lat[1], i / (length - 1));
            if (j==0) {
                height = height + 0.24;
            }
            if (j==1) {
                height = height + 0.53;
            }
            if (j==2) {
                height = height - 0.57;
            }
            viewer.entities
                .add({
                    position : Cesium.Cartesian3.fromDegrees(lon,
                        la, height),
                    nameID : i,
                    availability : new Cesium.TimeIntervalCollection(
                        null, animationObj),
                    billboard : {
                        image : '../js/SuperMap_iClient3D_9D_for_WebGL_1901211048/examples/images/point.png',
                        width : 15,
                        height : 10,
                        color : new Cesium.Color(0, 1, 0, 1)
                    }
                });

        }
    }
}
function er(viewer,point1){
    for ( var j = 0; j < point1.length; j++) {
        if (j + 1 == point1.length) {
            return;
        }
        var start = point1[j][0];
        var end = point1[j + 1][0];
        var lat = [ point1[j][1], point1[j + 1][1] ];
        var height = point1[j][2];
        for ( var i = 0; i < length; i++) {

            var lon = Cesium.Math.lerp(start, end, i / (length - 1));
            var la = Cesium.Math.lerp(lat[0], lat[1], i / (length - 1));

            if (j==0) {
                height = height + 0.24;
            }
            if (j==1) {
                height = height + 0.53;
            }
            if (j==2) {
                height = height - 0.57;
            }

            viewer.entities
                .add({
                    position : Cesium.Cartesian3.fromDegrees(lon,
                        la, height),
                    nameID : i,
                    availability : new Cesium.TimeIntervalCollection(
                        null, animationObj),
                    billboard : {
                        image : '../js/SuperMap_iClient3D_9D_for_WebGL_1901211048/examples/images/point.png',
                        width : 15,
                        height : 10,
                        color : new Cesium.Color(0, 1, 0,1)
                    }
                });

        }
    }

}
var ss = 0;
function CarShow(viewer,promise,Cesium,scene){

    Cesium.when(promise,function(layers){
    }).then(function(){
        if (ss % 2 == 0) {
            viewer.dataSources.add(Cesium.KmlDataSource.load('../js/Car/model.kml',{
                camera : scene.camera,
                canvas : scene.canvas
            }));
        }else{
            viewer.dataSources.removeAll();
        }

    });

    ss++;
}
var handlerPoint, handlerPolygon;
var defaultUrl = '../js/SuperMap_iClient3D_9D_for_WebGL_1901211048/examples/SampleData/models/springTree.s3m';
function moxing(viewer,Cesium,scene,promise){
    var viewModel = {
        heading: 1.0,
        pitch: 1.0,
        roll: 1.0,
        scale: 1.0,
        material: '#ffffff'
    };
    Cesium.knockout.track(viewModel);
    var toolbar = document.getElementById('wrapper');
    Cesium.knockout.applyBindings(viewModel, toolbar);
    Cesium.knockout.getObservable(viewModel, 'heading').subscribe(
        function (newValue) {
            var rotationValue = Cesium.Math.toRadians(newValue);
            if (viewer.selectedEntity) {
                var instance = viewer.selectedEntity.primitive;
                var index = viewer.selectedEntity.id;
                instance.updateRotation(new Cesium.HeadingPitchRoll(rotationValue, 0, 0), index);
            }
        }
    );
    Cesium.knockout.getObservable(viewModel, 'pitch').subscribe(
        function (newValue) {
            var rotationValue = Cesium.Math.toRadians(newValue);
            if (viewer.selectedEntity) {
                var instance = viewer.selectedEntity.primitive;
                var index = viewer.selectedEntity.id;
                instance.updateRotation(new Cesium.HeadingPitchRoll(0, rotationValue, 0), index);
            }
        }
    );
    Cesium.knockout.getObservable(viewModel, 'roll').subscribe(
        function (newValue) {
            var rotationValue = Cesium.Math.toRadians(newValue);
            if (viewer.selectedEntity) {
                var instance = viewer.selectedEntity.primitive;
                var index = viewer.selectedEntity.id;
                instance.updateRotation(new Cesium.HeadingPitchRoll(0, 0, rotationValue), index);
            }
        }
    );
    Cesium.knockout.getObservable(viewModel, 'scale').subscribe(
        function (newValue) {
            var scale = parseFloat(newValue);
            if (viewer.selectedEntity) {
                var instance = viewer.selectedEntity.primitive;
                var index = viewer.selectedEntity.id;
                instance.updateScale(new Cesium.Cartesian3(scale, scale, scale), index);
            }
        }
    );
    Cesium.loadJson('../js/SuperMap_iClient3D_9D_for_WebGL_1901211048/examples/data/models.json').then(function (data) {
        var result = data.s3mModels;
        for (var i = 0, j = result.length; i < j; i++) {
            addItem(result[i]);
        }
    });

    Cesium.when(promise, function (layers) {

        var tooltip = createTooltip(document.body);

        handlerPolygon = new Cesium.DrawHandler(viewer, Cesium.DrawMode.Polygon);

        handlerPolygon.activeEvt.addEventListener(function (isActive) {
            if (isActive == true) {
                viewer.enableCursorStyle = false;
                viewer._element.style.cursor = '';
                $('body').removeClass('drawCur').addClass('drawCur');
            }
            else {
                viewer.enableCursorStyle = true;
                $('body').removeClass('drawCur');
            }
        });


        handlerPoint = new Cesium.DrawHandler(viewer, Cesium.DrawMode.Point);
        handlerPoint.activeEvt.addEventListener(function (isActive) {
            if (isActive == true) {
                viewer.enableCursorStyle = false;
                viewer._element.style.cursor = '';
                $('body').removeClass('drawCur').addClass('drawCur');
            }
            else {
                viewer.enableCursorStyle = true;
                $('body').removeClass('drawCur');
            }
        });

        handlerPoint.movingEvt.addEventListener(function (windowPosition) {
            if (windowPosition.x < 210 && windowPosition.y < 120) {
                tooltip.setVisible(false);
                return;
            }
            windowPosition.x+=330; windowPosition.y+=20;
            tooltip.showAt(windowPosition, '<p>点击添加模型</p>');
        });
        var s3mInstanceColc = new Cesium.S3MInstanceCollection(scene._context);
        scene.primitives.add(s3mInstanceColc);
        handlerPoint.drawEvt.addEventListener(function (result) {
            handlerPoint.clear();
            var point = result.object;Car
            var color = Cesium.Color.WHITE;
            s3mInstanceColc.add(defaultUrl, {
                position: point.position,
                hpr: new Cesium.HeadingPitchRoll(0, 0, 0),
                scale: new Cesium.Cartesian3(1, 1, 1),
                color: color
            });
            $("img").removeClass("selected");
            handlerPoint && handlerPoint.deactivate();
            tooltip.setVisible(false);
        });

        document.getElementById("flatten").onclick = function () {
            handlerPoint && handlerPoint.deactivate();
            handlerPolygon && handlerPolygon.activate();
        };

    });
    $("#styleSetting").click(function () {
        if ($(".level-one").hasClass("selected")) {
            $(".level-one").removeClass("selected");
        }

        $("#styleSetting").addClass("selected");
        $("#wrapper").show();
        handlerPolygon.deactivate();
    });

    $(".close").click(function () {
        $("#wrapper").hide();
        $("#styleSetting").removeClass("selected");
    });
    $("#delete").click(function () {
        if (viewer.selectedEntity) {
            var instance = viewer.selectedEntity.primitive;
            var index = viewer.selectedEntity.id;
            instance.updateScale(new Cesium.Cartesian3(0, 0, 0), index);
        }
    });
    $("#colorPicker").spectrum({
        color: "ffffff",
        showPalette: true,
        showAlpha: true,
        localStorageKey: "spectrum.demo",
        palette: palette
    });
    $("#XPlus").click(function () {
        if (viewer.selectedEntity) {
            var x = parseInt(document.getElementById("positionX").value);
            x++;
            document.getElementById("positionX").value = x;
            var instance = viewer.selectedEntity.primitive;
            var index = viewer.selectedEntity.id;
            var pos = instance._position;
            var newPos = new Cesium.Cartesian3(pos.x + 50, pos.y, pos.z);
            instance.updatePosition(newPos, index);
        }
    });
    $("#XMinus").click(function () {
        if (viewer.selectedEntity) {
            var x = parseInt(document.getElementById("positionX").value);
            x--;
            document.getElementById("positionX").value = x;
            var instance = viewer.selectedEntity.primitive;
            var index = viewer.selectedEntity.id;
            var pos = instance._position;
            var newPos = new Cesium.Cartesian3(pos.x - 50, pos.y, pos.z);
            instance.updatePosition(newPos, index);
        }
    });
    $("#YPlus").click(function () {
        if (viewer.selectedEntity) {
            var y = parseInt(document.getElementById("positionY").value);
            y++;
            document.getElementById("positionY").value = y;
            var instance = viewer.selectedEntity.primitive;
            var index = viewer.selectedEntity.id;
            var pos = instance._position;
            var newPos = new Cesium.Cartesian3(pos.x, pos.y + 50, pos.z);
            instance.updatePosition(newPos, index);
        }
    });
    $("#YMinus").click(function () {
        if (viewer.selectedEntity) {
            var y = parseInt(document.getElementById("positionY").value);
            y--;
            document.getElementById("positionY").value = y;
            var instance = viewer.selectedEntity.primitive;
            var index = viewer.selectedEntity.id;
            var pos = instance._position;
            var newPos = new Cesium.Cartesian3(pos.x, pos.y - 50, pos.z);
            instance.updatePosition(newPos, index);
        }
    });
    $("#ZPlus").click(function () {
        if (viewer.selectedEntity) {
            var z = parseInt(document.getElementById("positionZ").value);
            z++;
            document.getElementById("positionZ").value = z;
            var instance = viewer.selectedEntity.primitive;
            var index = viewer.selectedEntity.id;
            var pos = instance._position;
            var newPos = new Cesium.Cartesian3(pos.x, pos.y, pos.z + 50);
            instance.updatePosition(newPos, index);
        }
    });
    $("#ZMinus").click(function () {
        if (viewer.selectedEntity) {
            var z = parseInt(document.getElementById("positionZ").value);
            z--;
            document.getElementById("positionZ").value = z;
            var instance = viewer.selectedEntity.primitive;
            var index = viewer.selectedEntity.id;
            var pos = instance._position;
            var newPos = new Cesium.Cartesian3(pos.x, pos.y, pos.z - 50);
            instance.updatePosition(newPos, index);
        }
    });
    function addItem(data) {
        var str = '<a><img style="width: 18%;height: 100%; margin-top:5px; margin-bottom:5px;" src={thumbnail} id={name}></a>'.replace('{thumbnail}', data.thumbnail).replace('{name}', data.name);
        $el = $('#icons').append(str);
        var $child = $("#" + data.name);
        $child.on('click', function () {
            defaultUrl = data.path;
            if ($("img").hasClass("selected")) {
                $("img").removeClass("selected");
                handlerPolygon && handlerPolygon.deactivate();
            }
            else {
                handlerPoint && handlerPoint.activate();
                $(this).addClass("selected");
            }
        });
    }

}