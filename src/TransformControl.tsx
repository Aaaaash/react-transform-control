import React, { PureComponent, ReactNode, SyntheticEvent } from "react";
import getClientPos from '../utils/getClientPos';

import './style.css';

interface RectBound {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface IProps {
  disabled?: boolean;
  onComplete?: Function;
  rectbound: RectBound;
  onChange: Function;
  [propName: string]: any;
}

interface IState {
}

interface EvData {
  dragStartMouseX: number;
  dragStartMouseY: number;
  childrenStartX: number;
  childrenStartY: number;
  diffX?: number;
  diffY?: number;
}

class TransformControl extends PureComponent<IProps, IState> {

  componentElement: HTMLDivElement;
  evData: EvData;
  isMouseDownorTouchDown: boolean;
  containerWidth: number;
  containerHeight: number;

  componentDidMount() {
    document.addEventListener('mousemove', this.onDocMouseTouchMove);
    document.addEventListener('touchmove', this.onDocMouseTouchMove);

    document.addEventListener('mouseup', this.onDocMouseTouchEnd);
    document.addEventListener('touchend', this.onDocMouseTouchEnd);
    document.addEventListener('touchcancel', this.onDocMouseTouchEnd);

    const { width, height } = this.componentElement.getBoundingClientRect();
    this.containerWidth = width;
    this.containerHeight = height;
  }

  createControlSelection = (): ReactNode => {
    const { disabled } = this.props;
    return !disabled ? <div>
      <button>x</button>
    </div> : null;
  }

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
      childrenStartY: rectbound.y,
    }

    this.isMouseDownorTouchDown = true;
  }

  onDocMouseTouchMove = (e: any) => {
    const { disabled, onChange } = this.props;
    if (disabled) {
      return;
    }
    if (!this.isMouseDownorTouchDown) {
      return;
    }

    e.preventDefault();

    // const { evData } = this;
    // const clientPos = getClientPos(e);
    // evData.diffX = clientPos.x - evData.dragStartMouseX;
    // evData.diffY = clientPos.y - evData.dragStartMouseY;
    const nextRectBound = this.computedRectBound(e);
    onChange(nextRectBound);
  }

  onDocMouseTouchEnd = (e: any) => {
    const { onComplete } = this.props;
    if (onComplete) {
      const nextRectBound = this.computedRectBound(e);
      onComplete(nextRectBound);
    }
    this.isMouseDownorTouchDown = false;
  }

  computedRectBound = (e: any) => {
    const { rectbound } = this.props;
    const { evData } = this;
    const clientPos = getClientPos(e);
    evData.diffX = clientPos.x - evData.dragStartMouseX;
    evData.diffY = clientPos.y - evData.dragStartMouseY;
    const nextRectBound = {
      ...rectbound,
      x: evData.diffX + evData.childrenStartX,
      y: evData.diffY + evData.childrenStartY,
    };
    return nextRectBound;
  }

  mergeStyles = (rectbound: RectBound): object => {
    const { w, h, x, y } = rectbound;
    return {
      width: `${w}px`,
      height: `${h}px`,
      left: `${x}px`,
      top: `${y}px`,
    };
  }

  render(): ReactNode {
    const { children, rectbound } = this.props;

    const styles = this.mergeStyles(rectbound);
    const controlSelection = this.createControlSelection();

    return (
      <div
        className="transform_container"
        style={{...styles}}
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
