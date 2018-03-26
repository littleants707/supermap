;
(function(win, doc) {
    /*
     * 此配置文件说明
     * 
     * 本地开发："http://localhost:8181"
     * 线上生产："http://10.10.0.113:8090"
     * */
    var baseUrl = "http://10.10.0.113:8090",
        cfgUrl = {
            mapUrl: {
                "XinJiang": baseUrl + "/iserver/services/map-China-XinJiang/rest/maps/XinJiang_Citys@China_Citys",
                "WuLuMuQi": baseUrl + "/iserver/services/map-China-XinJiang/rest/maps/WuLuMuQi@XinJiang_County",
                "TaCheng": baseUrl + "/iserver/services/map-China-XinJiang/rest/maps/TaCheng@XinJiang_County",
                "KeLaMaYi": baseUrl + "/iserver/services/map-China-XinJiang/rest/maps/KeLaMaYi@XinJiang_County",
                "ChangJi": baseUrl + "/iserver/services/map-China-XinJiang/rest/maps/ChangJi@XinJiang_County",
                "HaMi": baseUrl + "/iserver/services/map-China-XinJiang/rest/maps/HaMi@XinJiang_County",
                "TuLuFan": baseUrl + "/iserver/services/map-China-XinJiang/rest/maps/TuLuFan@XinJiang_County",
                "BoErTaLaMengGu": baseUrl + "/iserver/services/map-China-XinJiang/rest/maps/BoErTaLaMengGu@XinJiang_County",
                "YiLiHaSaKe": baseUrl + "/iserver/services/map-China-XinJiang/rest/maps/YiLiHaSaKe@XinJiang_County",
                "AKeSu": baseUrl + "/iserver/services/map-China-XinJiang/rest/maps/AKeSu@XinJiang_County",
                "KeZiLeSuKeErKeZi": baseUrl + "/iserver/services/map-China-XinJiang/rest/maps/KeZiLeSuKeErKeZi@XinJiang_County",
                "KeShi": baseUrl + "/iserver/services/map-China-XinJiang/rest/maps/KeShi@XinJiang_County",
                "HeTian": baseUrl + "/iserver/services/map-China-XinJiang/rest/maps/HeTian@XinJiang_County",
                "BaYinGuoLengMengGu": baseUrl + "/iserver/services/map-China-XinJiang/rest/maps/BaYinGuoLengMengGu@XinJiang_County",
                "aLeTai": baseUrl + "/iserver/services/map-China-XinJiang/rest/maps/aLeTai@XinJiang_County"
            },
            point: {
                "XinJiang": "9453654.35,5190100.64",
                "WuLuMuQi": "9782861.83, 5379750.16",
                "TaCheng": "9440358.97, 5682453.83",
                "KeLaMaYi": "9495785.22, 5649671.77",
                "ChangJi": "9814793.04, 5513045.18",
                "HaMi": "10436322.49, 5314276.86",
                "TuLuFan": "9973241.42, 5224869.2",
                "BoErTaLaMengGu": "9113454.81, 5574871.81",
                "YiLiHaSaKe": "9191323.35, 5398761.14",
                "AKeSu": "9023495.25, 5025106.67",
                "KeZiLeSuKeErKeZi": "8478205.35, 4812862.47",
                "KeShi": "8590394.58, 4565741.44",
                "HeTian": "9034791.34, 4445780.52",
                "BaYinGuoLengMengGu": " 9821300.33, 4822607.7",
                "aLeTai": "9829577.16, 5963012.82"
            },
            name: {
                "新疆": "XinJiang",
                "乌鲁木齐市": "WuLuMuQi",
                "塔城地区": "TaCheng",
                "克拉玛依市": "KeLaMaYi",
                "昌吉回族自治州": "ChangJi",
                "哈密地区": "HaMi",
                "叶鲁番地区": "TuLuFan",
                "博尔塔拉蒙古自治": "BoErTaLaMengGu",
                "伊犁哈萨克自治州": "YiLiHaSaKe",
                "阿克苏地区": "AKeSu",
                "克孜勒苏柯尔克孜": "KeZiLeSuKeErKeZi",
                "喀什地区": "KeShi",
                "和田地区": "HeTian",
                "巴音郭楞蒙古自治": "BaYinGuoLengMengGu",
                "阿勒泰地区": "aLeTai"
            }
        };
    win.cfgUrl = cfgUrl
})(window, document)