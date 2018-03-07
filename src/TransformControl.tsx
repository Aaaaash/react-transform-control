/**
 * TransformControl
 * A Lightweight rect Transform control for React
 */
import * as React from "react";
import { PureComponent, ReactNode, SyntheticEvent } from "react";
import getClientPos from "../utils/getClientPos";
import clamp from "../utils/clamp";

import "./style.css";

interface RectBound {
  x: number;
  y: number;
  w?: number | string;
  h?: number | string;
}

interface IProps {
  disabled?: boolean;
  onComplete?: Function;
  rectbound: RectBound;
  onChange: Function;
  children: any;
  [propName: string]: any;
}

interface IState {}

interface EvData {
  dragStartMouseX: number;
  dragStartMouseY: number;
  childrenStartX: number;
  childrenStartY: number;
  childrenStartW: number;
  childrenStartH: number;
  diffX: number;
  diffY: number;
}

interface ParentRect {
  w: number;
  h: number;
  x: number;
  y: number;
}

const HANDLER = ["nw", "ne", "sw", "se"];

class TransformControl extends PureComponent<IProps, IState> {
  componentElement: HTMLDivElement;
  evData: EvData;
  isMouseDownorTouchDown: boolean;
  containerWidth: number;
  containerHeight: number;
  parentNode: any;
  parentRectBound: ParentRect;
  isScale: boolean;
  scaleState: string;
  xInversed: boolean;
  yInversed: boolean;
  lastYinversed: boolean;

  componentDidMount() {
    document.addEventListener("mousemove", this.onDocMouseTouchMove);
    document.addEventListener("touchmove", this.onDocMouseTouchMove);

    document.addEventListener("mouseup", this.onDocMouseTouchEnd);
    document.addEventListener("touchend", this.onDocMouseTouchEnd);
    document.addEventListener("touchcancel", this.onDocMouseTouchEnd);

    const { children } = this.props;
    if (children.type === "img") {
      const { src } = children.props;
      if (src) {
        const img = new Image();
        img.onload = this.initialComponentRect;
        img.src = src;
      }
    } else {
      this.initialComponentRect();
    }

    this.parentNode = this.componentElement.parentNode;
    if (!this.parentNode) {
      throw new Error("parentNode is null!");
    }

    const parentRect = this.parentNode.getBoundingClientRect();
    this.parentRectBound = {
      x: parentRect.left,
      y: parentRect.top,
      w: parentRect.width,
      h: parentRect.height
    };
  }

  initialComponentRect = () => {
    const { width, height } = this.componentElement.getBoundingClientRect();
    this.containerWidth = width;
    this.containerHeight = height;
  };

  /**
   * 变换控件
   */
  createControlSelection = (): ReactNode => {
    const { disabled } = this.props;
    return !disabled ? (
      <div
        className="transform_drag_element"
        onDoubleClick={(e) => e.stopPropagation()}
      >
        {HANDLER.map((v: string) => (
          <p className={`transform_line line_${v}`} key={v} />
        ))}
        {HANDLER.map((v: string) => (
          <div
            className={`transform_drag_handle drag_${v}`}
            key={`drag${v}`}
            onMouseDown={(e: any) => this.onScaleMouseTouchDown(e, v)}
            onTouchStart={(e: any) => this.onScaleMouseTouchDown(e, v)}
          />
        ))}
        {HANDLER.map((v: string) => (
          <div className={`transform_rotate_handle ${v}`} key={`rotate${v}`} />
        ))}
      </div>
    ) : null;
  };

  initialEvData = (e: any) => {
    const { rectbound } = this.props;
    const clientPos = getClientPos(e);
    this.initialComponentRect();
    this.evData = {
      dragStartMouseX: clientPos.x,
      dragStartMouseY: clientPos.y,
      childrenStartX: this.xInversed ? (this.containerWidth + rectbound.x) : rectbound.x,
      childrenStartY: this.yInversed ? (this.containerHeight + rectbound.y) : rectbound.y,
      childrenStartW: this.containerWidth,
      childrenStartH: this.containerHeight,
      diffX: 0,
      diffY: 0,
    };
  }
  /**
   * 位移鼠标/触摸按下事件
   */
  onComponentMouseTouchDown = (e: SyntheticEvent<HTMLDivElement>) => {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }

    e.preventDefault();

