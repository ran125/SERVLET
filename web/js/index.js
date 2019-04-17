$(function () {
    $(".panel-title:eq(0),.panel-header:eq(0)").css("background-color", "white");
    //生成tab标签
    $('#tts').tabs({
        border: true
    });
    //生成右键菜单
    $('#tts').tabs({
        onContextMenu: function (e, title, index) {
            //让默认事件失效
            e.preventDefault();
            //选中标签
            //$('#tt').tabs('select',title);
            $('#tts').tabs('select', index);
            //显示右键菜单
            $('#mm').menu('show', {
                left: e.pageX,
                top: e.pageY
            });
            $("#mm").menu({
                onClick: function (item) {

                    closeTab(this, item.name);
                }
            });
        }
    });
});
//关闭标签的方法
var closeTab = function (type, menuName) {
    if (menuName == "closeCurrent") {
        //获取选中的标签索引
        var tab = $('#tts').tabs('getSelected');
        var index = $('#tts').tabs('getTabIndex', tab);
        index = 1;
        $("#tts").tabs("close", index);
    } else if (menuName == "closeOthers") {
        //获取所有标签
        var tabs = $("#tts").tabs("tabs");
        var length = tabs.length;
        //获取选中标签的索引
        var tab = $('#tts').tabs('getSelected');
        var index = $('#tts').tabs('getTabIndex', tab);
        //关闭选中标签之前的标签
        for (var i = 0; i < index; i++) {
            $("#tts").tabs("close", 1);
        }
        //关闭选中标签之后的标签
        for (var i = 0; i < length - index - 1; i++) {
            $("#tts").tabs("close", 1);
        }
    } else if (menuName == "closeAll") {
        var tabs = $("#tts").tabs("tabs");
        var length = tabs.length;
        for (var i = 0; i < length; i++) {
            $("#tts").tabs("close", 1);
        }
    }
};

//官方demo
function addTab(title, url) {
    if ($('#tts').tabs('exists', title)) {
        $('#tts').tabs('select', title);
    } else {
        var content = '<iframe scrolling="auto" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>';
        $('#tts').tabs('add', {
            title: title,
            content: content,
            closable: true
        });
    }
}
//场景演示
$("#a1,#Scene").click(function () {
     addTab("场景演示", 'Scene.html')
    // $("#leftMenu").accordion({
    //     selected: 0
    // })
    var s = $("#leftMenu");
    s.accordion("select", "场景演示");
});
//电子沙盘
$("#a2").click(function () {
    $("#leftMenu").accordion("select", "电子沙盘")
});
//测量工具
$("#a3").click(function () {
    $("#leftMenu").accordion("select", "测量工具集")
});

