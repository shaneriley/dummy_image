document.addEventListener("DOMContentLoaded", function() {
  DummyImage.generate(document.querySelectorAll("img.default"));
  DummyImage.generate(document.getElementById("override"), {
    path: "dummy",
    colors: {
      text: "0066cc",
      background: "333333"
    },
    font: "bold 28px Helvetica"
  });
}, false);
