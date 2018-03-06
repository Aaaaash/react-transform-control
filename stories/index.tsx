import React from 'react';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import TransformControl from '../src/TransformControl';

const Container = styled.div`
  width: 500px;
  height: 500px;
  position: relative;
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
        <img src="http://img2.imgtn.bdimg.com/it/u=1685264678,4210999084&fm=27&gp=0.jpg" alt="" />
      </TransformControl>
    </Container>);
  }
}

storiesOf('transform', module).add('to TransformControl', () => <Demo />);
