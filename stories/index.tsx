import React from 'react';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import TransformControl from '../src/TransformControl';

const Container = styled.div`
  width: 533px;
  height: 300px;
  position: absolute;
  left: 20px;
  top: 28px;
  z-index: 1;
  background-color: #F0F0F0;
`;

class Demo extends React.PureComponent {
  state = {
    rectbound: {
      x: 50,
      y: 50,
    }
  }

  render() {
    const { rectbound } = this.state;
    return (<Container>
      <TransformControl
        rectbound={rectbound}
        onChange={(value: any) => {
          this.setState({ rectbound: value });
        }}
        onComplete={(data: any) => {
          console.log(data);
        }}
      >
        {/* <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1139288478,599225693&fm=15&gp=0.jpg" alt="" /> */}
        <div style={{ width: 120, height: 30, backgroundColor: '#ff004f' }}>hello</div>
        <div>ceshi</div>
      </TransformControl>
    </Container>);
  }
}

storiesOf('transform', module).add('to TransformControl', () => <Demo />);
