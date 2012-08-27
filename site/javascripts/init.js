if (!("addEventListener" in document)) {
  document.ready = function(cb) { document.attachEvent("onload", cb); };
}
else {
  document.ready = function(cb) { document.addEventListener("DOMContentLoaded", cb, false); };
}

document.ready(function() {
  DummyImage.generate(document.querySelectorAll("img.default"));
  DummyImage.generate(document.getElementById("override"), {
    path: "dummy",
    colors: {
      text: "0066cc",
      background: "333333"
    },
    font: "bold 28px Helvetica"
  });
});
