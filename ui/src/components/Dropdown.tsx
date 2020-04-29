import React from 'react';
import styled from 'styled-components';
import ChevronDownIcon from 'mdi-react/ChevronDownIcon';
import { Color } from '../Style';

const Styled = {
  Dropdown: styled.div`
    position: relative;
    display: inline-block;
    margin: 0 4px;
    padding-right: 24px;
    z-index: 1;
    color: #f5edff;

    &:before {
      content: '';
      display: block;
      position: absolute;
      bottom: -1px;
      left: -2px;
      width: calc(100% + 4px);
      height: 8px;
      background-color: #6835a8;
      z-index: -1;
    }

    svg {
      position: absolute;
      margin: -2px 0 0 0;
    }

    select {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      opacity: 0;
      cursor: pointer;
    }
  `,
};

export interface IDropdownOption {
  title: string;
  description: string;
}

export const Dropdown: React.FC<{
  id: string;
  selected: number;
  options: IDropdownOption[];
  onChange: (event: any) => void;
}> = ({ id, selected, options, onChange }) => {
  const selectedOption = options[selected];

  return (
    <Styled.Dropdown>
      <b>{options[selected].title}</b>
      <ChevronDownIcon />

      <select id={id} onChange={onChange}>
        {options.map((option, index) => (
          <option value={index} selected={selected === index}>
            {option.title}
          </option>
        ))}
      </select>
    </Styled.Dropdown>
  );
};
