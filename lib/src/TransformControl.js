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
require("./style.css");
;
var HANDLER = ['nw', 'ne', 'sw', 'se'];
var TransformControl = /** @class */ (function (_super) {
    __extends(TransformControl, _super);
    function TransformControl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.initialComponentRect = function () {
            var _a = _this.componentElement.getBoundingClientRect(), width = _a.width, height = _a.height;
            _this.containerWidth = width;
            _this.containerHeight = height;
        };
        _this.createControlSelection = function () {
            var disabled = _this.props.disabled;
            return !disabled ? (React.createElement("div", { className: "transform_drag_element" },
                HANDLER.map(function (v) { return (React.createElement("div", { className: "transform_drag_handle drag_" + v, key: "drag" + v, onMouseDown: _this.onScaleMouseTouchDown, onTouchStart: _this.onScaleMouseTouchDown })); }),
                HANDLER.map(function (v) { return (React.createElement("div", { className: "transform_rotate_handle " + v, key: "rotate" + v })); }))) : null;
        };
        _this.onComponentMouseTouchDown = function (e) {
            var _a = _this.props, disabled = _a.disabled, rectbound = _a.rectbound;
            if (disabled) {
                return;
            }
            e.preventDefault();
            var clientPos = getClientPos_1["default"](e);
            _this.evData = {
                dragStartMouseX: clientPos.x,
                dragStartMouseY: clientPos.y,
                childrenStartX: rectbound.x,
                childrenStartY: rectbound.y
            };
            _this.isMouseDownorTouchDown = true;
        };
        _this.onScaleMouseTouchDown = function (e) {
            var _a = _this.props, disabled = _a.disabled, rectbound = _a.rectbound;
            if (disabled) {
                return;
            }
            e.stopPropagation();
            e.preventDefault();
            console.log(rectbound);
        };
        _this.onDocMouseTouchMove = function (e) {
            var _a = _this.props, disabled = _a.disabled, onChange = _a.onChange;
            if (disabled) {
                return;
            }
            if (!_this.isMouseDownorTouchDown) {
                return;
            }
            e.preventDefault();
            var nextRectBound = _this.computedRectBound(e);
            onChange(nextRectBound);
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
            var clientPos = getClientPos_1["default"](e);
            evData.diffX = clientPos.x - evData.dragStartMouseX;
            evData.diffY = clientPos.y - evData.dragStartMouseY;
            var x = evData.diffX + evData.childrenStartX;
            var y = evData.diffY + evData.childrenStartY;
            var nextRectBound = __assign({}, rectbound, { x: x <= parentRectBound.x
                    ? parentRectBound.x
                    : x >= parentRectBound.x + parentRectBound.w - _this.containerWidth
                        ? parentRectBound.x + parentRectBound.w - _this.containerWidth
                        : x, y: y <= parentRectBound.y
                    ? parentRectBound.y
                    : y >= parentRectBound.y + parentRectBound.h - _this.containerHeight
                        ? parentRectBound.y + parentRectBound.h - _this.containerHeight
                        : y });
            return nextRectBound;
        };
        _this.mergeStyles = function (rectbound) {
            var w = rectbound.w, h = rectbound.h, x = rectbound.x, y = rectbound.y;
            return {
                width: w + "px",
                height: h + "px",
                left: x + "px",
                top: y + "px"
            };
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
        if (children.type === 'img') {
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
        var _a = this.props, children = _a.children, rectbound = _a.rectbound;
        var styles = this.mergeStyles(rectbound);
        var controlSelection = this.createControlSelection();
        return (React.createElement("div", { className: "transform_container", style: __assign({}, styles), ref: function (ele) { return (_this.componentElement = ele); }, onTouchStart: this.onComponentMouseTouchDown, onMouseDown: this.onComponentMouseTouchDown },
            controlSelection,
            children));
    };
    return TransformControl;
}(react_1.PureComponent));
exports["default"] = TransformControl;
