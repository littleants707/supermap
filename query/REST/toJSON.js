	//获取浏览器支持的 XML HTTP组件
	function getcommit()
	{
		var commit = null;
 	
		try{
			commit = new ActiveXObject("Msxml2.XMLHTTP");
		}catch(ex){
			try{
				commit = new ActiveXObject("Microsoft.XMLHTTP");
			}catch(ex){
				this.commit=null;
			}
		}
		if(!commit && typeof XMLHttpRequest != "undefined"){
			commit = new XMLHttpRequest();
		}
		return commit;
	}

 function toJSON(o){
/// <summary>将对象转换成JSON字符串</summary>
/// <param name="o" type="Object">要转换成JSON的Object对象。</param>
/// <returns type="Object">返回转换后的JSON对象。</returns>
	if(o == null)
		return "null";

	switch(o.constructor) {
		case String:
			var s = o; // .encodeURI();
			s = '"' + s.replace(/(["\\])/g, '\\$1') + '"';
			s = s.replace(/\n/g,"\\n");
			s = s.replace(/\r/g,"\\r");
			s = s.replace(/</g, "&lt;");
			s = s.replace(/>/g, "&gt;");
			s = s.replace(/%/g, "%25");
			s = s.replace(/&/g, "%26");
			return s;
		case Array:
			var v = [];
			for(var i=0; i<o.length; i++)
				v.push(toJSON(o[i])) ;
			return "[" + v.join(", ") + "]";
		case Number:
			return isFinite(o) ? o.toString() : toJSON(null);
		case Boolean:
			return o.toString();
		case Date:
			var d = new Object();
			d.__type = "System.DateTime";
			d.Year = o.getUTCFullYear();
			d.Month = o.getUTCMonth() +1;
			d.Day = o.getUTCDate();
			d.Hour = o.getUTCHours();
			d.Minute = o.getUTCMinutes();
			d.Second = o.getUTCSeconds();
			d.Millisecond = o.getUTCMilliseconds();
			d.TimezoneOffset = o.getTimezoneOffset();
			return toJSON(d);
		default:
			if(o["toJSON"] != null && typeof o["toJSON"] == "function")
				return o.toJSON();
			if(typeof o == "object") {
				if(o.length) {
					var v = [];
					for(var i=0; i<o.length; i++)
						v.push(toJSON(o[i]));
					return "[" + v.join(", ") + "]";
				}
				var v=[];
				for(attr in o) {
					if(typeof o[attr] != "function")
						v.push('"' + attr + '":' + toJSON(o[attr]));
				}

				if(v.length>0)
					return "{" + v.join(", ") + "}";
				else
					return "{}";		
			}
			return o.toString();
	}
};