//传感器
$("#a4").click(function () {
    $("#leftMenu").accordion("select", "传感设备")
});
//动画特效
$("#a5").click(function () {
    $("#leftMenu").accordion("select", "动画特效")
});
//点击主题更换颜色----------------------------------------------------------------------------------------------
//蓝色主题
$("#color2").click(function () {
    //导航条背景色
    $(".header-left,.header-center,.header-right").css({
        "background-color": "#3c8dbc",
        "color": "white"
    });
    //功能背景色
    $("#a1,#a2,#a3,#a4,#a5").css("background-color", "#3c8dbc");
    $("#a1").hover(function () {
        $("#a1").css("background-color", "#367fa9")
    }, function () {
        $("#a1").css("background-color", "#3c8dbc")
    });
    $("#a2").hover(function () {
        $("#a2").css("background-color", "#367fa9")
    }, function () {
        $("#a2").css("background-color", "#3c8dbc")
    });
    $("#a3").hover(function () {
        $("#a3").css("background-color", "#367fa9")
    }, function () {
        $("#a3").css("background-color", "#3c8dbc")
    });
    $("#a4").hover(function () {
        $("#a4").css("background-color", "#367fa9")
    }, function () {
        $("#a4").css("background-color", "#3c8dbc")
    });
    $("#a5").hover(function () {
        $("#a5").css("background-color", "#367fa9")
    }, function () {
        $("#a5").css("background-color", "#3c8dbc")
    });
    $(".list li a span").css("color", "#FFFFFF");
    //菜单栏标题的颜色
    $(".panel-title,.panel-header").css({"background-color":"#1e282c","color":"#b8c7ce"});
    $(".panel-title:eq(0),.panel-header:eq(0)").css("background-color", "white");
    //菜单栏背景色
    $(".beijing").css({"background-color": "#2c3b41", "color": "#b8c7ce"});
    $("#leftMenu").css("background-color", "#1e282c");
})
//默认主题
$("#color1").click(function () {
    //导航条背景色
    $(".header-left,.header-center,.header-right").css({
        "background-color": "#d4d4d4",
        "color": "black"
    });
    $(".list li a span").css("color", "black");
    $("#a1,#a2,#a3,#a4,#a5").css("background-color", "#d4d4d4");
    $("#a1").hover(function () {
        $("#a1").css("background-color", "white")
    }, function () {
        $("#a1").css("background-color", "#d4d4d4")
    });
    $("#a2").hover(function () {
        $("#a2").css("background-color", "white")
    }, function () {
        $("#a2").css("background-color", "#d4d4d4")
    });
    $("#a3").hover(function () {
        $("#a3").css("background-color", "white")
    }, function () {
        $("#a3").css("background-color", "#d4d4d4")
    });
    $("#a4").hover(function () {
        $("#a4").css("background-color", "white")
    }, function () {
        $("#a4").css("background-color", "#d4d4d4")
    });
    $("#a5").hover(function () {
        $("#a5").css("background-color", "white")
    }, function () {
        $("#a5").css("background-color", "#d4d4d4")
    });
    //菜单栏标题的颜色
    $(".panel-title,.panel-header").css({"background-color":"#e7eaed","color":"black"});
    $(".panel-title:eq(0),.panel-header:eq(0)").css({"background-color":"white","color":"black"});
    //菜单栏背景色
    $(".beijing").css({"background-color": "#FFFFFF", "color": "black"});
    $("#leftMenu").css("background-color", "#e7eaed");
});
//红色主题
$("#color3").click(function () {
    //导航条背景色
    $(".header-left,.header-center,.header-right").css({
        "background-color": "#dd4b39",
        "color": "#FFFFFF"
    });
    $(".list li a span").css("color", "#FFFFFF");
    $("#a1,#a2,#a3,#a4,#a5").css("background-color", "#dd4b39");
    $("#a1").hover(function () {
        $("#a1").css("background-color", "#dd9b90")
    }, function () {
        $("#a1").css("background-color", "#dd4b39")
    });
    $("#a2").hover(function () {
        $("#a2").css("background-color", "#dd9b90")
    }, function () {
        $("#a2").css("background-color", "#dd4b39")
    });
    $("#a3").hover(function () {
        $("#a3").css("background-color", "#dd9b90")
    }, function () {
        $("#a3").css("background-color", "#dd4b39")
    });
    $("#a4").hover(function () {
        $("#a4").css("background-color", "#dd9b90")
    }, function () {
        $("#a4").css("background-color", "#dd4b39")
    });
    $("#a5").hover(function () {
        $("#a5").css("background-color", "#dd9b90")
    }, function () {
        $("#a5").css("background-color", "#dd4b39")
    });
    //菜单栏标题的颜色
    $(".panel-title,.panel-header").css({"background-color":"#1e282c","color":"#b8c7ce"});
    $(".panel-title:eq(0),.panel-header:eq(0)").css("background-color", "white");
    //菜单栏背景色
    $(".beijing").css({"background-color": "#2c3b41", "color": "#b8c7ce"});
    $("#leftMenu").css("background-color", "#1e282c");
});
//绿色主题
$("#color4").click(function () {
    //导航条背景色
    $(".header-left,.header-center,.header-right").css({
        "background-color": "#2a650a",
        "color": "#FFFFFF"
    });
    $(".list li a span").css("color", "#FFFFFF");
    $("#a1,#a2,#a3,#a4,#a5").css("background-color", "#2a650a");
    $("#a1").hover(function () {
        $("#a1").css("background-color", "#8a750a")
    }, function () {
        $("#a1").css("background-color", "#2a650a")
    });
    $("#a2").hover(function () {
        $("#a2").css("background-color", "#8a750a")
    }, function () {
        $("#a2").css("background-color", "#2a650a")
    });
    $("#a3").hover(function () {
        $("#a3").css("background-color", "#8a750a")
    }, function () {
        $("#a3").css("background-color", "#2a650a")
    });
    $("#a4").hover(function () {
        $("#a4").css("background-color", "#8a750a")
    }, function () {
        $("#a4").css("background-color", "#2a650a")
    });
    $("#a5").hover(function () {
        $("#a5").css("background-color", "#8a750a")
    }, function () {
        $("#a5").css("background-color", "#2a650a")
    });
    //菜单栏标题的颜色
    $(".panel-title,.panel-header").css({"background-color":"#1e282c","color":"#b8c7ce"});
    $(".panel-title:eq(0),.panel-header:eq(0)").css("background-color", "white");
    //菜单栏背景色
    $(".beijing").css({"background-color": "#2c3b41", "color": "#b8c7ce"});
    $("#leftMenu").css("background-color", "#1e282c");
});
//橙色主题
$("#color5").click(function () {
    //导航条背景色
    $(".header-left,.header-center,.header-right").css({
        "background-color": "#f39c12",
        "color": "#FFFFFF"
    });
    $(".list li a span").css("color", "#FFFFFF");
    $("#a1,#a2,#a3,#a4,#a5").css("background-color", "#f39c12");
    $("#a1").hover(function () {
        $("#a1").css("background-color", "#cc7d00")
    }, function () {
        $("#a1").css("background-color", "#f39c12")
    });
    $("#a2").hover(function () {
        $("#a2").css("background-color", "#cc7d00")
    }, function () {
        $("#a2").css("background-color", "#f39c12")
    });
    $("#a3").hover(function () {
        $("#a3").css("background-color", "#cc7d00")
    }, function () {
        $("#a3").css("background-color", "#f39c12")
    });
    $("#a4").hover(function () {
        $("#a4").css("background-color", "#cc7d00")
    }, function () {
        $("#a4").css("background-color", "#f39c12")
    });
    $("#a5").hover(function () {
        $("#a5").css("background-color", "#cc7d00")
    }, function () {
        $("#a5").css("background-color", "#f39c12")
    });
    //菜单栏标题的颜色
    $(".panel-title,.panel-header").css({"background-color":"#1e282c","color":"#b8c7ce"});
    $(".panel-title:eq(0),.panel-header:eq(0)").css("background-color", "white");
    //菜单栏背景色
    $(".beijing").css({"background-color": "#2c3b41", "color": "#b8c7ce"});
    $("#leftMenu").css("background-color", "#1e282c");
});
