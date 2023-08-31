import { useState } from 'react';
import CustomButton from '../UI/CustomButton';
import CustomInput from '../UI/CustomInput';

export default function AuthModal() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      {!isLogin && <CustomInput label="Username" type="text" />}
      <CustomInput label="Email" type="email" />
      <CustomInput type="password" label="Password" />
      <CustomButton text={isLogin ? 'Login' : 'Create'} />
      <CustomButton
        onClick={() => setIsLogin((value) => (value = !value))}
        text={isLogin ? 'Create an account' : 'Don"t have an account? Login now!'}
      />
    </div>
  );
}
