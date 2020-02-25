/*
  cWidth : 弹窗宽度
  cHeight : 弹窗高度
  title : 弹窗标题
  info : 弹窗内容（原生DOM对象）
*/
function MarkBox(cWidth, cHeight, title, info) {
  var reg = /^[0-9]*[1-9][0-9]*$/;
  this.title = title;
  this.mid = "markId";
  this.cid = "contentId";
  this.info = info;
  this.w = reg.test(cWidth) ? cWidth : 300;
  this.h = reg.test(cHeight) ? cHeight : 200;
}

MarkBox.prototype = {
  close: function() {
    document.getElementById("closeId").onclick();
  },
  init: function() {
    this.de = document.documentElement ? document.documentElement : document.body;
    this.createMarkBox(this.w, this.h);
    var mark = document.getElementById(this.mid);
    var content = document.getElementById(this.cid);
    mark.style.display = 'block';
    content.style.display = 'block';
    this.resetOver(mark, content, this.w, this.h);

    var _this = this;
    document.getElementById("closeId").onclick = function() {
      mark.style.display = 'none';
      content.style.display = 'none';
    }

    window.onresize = function() {
      _this.resetOver(mark, content, _this.w, _this.h);
    }
    window.onscroll = function() {
      _this.resetOver(mark, content, _this.w, _this.h);
    }
  },
  resetCss: function(element, props) {
    for (var p in props) {
      element.style[p] = props[p];
    }
  },
  createMarkBox: function(w, h) {
    var flag = document.getElementById(this.cid);
    if (flag) {
      var oc = flag.children[1];
      if(oc != this.info){
        oc.style.display = 'none';
        document.body.appendChild(oc);
        this.info.style.display = 'block';
        flag.appendChild(this.info);
      }
    } else {
      var mark = document.createElement("div");
      mark.id = this.mid;
      document.body.appendChild(mark);

      var content = document.createElement("div");
      var html = "<div style='line-height:40px;height:40px;padding:0 30px;width:" + w + ";background:#fff;border-top-left-radius:20px;border-top-right-radius:20px;'><span>" + this.title + "</span><span id='closeId' style='float:right;color:#397145;line-height:40px;cursor:pointer'>关闭</span></div>";
      content.innerHTML = html;
      content.id = this.cid;
      this.info.style.display = 'block';
      content.appendChild(this.info);
      document.body.appendChild(content);
      this.resetOver(mark, content, w, h);
    }
  },
  resetOver: function(mark, content, w, h) {
    //重设遮罩层
    this.resetCss(mark, {
      position: "fixed",
      zIndex: "998",
      top: "0px",
      left: "0px",
      backgroundColor: "gray",
      opacity: "0.3",
      filter: "alpha(opacity=30)",
      width: "100%",
      height: "100%"
    });
    //重设内容
    var eh = this.de.clientHeight - h;
    var ew = this.de.clientWidth - w;
    eh = eh < 0 ? 0 : eh;
    ew = ew < 0 ? 0 : ew;
    this.resetCss(content, {
      position: "fixed",
      zIndex: "999",
      width: w + "px",
      height: h + "px",
      background: "#79b092",
      left: parseInt(ew / 2) + "px",
      top: parseInt(eh / 2) + "px",
      borderRadius: "20px",
      overFlow: "hidden"
    });
  }
}
