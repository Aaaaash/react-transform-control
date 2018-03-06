// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({11:[function(require,module,exports) {
"use strict";var r=Object.getOwnPropertySymbols,t=Object.prototype.hasOwnProperty,e=Object.prototype.propertyIsEnumerable;function n(r){if(null===r||void 0===r)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(r)}function o(){try{if(!Object.assign)return!1;var r=new String("abc");if(r[5]="de","5"===Object.getOwnPropertyNames(r)[0])return!1;for(var t={},e=0;e<10;e++)t["_"+String.fromCharCode(e)]=e;if("0123456789"!==Object.getOwnPropertyNames(t).map(function(r){return t[r]}).join(""))return!1;var n={};return"abcdefghijklmnopqrst".split("").forEach(function(r){n[r]=r}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},n)).join("")}catch(r){return!1}}module.exports=o()?Object.assign:function(o,c){for(var a,i,s=n(o),f=1;f<arguments.length;f++){a=Object(arguments[f]);for(var u in a)t.call(a,u)&&(s[u]=a[u]);if(r){i=r(a);for(var b=0;b<i.length;b++)e.call(a,i[b])&&(s[i[b]]=a[i[b]])}}return s};
},{}],13:[function(require,module,exports) {
"use strict";var e={};module.exports=e;
},{}],12:[function(require,module,exports) {
"use strict";function t(t){return function(){return t}}var n=function(){};n.thatReturns=t,n.thatReturnsFalse=t(!1),n.thatReturnsTrue=t(!0),n.thatReturnsNull=t(null),n.thatReturnsThis=function(){return this},n.thatReturnsArgument=function(t){return t},module.exports=n;
},{}],6:[function(require,module,exports) {
"use strict";var e=require("object-assign"),t=require("fbjs/lib/emptyObject"),r=require("fbjs/lib/emptyFunction"),n="function"==typeof Symbol&&Symbol.for,o=n?Symbol.for("react.element"):60103,u=n?Symbol.for("react.call"):60104,l=n?Symbol.for("react.return"):60105,i=n?Symbol.for("react.portal"):60106,c=n?Symbol.for("react.fragment"):60107,f="function"==typeof Symbol&&Symbol.iterator;function a(e){for(var t=arguments.length-1,r="Minified React error #"+e+"; visit http://facebook.github.io/react/docs/error-decoder.html?invariant="+e,n=0;n<t;n++)r+="&args[]="+encodeURIComponent(arguments[n+1]);throw(t=Error(r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings.")).name="Invariant Violation",t.framesToPop=1,t}var p={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}};function s(e,r,n){this.props=e,this.context=r,this.refs=t,this.updater=n||p}s.prototype.isReactComponent={},s.prototype.setState=function(e,t){"object"!=typeof e&&"function"!=typeof e&&null!=e&&a("85"),this.updater.enqueueSetState(this,e,t,"setState")},s.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function y(e,r,n){this.props=e,this.context=r,this.refs=t,this.updater=n||p}function d(){}d.prototype=s.prototype;var h=y.prototype=new d;h.constructor=y,e(h,s.prototype),h.isPureReactComponent=!0;function v(e,r,n){this.props=e,this.context=r,this.refs=t,this.updater=n||p}var m=v.prototype=new d;m.constructor=v,e(m,s.prototype),m.unstable_isAsyncReactComponent=!0,m.render=function(){return this.props.children};var b={current:null},k=Object.prototype.hasOwnProperty,_={key:!0,ref:!0,__self:!0,__source:!0};function g(e,t,r){var n,u={},l=null,i=null;if(null!=t)for(n in void 0!==t.ref&&(i=t.ref),void 0!==t.key&&(l=""+t.key),t)k.call(t,n)&&!_.hasOwnProperty(n)&&(u[n]=t[n]);var c=arguments.length-2;if(1===c)u.children=r;else if(1<c){for(var f=Array(c),a=0;a<c;a++)f[a]=arguments[a+2];u.children=f}if(e&&e.defaultProps)for(n in c=e.defaultProps,c)void 0===u[n]&&(u[n]=c[n]);return{$$typeof:o,type:e,key:l,ref:i,props:u,_owner:b.current}}function S(e){return"object"==typeof e&&null!==e&&e.$$typeof===o}function j(e){var t={"=":"=0",":":"=2"};return"$"+(""+e).replace(/[=:]/g,function(e){return t[e]})}var w=/\/+/g,x=[];function P(e,t,r,n){if(x.length){var o=x.pop();return o.result=e,o.keyPrefix=t,o.func=r,o.context=n,o.count=0,o}return{result:e,keyPrefix:t,func:r,context:n,count:0}}function R(e){e.result=null,e.keyPrefix=null,e.func=null,e.context=null,e.count=0,10>x.length&&x.push(e)}function O(e,t,r,n){var c=typeof e;"undefined"!==c&&"boolean"!==c||(e=null);var p=!1;if(null===e)p=!0;else switch(c){case"string":case"number":p=!0;break;case"object":switch(e.$$typeof){case o:case u:case l:case i:p=!0}}if(p)return r(n,e,""===t?"."+$(e,0):t),1;if(p=0,t=""===t?".":t+":",Array.isArray(e))for(var s=0;s<e.length;s++){var y=t+$(c=e[s],s);p+=O(c,y,r,n)}else if(null===e||void 0===e?y=null:(y=f&&e[f]||e["@@iterator"],y="function"==typeof y?y:null),"function"==typeof y)for(e=y.call(e),s=0;!(c=e.next()).done;)c=c.value,y=t+$(c,s++),p+=O(c,y,r,n);else"object"===c&&(r=""+e,a("31","[object Object]"===r?"object with keys {"+Object.keys(e).join(", ")+"}":r,""));return p}function $(e,t){return"object"==typeof e&&null!==e&&null!=e.key?j(e.key):t.toString(36)}function A(e,t){e.func.call(e.context,t,e.count++)}function E(e,t,n){var u=e.result,l=e.keyPrefix;e=e.func.call(e.context,t,e.count++),Array.isArray(e)?C(e,u,n,r.thatReturnsArgument):null!=e&&(S(e)&&(t=l+(!e.key||t&&t.key===e.key?"":(""+e.key).replace(w,"$&/")+"/")+n,e={$$typeof:o,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}),u.push(e))}function C(e,t,r,n,o){var u="";null!=r&&(u=(""+r).replace(w,"$&/")+"/"),t=P(t,u,n,o),null==e||O(e,"",E,t),R(t)}var q={Children:{map:function(e,t,r){if(null==e)return e;var n=[];return C(e,n,null,t,r),n},forEach:function(e,t,r){if(null==e)return e;t=P(null,null,t,r),null==e||O(e,"",A,t),R(t)},count:function(e){return null==e?0:O(e,"",r.thatReturnsNull,null)},toArray:function(e){var t=[];return C(e,t,null,r.thatReturnsArgument),t},only:function(e){return S(e)||a("143"),e}},Component:s,PureComponent:y,unstable_AsyncComponent:v,Fragment:c,createElement:g,cloneElement:function(t,r,n){var u=e({},t.props),l=t.key,i=t.ref,c=t._owner;if(null!=r){if(void 0!==r.ref&&(i=r.ref,c=b.current),void 0!==r.key&&(l=""+r.key),t.type&&t.type.defaultProps)var f=t.type.defaultProps;for(a in r)k.call(r,a)&&!_.hasOwnProperty(a)&&(u[a]=void 0===r[a]&&void 0!==f?f[a]:r[a])}var a=arguments.length-2;if(1===a)u.children=n;else if(1<a){f=Array(a);for(var p=0;p<a;p++)f[p]=arguments[p+2];u.children=f}return{$$typeof:o,type:t.type,key:l,ref:i,props:u,_owner:c}},createFactory:function(e){var t=g.bind(null,e);return t.type=e,t},isValidElement:S,version:"16.2.0",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:b,assign:e}},U=Object.freeze({default:q}),F=U&&q||U;module.exports=F.default?F.default:F;
},{"object-assign":11,"fbjs/lib/emptyObject":13,"fbjs/lib/emptyFunction":12}],15:[function(require,module,exports) {
"use strict";var e=function(e){};function n(n,r,i,o,t,a,f,s){if(e(r),!n){var u;if(void 0===r)u=new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var d=[i,o,t,a,f,s],l=0;(u=new Error(r.replace(/%s/g,function(){return d[l++]}))).name="Invariant Violation"}throw u.framesToPop=1,u}}module.exports=n;
},{}],16:[function(require,module,exports) {
"use strict";var e,r=require("./emptyFunction"),t=r;module.exports=t;
},{"./emptyFunction":12}],17:[function(require,module,exports) {
"use strict";var _="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";module.exports=_;
},{}],14:[function(require,module,exports) {
"use strict";var t,e,o,r;function s(t,e,o,r,s){}module.exports=s;
},{"fbjs/lib/invariant":15,"fbjs/lib/warning":16,"./lib/ReactPropTypesSecret":17}],5:[function(require,module,exports) {
"use strict";
},{"object-assign":11,"fbjs/lib/emptyObject":13,"fbjs/lib/invariant":15,"fbjs/lib/warning":16,"fbjs/lib/emptyFunction":12,"prop-types/checkPropTypes":14}],4:[function(require,module,exports) {
"use strict";module.exports=require("./cjs/react.production.min.js");
},{"./cjs/react.production.min.js":6,"./cjs/react.development.js":5}],3:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});function e(e){var t,u;return e.touches?(t=e.touches[0].pageX,u=e.touches[0].pageY):(t=e.pageX,u=e.pageY),{x:t,y:u}}exports.default=e;
},{}],2:[function(require,module,exports) {

},{"./nw.png":["e9c455925541327330f18694f2f23fb6.png",7],"./ne.png":["a373fbbd4b21b0af578ae320856a04ed.png",8],"./se.png":["47cac004b3aad08b28cb62a83df6cc2e.png",9],"./sw.png":["f3a9789d192ac653fbd5a6784dfe78e1.png",10]}],1:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("react"),t=r(e),o=require("../utils/getClientPos"),n=r(o);require("./style.css");function r(e){return e&&e.__esModule?e:{default:e}}var u=function(){var e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o])};return function(t,o){e(t,o);function n(){this.constructor=t}t.prototype=null===o?Object.create(o):(n.prototype=o.prototype,new n)}}(),i=Object.assign||function(e){for(var t,o=1,n=arguments.length;o<n;o++){t=arguments[o];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},a=["nw","ne","sw","se"],c=function(e){u(o,e);function o(){var o=null!==e&&e.apply(this,arguments)||this;return o.initialComponentRect=function(){var e=o.componentElement.getBoundingClientRect(),t=e.width,n=e.height;o.containerWidth=t,o.containerHeight=n},o.createControlSelection=function(){return o.props.disabled?null:t.default.createElement("div",{className:"transform_drag_element"},a.map(function(e){return t.default.createElement("div",{className:"transform_drag_handle drag_"+e,key:"drag"+e,onMouseDown:o.onScaleMouseTouchDown,onTouchStart:o.onScaleMouseTouchDown})}),a.map(function(e){return t.default.createElement("div",{className:"transform_rotate_handle "+e,key:"rotate"+e})}))},o.onComponentMouseTouchDown=function(e){var t=o.props,r=t.disabled,u=t.rectbound;if(!r){e.preventDefault();var i=(0,n.default)(e);o.evData={dragStartMouseX:i.x,dragStartMouseY:i.y,childrenStartX:u.x,childrenStartY:u.y},o.isMouseDownorTouchDown=!0}},o.onScaleMouseTouchDown=function(e){var t=o.props,n=t.disabled;t.rectbound;n||(e.stopPropagation(),e.preventDefault())},o.onDocMouseTouchMove=function(e){var t=o.props,n=t.disabled,r=t.onChange;if(!n&&o.isMouseDownorTouchDown){e.preventDefault();r(o.computedRectBound(e))}},o.onDocMouseTouchEnd=function(e){var t=o.props.onComplete;if(t&&o.isMouseDownorTouchDown){t(o.computedRectBound(e))}o.isMouseDownorTouchDown=!1},o.computedRectBound=function(e){var t=o.props.rectbound,r=o,u=r.evData,a=r.parentRectBound,c=(0,n.default)(e);u.diffX=c.x-u.dragStartMouseX,u.diffY=c.y-u.dragStartMouseY;var s=u.diffX+u.childrenStartX,d=u.diffY+u.childrenStartY;return i({},t,{x:s<=a.x?a.x:s>=a.x+a.w-o.containerWidth?a.x+a.w-o.containerWidth:s,y:d<=a.y?a.y:d>=a.y+a.h-o.containerHeight?a.y+a.h-o.containerHeight:d})},o.mergeStyles=function(e){return{width:e.w+"px",height:e.h+"px",left:e.x+"px",top:e.y+"px"}},o}return o.prototype.componentDidMount=function(){document.addEventListener("mousemove",this.onDocMouseTouchMove),document.addEventListener("touchmove",this.onDocMouseTouchMove),document.addEventListener("mouseup",this.onDocMouseTouchEnd),document.addEventListener("touchend",this.onDocMouseTouchEnd),document.addEventListener("touchcancel",this.onDocMouseTouchEnd);var e=this.props.children;if("img"===e.type){var t=e.props.src;if(t){var o=new Image;o.onload=this.initialComponentRect,o.src=t}}else this.initialComponentRect();if(this.parentNode=this.componentElement.parentNode,!this.parentNode)throw new Error("parentNode is null!");var n=this.parentNode.getBoundingClientRect();this.parentRectBound={x:n.left,y:n.top,w:n.width,h:n.height}},o.prototype.render=function(){var e=this,o=this.props,n=o.children,r=o.rectbound,u=this.mergeStyles(r),a=this.createControlSelection();return t.default.createElement("div",{className:"transform_container",style:i({},u),ref:function(t){return e.componentElement=t},onTouchStart:this.onComponentMouseTouchDown,onMouseDown:this.onComponentMouseTouchDown},a,n)},o}(e.PureComponent);exports.default=c;
},{"react":4,"../utils/getClientPos":3,"./style.css":2}]},{},[1])