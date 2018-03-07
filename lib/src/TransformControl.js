"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
/**
 * TransformControl
 * A Lightweight rect Transform control for React
 */
var React = require("react");
var react_1 = require("react");
var getClientPos_1 = require("../utils/getClientPos");
var clamp_1 = require("../utils/clamp");
require("./style.css");
var HANDLER = ["nw", "ne", "sw", "se"];
var TransformControl = /** @class */ (function (_super) {
    __extends(TransformControl, _super);
    function TransformControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.initialComponentRect = function () {
            var _a = _this.componentElement.getBoundingClientRect(), width = _a.width, height = _a.height;
            _this.containerWidth = width;
            _this.containerHeight = height;
        };
        /**
         * 变换控件
         */
        _this.createControlSelection = function () {
            var disabled = _this.props.disabled;
            return !disabled ? (React.createElement("div", { className: "transform_drag_element", onDoubleClick: function (e) { return e.stopPropagation(); } },
                HANDLER.map(function (v) { return (React.createElement("p", { className: "transform_line line_" + v, key: v })); }),
                HANDLER.map(function (v) { return (React.createElement("div", { className: "transform_drag_handle drag_" + v, key: "drag" + v, onMouseDown: function (e) { return _this.onScaleMouseTouchDown(e, v); }, onTouchStart: function (e) { return _this.onScaleMouseTouchDown(e, v); } })); }),
                HANDLER.map(function (v) { return (React.createElement("div", { className: "transform_rotate_handle " + v, key: "rotate" + v })); }))) : null;
        };
        _this.initialEvData = function (e) {
            var rectbound = _this.props.rectbound;
            var clientPos = getClientPos_1["default"](e);
            _this.initialComponentRect();
            _this.evData = {
                dragStartMouseX: clientPos.x,
                dragStartMouseY: clientPos.y,
                childrenStartX: rectbound.x,
                childrenStartY: rectbound.y,
                childrenStartW: _this.containerWidth,
                childrenStartH: _this.containerHeight,
                diffX: 0,
                diffY: 0
            };
        };
        /**
         * 位移鼠标/触摸按下事件
         */
        _this.onComponentMouseTouchDown = function (e) {
            var disabled = _this.props.disabled;
            if (disabled) {
                return;
            }
            e.preventDefault();
            _this.initialEvData(e);
            _this.isMouseDownorTouchDown = true;
            _this.isScale = false;
        };
        /**
         * 缩放鼠标/触摸按下事件
         */
        _this.onScaleMouseTouchDown = function (e, state) {
            var _a = _this.props, disabled = _a.disabled, rectbound = _a.rectbound;
            console.log('?');
            if (disabled) {
                return;
            }
            e.stopPropagation();
            e.preventDefault();
            _this.isMouseDownorTouchDown = true;
            _this.isScale = true;
            _this.scaleState = state;
            _this.xInversed = state === 'nw' || state === 'w' || state === 'sw';
            _this.yInversed = state === 'nw' || state === 'n' || state === 'ne';
            if (_this.xInversed) {
                _this.evData.childrenStartX = _this.containerWidth + rectbound.x;
            }
            if (_this.yInversed) {
                _this.evData.childrenStartY = _this.containerHeight + rectbound.y;
            }
            _this.initialEvData(e);
        };
        /**
         * 鼠标/触摸移动事件
         */
        _this.onDocMouseTouchMove = function (e) {
            var _a = _this.props, disabled = _a.disabled, onChange = _a.onChange;
            var evData = _this.evData;
            if (disabled) {
                return;
            }
            if (!_this.isMouseDownorTouchDown) {
                return;
            }
            e.preventDefault();
            var clientPos = getClientPos_1["default"](e);
            evData.diffX = clientPos.x - evData.dragStartMouseX;
            evData.diffY = clientPos.y - evData.dragStartMouseY;
            /**
             * 判断是否为缩放状态
             */
            if (!_this.isScale) {
                var nextRectBound = _this.computedRectBound(e);
                onChange(nextRectBound);
            }
            else {
                var nextRectBound = _this.computedScaleRectBound(e);
                onChange(nextRectBound);
            }
        };
        _this.onDocMouseTouchEnd = function (e) {
            var onComplete = _this.props.onComplete;
            if (onComplete && _this.isMouseDownorTouchDown) {
                var nextRectBound = _this.computedRectBound(e);
                onComplete(nextRectBound);
            }
            _this.isMouseDownorTouchDown = false;
        };
        _this.computedRectBound = function (e) {
            var rectbound = _this.props.rectbound;
            var _a = _this, evData = _a.evData, parentRectBound = _a.parentRectBound;
            var x = evData.diffX + evData.childrenStartX;
            var y = evData.diffY + evData.childrenStartY;
            var nextRectBound = __assign({}, rectbound, { x: x <= 0
                    ? 0
                    : x >= parentRectBound.w - _this.containerWidth
                        ? parentRectBound.w - _this.containerWidth
                        : x, y: y <= 0
                    ? 0
                    : y >= parentRectBound.h - _this.containerHeight
                        ? parentRectBound.h - _this.containerHeight
                        : y });
            return nextRectBound;
        };
        /**
         * 拖动缩放
         * 缩放时重新计算宽高
         * xInversed: 表示鼠标落在左侧控制点, 缩放时需改变x坐标
         * yInversed: 表示鼠标落在上侧控制点, 缩放时需改变y坐标
         * xInversed与yInversed同时为true, 表示缩放时需同时改变x与y坐标
         */
        _this.computedScaleRectBound = function (e) {
            console.log('?');
            var aspect = _this.containerWidth / _this.containerHeight; // 长宽比
            var rectbound = _this.props.rectbound;
            if (_this.xInversed) {
                _this.evData.diffX -= _this.evData.childrenStartW * 2;
            }
            if (_this.yInversed) {
                _this.evData.diffY -= _this.evData.childrenStartH * 2;
            }
            var newWidth = _this.evData.childrenStartW + _this.evData.diffX;
            if (_this.xInversed) {
                newWidth = Math.abs(newWidth);
            }
            newWidth = clamp_1["default"](newWidth, 0, 533);
            var newHeight = newWidth / aspect;
            var newX = _this.evData.childrenStartX;
            var newY = _this.evData.childrenStartY;
            if (_this.xInversed) {
                newX = _this.evData.childrenStartX + (_this.evData.childrenStartW - newWidth);
            }
            if (_this.yInversed) {
                if (!_this.lastYinversed) {
                    newY = _this.evData.childrenStartY - newHeight;
                }
                else {
                    newY = _this.evData.childrenStartY + (_this.evData.childrenStartH - newHeight);
                }
            }
            _this.lastYinversed = _this.yInversed;
            // console.log(newX);
            // 
            // <= 0 ? 0 : newY + newHeight >= 300 ? 300 : newY
            return __assign({}, rectbound, { x: newX, y: newY, w: newWidth, h: newHeight });
        };
        _this.mergeStyles = function (rectbound) {
            var w = rectbound.w, h = rectbound.h, x = rectbound.x, y = rectbound.y;
            return {
                width: w,
                height: h,
                left: x + "px",
                top: y + "px"
            };
        };
        _this.shouldPassiveUpdate = function () {
            var _a = _this.componentElement.getBoundingClientRect(), width = _a.width, height = _a.height;
            _this.containerWidth = width;
            _this.containerHeight = height;
        };
        return _this;
    }
    TransformControl.prototype.componentDidMount = function () {
        document.addEventListener("mousemove", this.onDocMouseTouchMove);
        document.addEventListener("touchmove", this.onDocMouseTouchMove);
        document.addEventListener("mouseup", this.onDocMouseTouchEnd);
        document.addEventListener("touchend", this.onDocMouseTouchEnd);
        document.addEventListener("touchcancel", this.onDocMouseTouchEnd);
        var children = this.props.children;
        if (children.type === "img") {
            var src = children.props.src;
            if (src) {
                var img = new Image();
                img.onload = this.initialComponentRect;
                img.src = src;
            }
        }
        else {
            this.initialComponentRect();
        }
        this.parentNode = this.componentElement.parentNode;
        if (!this.parentNode) {
            throw new Error("parentNode is null!");
        }
        var parentRect = this.parentNode.getBoundingClientRect();
        this.parentRectBound = {
            x: parentRect.left,
            y: parentRect.top,
            w: parentRect.width,
            h: parentRect.height
        };
    };
    TransformControl.prototype.render = function () {
        var _this = this;
        var _a = this.props, children = _a.children, rectbound = _a.rectbound, innerRef = _a.innerRef, onClick = _a.onClick;
        var styles = this.mergeStyles(rectbound);
        var controlSelection = this.createControlSelection();
        if (innerRef) {
            innerRef(this);
        }
        return (React.createElement("div", { className: "transform_container", style: __assign({}, styles), onClick: onClick, onDoubleClick: function (e) { return e.stopPropagation(); }, ref: function (ele) { return (_this.componentElement = ele); }, onTouchStart: this.onComponentMouseTouchDown, onMouseDown: this.onComponentMouseTouchDown },
            controlSelection,
            children));
    };
    return TransformControl;
}(react_1.PureComponent));
exports["default"] = TransformControl;
