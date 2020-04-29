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

export const Register: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data: any) => {
    if (data.password != data.repassword) return;

    const result = await Util.fetch({
      query: `
        mutation Register($email: String!, $password: String!) {
          registerUser(email: $email, password: $password) {
            email
          }
        }
      `,
      variables: {
        email: data.email,
        password: data.password,
      },
    });

    if (!result) {
    }
  };

  return (
    <Styled.Page>
      <Styled.Form onSubmit={handleSubmit(onSubmit)}>
        <h2>Register</h2>

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
        <Styled.Input>
          <label>Re-Password</label>
          <input
            ref={register({ required: true })}
            name="repassword"
            type="password"
          />
        </Styled.Input>

        <button type="submit">Register</button>

        <p>
          Already have an account? <a href="/login">Login.</a>
        </p>
      </Styled.Form>
    </Styled.Page>
  );
};
