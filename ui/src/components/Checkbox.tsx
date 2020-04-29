import React from 'react';
import styled from 'styled-components';
import CheckboxBlankIcon from 'mdi-react/CheckboxBlankIcon';
import CheckboxMarkedIcon from 'mdi-react/CheckboxMarkedIcon';
import { Color } from '../Style';

const Styled = {
  Checkbox: styled.label<{ checked: boolean }>`
    position: relative;
    display: block;
    height: 32px;
    padding-left: 48px;
    user-select: none;
    cursor: pointer;

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    svg {
      position: absolute;
      top: 0;
      left: 0;
      height: 32px;
      width: 32px;
      fill: ${(props) => (props.checked ? '#fff' : Color.action)};
    }
  `,
};

export const Checkbox: React.FC<{
  label: string;
  checked: boolean;
  onChange: (event: any) => void;
}> = ({ label, checked, onChange }) => {
  return (
    <Styled.Checkbox checked={checked}>
      {label}
      <input type="checkbox" checked={checked} onChange={onChange} />
      {checked ? <CheckboxMarkedIcon /> : <CheckboxBlankIcon />}
    </Styled.Checkbox>
  );
};
