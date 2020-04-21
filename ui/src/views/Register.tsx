import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Color } from '../Style';

const Styled = {};

export const Register: React.FC = () => {
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
      <input
        ref={register({ required: true })}
        name="password-again"
        type="password"
      />

      <button type="submit">Register</button>

      <p>
        Already have an account? <a href="/login">Login.</a>
      </p>
    </form>
  );
};
