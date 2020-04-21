import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Color } from '../Style';

const Styled = {};

export const Login: React.FC = () => {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        ref={register({ required: true })}
        name="email"
        placeholder="Email"
        type="email"
      />
      <input
        ref={register({ required: true })}
        name="password"
        type="password"
      />

      <button type="submit">Login</button>

      <p>
        No account yet? <a href="/register">Create a new account.</a>
      </p>
    </form>
  );
};
