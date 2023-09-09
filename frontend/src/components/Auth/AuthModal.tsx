import BaseButton from '../BaseComponents/BaseButton';
import BaseInput from '../BaseComponents/BaseInput';

import { useState } from 'react';
import { useRest } from '@/services';
import { useFormik } from 'formik';
import { Login, Register } from '@/services/user/types';
import { useAuthStore } from '@/store/authStore';
import { useLocalStorage } from 'usehooks-ts';
import { AxiosError } from 'axios';

type Auth = Login & Register;

export default function AuthModal() {
  const api = useRest();
  const { setIsLoggedIn, setUser } = useAuthStore();
  const [isLogin, setIsLogin] = useState(false);
  const [_accessToken, setAccessToken] = useLocalStorage('access_token', '');

  const formik = useFormik<Auth>({
    initialValues: {
      username: '',
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      console.log(values);
      isLogin ? login(values) : register(values);
    }
  });

  async function login(values: Login) {
    try {
      const { access_token } = await api.user.login(values);
      setAccessToken(access_token);
      setIsLoggedIn(true);
    } catch (error) {
      const { response } = error as AxiosError<{ message: string | string[] }>;

      if (response?.data.message === 'User or password are incorrect') {
        formik.setFieldError('email', 'User or password are incorrect');
      }
    }
  }

  async function register(values: Register) {
    try {
      const createdUser = await api.user.register(values);
      setUser(createdUser);
      setIsLoggedIn(true);

      if (createdUser.access_token) setAccessToken(createdUser.access_token);
    } catch (error) {
      const { response } = error as AxiosError<{ message: string | string[] }>;

      if (response?.data.message === 'This email alredy used') {
        formik.setFieldError('email', 'This email alredy used');
      }
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      {!isLogin && (
        <BaseInput
          value={formik.values.username}
          onChange={(e) => formik.setFieldValue('username', e.currentTarget.value)}
          name="username"
          label="Username"
          type="text"
        />
      )}
      <BaseInput
        value={formik.values.email}
        onChange={(e) => formik.setFieldValue('email', e.currentTarget.value)}
        name="email"
        label="Email"
        type="email"
      />
      <BaseInput
        value={formik.values.password}
        onChange={(e) => formik.setFieldValue('password', e.currentTarget.value)}
        name="password"
        type="password"
        label="Password"
      />
      <p>{formik.errors.email}</p>
      <BaseButton type="submit" text={isLogin ? 'Login' : 'Create'} />
      <BaseButton
        type="button"
        onClick={() => setIsLogin((value) => (value = !value))}
        text={isLogin ? 'Don"t have an account? Sign up now!' : 'Alredy signed up? Login here!'}
      />
    </form>
  );
}
