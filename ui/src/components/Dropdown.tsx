import React from 'react';
import styled from 'styled-components';
import { Color } from '../Style';

const Styled = {
  Dropdown: styled.div``,
};

export interface IDropdownOption {
  title: string;
  description: string;
}

export const Dropdown: React.FC<{
  id: string;
  selected: number;
  options: IDropdownOption[];
}> = ({ id, selected, options }) => {
  const selectedOption = options[selected];

  return (
    <Styled.Dropdown>
      <select id={id}>
        {options.map((option, index) => (
          <option value={index} selected={selected === index}>
            {option.title}
          </option>
        ))}
      </select>
    </Styled.Dropdown>
  );
};
