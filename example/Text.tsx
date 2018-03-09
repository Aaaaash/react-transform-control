import React from 'react';
import styled from 'styled-components';
import InputLabel from './InputLabel';

const Text = styled.div`
  /* min-height: 38px; */
  height: 100%;
  font-size: 20px;
  line-height: 38px;
  color: #FFFFFF;
  width: 100%;
  text-align: center;
  outline: none;
  white-space: nowrap;
  background-color: rgba(0,0,0,0.65);
`;

const HighOrderText = InputLabel(Text);

interface IProps {
  styles: object;
  text: string;
  onChange: Function;
  color: string;
}
const DarkText = ({ styles, text, onChange, color }: IProps) => (
  <HighOrderText style={{ ...styles, color }} text={text} onChange={onChange} />
);

export default DarkText;
