import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Color } from '../Style';
import * as Util from '../Util';

const Styled = {
  Page: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: ${Color.primary};
  `,
  Form: styled.form`
    display: flex;
    flex-direction: column;
    padding: 2em;
    width: 300px;
    border-radius: 6px;
    background-color: #fff;

    h2 {
      margin: 0 0 1em 0;
      text-align: center;
    }

    p {
      margin: 2em 0 0 0;
      text-align: center;
      font-size: 0.8em;
    }
  `,
  Input: styled.div`
    margin-bottom: 1em;

    label {
      display: block;
      margin-bottom: 4px;
      font-size: 0.8em;
    }

    input {
      padding: 8px;
      width: 100%;
      box-sizing: border-box;
    }
  `,
};

export const Login: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data: any) => {
    const result = await Util.fetch({
      query: `
        mutation Login($email: String!, $password: String!) {
          loginUser(email: $email, password: $password) {
            token
          }
        }
      `,
      variables: {
        email: data.email,
        password: data.password,
      },
    });

    if (result && result.loginUser && result.loginUser.token) {
      localStorage.setItem('token', result.loginUser.token);
      window.location.href = '/';
    } else {
      // TODO: Show error
    }
  };

  return (
    <Styled.Page>
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Sign In</h2>

        <Styled.Input>
          <label>Email</label>
          <input ref={register({ required: true })} name="email" type="email" />
        </Styled.Input>
        <Styled.Input>
          <label>Password</label>
          <input
            ref={register({ required: true })}
            name="password"
            type="password"
          />
        </Styled.Input>

        <button type="submit">Login</button>

        <p>
          No account yet? <a href="/register">Create a new account.</a>
        </p>
      </Styled.Form>
    </Styled.Page>
  );
};
