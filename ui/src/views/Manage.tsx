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
  `,
};

export const Manage: React.FC = () => {
  const [list, setList] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
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
      }
    })();
  }, []);

  const selectedURL = list.length ? list[0] : null;

  const handleCardClick = (hash: string) => () => {
    setSelected(list.find((x) => x.hash === hash));
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
          </>
        )}
      </Styled.Content>
    </Styled.Page>
  );
};
