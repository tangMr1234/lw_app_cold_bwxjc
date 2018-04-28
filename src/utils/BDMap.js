export function BDMap(mapUrl) {
  return new Promise(function (resolve, reject) {
    window.init = function () {
      if (mapUrl && mapUrl != "" && mapUrl != null && mapUrl != "undefind") {
        seriesLoadScripts(mapUrl, function () {
          resolve(BMap);
        });
      } else {
        resolve(BMap);
      }
    }
    // 异步加载百度地图api
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://api.map.baidu.com/api?v=2.0&ak=COEiMDYAgA78eyBgXq542N38Kb2xzx4K&callback=init";
    script.onerror = reject;
    document.head.appendChild(script);
  })
}

//判断脚本是否加载完成
function seriesLoadScripts(scripts, callback) {
  if (typeof(scripts) != "object") var scripts = [scripts];
  var HEAD = document.getElementsByTagName("head").item(0) || document.documentElement;
  var s = new Array(), last = scripts.length - 1, recursiveLoad = function (i) {
    s[i] = document.createElement("script");
    s[i].setAttribute("type", "text/javascript");
    s[i].onload = s[i].onreadystatechange = function () {
      if (!0 || this.readyState == "loaded" || this.readyState == "complete") {
        this.onload = this.onreadystatechange = null;
        this.parentNode.removeChild(this);
        if (i != last) recursiveLoad(i + 1); else if (typeof(callback) == "function") callback();
      }
    }
    s[i].setAttribute("src", scripts[i]);
    HEAD.appendChild(s[i]);
  };
  recursiveLoad(0);
}
