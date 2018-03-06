/**
 * TransformControl
 * A Lightweight rect Transform control for React
 */

import React, { PureComponent, ReactNode, SyntheticEvent } from "react";
import getClientPos from "../utils/getClientPos";

import "./style.css";

interface RectBound {
  x: number;
  y: number;
  w?: number;
  h?: number;
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
  diffX?: number;
  diffY?: number;
}

interface ParentRect {
  w: number;
  h: number;
  x: number;
  y: number;
};

class TransformControl extends PureComponent<IProps, IState> {
  componentElement: HTMLDivElement;
  evData: EvData;
  isMouseDownorTouchDown: boolean;
  containerWidth: number;
  containerHeight: number;
  parentWidth: number;
  parentHeight: number;
  parentNode: any;
  parentRectBound: ParentRect;

  componentDidMount() {
    document.addEventListener("mousemove", this.onDocMouseTouchMove);
    document.addEventListener("touchmove", this.onDocMouseTouchMove);

    document.addEventListener("mouseup", this.onDocMouseTouchEnd);
    document.addEventListener("touchend", this.onDocMouseTouchEnd);
    document.addEventListener("touchcancel", this.onDocMouseTouchEnd);

    
    const { children } = this.props;
    if (children.type === 'img') {
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
  }

  createControlSelection = (): ReactNode => {
    const { disabled } = this.props;
    return !disabled ? (
      <div style={{ position: 'absolute' }}>
        <button>x</button>
      </div>
    ) : null;
  };

  onComponentMouseTouchDown = (e: SyntheticEvent<HTMLDivElement>) => {
    const { disabled, rectbound } = this.props;
    if (disabled) {
      return;
    }

    e.preventDefault();

    const clientPos = getClientPos(e);
    this.evData = {
      dragStartMouseX: clientPos.x,
      dragStartMouseY: clientPos.y,
      childrenStartX: rectbound.x,
      childrenStartY: rectbound.y
    };

    this.isMouseDownorTouchDown = true;
  };

  onDocMouseTouchMove = (e: any) => {
    const { disabled, onChange } = this.props;
    if (disabled) {
      return;
    }
    if (!this.isMouseDownorTouchDown) {
      return;
    }

    e.preventDefault();

    const nextRectBound = this.computedRectBound(e);
    onChange(nextRectBound);
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
    const clientPos = getClientPos(e);
    evData.diffX = clientPos.x - evData.dragStartMouseX;
    evData.diffY = clientPos.y - evData.dragStartMouseY;

    const x = evData.diffX + evData.childrenStartX;
    const y = evData.diffY + evData.childrenStartY;
    const nextRectBound = {
      ...rectbound,
      x:
        x <= parentRectBound.x
          ? parentRectBound.x
          : x >= parentRectBound.x + parentRectBound.w - this.containerWidth
            ? parentRectBound.x + parentRectBound.w - this.containerWidth
            : x,
      y:
        y <= parentRectBound.y
          ? parentRectBound.y
          : y >= parentRectBound.y + parentRectBound.h - this.containerHeight
            ? parentRectBound.y + parentRectBound.h - this.containerHeight
            : y
    };
    return nextRectBound;
  };

  mergeStyles = (rectbound: RectBound): object => {
    const { w, h, x, y } = rectbound;
    return {
      width: `${w}px`,
      height: `${h}px`,
      left: `${x}px`,
      top: `${y}px`
    };
  };

  render(): ReactNode {
    const { children, rectbound } = this.props;

    const styles = this.mergeStyles(rectbound);
    const controlSelection = this.createControlSelection();

    return (
      <div
        className="transform_container"
        style={{ ...styles }}
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
