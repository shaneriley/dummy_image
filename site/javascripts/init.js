document.addEventListener("DOMContentLoaded", function() {
  DummyImage.generate(document.querySelectorAll("img.default"));
  DummyImage.generate(window.override, {
    path: "dummy",
    colors: {
      text: "0066cc",
      background: "333333"
    },
    font: "bold 28px Helvetica"
  });
}, false);
