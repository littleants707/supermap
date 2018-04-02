var map,
    local,
    backBtn = document.getElementById("backHistory"),
    areaLayer,
    chartLayer,
    utfgrid,
    barChartDom,
    elementsDiv,
    isMapMoving = false,
    style = {
        strokeColor: "#304DBE",
        strokeWidth: 1,
        pointerEvents: "visiblePainted",
        fillColor: "#304DBE",
        fillOpacity: 0.5
    },
    mapUrl = cfgUrl.mapUrl;
var bounds = new SuperMap.Bounds();
bounds.extend(new SuperMap.LonLat(8685956.52, 4792209.19));
bounds.extend(new SuperMap.LonLat( 9361033.98, 5258004.16 ));

function init() {
    map = new SuperMap.Map("map", {
        controls: [
            new SuperMap.Control.ScaleLine(),
            new SuperMap.Control.Zoom(),
            new SuperMap.Control.Navigation({
                dragPanOptions: {
                    enableKinetic: true
                }
            })
        ],
        projection: 'EPSG:3857',
        maxExtent: bounds
    });

    /* 创建 UTFGrid 图层，用于获取柱状图所需信息 */
    utfgrid = new SuperMap.Layer.UTFGrid("UTFGridLayer", mapUrl.AKeSu, {
        layerName: "AKeSu@XinJiang_County",
        utfTileSize: 256,
        pixcell: 8,
        isUseCache: false
    }, {
        utfgridResolution: 8
    }, {
        maxExtent: bounds
    });

    control = new SuperMap.Control.UTFGrid({
        layers: [utfgrid],
        callback: callback,
        handlerMode: "move"
    });

    //创建 Elements 图层，用于显示柱状图
    chartLayer = new SuperMap.Layer.Elements("eCharts");

    //获取 Elements 图层 div
    elementsDiv = chartLayer.getDiv();
    //设置Elements实例的div为地图大小
    var mapsize = map.getSize();
    elementsDiv.style.width = mapsize.w;
    elementsDiv.style.height = mapsize.h;

    //创建图表 div, 设置其基本属性, 并添加到  Elements 图层
    barChartDom = document.createElement("div");
    barChartDom.id = "barchart";
    barChartDom.style.width = "400px";
    barChartDom.style.height = "240px";
    barChartDom.style.position = "absolute";
    barChartDom.style.opacity = 0.8;
    elementsDiv.appendChild(barChartDom);

    /* 创建与加载新疆基本图层 */
    areaLayer = new SuperMap.Layer.TiledDynamicRESTLayer("AKeSu@XinJiang_County", mapUrl.AKeSu, {
        transparent: true,
        cacheEnabled: true
    }, { maxResolution: "auto" });
    areaLayer.events.on({
        "layerInitialized": function() {
            areaLayer.isBaseLayer = true;
            map.addLayers([areaLayer, utfgrid, chartLayer]);
            map.setCenter(new SuperMap.LonLat(9023495.25, 5025106.67), 0);
            map.addControl(control);
        }
    });

    //地图移动过程中不显示图表
    map.events.on({
        "movestart": function() {
            document.getElementById("barchart").innerHTML = "";
            barChartDom.style.display = "none";
            isMapMoving = true;
        }
    });
    map.events.on({
        "moveend": function() {
            isMapMoving = false;
        }
    });
}

// 鼠标移动中仍保持在同一个数据上
var isOneData = "";
var theDataCache;

// 相同数据检测
function callback(infoLookup, loc, pixel) {
    if (infoLookup && isMapMoving === false) {
        var info;
        // console.log('infoLookup----', infoLookup);
        for (var idx in infoLookup) {
            info = infoLookup[idx];
            if (info && info.data) {
                document.getElementById("barchart").innerHTML = "";
                barChartDom.style.display = "block";

                // 基于准备好的dom，初始化echarts图表
                var myChart = echarts.init(barChartDom);

                // console.log('isOneData====info.data',isOneData,info.data)
                var thedata;
                if (isOneData != info.data.SMID) {
                    // 数据（随机生成）
                    thedata = [
                        getRandomNumber(0, 1000, 0),
                        getRandomNumber(0, 1000, 0),
                        getRandomNumber(0, 1000, 0),
                        getRandomNumber(0, 1000, 0),
                        getRandomNumber(0, 1000, 0),
                        getRandomNumber(0, 1000, 0)
                    ];
                    isOneData = info.data.SMID
                } else {
                    thedata = theDataCache;
                }
                theDataCache = thedata;

                // echart 图表配置参数
                var option = {
                    tooltip: {
                        show: true
                    },
                    title: {
                        x: "center",
                        text: resources.text_salesVolume1 + info.data.NAME99 + '产品销量统计'
                    },
                    xAxis: [{
                        type: 'category',
                        data: [
                            resources.text_productA,
                            resources.text_productB,
                            resources.text_productC,
                            resources.text_productD,
                            resources.text_productE,
                            resources.text_productF
                        ]
                    }],
                    yAxis: [{
                        type: 'value'
                    }],
                    series: [{
                        "name": "销量",
                        "type": "bar",
                        "data": thedata
                    }]
                };

                // 为echarts对象加载数据
                myChart.setOption(option);

                // 图表位置
                barChartDom.style.left = (pixel.x + 20) + "px";
                barChartDom.style.top = (pixel.y - 20) + "px";
                // 图表背景颜色
                barChartDom.style.backgroundColor = "#F4F3F0";
            } else {
                //清除柱状图
                document.getElementById("barchart").innerHTML = "";
                barChartDom.style.display = "none";
            }
        }
    }
};

/* 获取指定范围内的随机数
 * @param  {string}   min - 范围下限
 * @param  {string}   max - 范围上限
 * @param  {string}   decimalNum - 返回结果的小数位数。如果为 0，返回整数。
 */
function getRandomNumber(min, max, decimalNum) {
    var rNum = min + Math.random() * (max - min);

    if (decimalNum) {
        if (!isNaN(decimalNum)) {
            return rNum;
        } else {
            decimalNum = parseInt(decimalNum);
        }

        if (decimalNum === 0) {
            return Math.round(rNum);
        } else {
            return parseFloat(rNum).toFixed(decimalNum);
        }
    } else {
        return rNum;
    }
}

/* 返回新疆图层 */
backBtn.onclick = function() {
    window.location.href = '../index.html'
}