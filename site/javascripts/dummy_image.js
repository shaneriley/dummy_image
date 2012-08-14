/* DummyImage version 1.2.1
 * (c) 2012 Shane Riley
 * Licensed under GPL 2.0 (http://www.gnu.org/licenses/gpl-2.0.html)
 * Source hosted at http://www.gnu.org/licenses/gpl-2.0.html
 */
var DummyImage = {
  path: "placeholder",
  colors: {
    text: "333333",
    background: "ececec"
  },
  font: "16px Tahoma",
  __canvas__: document.createElement("canvas"),
  init: function(opts) {
    if (!("getContext" in this.__canvas__)) { return; }
    this._extend(this, opts);
    this.__ctx__ = this.__canvas__.getContext("2d");
    this.path_rxp = new RegExp("^.*/" + DummyImage.path + "/");
    this.__ctx__.font = this.font;
    this.__ctx__.textAlign = "center";
    this.__ctx__.textBaseline = "middle";
  },
  _extend: function(obj, extender) {
    for (var k in extender) {
      if (k in obj) {
        if (typeof obj[k] === "object") {
          obj[k] = DummyImage._extend(obj[k], extender[k]);
        }
        else { obj[k] = extender[k]; }
      }
    }
    return obj;
  },
  _convertColor: function(color) {
    var r = /^#?[0-9a-f]{3}[0-9a-f]{0,3}$/i;
    return r.test(color) ? "#" + color : color;
  },
  _createImage: function(img) {
    var d = DummyImage,
        ctx = d.__ctx__,
        w, h, text_w, text_h,
        src = img.dataset.src || img.src,
        data = src.replace(d.path_rxp, "").split("/");
        background = d._convertColor(data[1] || d.colors.background),
        text = d._convertColor(data[2] || d.colors.text);
    var checkFontSize = function() {
      text_w = w - ctx.measureText(w + " X " + h).width;
      text_h = h + +/\d+/.exec(ctx.font).pop();
      if (text_w < 5) {
        ctx.font = ctx.font.replace(/\d+/, function($1) {
          return +$1 - 2;
        });
        checkFontSize();
      }
    };
    w = +data[0].replace(/x.+$/i, "");
    h = +data[0].replace(/^.+x/i, "");
    ctx.canvas.width = w;
    ctx.canvas.height = h;
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = text;
    ctx.font = d.font;
    checkFontSize();
    ctx.fillText(w + " X " + h, text_w / 2, text_h / 2);
    d._writeImage(img);
  },
  _writeImage: function(img) {
    var d = DummyImage,
        canvas = d.__canvas__;
    img.width = canvas.width;
    img.height = canvas.height;
    img.src = canvas.toDataURL();
  },
  generate: function(els, overrides) {
    var imgs = [],
        opts = overrides || undefined;
    if (!els || !/NodeList|HTMLImageElement/.test(els.constructor)) {
      opts = els;
      els = document.querySelectorAll("img");
    }
    else if (!els.length) { els = [els]; }
    if (opts) { DummyImage.init(opts); }
    Array.prototype.forEach.call(els, function(img) {
      var src = img.dataset && img.dataset.src ? img.dataset.src : img.src;
      DummyImage.path_rxp.test(src) && imgs.push(img);
    });
    imgs.forEach(DummyImage._createImage);
  }
};

DummyImage.init();