    this.initialEvData(e);
    this.isMouseDownorTouchDown = true;
    this.isScale = false;
  };

  /**
   * 缩放鼠标/触摸按下事件
   */
  onScaleMouseTouchDown = (e: SyntheticEvent<HTMLDivElement>, state: string) => {
    const { disabled } = this.props;
    if (disabled) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    this.isMouseDownorTouchDown = true;
    this.isScale = true;
    this.scaleState = state;
    this.xInversed = state === 'nw' || state === 'w' || state === 'sw';
    this.yInversed = state === 'nw' || state === 'n' || state === 'ne';
    this.initialEvData(e);
  };

  /**
   * 鼠标/触摸移动事件
   */
  onDocMouseTouchMove = (e: any) => {
    const { disabled, onChange } = this.props;
    const { evData } = this;
    if (disabled) {
      return;
    }
    if (!this.isMouseDownorTouchDown) {
      return;
    }

    e.preventDefault();
    const clientPos = getClientPos(e);
    evData.diffX = clientPos.x - evData.dragStartMouseX;
    evData.diffY = clientPos.y - evData.dragStartMouseY;
    /**
     * 判断是否为缩放状态
     */
    if (!this.isScale) {
      const nextRectBound = this.computedRectBound(e);
      onChange(nextRectBound);
    } else {
      const nextRectBound = this.computedScaleRectBound(e);
      console.log(nextRectBound);
      // this.evData.childrenStartW
      onChange(nextRectBound);
      // console.log(nextRectBound);
    }
  };

  onDocMouseTouchEnd = (e: any) => {
    const { onComplete } = this.props;
    if (onComplete && this.isMouseDownorTouchDown) {
      const nextRectBound = this.computedRectBound(e);
      onComplete(nextRectBound);
    }
    this.isMouseDownorTouchDown = false;
  };

  computedRectBound = (e: any) => {
    const { rectbound } = this.props;
    const { evData, parentRectBound } = this;
    const x = evData.diffX + evData.childrenStartX;
    const y = evData.diffY + evData.childrenStartY;
    const nextRectBound = {
      ...rectbound,
      x:
        x <= 0
          ? 0
          : x >= parentRectBound.w - this.containerWidth
            ? parentRectBound.w - this.containerWidth
            : x,
      y:
        y <= 0
          ? 0
          : y >= parentRectBound.h - this.containerHeight
            ? parentRectBound.h - this.containerHeight
            : y
    };
    return nextRectBound;
  };

  /**
   * 拖动缩放
   * 缩放时重新计算宽高
   * xInversed: 表示鼠标落在左侧控制点, 缩放时需改变x坐标
   * yInversed: 表示鼠标落在上侧控制点, 缩放时需改变y坐标
   * xInversed与yInversed同时为true, 表示缩放时需同时改变x与y坐标
   */
  computedScaleRectBound = (e: any) => {
    const aspect = this.containerWidth / this.containerHeight; // 长宽比
    const { rectbound } = this.props;
    if (this.xInversed) {
      this.evData.diffX -= this.evData.childrenStartW * 2;
    }
    if (this.yInversed) {
      this.evData.diffY -= this.evData.childrenStartH * 2;
    }
    let newWidth = this.evData.childrenStartW + this.evData.diffX;
    if (this.xInversed) {
      newWidth = Math.abs(newWidth);
    }

    newWidth = clamp(newWidth, 0, 533);
    let newHeight = newWidth / aspect;

    let newX = this.evData.childrenStartX;
    let newY = this.evData.childrenStartY;
    
    if (this.xInversed) {
      newX = e.pageX - this.evData.dragStartMouseX + (this.evData.childrenStartX - this.containerWidth);
    }

    if (this.yInversed) {
      if (!this.lastYinversed) {
        newY = this.evData.childrenStartY - newHeight;
      } else {
        newY = this.evData.childrenStartY + (this.evData.childrenStartH - newHeight);
      }
    }
    this.lastYinversed = this.yInversed;
    return {
      ...rectbound,
      x: newX,
      y: newY,
      w: newWidth,
      h: newHeight,
    };
  }

  mergeStyles = (rectbound: RectBound): object => {
    const { w, h, x, y } = rectbound;
    return {
      width: w,
      height: h,
      left: `${x}px`,
      top: `${y}px`
    };
  };

  public shouldPassiveUpdate = () => {
    const { width, height } = this.componentElement.getBoundingClientRect();
    this.containerWidth = width;
    this.containerHeight = height;
  }

  render(): ReactNode {
    const { children, rectbound, innerRef, onClick } = this.props;
    const styles = this.mergeStyles(rectbound);
    const controlSelection = this.createControlSelection();

    if (innerRef) {
      innerRef(this);
    }

    return (
      <div
        className="transform_container"
        style={{ ...styles }}
        onClick={onClick}
        onDoubleClick={(e) => e.stopPropagation()}
        ref={(ele: HTMLDivElement) => (this.componentElement = ele)}
        onTouchStart={this.onComponentMouseTouchDown}
        onMouseDown={this.onComponentMouseTouchDown}
      >
        {controlSelection}
        {children}
      </div>
    );
  }
}

export default TransformControl;
