import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';

import TransformControl from '../src/TransformControl';

const Container = styled.div`
  width: 500px;
  height: 500px;
  position: relative;
  background-color: #F0F0F0;
`;

class App extends PureComponent {
  state = {
    rectbound: {
      x: 50,
      y: 50,
      w: 100,
      h: 100,
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

render(
  <App />,
  document.querySelector('#root')
);
