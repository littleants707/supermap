var map,
    local,
    backBtn = document.getElementById("backHistory"),
    areaLayerArray = new Array(),
    areaLayerObj = new Object(),
    areaLayer,
    vectorLayer,
    pointLayer,
    chartLayer,
    utfgrid,
    pieChartDom,
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
bounds.extend(new SuperMap.LonLat(8176604.75, 4075751.21));
bounds.extend(new SuperMap.LonLat(10730703.96, 6304450.06));

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
    utfgrid = new SuperMap.Layer.UTFGrid("UTFGridLayer", mapUrl.XinJiang, {
        layerName: "XinJiang_Citys@China_Citys",
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

    vectorLayer = new SuperMap.Layer.Vector("Vector Layer");
    /* 创建点矢量图层 */
    pointLayer = new SuperMap.Layer.Vector("pointLayer");

    /* 存储区域图层 */
    for (var k in mapUrl) {
        var layerName = mapUrl[k].substring(mapUrl[k].lastIndexOf('/') + 1);
        var _areaLayer = new SuperMap.Layer.TiledDynamicRESTLayer(layerName, mapUrl[k], {
            transparent: true,
            cacheEnabled: true
        }, { maxResolution: "auto" });

        areaLayerObj[k] = _areaLayer;
        areaLayerArray.push(_areaLayer);
    }

    //创建 Elements 图层，用于显示柱状图
    chartLayer = new SuperMap.Layer.Elements("eCharts");

    //获取 Elements 图层 div
    elementsDiv = chartLayer.getDiv();
    //设置Elements实例的div为地图大小
    var mapsize = map.getSize();
    elementsDiv.style.width = mapsize.w;
    elementsDiv.style.height = mapsize.h;

    //创建图表 div, 设置其基本属性, 并添加到  Elements 图层
    pieChartDom = document.createElement("div");
    pieChartDom.id = "piechart";
    pieChartDom.style.width = "400px";
    pieChartDom.style.height = "240px";
    pieChartDom.style.position = "absolute";
    pieChartDom.style.opacity = 0.8;
    elementsDiv.appendChild(pieChartDom);

    /* 创建与加载新疆基本图层 */
    areaLayer = new SuperMap.Layer.TiledDynamicRESTLayer("XinJiang_Citys@China_Citys", mapUrl.XinJiang, {
        transparent: true,
        cacheEnabled: true
    }, { maxResolution: "auto" });
    areaLayer.events.on({
        "layerInitialized": function() {
            areaLayer.isBaseLayer = true;
            map.addLayers([areaLayer, utfgrid, vectorLayer, pointLayer, chartLayer]);
            map.setCenter(new SuperMap.LonLat(9453654.35, 5190100.64), 0);
            map.addControl(control);
        }
    });

    // 点击地图切换图层
    map.events.on({
        'click': function(evt) {
            var pixel = new SuperMap.Pixel(evt.clientX, evt.clientY),
                lonlat = map.getLonLatFromPixel(pixel);
            queryByGeometry(lonlat)
        }
    })

    //地图移动过程中不显示图表
    map.events.on({
        "movestart": function() {
            document.getElementById("piechart").innerHTML = "";
            pieChartDom.style.display = "none";
            isMapMoving = true;
        }
    });
    map.events.on({
        "moveend": function() {
            isMapMoving = false;
        }
    });
}

/* 点击地图查询图层信息 */
function queryByGeometry(lonlat) {
    vectorLayer.removeAllFeatures();
    pointLayer.removeAllFeatures();
    var point = new SuperMap.Geometry.Point(lonlat.lon, lonlat.lat);
    var feature = new SuperMap.Feature.Vector(point);
    pointLayer.addFeatures([feature]);

    var queryParam, queryByGeometryParameters, queryService;
    queryParam = new SuperMap.REST.FilterParameter({
        name: "XinJiang_Citys@China_Citys"
    });
    // console.log('feature.geometry-=-=-',feature);
    queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters({
        queryParams: [queryParam],
        geometry: feature.geometry
        // spatialQueryMode: SuperMap.REST.SpatialQueryMode.INTERSECT
    });
    queryService = new SuperMap.REST.QueryByGeometryService(mapUrl.XinJiang, {
        eventListeners: {
            "processCompleted": processByGeometryCompleted,
            "processFailed": processByGeometryFailed
        }
    });
    queryService.processAsync(queryByGeometryParameters);
}

/* 查询成功 */
function processByGeometryCompleted(queryEventArgs) {
    var i, j, feature,
        result = queryEventArgs.result;
    if (result && result.recordsets) {
        for (i = 0; i < result.recordsets.length; i++) {
            if (result.recordsets[i].features) {
                for (j = 0; j < result.recordsets[i].features.length; j++) {
                    feature = result.recordsets[i].features[j];
                    // console.log('queryBySQL feature++++++', feature)
                    if (feature.attributes) {
                        // console.log('NAME ++++++', cfgUrl.name[feature.attributes.NAME])
                        var page = cfgUrl.name[feature.attributes.NAME];
                        window.location.href = 'page/' + page + '.html'
                    }
                }
            }
        }
    }
}

/* 查询失败 */
function processByGeometryFailed(e) {
    console.log(e)
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
                document.getElementById("piechart").innerHTML = "";
                pieChartDom.style.display = "block";

                // 基于准备好的dom，初始化echarts图表
                var myChart = echarts.init(pieChartDom);

                // console.log('isOneData====info.data.SMID',isOneData,info.data.SMID)
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
                        text: resources.text_salesVolume1 + info.data.NAME + '产品销量统计'
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
                pieChartDom.style.left = (pixel.x + 20) + "px";
                pieChartDom.style.top = (pixel.y - 20) + "px";
                // 图表背景颜色
                pieChartDom.style.backgroundColor = "#F4F3F0";
            } else {
                //清除饼图
                document.getElementById("piechart").innerHTML = "";
                pieChartDom.style.display = "none";
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
    var delLayer = map.getLayer(this.getAttribute('layerId'));
    map.removeLayer(delLayer);
    map.addLayer(areaLayer);
    map.setCenter(new SuperMap.LonLat(9453654.35, 5190100.64), 0);
    map.setBaseLayer(areaLayer);
}