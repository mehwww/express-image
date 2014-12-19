# express-image

A express middleware help you resize your images

## Install
```sh
npm i express-image
```

## Example

```js
var express = require('express');
var image = require('express-image');
var app = express();

app.use('/imgs',image(__dirname));

app.listen(3000);
```

Now you can request localhost to get a resized image

`http://localhost:3000/imgs/sample.jpg?w=40`  resize an image to a width of 40px while maintaining aspect ratio

`http://localhost:3000/imgs/sample.jpg?h=40`  resize an image to a height of 40px while maintaining aspect ratio

`http://localhost:3000/imgs/sample.jpg?w=40&h=40`  resize an image to a fit a 40x40 rectangle while maintaining aspect ratio

`http://localhost:3000/imgs/sample.jpg?w=40&h=40&f=1`  override the image's proportions and force a resize to 40x40
