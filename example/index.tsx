import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';

import TransformControl from '../src/TransformControl';

const Container = styled.div`
  width: 533px;
  height: 300px;
  position: relative;
  margin: 100px auto;
  z-index: 1;
  background-color: #F0F0F0;
`;

class App extends PureComponent {
  state = {
    rectbound: {
      x: 50,
      y: 50,
    }
  }

  render() {
    const { rectbound } = this.state;
    return (
      <Container>
        <TransformControl
          rectbound={rectbound}
          onChange={(value: any) => {
            this.setState({ rectbound: value });
          }}
          onComplete={(data: any) => {
            console.log(data);
          }}
        >
          <div
            onDoubleClick={(e: any) => {
              e.stopPropagation();
              e.preventDefault();
              console.log('doubleClick');
            }}
            style={{ width: 120, height: 30, backgroundColor: '#ff004f' }}
          />
        </TransformControl>
      </Container>
    );
  }
}

render(
  <App />,
  document.querySelector('#root')
);
