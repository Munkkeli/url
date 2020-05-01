import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
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
    padding: 16px;
    background-color: #5a328e;

    h4 {
      margin: 0;
      font-weight: normal;
      color: ${Color.text};
    }

    > p {
      color: #c99fff;
    }

    div {
      display: flex;
      justify-content: space-between;
    }
  `,
  Content: styled.div`
    flex: 1;
  `,
};

export const Manage: React.FC = () => {
  const [list, setList] = useState<any[]>([]);

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

  return (
    <Styled.Page>
      <Styled.List>
        {list.map((x) => (
          <Styled.Card>
            <h4>{x.title}</h4>
            <p>{x.url}</p>
            <div>
              <p>1 Click</p>
              <p>{x.createdAt}</p>
            </div>
          </Styled.Card>
        ))}
      </Styled.List>
      <Styled.Content></Styled.Content>
    </Styled.Page>
  );
};
