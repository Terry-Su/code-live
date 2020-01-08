Code-Live is a great eaily used editor that supports both **real-time coding and viewing** for Front-End developers, which can be understood as simplified CodePen or JSFiddle.  


## Quick Start
1. Open https://terry-su.github.io/CDN/CodeViewer
2. Input codes
3. Click "Use Link" button on the top right of editor, then select one way to use.

## Concept
HTML/CSS/JS + Static Server(Github Page) = Your own CodePen


## Where to use
1. Website(like blog) to add code examples
2. Be creative


## API
### `mode`
Default mode(html, css or js) to show  

Possible value: "html" , "css" or "js"    
   
Example: [mode=css](https://terry-su.github.io/CDN/CodeViewer/index.html?defaultDataUrl=https://terry-su.github.io/CDN/CodeViewer/examples/hello.js&mode=css)

### `defaultDataUrl`
Default data url used to display its data.    
Code-Live home page + `?defaultDataUrl=` + Passing data url:     
  
https://terry-su.github.io/CDN/CodeViewer/index.html?defaultDataUrl=https://terry-su.github.io/CDN/CodeViewer/examples/hello.js  
  
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

## Motivation
While writing a blog or a website, sometimes we want to add an vivid example, even including related codes. So, Code-Live comes out. Unlike CodePen or JSFiddle, CodeViewer is a pure Front-End project(no dynamical server), you needn't to worry about **transnational network restriction** and you're able to **custom display style freely**.

## Contributing
If you found somewhere in codes to be improved or fixed, or just make a suggestion, don't hesitate to send a pull request.
