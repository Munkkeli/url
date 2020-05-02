import React from 'react';
import styled from 'styled-components';
import AccountIcon from 'mdi-react/AccountIcon';
import MenuIcon from 'mdi-react/MenuIcon';
import ExitToAppIcon from 'mdi-react/ExitToAppIcon';
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

    > div > div {
      display: flex;

      > a {
        margin-left: 16px;
      }
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
            Sign In <AccountIcon />
          </a>
        )}
        {isLoggedIn && (
          <div>
            <a
              href="/"
              onClick={() => {
                localStorage.removeItem('token');
              }}
            >
              Sign Out <ExitToAppIcon />
            </a>
            <a href="/manage">
              My Links <MenuIcon />
            </a>
          </div>
        )}
      </div>
    </Styled.Navigation>
  );
};
