import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';

import TransformControl from '../src/TransformControl';
import Subtitle from './Text';


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
      x: 0,
      y: 50,
    },
    text: 'hello world',
    edit: false,
  }

  control: any;

  handleChange = (value: any) => {
    // console.log(value);
    this.setState({ rectbound: value });
  }
  
  handleComplete = (data: any) => {
    // console.log(data);
  }

  handleTextChange = (value: string) => {
    this.setState({ text: value })
    this.control.shouldPassiveUpdate();
  }

  render() {
    const { rectbound } = this.state;
    return (
      <Container>
        <TransformControl
          rectbound={rectbound}
          onChange={this.handleChange}
          onComplete={this.handleComplete}
          onClick={() => {
            this.setState({ edit: true });
          }}
          innerRef={(ref: any) => (this.control = ref)}
          disabled={!this.state.edit}
        >
          <Subtitle
            styles={{}}
            color="#ff004f"
            text={this.state.text}
            onChange={this.handleTextChange}
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
