Code-Live is a great light editor that supports both **real-time coding and viewing** for Front-End developers, like CodePen or JSFiddle.  
  
While writing a blog or a website, sometimes we want to add an vivid example, even including related codes. So, Code-Live comes out. Unlike CodePen or JSFiddle, CodeViewer is a pure Front-End project(no dynamical server), you needn't to worry about **transnational network restriction** and you're able to **custom display style freely**.


## Concept
HTML/CSS/JS + Static Server(Github Page) = Your own CodePen


## Where to use it
1. Website(like blog) to add code examples
2. Be creative


## Example
Code-Live home page + `?defaultDataUrl=` + Passing data url:     
  
https://terry-su.github.io/CDN/CodeViewer/index.html?defaultDataUrl=https://terry-su.github.io/CDN/CodeViewer/examples/hello.js


## Get Started
### Basic way
1. Create your `data.js` to display and put it on your static server(like Github Page). Data format:
```js
function codeViewerCallback() {
  return {
    // Set html content
    html: '',
    // Set css content
    css: '',
    // Set javascript content
    js: ''
  }
}
```

2. Just use it with(you can also use it in an **iframe**):      
  
[The url of Code-Live's home page](https://terry-su.github.io/CDN/CodeViewer/index.html) + `?defaultDataUrl=` + Your data url

### Advaned way
Use the companion of Code-Live for [more flexiable usage](https://github.com/Terry-Su/CDN/tree/master/CodeViewer/examples/iframe)


## API
### `mode`
Default mode(html, css or js) to show  

Possible value: "html" , "css" or "js"    
   
Example: [mode=css](https://terry-su.github.io/CDN/CodeViewer/index.html?defaultDataUrl=https://terry-su.github.io/CDN/CodeViewer/examples/hello.js&mode=css)

### `defaultDataUrl`
Default data url used to display its data   
  
Like: https://terry-su.github.io/CDN/CodeViewer/examples/hello.js  
  
Data format:
```js
function codeViewerCallback() {
  return {
    // Set html content
    html: '',
    // Set css content
    css: '',
    // Set javascript content
    js: ''
  }
}
```

### `defaultDataCallbackName`
To rewrite default function name `codeViewerCallback`.   

Example: [defaultDataCallbackName=myCallback](https://terry-su.github.io/CDN/CodeViewer/index.html?defaultDataUrl=https://terry-su.github.io/CDN/CodeViewer/examples/testData-my-callback.js&defaultDataCallbackName=myCallback)


## Contributing
If you found somewhere in codes to be improved or fixed, or just make a suggestion, don't hesitate to send a pull request.
