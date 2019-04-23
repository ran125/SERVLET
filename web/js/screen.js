/**
 * 卷帘
 */
function screen1() {
    var scene = viewer.scene;
    var widget = viewer.cesiumWidget;

    Cesium.when(promise, function (layers) {
        var windowWidth = $('body').width(); // 窗口宽度
        var windowHeight = $('body').height(); // 窗口高度
        var rollerShutterConfig = { // 卷帘配置参数，以对象方式实现地址传递
            splitDirection: Cesium.SplitDirection.LEFT,
            verticalSplitPosition: windowWidth / 2.5,
            horizontalSplitPosition: windowHeight / 2.5,
            splitLayers: [], // 参与卷帘的S3M图层名
            wholeLayers: [], // 所有S3M图层的名称
            latestSplitDirection: null // 用于在禁用卷帘后恢复之前的卷帘方向
        };
        for (var layer of layers) {
            // 添加图层列表 供选择参与卷帘的图层
            $("#juanlianqqq").append(`<li style="margin: 0.2rem 0;"><label style="vertical-align: middle;"><input id='tucengid' name="layer" type='checkbox' value=${layer.name} style="vertical-align: middle;" checked/>${layer.name}</label></li>`);
            rollerShutterConfig.splitLayers.push(layer.name); // 初始时所有S3M图层都参与卷帘
            // rollerShutterConfig.wholeLayers.push(layer.name);
        }
        initRollerShutter(scene, rollerShutterConfig);

    });
}

/**
 * 初始化卷帘。设置分割条初始位置及绑定相关事件。
 * @param scene 场景。
 * @param rollerShutterConfig 卷帘配置参数。
 */
function initRollerShutter(scene, rollerShutterConfig) {
    setRollerShutterSplit(scene, rollerShutterConfig);
    bindSliderEvt(scene, rollerShutterConfig);
    $('input[type=radio][name="roller-mode"]').on('input propertychange', function () {
        let splitDirectionCustomStr = $('input[type=radio][name="roller-mode"]:checked').val();
        switch (splitDirectionCustomStr) {
            case 'left-roller':
                rollerShutterConfig.splitDirection = Cesium.SplitDirection.LEFT;
                break;
            case 'right-roller':
                rollerShutterConfig.splitDirection = Cesium.SplitDirection.RIGHT;
                break;
            default:
                break;
        }
        setRollerShutterSplit(scene, rollerShutterConfig);
    });


    // 控制图层是否参与卷帘
    $('[name="layer"]').attr("checked",false)
    $('input[type=checkbox][name="layer"]').on("input propertychange", function () {
        let operationLayerName = $(this).val();
        if (!$(this).prop("checked")) { // 图层参与卷帘
            rollerShutterConfig.splitLayers.push(operationLayerName);
        } else {
            var index = rollerShutterConfig.splitLayers.indexOf(operationLayerName);
            rollerShutterConfig.splitLayers.splice(index, 1);
        }
        setRollerShutterSplit(scene, rollerShutterConfig);
    });

    //是否使用卷帘
    //判断卷帘上来是否显示
    $("#my_checkbox").attr('checked', false);
    if (!$("#my_checkbox").is(':checked')) {
        var verticalSlider = document.getElementById('vertical-slider');
        rollerShutterConfig.latestSplitDirection = rollerShutterConfig.splitDirection;
        rollerShutterConfig.splitDirection = Cesium.SplitDirection.NONE;
        verticalSlider.style.display = 'none';
        setRollerShutterSplit(scene, rollerShutterConfig);
    }

    $("#my_checkbox").change(function () {
        if ($("#my_checkbox").is(':checked')) {
            if (rollerShutterConfig.latestSplitDirection === Cesium.SplitDirection.LEFT || rollerShutterConfig.latestSplitDirection === Cesium.SplitDirection.RIGHT) {
                verticalSlider.style.display = 'block';
            } else {
                verticalSlider.style.display = 'none';
            }
            rollerShutterConfig.splitDirection = rollerShutterConfig.latestSplitDirection;
        } else {
            rollerShutterConfig.latestSplitDirection = rollerShutterConfig.splitDirection;
            rollerShutterConfig.splitDirection = Cesium.SplitDirection.NONE;
            verticalSlider.style.display = 'none';
        }
        setRollerShutterSplit(scene, rollerShutterConfig);
    });

    //关闭面板卷帘随之关闭
    $('#createSchoolWindow').window({
        onBeforeClose: function () { //当面板关闭之前触发的事件
            $("#my_checkbox").attr('checked', false);
            if (!$("#my_checkbox").is(':checked')) {
                var verticalSlider = document.getElementById('vertical-slider');

                rollerShutterConfig.splitDirection = Cesium.SplitDirection.NONE;
                verticalSlider.style.display = 'none';
                setRollerShutterSplit(scene, rollerShutterConfig);
            }
        }


    });
}

/**
 * 注册卷帘分割条的拖拽事件。
 * @param scene 场景。
 * @param rollerShutterConfig 卷帘配置参数。
 */
function bindSliderEvt(scene, rollerShutterConfig) {
    let verticalSlider = document.getElementById('vertical-slider'); // 垂直分割条
    verticalSlider.addEventListener('mousedown', mouseDown, false);
    let windowWidth = $('body').width();
    let windowHeight = $('body').height();
    document.addEventListener('mouseup', mouseUp, false);
    function mouseUp(e) {
        document.removeEventListener('mousemove', sliderMove, false);
    }
    function mouseDown(e) {
        document.addEventListener('mousemove', sliderMove, false);
    }
    function sliderMove(e) { // 鼠标拖拽时执行
        // 解决拖拽鼠标粘滞的问题
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        if (rollerShutterConfig.splitDirection === Cesium.SplitDirection.LEFT || rollerShutterConfig.splitDirection === Cesium.SplitDirection.RIGHT) {
            verticalSlider.style.left = (e.clientX-e.clientX*0.335)+ 'px';
            rollerShutterConfig.verticalSplitPosition = (e.clientX-e.clientX*0.335);
        }
        setRollerShutterSplit(scene, rollerShutterConfig);
    }
}

/**
 * 设置卷帘的分割方向及分割条的位置。
 * @param scene 场景。
 * @param rollerShutterConfig 卷帘配置参数。
 */
function setRollerShutterSplit(scene, rollerShutterConfig) {
    let splitPosition = null;
    if (rollerShutterConfig.splitDirection === Cesium.SplitDirection.LEFT || rollerShutterConfig.splitDirection === Cesium.SplitDirection.RIGHT) {
        splitPosition = rollerShutterConfig.verticalSplitPosition;
    }
    for (let layer of scene.layers.layerQueue) {
        // 判断图层是否是参与卷帘的图层
        if (rollerShutterConfig.splitLayers.indexOf(layer.name) != -1) {
            layer.splitDirection = rollerShutterConfig.splitDirection;
            if (splitPosition) { // 如果禁用卷帘就没有必要设置分割位置
                layer.splitPosition = splitPosition;
            }
        } else {
            layer.splitDirection = Cesium.SplitDirection.NONE;
        }
    }

}

