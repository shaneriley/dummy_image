# Dummy Image for Javascript

## Dependencies

Canvas support is required. Most versions of Firefox, Chrome, Safari, and Opera
support it. IE9+ also supports it. No support is offered for &lt;= IE8

## Usage

By default, dummy image looks for image tags that have a path that contains
/placeholder/. It then expects width and height in the form of wxh in the src
path. You can optionally specify background and text colors in the path after
the dimensions.

A full dummy image path will look like this:
```<img src="/placeholder/160x600/ececec/0066cc" alt="Skyscraper" />```

To avoid 404 errors in your log, you can replace the src attribute with a
data-src attribute. Use the same path as before. No configuration changes
are needed for this support.

## Options

Since this was created in under an hour, the options have not been abstracted
in such a way that different options can be used for specific sets of elements.
This will be implemented in the future, but in the mean time you can open up
dummy image and change the path, text and background colors, and font (CSS
format). These will be used as the defaults site-wide.

## To Do

Call dummy image on a group of elements rather than all that match the path,
override defaults on per-group and/or per-element basis.
