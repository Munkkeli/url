import React from 'react';
import styled from 'styled-components';
import { Color } from '../Style';

import { Dropdown } from './Dropdown';

const Styled = {
  Hero: styled.div`
    display: flex;
    padding: 200px;
    width: 100vw;
    height: 100vh;
    background-color: ${Color.primary};
    box-sizing: border-box;

    .side {
      flex: 1;

      &.text {
        flex: initial;
        width: 550px;

        p {
          font-size: 1.5em;
        }
      }
    }

    h1 {
      font-size: 4em;
      color: #e9d8ff;
    }

    form {
      input {
        padding: 16px;
        width: 100%;
        font-size: 2em;
        border-radius: 6px;
        background-color: #c99fff;
        border: none;
        outline: none;

        &::placeholder {
          color: #814cc6;
          opacity: 1;
        }
      }
    }
  `,
};

export const Hero: React.FC = () => {
  const linkTypeOptions = [
    {
      title: 'as short as possible',
      description:
        'The link will be short and sweet. This is the best option when sharing something publicly, like on Twitter.',
    },
    {
      title: 'impossible to quess',
      description:
        'The link will be long and extremely hard to guess. Pick this option when privacy is a concern.',
    },
    {
      title: 'secured with a password',
      description:
        'The link will be short, but only those with the password can access it.',
    },
  ];

  const linkAnalyticsOptions = [
    {
      title: 'I want to see',
      description:
        'You will have access to an admin page where detailed usage statistics can be viewed.',
    },
    {
      title: 'I dont want to see',
      description:
        'The amount of clicks will be visible, but no detailed statistics will be recorded.',
    },
    {
      title: 'I dont want anyone to see',
      description:
        'Nothing will be recorded from this link. This option requires the link to have a deadline.',
    },
  ];

  return (
    <Styled.Hero>
      <div className="side text">
        <h1>
          Share with
          <br />
          confidence
        </h1>
        <p>
          Shorten your links with <b>Via</b>
          <br />
          and gain back control
        </p>

        <ul>
          <li>asd</li>
          <li>das</li>
        </ul>
      </div>
      <div className="side">
        <form>
          <h3>Just paste any link here and see the magic happen</h3>
          <input type="text" placeholder="https://" />

          <p>
            I want my link to be{' '}
            <Dropdown id="linkType" selected={0} options={linkTypeOptions} />,
            and{' '}
            <Dropdown
              id="linkAnalytics"
              selected={0}
              options={linkAnalyticsOptions}
            />{' '}
            how it is used.
          </p>

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="date" placeholder="Time" />
        </form>
      </div>
    </Styled.Hero>
  );
};