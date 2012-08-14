# Dummy Image for Javascript, Version 1.2.1

A method of including dummy images in your HTML as img tags without having
to export individual dummy images of varying sizes.

Licensed under GPL 2.0 (http://www.gnu.org/licenses/gpl-2.0.html)

## Dependencies

Canvas support is required. Most versions of Firefox, Chrome, Safari, and Opera
support it. IE9+ also supports it. No support is offered for &lt;= IE8

## Usage

By default, dummy image looks for image tags that have a path that contains
/placeholder/. It then expects width and height in the form of wxh in the src
path. You can optionally specify background and text colors in the path after
the dimensions.

A full dummy image path will look like this:```<img src="/placeholder/160x600/ececec/0066cc" alt="Skyscraper" />```

To avoid 404 errors in your log, you can replace the src attribute with a
data-src attribute. Use the same path as before. No configuration changes
are needed for this support.

Call the generator by calling `DummyImage.generate();`. Optional arguments
include the element(s) and an options object. Either argument or both can
be passed in.

```javascript
DummyImage.generate(window.override, {
  path: "dummy",
  colors: {
    text: "0066cc",
    background: "333333"
  }
});
```

## Options

```javascript
{
  path: "placeholder", // Path in your src, ie: "/placeholder/160x600"
  colors: {
    text: "333333", // Text color
    background: "ececec" // Image background color
  },
  font: "16px Tahoma", // CSS font shorthand syntax
}
```

