/*! jQuery printElement - v2.0.1 - 2014-08-22
 * https://github.com/erikzaadi/jQuery.printElement
 * Copyright (c) 2014 erikzaadi; Licensed MIT, GPL */
! function(a) {
    function b(b, d) {
        var e = f(b, d),
            i = null,
            j = null;
        if ("popup" === d.printMode.toLowerCase()) i = a.open("about:blank", "printElementWindow", "width=650,height=440,scrollbars=yes"), j = i.document;
        else {
            var k = "printElement_" + Math.round(99999 * Math.random()).toString(),
                l = g.createElement("IFRAME");
            h(l).attr({ style: d.iframeElementOptions.styleToAdd, id: k, className: d.iframeElementOptions.classNameToAdd, frameBorder: 0, scrolling: "no", src: "about:blank" }), g.body.appendChild(l), j = l.contentWindow || l.contentDocument, j.document && (j = j.document), l = g.frames ? g.frames[k] : g.getElementById(k), i = l.contentWindow || l
        }
        focus(), j.open(), j.write(e), j.close(), c(i)
    }

    function c(a) { a && a.printPage ? a.printPage() : setTimeout(function() { c(a) }, 50) }

    function d(a) {
        var b = h(a);
        h(":checked", b).each(function() { this.setAttribute("checked", "checked") }), h("input[type='text'],input[type='number']", b).each(function() { this.setAttribute("value", h(this).val()) }), h("select", b).each(function() {
            var a = h(this);
            h("option", a).each(function() { a.val() === h(this).val() && this.setAttribute("selected", "selected") })
        }), h("textarea", b).each(function() {
            var a = h(this).attr("value");
            this.firstChild ? this.firstChild.textContent = a : this.innerHTML = a
        });
        var c = h("<div></div>").append(b.clone()).html();
        return c
    }

    function e() { var b = a.location.port ? ":" + a.location.port : ""; return a.location.protocol + "//" + a.location.hostname + b + a.location.pathname }

    function f(a, b) {
        var c = h(a),
            f = d(a),
            i = [];
        if (i.push("<html><head><title>" + b.pageTitle + "</title>"), b.overrideElementCSS) {
            if (b.overrideElementCSS.length > 0)
                for (var j = 0; j < b.overrideElementCSS.length; j += 1) {
                    var k = b.overrideElementCSS[j];
                    if ("string" == typeof k) i.push('<link type="text/css" rel="stylesheet" href="' + k + '" >');
                    else {
                        var l = k.media || "";
                        i.push('<link type="text/css" rel="stylesheet" href="' + k.href + '" media="' + l + '" >')
                    }
                }
        } else h("link", g).filter(function() { return "stylesheet" === h(this).attr("rel").toLowerCase() }).each(function() {
            var a = h(this).attr("media") || "";
            i.push('<link type="text/css" rel="stylesheet" href="' + h(this).attr("href") + '" media="' + a + '" >')
        });
        return i.push('<base href="' + e() + '" />'), i.push('</head><body style="' + b.printBodyOptions.styleToAdd + '" class="' + b.printBodyOptions.classNameToAdd + '">'), i.push('<div class="' + c.attr("class") + '">' + f + "</div>"), i.push('<script type="text/javascript">function printPage(){focus();print();' + (b.leaveOpen || "popup" !== b.printMode.toLowerCase() ? "" : "close();") + "}</script>"), i.push("</body></html>"), i.join("")
    }
    var g = a.document,
        h = a.jQuery;
    h.fn.printElement = function(a) {
        var c = h.extend({}, h.fn.printElement.defaults, a);
        return "iframe" === c.printMode && /chrome/.test(navigator.userAgent.toLowerCase()) && (c.printMode = "popup"), h("[id^='printElement_']").remove(), this.each(function() {
            var a = h.meta ? h.extend({}, c, h(this).data()) : c;
            b(h(this), a)
        })
    }, h.fn.printElement.defaults = { printMode: "iframe", pageTitle: "", overrideElementCSS: null, printBodyOptions: { styleToAdd: "padding:10px;margin:10px;", classNameToAdd: "" }, leaveOpen: !1, iframeElementOptions: { styleToAdd: "border:none;position:absolute;width:0px;height:0px;bottom:0px;left:0px;", classNameToAdd: "" } }, h.fn.printElement.cssElement = { href: "", media: "" }
}(window);