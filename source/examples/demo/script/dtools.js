(function(window) {
    var G = function() {
        var e, t = e = t || function(e, n) {
            return t.dom ? t.dom(e, n) : null
        };
        t.guid = "G", window[t.guid] = window[t.guid] || {};
        return t.check = t.check || function() {}, t.merge = function(e, t) {
            var n = e.length,
                r = 0;
            if ("number" == typeof t.length)
                for (var i = t.length; i > r; r++) e[n++] = t[r];
            else
                for (; void 0 !== t[r];) e[n++] = t[r++];
            return e.length = n, e
        }, t.forEach = function(e, t, n) {
            var r, i, o;
            if ("function" == typeof t && e)
                if (i = "number" == typeof e.length ? e.length : e.byteLength, "number" == typeof i) {
                    if ("[object Function]" === Object.prototype.toString.call(e)) return e;
                    for (r = 0; i > r; r++) o = e[r], void 0 === o && (o = e.charAt && e.charAt(r)), t.call(n || null, o, r, e)
                } else if ("number" == typeof e)
                for (r = 0; e > r; r++) t.call(n || null, r, r, r);
            else if ("object" == typeof e)
                for (r in e) e.hasOwnProperty(r) && t.call(n || null, e[r], r, e);
            return e
        }, t.lang = t.lang || {}, t.type = function() {
            var e = {},
                n = [null, "HTMLElement", "Attribute", "Text", null, null, null, null, "Comment", "Document", null, "DocumentFragment", null],
                r = "Array Boolean Date Error Function Number RegExp String",
                i = {
                    object: 1,
                    "function": "1"
                },
                o = e.toString;
            return t.forEach(r.split(" "), function(n) {
                    e["[object " + n + "]"] = n.toLowerCase(), t["is" + n] = function(e) {
                        return t.type(e) == n.toLowerCase()
                    }
                }),
                function(t) {
                    var r = typeof t;
                    return i[r] ? null == t ? "null" : t._type_ || e[o.call(t)] || n[t.nodeType] || (t == t.window ? "Window" : "") || "object" : r
                }
        }(), t.isDate = function(e) {
            return "date" == t.type(e) && "Invalid Date" != e.toString() && !isNaN(e)
        }, t.isElement = function(e) {
            return "HTMLElement" == t.type(e)
        }, t.isEnumerable = function(e) {
            return null != e && ("object" == typeof e || ~Object.prototype.toString.call(e).indexOf("NodeList")) && ("number" == typeof e.length || "number" == typeof e.byteLength || "undefined" != typeof e[0])
        }, t.isNumber = function(e) {
            return "number" == t.type(e) && isFinite(e)
        }, t.isPlainObject = function(e) {
            var n, r = Object.prototype.hasOwnProperty;
            if ("object" != t.type(e)) return !1;
            if (e.constructor && !r.call(e, "constructor") && !r.call(e.constructor.prototype, "isPrototypeOf")) return !1;
            for (n in e);
            return void 0 === n || r.call(e, n)
        }, t.isObject = function(e) {
            return "function" == typeof e || "object" == typeof e && null != e
        }, t.extend = function(e, n) {
            var r, i, o, a, u, s, l = 1,
                d = arguments.length,
                c = e || {};
            for (t.isBoolean(e) && (l = 2) && (c = n || {}), !t.isObject(c) && (c = {}); d > l; l++)
                if (r = arguments[l], t.isObject(r))
                    for (i in r) o = c[i], a = r[i], o !== a && (t.isBoolean(e) && e && a && (t.isPlainObject(a) || (u = t.isArray(a))) ? (u ? (u = !1, s = o && t.isArray(o) ? o : []) : s = o && t.isPlainObject(o) ? o : {}, c[i] = t.extend(e, s, a)) : void 0 !== a && (c[i] = a));
            return c
        }, t.createChain = function(e, n, r) {
            var i = "dom" == e ? "$DOM" : "$" + e.charAt(0).toUpperCase() + e.substr(1),
                o = Array.prototype.slice,
                a = t[e];
            return a ? a : (a = t[e] = n || function(n) {
                return t.extend(n, t[e].fn)
            }, a.extend = function(n) {
                var r;
                for (r in n) ! function(n) {
                    "splice" != n && (a[n] = function() {
                        var r = arguments[0];
                        "dom" == e && "string" == t.type(r) && (r = "#" + r);
                        var i = a(r),
                            u = i[n].apply(i, o.call(arguments, 1));
                        return "$DOM" == t.type(u) ? u.get(0) : u
                    })
                }(r);
                return t.extend(t[e].fn, n)
            }, t[e][i] = t[e][i] || r || function() {}, a.fn = t[e][i].prototype, a)
        }, t.overwrite = function(e, t, n) {
            for (var r = t.length - 1; r > -1; r--) e.prototype[t[r]] = n(t[r]);
            return e
        }, t.createChain("array", function(e) {
            {
                var n, r = t.array.$Array.prototype;
                Array.prototype
            }
            "array" != t.type(e) && (e = []);
            for (n in r) e[n] = r[n];
            return e
        }), t.overwrite(t.array.$Array, "concat slice".split(" "), function(e) {
            return function() {
                return t.array(Array.prototype[e].apply(this, arguments))
            }
        }), t.array.extend({
            unique: function(e) {
                var t, n, r = this.length,
                    i = this.slice(0);
                for ("function" != typeof e && (e = function(e, t) {
                        return e === t
                    }); --r > 0;)
                    for (n = i[r], t = r; t--;)
                        if (e(n, i[t])) {
                            i.splice(r, 1);
                            break
                        }
                for (r = this.length = i.length, t = 0; r > t; t++) this[t] = i[t];
                return this
            }
        }), t.query = t.query || function() {
            function e(e, n) {
                var i, s, l, d, c, f, p, h = [];
                return r.test(e) ? (l = RegExp.$2, d = RegExp.$1 || "*", t.forEach(n.getElementsByTagName(d), function(e) {
                    e.id == l && h.push(e)
                })) : o.test(e) || "*" == e ? t.merge(h, n.getElementsByTagName(e)) : a.test(e) ? (f = [], d = RegExp.$1, c = RegExp.$2, i = " " + c + " ", n.getElementsByClassName ? f = n.getElementsByClassName(c) : t.forEach(n.getElementsByTagName("*"), function(e) {
                    e.className && ~(" " + e.className + " ").indexOf(i) && f.push(e)
                }), d && (d = d.toUpperCase()) ? t.forEach(f, function(e) {
                    e.tagName.toUpperCase() === d && h.push(e)
                }) : t.merge(h, f)) : u.test(e) && (p = e.substr(1).split("."), t.forEach(n.getElementsByTagName("*"), function(e) {
                    e.className && (i = " " + e.className + " ", s = !0, t.forEach(p, function(e) {
                        ~i.indexOf(" " + e + " ") || (s = !1)
                    }), s && h.push(e))
                })), h
            }

            function n(r, o) {
                var a, u = r,
                    s = "__tangram__",
                    l = [];
                return !o && i.test(u) && (a = document.getElementById(u.substr(1))) ? [a] : (o = o || document, o.querySelectorAll ? (1 != o.nodeType || o.id ? a = o.querySelectorAll(u) : (o.id = s, a = o.querySelectorAll("#" + s + " " + u), o.id = ""), a) : ~u.indexOf(" ") ? (t.forEach(e(u.substr(0, u.indexOf(" ")), o), function(e) {
                    t.merge(l, n(u.substr(u.indexOf(" ") + 1), e))
                }), l) : e(u, o))
            }

            {
                var r = /^(\w*)#([\w\-\$]+)$/,
                    i = /^#([\w\-\$]+)$/,
                    o = /^\w+$/,
                    a = /^(\w*)\.([\w\-\$]+)$/,
                    u = /^(\.[\w\-\$]+)+$/,
                    s = /\s*,\s*/,
                    l = /\s+/g;
                Array.prototype.slice
            }
            return function(e, r, i) {
                if (!e || "string" != typeof e) return i || [];
                var o = [];
                return e = e.replace(l, " "), i && t.merge(o, i) && (i.length = 0), t.forEach(e.indexOf(",") > 0 ? e.split(s) : [e], function(e) {
                    t.merge(o, n(e, r))
                }), t.merge(i || [], t.array(o).unique())
            }
        }(), t.createChain("dom", function(e, n) {
            var r = new t.dom.$DOM(n);
            if (!e) return r;
            if ("$DOM" == e._type_) return e;
            if (e.nodeType || e == e.window) return r[0] = e, r.length = 1, r;
            if (e.length && "[object String]" != r.toString.call(e)) return t.merge(r, e);
            if ("string" == typeof e)
                if ("<" == e.charAt(0) && ">" == e.charAt(e.length - 1) && e.length > 2) {
                    var i = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
                        o = n && "$DOM" === n._type_ ? n[0] : n,
                        a = i.exec(e);
                    o = o && o.nodeType ? o.ownerDocument || o : document, a = a ? [o.createElement(a[1])] : t.dom.createElements ? t.dom.createElements(e) : [], t.merge(r, a)
                } else t.query(e, n, r);
            else if ("function" == typeof e) return r.ready ? r.ready(e) : r;
            return r
        }, function(e) {
            this.length = 0, this._type_ = "$DOM", this.context = e || document
        }).extend({
            size: function() {
                return this.length
            },
            splice: function() {},
            get: function(e) {
                return "number" == typeof e ? 0 > e ? this[this.length + e] : this[e] : Array.prototype.slice.call(this, 0)
            },
            toArray: function() {
                return this.get()
            }
        }), t.dom.extend({
            each: function(e) {
                t.check("function", "G.dom.each");
                var n, r, i = this.length;
                for (n = 0; i > n && (r = e.call(this[n], n, this[n], this), r !== !1 && "break" != r); n++);
                return this
            }
        }), t.global = t.global || function() {
            var e = t._global_ = window[t.guid],
                n = e._ = e._ || {};
            return function(e, t, r) {
                return "undefined" != typeof t ? (r || (t = "undefined" == typeof n[e] ? t : n[e]), n[e] = t) : e && "undefined" == typeof n[e] && (n[e] = {}), n[e]
            }
        }(), t._util_ = t._util_ || {}, t._util_.access = function(e, n, r, i, o) {
            if (e.size() <= 0) return e;
            switch (t.type(n)) {
                case "string":
                    if (void 0 === r) return i.call(e, e[0], n);
                    e.each(function(a, u) {
                        i.call(e, u, n, "function" === t.type(r) ? r.call(u, a, i.call(e, u, n)) : r, o)
                    });
                    break;
                case "object":
                    for (var a in n) t._util_.access(e, a, n[a], i, r)
            }
            return e
        }, t._util_.nodeName = function(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }, t._util_.propFixer = {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            classname: "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable",
            rboolean: /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i
        }, !document.createElement("form").enctype && (t._util_.propFixer.enctype = "encoding"), t._util_.isXML = function(e) {
            var t = (e ? e.ownerDocument || e : 0).documentElement;
            return t ? "HTML" !== t.nodeName : !1
        }, t._util_.prop = function() {
            var e = /^(?:button|input|object|select|textarea)$/i,
                n = /^a(?:rea|)$/i,
                r = document.createElement("select"),
                i = r.appendChild(document.createElement("option")),
                o = {
                    tabIndex: {
                        get: function(t) {
                            var r = t.getAttributeNode("tabindex");
                            return r && r.specified ? parseInt(r.value, 10) : e.test(t.nodeName) || n.test(t.nodeName) && t.href ? 0 : void 0
                        }
                    }
                };
            return !i.selected && (o.selected = {
                    get: function(e) {
                        var t = e.parentNode;
                        return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null
                    }
                }), r = i = null,
                function(e, n, r) {
                    var i, a, u = e.nodeType;
                    if (e && !~"238".indexOf(u)) return 1 === u && t._util_.isXML(e) || (n = t._util_.propFixer[n] || n, i = o[n] || {}), void 0 !== r ? i.set && void 0 !== (a = i.set(e, n, r)) ? a : e[n] = r : i.get && null !== (a = i.get(e, n)) ? a : e[n]
                }
        }(), t._util_.support = t._util_.support || function() {
            var e, t, n, r, i, o = document.createElement("div");
            return o.setAttribute("className", "t"), o.innerHTML = ' <link/><table></table><a href="/a">a</a><input type="checkbox"/>', t = o.getElementsByTagName("A")[0], t.style.cssText = "top:1px;float:left;opacity:.5", r = document.createElement("select"), i = r.appendChild(document.createElement("option")), n = o.getElementsByTagName("input")[0], n.checked = !0, e = {
                dom: {
                    div: o,
                    a: t,
                    select: r,
                    opt: i,
                    input: n
                }
            }
        }(), t._util_.support.getSetAttribute = "t" !== t._util_.support.dom.div.className, t._util_.nodeHook = function() {
            if (!t._util_.support.getSetAttribute) {
                var e = {};
                return e.name = e.id = e.coords = !0, {
                    get: function(t, n) {
                        var r = t.getAttributeNode(n);
                        return r && (e[n] ? "" !== r.value : r.specified) ? r.value : void 0
                    },
                    set: function(e, t, n) {
                        var r = e.getAttributeNode(t);
                        return r || (r = document.createAttribute(t), e.setAttributeNode(r)), r.value = n + ""
                    }
                }
            }
        }(), t._util_.removeAttr = function() {
            var e = t._util_.propFixer,
                n = /\s+/,
                r = t._util_.support.getSetAttribute;
            return function(i, o) {
                if (o && 1 === i.nodeType)
                    for (var a, u, s, l = o.split(n),
                            d = 0; s = l[d]; d++) a = e[s] || s, u = e.rboolean.test(s), !u && t._util_.attr(i, s, ""), i.removeAttribute(r ? s : a), u && a in i && (i[a] = !1)
            }
        }(), t._util_.contains = document.compareDocumentPosition ? function(e, t) {
            return !!(16 & e.compareDocumentPosition(t))
        } : function(e, t) {
            if (e === t) return !1;
            if (e.contains && t.contains) return e.contains(t);
            for (; t = t.parentNode;)
                if (t === e) return !0;
            return !1
        }, t._util_.attr = function() {
            var e = t._util_,
                n = /^(?:button|input)$/i,
                r = e.support.dom,
                i = "t" === r.input.value,
                o = "/a" === r.a.getAttribute("href"),
                a = /top/.test(r.a.getAttribute("style")),
                u = e.nodeHook,
                s = {
                    className: "class"
                },
                l = {
                    get: function(t, n) {
                        var r, i = e.prop(t, n);
                        return i === !0 || "boolean" != typeof i && (r = t.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : void 0
                    },
                    set: function(t, n, r) {
                        if (r === !1) e.removeAttr(t, n);
                        else {
                            var i = e.propFixer[n] || n;
                            i in t && (t[i] = !0), t.setAttribute(n, n.toLowerCase())
                        }
                        return n
                    }
                },
                d = {
                    type: {
                        set: function(t, r, o) {
                            if (n.test(t.nodeName) && t.parentNode) return o;
                            if (!i && "radio" === o && e.nodeName(t, "input")) {
                                var a = t.value;
                                return t.setAttribute("type", o), a && (t.value = a), o
                            }
                        }
                    },
                    value: {
                        get: function(t, n) {
                            return u && e.nodeName(t, "button") ? u.get(t, n) : n in t ? t.value : null
                        },
                        set: function(t, n, r) {
                            return u && e.nodeName(t, "button") ? u.set(t, n, r) : void(t.value = r)
                        }
                    }
                };
            return e.support.getSetAttribute || (t.forEach(["width", "height"], function(e) {
                    d[e] = {
                        set: function(e, t, n) {
                            return "" === n ? (e.setAttribute(t, "auto"), n) : void 0
                        }
                    }
                }), d.contenteditable = {
                    get: u.get,
                    set: function(e, t, n) {
                        "" === n && (n = !1), u.set(e, t, n)
                    }
                }), o || t.forEach(["href", "src", "width", "height"], function(e) {
                    d[e] = {
                        get: function(e, t) {
                            var n = e.getAttribute(t, 2);
                            return null === n ? void 0 : n
                        }
                    }
                }), a || (d.style = {
                    get: function(e) {
                        return e.style.cssText.toLowerCase() || void 0
                    },
                    set: function(e, t, n) {
                        return e.style.cssText = n + ""
                    }
                }),
                function(n, r, i, o) {
                    var a, c, f = n.nodeType,
                        p = 1 !== f || !e.isXML(n);
                    if (n && !~"238".indexOf(f)) return o && t.dom.fn[r] ? t.dom(n)[r](i) : (p && (r = s[r] || r.toLowerCase(), a = d[r] || (e.propFixer.rboolean.test(r) ? l : u)), void 0 !== i ? null === i ? void e.removeAttr(n, r) : p && a && a.set && void 0 !== (c = a.set(n, r, i)) ? c : (n.setAttribute(r, i + ""), i) : p && a && a.get && null !== (c = a.get(n, r)) ? c : (c = n.getAttribute(r), null === c ? void 0 : c))
                }
        }(), t.dom.extend({
            getDocument: function() {
                if (this.size() <= 0) return void 0;
                var e = this[0];
                return 9 == e.nodeType ? e : e.ownerDocument || e.document
            }
        }), t.dom.extend({
            addClass: function(e) {
                if (!arguments.length) return this;
                var n = typeof e,
                    r = " ";
                if ("string" == n) {
                    e = t.string.trim(e);
                    var i = e.split(" ");
                    t.forEach(this, function(e) {
                        for (var t = e.className,
                                n = 0; n < i.length; n++) ~(r + t + r).indexOf(r + i[n] + r) || (t += " " + i[n]);
                        e.className = t.replace(/^\s+/g, "")
                    })
                } else "function" == n && t.forEach(this, function(n, r) {
                    t.dom(n).addClass(e.call(n, r, n.className))
                });
                return this
            }
        }), t.dom.extend({
            removeClass: function(e) {
                var n = typeof e,
                    r = " ";
                if (arguments.length || t.forEach(this, function(e) {
                        e.className = ""
                    }), "string" == n) {
                    e = t.string.trim(e);
                    var i = e.split(" ");
                    t.forEach(this, function(e) {
                        for (var n = e.className, o = 0; o < i.length; o++)
                            for (; ~(r + n + r).indexOf(r + i[o] + r);) n = (r + n + r).replace(r + i[o] + r, r);
                        e.className = t.string.trim(n)
                    })
                } else "function" == n && t.forEach(this, function(n, r) {
                    t.dom(n).removeClass(e.call(n, r, n.className))
                });
                return this
            }
        }), t.dom.extend({
            pushStack: function(e) {
                var n = t.dom();
                return t.merge(n, e), n.prevObject = this, n.context = this.context, n
            }
        }), t.dom.extend({
            getComputedStyle: function(e) {
                if (this[0].ownerDocument) {
                    var t = this[0].ownerDocument.defaultView,
                        n = t && t.getComputedStyle && t.getComputedStyle(this[0], null),
                        r = n ? n.getPropertyValue(e) || n[e] : "";
                    return r || this[0].style[e]
                }
            }
        }), t.dom.extend({
            getCurrentStyle: function() {
                var e = document.documentElement.currentStyle ? function(e) {
                    return this[0].currentStyle ? this[0].currentStyle[e] : this[0].style[e]
                } : function(e) {
                    return this.getComputedStyle(e)
                };
                return function(t) {
                    return e.call(this, t)
                }
            }()
        }), t.each = function(e, t, n) {
            var r, i, o, a;
            if ("function" == typeof t && e)
                if (i = "number" == typeof e.length ? e.length : e.byteLength, "number" == typeof i) {
                    if ("[object Function]" === Object.prototype.toString.call(e)) return e;
                    for (r = 0; i > r && (o = e[r], void 0 === o && (o = e.charAt && e.charAt(r)), a = t.call(n || o, r, o, e), a !== !1 && "break" != a); r++);
                } else if ("number" == typeof e)
                for (r = 0; e > r && (a = t.call(n || r, r, r, r), a !== !1 && "break" != a); r++);
            else if ("object" == typeof e)
                for (r in e)
                    if (e.hasOwnProperty(r) && (a = t.call(n || e[r], r, e[r], e), a === !1 || "break" == a)) break;
            return e
        }, t.dom.g = function(e) {
            return e ? "string" == typeof e || e instanceof String ? document.getElementById(e) : !e.nodeName || 1 != e.nodeType && 9 != e.nodeType ? null : e : null
        }, t.dom.extend({
            hasClass: function(e) {
                if (arguments.length <= 0 || "function" == typeof e) return this;
                if (this.size() <= 0) return !1;
                e = e.replace(/^\s+/g, "").replace(/\s+$/g, "").replace(/\s+/g, " ");
                var n, r = e.split(" ");
                return t.forEach(this, function(e) {
                    for (var t = e.className, i = 0; i < r.length; i++) {
                        if (!~(" " + t + " ").indexOf(" " + r[i] + " ")) return void(n = !1);
                    }
                    return n !== !1 ? void(n = !0) : void 0
                }), n
            }
        }), t.dom.extend({
            toggleClass: function(e, n) {
                var n = "undefined" == typeof n ? n : Boolean(n);
                switch (arguments.length <= 0 && t.forEach(this, function(e) {
                    e.className = ""
                }), typeof e) {
                    case "string":
                        e = e.replace(/^\s+/g, "").replace(/\s+$/g, "").replace(/\s+/g, " ");
                        var r = e.split(" ");
                        t.forEach(this, function(e) {
                            for (var t = e.className,
                                    i = 0; i < r.length; i++) ~(" " + t + " ").indexOf(" " + r[i] + " ") && "undefined" == typeof n ? t = (" " + t + " ").replace(" " + r[i] + " ", " ") : (~(" " + t + " ").indexOf(" " + r[i] + " ") || "undefined" != typeof n) && (~(" " + t + " ").indexOf(" " + r[i] + " ") || n !== !0) ? ~(" " + t + " ").indexOf(" " + r[i] + " ") && n === !1 && (t = t.replace(r[i], "")) : t += " " + r[i];
                            e.className = t.replace(/^\s+/g, "").replace(/\s+$/g, "")
                        });
                        break;
                    case "function":
                        t.forEach(this, function(r, i) {
                            t.dom(r).toggleClass(e.call(r, i, r.className), n)
                        })
                }
                return this
            }
        }), t.array.extend({
            filter: function(e, n) {
                var r, i, o, a = t.array([]),
                    u = 0;
                if ("function" === t.type(e))
                    for (r = 0, i = this.length; i > r; r++) o = this[r], e.call(n || this, o, r, this) === !0 && (a[u++] = o);
                return a
            }
        }), t.array.filter = function(e, n, r) {
            return t.isArray(e) ? t.array(e).filter(n, r) : []
        }, t.array.extend({
            indexOf: function(e, n) {
                t.check(".+(,number)?", "G.array.indexOf");
                var r = this.length;
                for ((n = 0 | n) < 0 && (n = Math.max(0, r + n)); r > n; n++)
                    if (n in this && this[n] === e) return n;
                return -1
            }
        }), t.array.extend({
            map: function(e, n) {
                t.check("function(,.+)?", "G.array.map");
                for (var r = this.length, i = t.array([]),
                        o = 0; r > o; o++) i[o] = e.call(n || this, this[o], o, this);
                return i
            }
        }), t.array.map = function(e, n, r) {
            return t.isArray(e) ? t.array(e).map(n, r) : e
        }, t.browser = t.browser || function() {
            var e = navigator.userAgent,
                n = {
                    isStrict: "CSS1Compat" == document.compatMode,
                    isGecko: /gecko/i.test(e) && !/like gecko/i.test(e),
                    isWebkit: /webkit/i.test(e)
                };
            try {
                /(\d+\.\d+)/.test(external.max_version) && (n.maxthon = +RegExp.$1)
            } catch (r) {}
            switch (!0) {
                case /msie (\d+\.\d+)/i.test(e):
                    n.ie = document.documentMode || +RegExp.$1;
                    break;
                case "Netscape" == navigator.appName && new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})").test(e):
                    n.ie = document.documentMode;
                    break;
                case /chrome\/(\d+\.\d+)/i.test(e):
                    n.chrome = +RegExp.$1;
                    break;
                case /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(e) && !/chrome/i.test(e):
                    n.safari = +(RegExp.$1 || RegExp.$2);
                    break;
                case /firefox\/(\d+\.\d+)/i.test(e):
                    n.firefox = +RegExp.$1;
                    break;
                case /opera(?:\/| )(\d+(?:\.\d+)?)(.+?(version\/(\d+(?:\.\d+)?)))?/i.test(e):
                    n.opera = +(RegExp.$4 || RegExp.$1)
            }
            return t.extend(t, n), n
        }(), window.Instance = function(e) {
            return t.id(e, "get")
        }, t.id = function() {
            var e = t.global("_maps_id"),
                n = t.key;
            return window[t.guid]._counter = window[t.guid]._counter || 1,
                function(r, i) {
                    var o, a = t.isString(r),
                        u = t.isObject(r),
                        s = u ? r[n] : a ? r : "";
                    if (t.isString(i)) switch (i) {
                        case "get":
                            return u ? s : e[s];
                        case "remove":
                        case "delete":
                            return (o = e[s]) && (t.isElement(o) && t.browser.ie < 8 ? o.removeAttribute(n) : delete o[n], delete e[s]), s;
                        default:
                            return a ? ((o = e[s]) && delete e[s], o && (e[o[n] = i] = o)) : u && (s && delete e[s], e[r[n] = i] = r), i
                    }
                    return u ? (!s && (e[r[n] = s = t.id()] = r), s) : a ? e[r] : "TANGRAM_" + t._global_._counter++
                }
        }(), t.dom.extend({
            data: function() {
                var e = t.key,
                    n = t.global("_maps_HTMLElementData");
                return function(r, i) {
                    if (t.forEach(this, function(n) {
                            !n[e] && (n[e] = t.id())
                        }), t.isString(r)) {
                        if ("undefined" == typeof i) {
                            var o, a;
                            if (a = this[0] && (o = n[this[0][e]]) && o[r], "undefined" != typeof a) return a;
                            var u = this[0].getAttribute("data-" + r);
                            return ~String(u).indexOf("{") ? Function("return " + u)() : u
                        }
                        t.forEach(this, function(t) {
                            var o = n[t[e]] = n[t[e]] || {};
                            o[r] = i
                        })
                    } else "object" == t.type(r) && t.forEach(this, function(i) {
                        var o = n[i[e]] = n[i[e]] || {};
                        t.forEach(r, function(e, t) {
                            o[t] = r[t]
                        })
                    });
                    return this
                }
            }()
        }), t.createChain("string", function(e) {
            var n = t.type(e),
                r = new String(~"string|number".indexOf(n) ? e : n),
                i = String.prototype;
            return t.forEach(t.string.$String.prototype, function(e, t) {
                i[t] || (r[t] = e)
            }), r
        }), t.string.extend({
            trim: function() {
                var e = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)", "g");
                return function() {
                    return this.replace(e, "")
                }
            }()
        }), t.createChain("event", function() {
            var e = {};
            return function(n) {
                switch (t.type(n)) {
                    case "object":
                        return e.originalEvent === n ? e : e = new t.event.$Event(n);
                    case "$Event":
                        return n
                }
            }
        }(), function(e) {
            var n, r, i = this;
            if (this._type_ = "$Event", "object" == typeof e && e.type) {
                i.originalEvent = n = e;
                for (var o in n) "function" != typeof n[o] && (i[o] = n[o]);
                n.extraData && t.extend(i, n.extraData), i.target = i.srcElement = n.srcElement || (r = n.target) && (3 == r.nodeType ? r.parentNode : r), i.relatedTarget = n.relatedTarget || (r = n.fromElement) && (r === i.target ? n.toElement : r), i.keyCode = i.which = n.keyCode || n.which, i.which || void 0 === n.button || (i.which = 1 & n.button ? 1 : 2 & n.button ? 3 : 4 & n.button ? 2 : 0);
                var a = document.documentElement,
                    u = document.body;
                i.pageX = n.pageX || n.clientX + (a && a.scrollLeft || u && u.scrollLeft || 0) - (a && a.clientLeft || u && u.clientLeft || 0), i.pageY = n.pageY || n.clientY + (a && a.scrollTop || u && u.scrollTop || 0) - (a && a.clientTop || u && u.clientTop || 0), i.data
            }
            this.timeStamp = (new Date).getTime()
        }).extend({
            stopPropagation: function() {
                var e = this.originalEvent;
                e && (e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0)
            },
            preventDefault: function() {
                var e = this.originalEvent;
                e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
            }
        }), t._util_.eventBase = t._util_.eventBase || {}, void

        function(e, t) {
            e.listener || (t = e.listener = {}, window.addEventListener ? t.add = function(e, t, n) {
                e.addEventListener(t, n, !1)
            } : window.attachEvent && (t.add = function(e, t, n) {
                e.attachEvent("on" + t, n)
            }))
        }(t._util_.eventBase), void

        function(e) {
            if (!e.queue) {
                var n = t.id,
                    r = e.queue = {},
                    i = r.attaCache = t.global("eventQueueCache"),
                    o = e.listener;
                r.get = function(e, t, r, o) {
                    var a, u = n(e);
                    return i[u] || (i[u] = {}), a = i[u], t ? (!a[t] && r && this.setupCall(e, t, r, a[t] = [], o), a[t] || []) : a
                }, r.add = function(e, t, n, r, i) {
                    this.get(e, t, n, i).push(r)
                }, r.remove = function(e, t, n) {
                    var r, i;
                    if (t) {
                        var r = this.get(e, t);
                        if (n)
                            for (var o = r.length - 1; o >= 0; o--) r[o].orig == n && r.splice(o, 1);
                        else r.length = 0
                    } else {
                        var i = this.get(e);
                        for (var o in i) i[o].length = 0
                    }
                }, r.handlerList = function(e, n) {
                    for (var r, i = [],
                            o = 0; r = n[o]; o++) r.delegate && t.dom(r.delegate, e).size() < 1 || i.push(r);
                    return i
                }, r.call = function(e, n, i, o) {
                    if (i) {
                        if (!i.length) return;
                        var a = [].slice.call(arguments, 1),
                            u = [];
                        a.unshift(o = t.event(o || n)), o.type = n, o.currentTarget || (o.currentTarget = e), o.target || (o.target = e), i = r.handlerList(e, i);
                        for (var s, l = 0,
                                d = i.length; d > l; l++)(s = i[l]) && (s.pkg.apply(e, a), s.one && u.unshift(l));
                        if (u.length)
                            for (var l = 0, d = u.length; d > l; l++) this.remove(e, n, i[l].fn)
                    } else i = this.get(e, n), this.call(e, n, i, o)
                }, r.setupCall = function() {
                    var e = function(e, t, n, i) {
                        o.add(e, n, function(n) {
                            r.call(e, t, i, n)
                        })
                    };
                    return function(n, r, i, o, a) {
                        if (a) {
                            n = t.dom(a, n);
                            for (var u = 0, s = n.length; s > u; u++) e(n[u], r, i, o)
                        } else e(n, r, i, o)
                    }
                }()
            }
        }(t._util_.eventBase, t.event), t._util_.cleanData = function(e) {
            for (var n, r,
                    i = 0; r = e[i]; i++) n = t.id(r, "get"), n && (t._util_.eventBase.queue.remove(r), t.id(r, "remove"))
        }, t.dom.extend({
            empty: function() {
                for (var e, n = 0; e = this[n]; n++)
                    for (1 === e.nodeType && t._util_.cleanData(e.getElementsByTagName("*")); e.firstChild;) e.removeChild(e.firstChild);
                return this
            }
        }), t.dom.extend({
            html: function(e) {
                var n, r = t.dom,
                    i = t._util_,
                    o = this,
                    a = !1,
                    u = !!i.support.dom.div.getElementsByTagName("link").length,
                    s = 3 === i.support.dom.div.firstChild.nodeType;
                if (!this.size()) switch (typeof e) {
                    case "undefined":
                        return void 0;
                    default:
                        return o
                }
                var l = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
                    d = /<(?:script|style|link)/i,
                    c = new RegExp("<(?:" + l + ")[\\s/>]", "i"),
                    f = /^\s+/,
                    p = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
                    h = /<([\w:]+)/,
                    g = {
                        option: [1, "<select multiple='multiple'>", "</select>"],
                        legend: [1, "<fieldset>", "</fieldset>"],
                        thead: [1, "<table>", "</table>"],
                        tr: [2, "<table><tbody>", "</tbody></table>"],
                        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                        area: [1, "<map>", "</map>"],
                        _default: [0, "", ""]
                    };
                return g.optgroup = g.option, g.tbody = g.tfoot = g.colgroup = g.caption = g.thead, g.th = g.td, u || (g._default = [1, "X<div>", "</div>"]), t.forEach(o, function(t, i) {
                    if (!n) {
                        var l = r(t);
                        switch (typeof e) {
                            case "undefined":
                                return void(n = 1 === t.nodeType ? t.innerHTML : void 0);
                            case "number":
                                e = String(e);
                            case "string":
                                if (a = !0, !(d.test(e) || !u && c.test(e) || !s && f.test(e) || g[(h.exec(e) || ["", ""])[1].toLowerCase()])) {
                                    e = e.replace(p, "<$1></$2>");
                                    try {
                                        1 === t.nodeType && (l.empty(), t.innerHTML = e), t = 0
                                    } catch (m) {}
                                }
                                t && o.empty().append(e);
                                break;
                            case "function":
                                a = !0, l.html(e.call(t, i, l.html()))
                        }
                    }
                }), a ? o : n
            }
        }), void

        function(e, n) {
            if (!e.core) {
                var r = e.queue,
                    i = e.core = {},
                    o = n.special = {},
                    a = [].push,
                    u = function(e, t) {
                        function n(e) {
                            if (e.length < 2) return e;
                            for (var t = [], n = 0; n < e.length; n++) t.push({
                                deep: r(e[n]),
                                value: e[n],
                                toString: function() {
                                    return this.value
                                }
                            });
                            t.sort(function(e, t) {
                                return t.deep - e.deep
                            }), e = [];
                            for (var n = 0; n < t.length; n++) e.push(t[n].value);
                            return e
                        }

                        function r(e) {
                            for (var t = 0; e.parentElement !== document.body;) t++, e = e.parentElement;
                            return t
                        }

                        for (var i = [], o = 0, a = t.length; a > o; o++) t.get(o).contains(e) && i.push(t[o]);
                        return n(i)
                    };
                i.build = function(e, n, r, i, s) {
                    var l;
                    return i && (l = t.dom(i, e)), n in o && o[n].pack && (r = o[n].pack(r)),
                        function(n) {
                            var o, d = (t.dom(n.target), [n]);
                            if (s && !n.data && (n.data = s), n.triggerData && a.apply(d, n.triggerData), !l) return n.result = r.apply(e, d);
                            for (var c = 0; 2 > c; c++) {
                                l = t.dom(i, e);
                                var f = !0;
                                if ((o = u(n.target, l)) && o.length) {
                                    for (var p = 0; p < o.length; p++) f && r.apply(o[p], d) === !1 && (f = !1);
                                    return
                                }
                            }
                        }
                }, i.add = function(e, t, n, i, a, u) {
                    var s, l, d = this.build(e, t, n, i, a);
                    l = t, t in o && (s = o[t].attachElements, l = o[t].bindType || t), r.add(e, t, l, {
                        type: t,
                        pkg: d,
                        orig: n,
                        one: u,
                        delegate: i
                    }, s)
                }, i.remove = function(e, t, n, i) {
                    r.remove(e, t, n, i)
                }
            }
        }(t._util_.eventBase, t.event), t.dom.extend({
            on: function(e, n, r, i, o) {
                var a = t._util_.eventBase.core;
                return "object" == typeof n && n ? (i = r, r = n, n = null) : "function" == typeof r ? (i = r, r = null) : "function" == typeof n && (i = n, n = r = null), "string" == typeof e ? (e = e.split(/[ ,]+/), this.each(function() {
                    t.forEach(e, function(e) {
                        a.add(this, e, i, n, r, o)
                    }, this)
                })) : "object" == typeof e && (i && (i = null), t.forEach(e, function(e, t) {
                    this.on(t, n, r, e, o)
                }, this)), this
            }
        }), t.event.on = t.on = function(e, n, r) {
            return "string" == typeof e && (e = t.dom.g(e)), t.dom(e).on(n.replace(/^\s*on/, ""), r), e
        }, t.dom.extend({
            off: function(e, n, r) {
                var i = t._util_.eventBase.core,
                    o = this;
                return e ? "string" == typeof e ? ("function" == typeof n && (r = n, n = null), e = e.split(/[ ,]/), t.forEach(this, function(o) {
                    t.forEach(e, function(e) {
                        i.remove(o, e, r, n)
                    })
                })) : "object" == typeof e && t.forEach(e, function(e, t) {
                    o.off(t, n, e)
                }) : t.forEach(this, function(e) {
                    i.remove(e)
                }), this
            }
        }), t.event.un = t.un = function(e, n, r) {
            return "string" == typeof e && (e = t.dom.g(e)), t.dom(e).off(n.replace(/^\s*on/, ""), r), e
        }, t.dom.extend({
            bind: function(e, t, n) {
                return this.on(e, void 0, t, n)
            }
        }), t.dom.extend({
            unbind: function(e, t) {
                return this.off(e, t)
            }
        }), void

        function(e) {
            if (!e.mousewheel) {
                var n = /firefox/i.test(navigator.userAgent),
                    r = /msie/i.test(navigator.userAgent);
                t.each({
                    mouseenter: "mouseover",
                    mouseleave: "mouseout"
                }, function(n, r) {
                    e[n] = {
                        bindType: r,
                        pack: function(e) {
                            var r = t.dom.contains;
                            return function(t) {
                                var i = t.relatedTarget;
                                return t.type = n, !i || i !== this && !r(this, i) ? e.apply(this, arguments) : void 0
                            }
                        }
                    }
                }), r || t.each({
                    focusin: "focus",
                    focusout: "blur"
                }, function(t, n) {
                    e[t] = {
                        bindType: n,
                        attachElements: "textarea,select,input,button,a"
                    }
                }), e.mousewheel = {
                    bindType: n ? "DOMMouseScroll" : "mousewheel",
                    pack: function(e) {
                        return function(t) {
                            var r = t.originalEvent;
                            return t.type = "mousewheel", t.wheelDelta = t.wheelDelta || (n ? -40 * r.detail : r.wheelDelta) || 0, e.apply(this, arguments)
                        }
                    }
                }
            }
        }(t.event.special), void

        function(e) {
            var n = e.queue;
            t.dom.extend({
                triggerHandler: function(e, r, i) {
                    return i && !i.triggerData && (i.triggerData = r), t.forEach(this, function(t) {
                        n.call(t, e, void 0, i)
                    }), this
                }
            })
        }(t._util_.eventBase), void

        function(e, n) {
            var r = n.special,
                i = e.queue,
                o = t.dom,
                a = !window.addEventListener,
                u = /firefox/i.test(navigator.userAgent),
                s = {
                    submit: 3,
                    focus: a ? 3 : 2,
                    blur: a ? 3 : u ? 1 : 2
                },
                l = function(e, t) {
                    var n;
                    document.createEvent ? (n = document.createEvent("HTMLEvents"), n.initEvent(e, !0, !0)) : document.createEventObject && (n = document.createEventObject(), n.type = e);
                    var r = {};
                    if (t)
                        for (var i in t) try {
                            n[i] = t[i]
                        } catch (o) {
                            n.extraData || (n.extraData = r), r[i] = t[i]
                        }
                    return n
                },
                d = function(e, t, n) {
                    return e.dispatchEvent ? e.dispatchEvent(n) : e.fireEvent ? e.fireEvent("on" + t, n) : void 0
                },
                c = function(e, t, n, r, a) {
                    var u, c;
                    if (u = l(t, r))
                        if (n && (u.triggerData = n), a) i.call(e, t, null, u);
                        else {
                            var f = e.window === window ? 3 : s[t];
                            try {
                                (1 & f || !(t in s)) && (c = d(e, t, u))
                            } catch (p) {
                                o(e).triggerHandler(t, n, u)
                            }
                            if (c !== !1 && 2 & f) try {
                                e[t] && e[t]()
                            } catch (p) {}
                        }
                };
            t.dom.extend({
                trigger: function(e, t, n) {
                    var i;
                    return e in r && (i = r[e]), this.each(function() {
                        c(this, e, t, n, i)
                    }), this
                }
            })
        }(t._util_.eventBase, t.event), t.array.extend({
            indexOf: function(e, n) {
                t.check(".+(,number)?", "G.array.indexOf");
                var r = this.length;
                for ((n = 0 | n) < 0 && (n = Math.max(0, r + n)); r > n; n++)
                    if (n in this && this[n] === e) return n;
                return -1
            }
        }), void

        function() {
            for (var e = "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave mousewheel change select submit keydown keypress keyup error contextmenu".split(" "),
                    n = {}, r = function(e) {
                        n[e] = function(t, n) {
                            return null == n && (n = t, t = null), arguments.length > 0 ? this.on(e, null, t, n) : this.trigger(e)
                        }
                    }, i = 0, o = e.length; o > i; i++) r(e[i]);
            t.dom.extend(n)
        }(), t.ac = t.dom.addClass, t.rc = t.dom.removeClass, t.dom = t.dom || {}, t.addClass = t.dom.addClass || {}, t.getStyle = t.dom.getStyle || {}, t.g = t.G = t.dom.g || {}, t.removeClass = t.dom.removeClass || {}, t.event = t.event || {}, t.on = t.event.on || {}, t.un = t.event.un || {}, t.string = t.string || {}, t.trim = function() {
            var e = new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+$)", "g");
            return function(t) {
                return String(t).replace(e, "")
            }
        }(), t
    }();

    function getXHR() {
        if (window.ActiveXObject) try {
            return new ActiveXObject("Msxml2.XMLHTTP")
        } catch (e) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {}
        }
        return window.XMLHttpRequest ? new XMLHttpRequest : void 0
    }

    function addParam(e, t, n) {
        n = "function" === G.type(n) ? n() : "undefined" == typeof n || null == n ? "" : n, e.push(
            encodeURIComponent(t) + "=" + encodeURIComponent(n))
    }

    function buildParams(e, t, n, r) {
        if ("array" === G.type(n)) G.forEach(n, function(n, i) {
            r || rbracket.test(t) ? addParam(e, t, n) : buildParams(e, t + "[" + ("object" == typeof n ? i : "") +
                "]", n, r)
        });
        else if (r || "object" !== G.type(n)) addParam(e, t, n);
        else
            for (var i in n) buildParams(e, t + "[" + i + "]", n[i], r)
    }

    window.jsonp = {}, G.jsonp = function(e, t, n) {
            t && "function" != typeof t && (n = t, t = n.success || function() {}), n = n || {}, n.cbtype = n.cbtype ||
                "callback";
            var r = "p" + Math.floor(1e8 * Math.random());
            window.jsonp[r] = function(e) {
                o.endTime = (new Date).getTime();
                var n = o.endTime - o.startTime;
                n > 6e3 ? o.slow = "6" : n > 3e3 ? o.slow = "3" : n > 2e3 && (o.slow = "2"), window.jsonp[r] = void 0, t(e,
                    o), o.dom = null, document.body.removeChild(i)
            };
            var i = document.createElement("script"),
                o = {
                    options: n,
                    startTime: (new Date).getTime(),
                    slow: !1,
                    dom: i,
                    url: e
                };
            if (-1 != e.indexOf("?")) var a = "&";
            else var a = "?";
            return i.src = e + a + n.cbtype + "=jsonp." + r, i.onerror = function() {
                window.jsonp[r] = void 0, n.error && n.error(o), o.dom = null, document.body.removeChild(i)
            }, document.body.appendChild(i), o
        }, G.Ajax = function(e) {
            if (this.url = "", this.data = "", this.async = !0, this.duration = -1, this.overtime = !1, this.username = "",
                this.password = "", this.method = "GET", "object" == typeof e && e)
                for (var t in e) this[t] = e[t]
        },
        function() {
            function e() {
                for (var e = t, n = null, r = 0; r < e.length && (n = e[r], n.active); r++);
                return r >= e.length && (n = {
                    active: !1,
                    xhr: getXHR()
                }, e[e.length] = n), n
            }

            G.Ajax.prototype.request = function(t, n, r) {
                function i() {
                    if (4 == s.readyState) {
                        try {
                            s.status
                        } catch (e) {
                            return "function" == typeof a.ondisconnect && a.ondisconnect(s), void(u.active = !1)
                        }
                        try {
                            var t = (new Date).getTime();
                            t - d > 6e3 && r ? r("6") : t - d > 3e3 && r ? r("3") : t - d > 2e3 && r && r("")
                        } catch (e) {}
                        a.duration = -1, a.overtime || ("function" == typeof a["on" + s.status] && a["on" + s.status](s),
                            200 == s.status || 304 === s.status ? "function" == typeof a.onsuccess && a.onsuccess(s) :
                            "function" == typeof a.onfailure && a.onfailure(s)), u.active = !1, s.onreadystatechange = function() {}
                    }
                }

                function o() {
                    if (-1 != a.duration) {
                        if ((new Date).getTime() - a.beginTime > a.duration) {
                            a.duration = -1;
                            try {
                                s.abort()
                            } catch (e) {}
                            a.overtime = !0, u.active = !1, "function" == typeof a.ontimeout && a.ontimeout(s)
                        }
                        setTimeout(function() {
                            o()
                        }, 10)
                    }
                }

                var a = this,
                    u = e(),
                    s = u.xhr;
                u.active = !0, a.url = t, "string" == typeof n && n && (a.data = n), "function" == typeof a.onexecute && a.onexecute(
                    s);
                try {
                    a.username ? s.open(a.method, a.url, a.async, a.username, a.password) : s.open(a.method, a.url, a.async),
                        a.async && (s.onreadystatechange = i), "POST" == a.method.toUpperCase() && s.setRequestHeader(
                            "Content-Type", "application/x-www-form-urlencoded"), a.beginTime = (new Date).getTime(), a.duration >
                        0 && o(), s.send(a.data)
                } catch (l) {
                    "function" == typeof a.onerror && a.onerror(l)
                }
                a.async || i();
                var d = (new Date).getTime()
            };
            var t = []
        }(), G.Ajax.get = function(e, t) {
            return this.request(e, t)
        }, G.Ajax.post = function(e, t, n, r) {
            var i = new G.Ajax({
                onsuccess: n,
                onfailure: r
            });
            return i.method = "POST", i.request(e, t), i
        }, G.Ajax.request = function(e, t, n) {
            if ("object" == typeof t && t ? (n = t, t = null) : "function" == typeof t && (n = n || {}, n.onsuccess = t, t =
                    null), n.onslow) {
                var r = n.onslow;
                n.onslow = null
            }
            var i = new G.Ajax(n);
            return i.request(e, t, r), i
        }, G.ajax = function() {
            function request(e, t) {
                var n = (t.method || "get").toLowerCase(),
                    r = t.data,
                    i = !0;
                if ("object" == typeof r && null !== r)
                    if (window.FormData && r instanceof window.FormData) i = !1;
                    else {
                        var o = [];
                        for (key in r) o.push(encodeURIComponent(key) + "=" + encodeURIComponent(r[key]));
                        r = o.join("&")
                    }
                0 == e.indexOf("/") && (e = window.location.protocol + "//" + window.location.hostname + (window.location.port ?
                        ":" + window.location.port : "") + e), "get" != n && "delete" != n && "put" != n || "string" != typeof r ||
                    (e += (-1 == e.indexOf("?") ? "?" : "&") + r);
                var a = getTransport(e);
                void 0 === t.async && (t.async = !0), a.open(n, e, t.async);
                var u = t.headers || {};
                i && "post" == n && !u["Content-Type"] && (u["Content-Type"] =
                    "application/x-www-form-urlencoded; charset=UTF-8");
                for (var s in u) {
                    var l = u[s];
                    "string" == typeof l && a.setRequestHeader(s, l)
                }
                return a.onreadystatechange = function() {
                    stateChange(a, t)
                }, isXhr && (a.timeStart = (new Date).getTime()), a.send(r), a
            }

            function stateChange(trans, options) {
                if (4 == trans.readyState) {
                    trans.onreadystatechange = function() {};
                    var status = trans.status;
                    if ("number" == typeof status && status >= 200 && 300 > status) {
                        if ("function" != typeof options.success) return;
                        if (isXhr) {
                            trans.timeEnd = (new Date).getTime();
                            var duration = trans.timeEnd - trans.timeStart;
                            trans.slow = duration > 6e3 ? "6" : duration > 3e3 ? "3" : duration > 2e3 ? "2" : null
                        }
                        var data;
                        switch (options.dataType) {
                            case "text":
                                data = trans.responseText;
                                break;
                            case "json":
                                trans.responseText && (data = eval("(" + trans.responseText + ")"));
                                break;
                            case "xml":
                                data = trans.responseXML
                        }
                        options.success.call(options.context, data, trans), alog("cus.fire", "time", {
                            z_ajax_time: duration
                        })
                    } else if ("function" == typeof options.error) {
                        var error = {
                            status: trans.status,
                            statusText: trans.statusText,
                            data: trans.responseText
                        };
                        options.error.call(options.context, trans), alog("cus.fire", "count", "z_ajax_error")
                    }
                }
            }

            var getTransport = function() {
                    if (window.XMLHttpRequest) return isXhr = !0, new XMLHttpRequest;
                    try {
                        return new ActiveXObject("Msxml2.XMLHTTP")
                    } catch (e) {
                        try {
                            return new ActiveXObject("Microsoft.XMLHTTP")
                        } catch (e) {
                            return !1
                        }
                    }
                },
                isXhr = !1;
            return request
        }();
    var rbracket = /\[\]$/;
    G.ajax.param = function(e, t) {
        var n = [];
        if ("array" === G.type(e)) G.forEach(e, function(e) {
            addParam(n, e.name, e.value)
        });
        else
            for (var r in e) buildParams(n, r, e[r], t);
        return n.join("&").replace(/%20/g, "+")
    }, G.dom.removeClass = function(e, t) {
        if (e) {
            e = G.dom.g(e);
            for (var n, r, i = e.className.split(/\s+/), o = t.split(/\s+/), a = o.length, u = 0; a > u; ++u)
                for (r =
                    0, n = i.length; n > r; ++r)
                    if (i[r] == o[u]) {
                        i.splice(r, 1);
                        break
                    }
            return e.className = i.join(" "), e
        }
    }, G.string.toCamelCase = function(e) {
        return e.indexOf("-") < 0 && e.indexOf("_") < 0 ? e : e.replace(/[-_][^-_]/g, function(e) {
            return e.charAt(1).toUpperCase()
        })
    }, G.dom.getStyle = function(e, t) {
        var n = G.dom;
        e = n.g(e), t = G.string.toCamelCase(t);
        var r = e.style[t] || (e.currentStyle ? e.currentStyle[t] : "") || n.getComputedStyle(e, t);
        if (!r) {
            var i = n._styleFixer[t];
            i && (r = i.get ? i.get(e) : G.dom.getStyle(e, i))
        }
        return (i = n._styleFilter) && (r = i.filter(t, r, "get")), r
    }, G.getStyle = G.dom.getStyle, G.dom.getPosition = function(e) {
        e = G.dom.g(e);
        var t, n, r = G.dom.getDocument(e),
            i = G.browser,
            o = G.dom.getStyle,
            a = (i.isGecko > 0 && r.getBoxObjectFor && "absolute" == o(e, "position") && ("" === e.style.top || "" ===
                e.style.left), {
                left: 0,
                top: 0
            }),
            u = i.ie && !i.isStrict ? r.body : r.documentElement;
        if (e == u) return a;
        if (e.getBoundingClientRect) {
            n = e.getBoundingClientRect(), a.left = Math.floor(n.left) + Math.max(r.documentElement.scrollLeft, r.body.scrollLeft),
                a.top = Math.floor(n.top) + Math.max(r.documentElement.scrollTop, r.body.scrollTop), a.left -= r.documentElement
                .clientLeft, a.top -= r.documentElement.clientTop;
            var s = r.body,
                l = parseInt(o(s, "borderLeftWidth")),
                d = parseInt(o(s, "borderTopWidth"));
            i.ie && !i.isStrict && (a.left -= isNaN(l) ? 2 : l, a.top -= isNaN(d) ? 2 : d)
        } else {
            t = e;
            do {
                if (a.left += t.offsetLeft, a.top += t.offsetTop, i.isWebkit > 0 && "fixed" == o(t, "position")) {
                    a.left += r.body.scrollLeft, a.top += r.body.scrollTop;
                    break
                }
                t = t.offsetParent
            } while (t && t != e);
            for ((i.opera > 0 || i.isWebkit > 0 && "absolute" == o(e, "position")) && (a.top -= r.body.offsetTop), t =
                e.offsetParent; t && t != r.body;) a.left -= t.scrollLeft, i.opera && "TR" == t.tagName || (a.top -= t.scrollTop),
                t = t.offsetParent
        }
        return a
    }, G.event.getTarget = function(e) {
        return e.target || e.srcElement
    }
    window.G = G
})(window)