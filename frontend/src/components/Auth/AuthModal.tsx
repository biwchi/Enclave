import { useState } from 'react';
import CustomButton from '../UI/CustomButton';
import CustomInput from '../UI/CustomInput';
import { useRest } from '@/services';
import { useFormik } from 'formik';
import { Login, Register } from '@/services/user/types';
import { useAuthStore } from '@/store/authStore';
import { useLocalStorage } from 'usehooks-ts';
import { useAuthListener } from '@/hooks';

type Auth = Login & Register;

export default function AuthModal() {
  const api = useRest();
  const { setIsLoggedIn } = useAuthListener();
  const { user, setUser } = useAuthStore();
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
    } catch (error) {}
  }

  async function register(values: Register) {
    try {
      const createdUser = await api.user.register(values);
      setUser(createdUser);
      setIsLoggedIn(true);
      console.log(user);
    } catch (error) {}
  }

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      {!isLogin && (
        <CustomInput
          value={formik.values.username}
          onChange={(e) => formik.setFieldValue('username', e.currentTarget.value)}
          name="username"
          label="Username"
          type="text"
        />
      )}
      <CustomInput
        value={formik.values.email}
        onChange={(e) => formik.setFieldValue('email', e.currentTarget.value)}
        name="email"
        label="Email"
        type="email"
      />
      <CustomInput
        value={formik.values.password}
        onChange={(e) => formik.setFieldValue('password', e.currentTarget.value)}
        name="password"
        type="password"
        label="Password"
      />
      <CustomButton type="submit" text={isLogin ? 'Login' : 'Create'} />
      <CustomButton
        type="button"
        onClick={() => setIsLogin((value) => (value = !value))}
        text={isLogin ? 'Don"t have an account? Sign up now!' : 'Alredy signed up? Login here!'}
      />
    </form>
  );
}
