import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Color } from '../Style';
import ArrowRightCircleOutlineIcon from 'mdi-react/ArrowRightCircleOutlineIcon';
import CheckboxMarkedCircleOutlineIcon from 'mdi-react/CheckboxMarkedCircleOutlineIcon';

import { Checkbox } from './Checkbox';
import { Dropdown } from './Dropdown';

const Styled = {
  Hero: styled.div<{ done: boolean }>`
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
        border-radius: 6px 0 0 6px;
        background-color: ${(props) => (props.done ? '#fff' : '#c99fff')};
        border: none;
        outline: none;

        &::placeholder {
          color: #814cc6;
          opacity: 1;
        }
      }
    }
  `,
  Input: styled.div<{ done: boolean }>`
    display: flex;

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 70px;
      width: 120px;
      background-image: none;
      border: none;
      outline: none;
      border-radius: 0 6px 6px 0;
      background-color: ${(props) => (props.done ? '#fff' : '#a474e0')};

      svg {
        width: 32px;
        height: 32px;
        fill: #49227b;
      }
    }
  `,
};

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

const apiURL = 'http://localhost:3001/graphql';
const shortenedBaseUrl = 'http://localhost:3001/';

const fetchGraphql = async (query: any) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify(query),
  };
  try {
    const response = await fetch(apiURL, options);
    const json = await response.json();
    return json.data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const Hero: React.FC = () => {
  const [isShortened, setIsShortened] = useState<boolean>(false);
  const [isMine, setIsMine] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUrlChange = (event: any) => {
    if (isShortened) return;
    setUrl(event.target.value);
  };

  const handleUrlClick = (event: any) => {
    if (!isShortened) return;
    inputRef.current?.select();
  };

  const handleMineChange = (event: any) => {
    setIsMine(event.target.checked);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (isShortened) return;

    const result = await fetchGraphql({
      query: `
        mutation Shorten($url: String!) {
          shortenUrl(url: $url) {
            hash
          }
        }
      `,
      variables: {
        url,
      },
    });

    if (result && result.shortenUrl && result.shortenUrl.hash) {
      setUrl(`${shortenedBaseUrl}${result.shortenUrl.hash}`);
      setIsShortened(true);
    } else {
      setUrl('');
    }
  };

  return (
    <Styled.Hero done={isShortened}>
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
        <form onSubmit={handleSubmit}>
          <h3>Just paste any link here and see the magic happen</h3>

          <Styled.Input done={isShortened}>
            <input
              type="text"
              placeholder="https://"
              value={url}
              onChange={handleUrlChange}
              onClick={handleUrlClick}
              ref={inputRef}
            />

            {!isShortened ? (
              <button type="submit">
                <ArrowRightCircleOutlineIcon />
              </button>
            ) : (
              <button>
                <CheckboxMarkedCircleOutlineIcon />
              </button>
            )}
          </Styled.Input>

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

          <Checkbox
            label="Link this URL to my account"
            checked={isMine}
            onChange={handleMineChange}
          />

          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <input type="date" placeholder="Time" />
        </form>
      </div>
    </Styled.Hero>
  );
};
