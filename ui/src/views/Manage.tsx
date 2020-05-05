import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import styled from 'styled-components';
import LinkIcon from 'mdi-react/LinkIcon';
import * as Util from '../Util';
import { Color } from '../Style';

const Styled = {
  Page: styled.div`
    display: flex;
    background-color: ${Color.primary};
  `,
  List: styled.div`
    width: 300px;
  `,
  Card: styled.div`
    margin: 16px 0 0 16px;
    padding: 16px;
    background-color: #5a328e;
    border-radius: 4px;
    user-select: none;
    cursor: pointer;

    h4 {
      margin: 0;
      font-weight: normal;
      color: #e9d8ff;
    }

    > p {
      margin: 0.5em 0 0 0;
      font-size: 0.8em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #c99fff;
    }

    div {
      display: flex;
      justify-content: space-between;
      font-size: 0.8em;
      color: #c99fff;

      p {
        margin: 1.5em 0 0 0;
      }
    }
  `,
  Content: styled.div`
    flex: 1;
    padding-left: 32px;

    h1 {
      color: #e9d8ff;
    }

    a {
      display: flex;
      align-items: center;
      color: ${Color.text};

      svg {
        padding-right: 8px;
      }
    }

    button {
      padding: 8px;
    }
  `,
};

const shortenedBaseUrl = Util.apiURL + '/';

export const Manage: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [isUpdatingUrl, setIsUpdatingUrl] = useState<boolean>(false);
  const [updatedUrl, setUpdatedUrl] = useState<string>('');

  const getList = async () => {
    const result = await Util.fetch({
      query: `
        {
          listOwnURLs {
            hash,
            url,
            title,
            createdAt
          }
        }
      `,
    });

    if (result && result.listOwnURLs) {
      setList(result.listOwnURLs);
      setSelected(null);
    }
  };

  useEffect(() => {
    (async () => {
      await getList();
    })();
  }, []);

  const handleCardClick = (hash: string) => () => {
    setSelected(list.find((x) => x.hash === hash));
  };

  const handleDeleteClick = (hash: string) => async () => {
    if (window.confirm('This cannot be reversed. Are you sure?')) {
      const result = await Util.fetch({
        query: `
          mutation Remove($hash: String!) {
            removeUrl(hash: $hash) {
              success
            }
          }
        `,
        variables: {
          hash,
        },
      });

      if (result.removeUrl.success) {
        await getList();
      }
    }
  };

  const handleUpdateClick = (hash: string) => async () => {
    setIsUpdatingUrl(!isUpdatingUrl);

    if (isUpdatingUrl && updatedUrl) {
      const result = await Util.fetch({
        query: `
          mutation Update($hash: String!, $url: String!) {
            updateUrl(hash: $hash, url: $url) {
              success
            }
          }
        `,
        variables: {
          hash,
          url: updatedUrl,
        },
      });

      if (result.updateUrl.success) {
        await getList();
      }
    }

    setUpdatedUrl('');
  };

  return (
    <Styled.Page>
      <Styled.List>
        {list.map((x) => (
          <Styled.Card onClick={handleCardClick(x.hash)}>
            <h4>{x.title}</h4>
            <p>{x.url}</p>
            <div>
              <p>1 Click</p>
              <p>{format(new Date(parseInt(x.createdAt)), 'dd.MM.yyyy')}</p>
            </div>
          </Styled.Card>
        ))}
      </Styled.List>
      <Styled.Content>
        {selected && (
          <>
            <h1>{selected.title}</h1>
            <p>
              <a href={selected.url}>
                <LinkIcon /> {selected.url}
              </a>
            </p>
            <p>
              <a href={`${shortenedBaseUrl}${selected.hash}`}>
                <LinkIcon /> {`${shortenedBaseUrl}${selected.hash}`}
              </a>
            </p>
            {isUpdatingUrl && (
              <input
                type="text"
                value={updatedUrl}
                onChange={(event: any) => setUpdatedUrl(event.target.value)}
              />
            )}
            <button onClick={handleUpdateClick(selected.hash)}>Update</button>
            <button onClick={handleDeleteClick(selected.hash)}>Delete</button>
          </>
        )}
      </Styled.Content>
    </Styled.Page>
  );
};
