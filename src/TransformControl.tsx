import React, { PureComponent, ReactNode } from "react";

interface IProps {
  disabled?: boolean;
  containerStyles?: Object;
}

interface IState {
}

class TransformControl extends PureComponent<IProps, IState> {
  createControlSelection = (): ReactNode => {
    const { disabled } = this.props;
    return !disabled ? <div>
      <button>x</button>
    </div> : null;
  }

  render(): ReactNode {
    const { containerStyles } = this.props;
    const controlSelection = this.createControlSelection();
    return (
      <div style={containerStyles}>
        {controlSelection}
      </div>
    );
  }
}

export default TransformControl;
