function onload1() {


    Cesium.Math.setRandomNumberSeed(3);
    var start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
    var stop = Cesium.JulianDate.addSeconds(start, 360, new Cesium.JulianDate());

    viewer.clock.startTime = start.clone();
    viewer.clock.stopTime = stop.clone();
    viewer.clock.currentTime = start.clone();
    // viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //末端循环
    viewer.clock.multiplier = 1;

    var viewModel = {
        rate: 5.0,
        gravity: 0.0,
        minimumLife: 1.0,
        maximumLife: 1.0,
        minimumSpeed: 5.0,
        maximumSpeed: 5.0,
        startScale: 5,
        endScale: 3,
        particleSize: 30.0,
        transX: 2.5,
        transY: 4.0,
        transZ: 1.0,
        heading: 0.0,
        pitch: 0.0,
        roll: 0.0,
        fly: false,
        spin: false,
    };


    // Cesium.knockout.track(viewModel);
    // var toolbar = document.getElementById('toolbar');
    // Cesium.knockout.applyBindings(viewModel, toolbar);

    var entityPosition = new Cesium.Cartesian3();
    var entityOrientation = new Cesium.Quaternion();
    var rotationMatrix = new Cesium.Matrix3();
    var modelMatrix = new Cesium.Matrix4();

    function computeModelMatrix(entity, time) {
        var position = Cesium.Property.getValueOrUndefined(entity.position, time, entityPosition);
        if (!Cesium.defined(position)) {
            return undefined;
        }
        var orientation = Cesium.Property.getValueOrUndefined(entity.orientation, time, entityOrientation);
        if (!Cesium.defined(orientation)) {
            modelMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(position, undefined, modelMatrix);
        } else {
            modelMatrix = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromQuaternion(orientation, rotationMatrix), position, modelMatrix);
        }
        return modelMatrix;
    }

    var emitterModelMatrix = new Cesium.Matrix4();
    var translation = new Cesium.Cartesian3();
    var rotation = new Cesium.Quaternion();
    var hpr = new Cesium.HeadingPitchRoll();
    var trs = new Cesium.TranslationRotationScale();

    function computeEmitterModelMatrix() {
        hpr = Cesium.HeadingPitchRoll.fromDegrees(viewModel.heading, viewModel.pitch, viewModel.roll, hpr);

        trs.translation = Cesium.Cartesian3.fromElements(viewModel.transX, viewModel.transY, viewModel.transZ, translation);
        trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);

        return Cesium.Matrix4.fromTranslationRotationScale(trs, emitterModelMatrix);
    }

//生成具有不同高度的随机圆形图案。
    function computeCirclularFlight(lon, lat, radius) {
        var property = new Cesium.SampledPositionProperty();
        for (var i = 0; i <= 360; i += 45) {
            var radians = Cesium.Math.toRadians(i);
            var time = Cesium.JulianDate.addSeconds(start, i, new Cesium.JulianDate());
            var position = Cesium.Cartesian3.fromDegrees(lon + (radius * 1.5 * Math.cos(radians)), lat + (radius * Math.sin(radians)), Cesium.Math.nextRandomNumber() * 500 + 1750);
            property.addSample(time, position);
        }
        return property;
    }

//计算实体位置


    var staticPosition = Cesium.Cartesian3.fromDegrees(129.795674032311, 45.438212336572, 200.693684695289);
    viewer.trackedEntity = entity;
    var entity = viewer.entities.add({
        //将实体可用性设置为与模拟时间相同的时间间隔。
        availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
            start: start,
            stop: stop
        })]),
        position: staticPosition

    });

    particleSystem = scene.primitives.add(new Cesium.ParticleSystem({
        image: '../js/SuperMap_iClient3D_9D_for_WebGL_1901211048/examples/images/fire.png',
        startScale: viewModel.startScale,
        endScale: viewModel.endScale,

        minimumLife: viewModel.minimumLife,
        maximumLife: viewModel.maximumLife,

        minimumSpeed: viewModel.minimumSpeed,
        maximumSpeed: viewModel.maximumSpeed,

        minimumWidth: viewModel.particleSize,
        minimumHeight: viewModel.particleSize,

        maximumWidth: viewModel.particleSize,
        maximumHeight: viewModel.particleSize,
        // Particles per second.
        rate: viewModel.rate,
        lifeTime: 16.0,
        emitter: new Cesium.CircleEmitter(0.5),

        emitterModelMatrix: computeEmitterModelMatrix(),
        forces: [applyGravity],

    }));

    var gravityScratch = new Cesium.Cartesian3();

    function applyGravity(p, dt) {
        // We need to compute a local up vector for each particle in geocentric space.
        var position = p.position;

        Cesium.Cartesian3.normalize(position, gravityScratch);
        Cesium.Cartesian3.multiplyByScalar(gravityScratch, viewModel.gravity * dt, gravityScratch);

        p.velocity = Cesium.Cartesian3.add(p.velocity, gravityScratch, p.velocity);
    }


    var num=1
   $("#huoyan").click(function () {
       if (num==1){
           viewer.scene.preRender.addEventListener(function(scene, time) {
               particleSystem.modelMatrix = computeModelMatrix(entity, time);
           });
           particleSystem.show=true
          num++
       }else if (num==2) {
           particleSystem.show=false
           num--
       }

   })




}



