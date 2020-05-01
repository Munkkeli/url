import React from 'react';
import styled from 'styled-components';
import AccountIcon from 'mdi-react/AccountIcon';
import MenuIcon from 'mdi-react/MenuIcon';
import { Color } from '../Style';

const Styled = {
  Navigation: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2em;
    box-sizing: border-box;
    background-color: #351064;

    a {
      text-decoration: none;
    }

    h1 {
      color: #e9d8ff;
    }

    a {
      display: flex;
      align-items: center;
      color: #e9d8ff;

      svg {
        margin-left: 0.5em;
      }
    }
  `,
};

export const Navigation: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Styled.Navigation>
      <a href="/">
        <h1>Via</h1>
      </a>

      <div>
        {!isLoggedIn && (
          <a href="/login">
            Login <AccountIcon />
          </a>
        )}
        {isLoggedIn && (
          <a href="/manage">
            My Links <MenuIcon />
          </a>
        )}
      </div>
    </Styled.Navigation>
  );
};
