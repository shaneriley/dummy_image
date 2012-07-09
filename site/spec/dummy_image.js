$(function() {
  CanvasRenderingContext2D.prototype.getColor = function(x, y) {
    return $.map(this.getImageData(x, y, 1, 1).data, function(v) { return v; });
  };

  var m = {
    newCanvas: function(w, h) {
      var ctx = document.createElement("canvas").getContext("2d");
      ctx.canvas.width = w;
      ctx.canvas.height = h;
      return ctx;
    }
  };

  var setup = {
    $dom: $("<div />", { id: "dom" }).appendTo(document.body)
  };

  beforeEach(function() {
    setup.$dom.empty();
    this.addMatchers({
      toHave: function(prop) {
        return prop in this.actual;
      },
      toBeVisible: function() {
        return this.actual.is(":visible");
      },
      toBeHidden: function() {
        return this.actual.is(":hidden");
      }
    });
  });

  afterEach(function() {
    setup.$dom.empty();
  });

  describe("When I load the page", function() {
    it("should include jQuery", function() {
      expect(window).toHave("$");
    });
    it("should include DummyImage", function() {
      expect(window).toHave("DummyImage");
    });
  });

  describe("When I initialize with defaults", function() {
    var createImage = function() {
      return $("<img />", { "data-src": "/placeholder/160x160/ff0000/000000" }).appendTo(setup.$dom);
    };
    var init = function() {
      var i = createImage();
      DummyImage.generate();
      return i;
    };

    it("should write an image with specified dimensions", function() {
      var i = init();
      expect(i.width()).toEqual(160);
      expect(i.height()).toEqual(160);
    });

    it("should write an image with red background", function() {
      var i = init(),
          ctx = m.newCanvas(i.width(), i.height());
      ctx.drawImage(i[0], 0, 0);
      expect(ctx.getColor(0, 0)).toEqual([255, 0, 0, 255]);
    });

    it("should write an image with black text", function() {
      var i = init(),
          ctx = m.newCanvas(i.width(), i.height());
      ctx.drawImage(i[0], 0, 0);
      expect(ctx.getColor(78, 80)).toEqual([1, 0, 0, 255]);
    });
  });

  (function() {
    var jasmine_env = jasmine.getEnv();
    jasmine_env.updateInterval = 1000;

    var trivial_reporter = new jasmine.TrivialReporter();

    jasmine_env.addReporter(trivial_reporter);

    jasmine_env.specFilter = function(spec) {
      return trivial_reporter.specFilter(spec);
    };

    jasmine_env.execute();
  })();
});
