import React from 'react';
import styled from 'styled-components';

import { storiesOf } from '@storybook/react';
import TransformControl from '../src/TransformControl';

const Container = styled.div`
  width: 500px;
  height: 500px;
  background-color: #F0F0F0;
`;

storiesOf('transform', module).add('to TransformControl', () => <Container>
  <TransformControl />
</Container>);
