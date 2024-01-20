import { SubmitHandler, useForm } from 'react-hook-form'
import { Button } from "@/shared/ui/button";
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { loginThunk } from '../api/loginApi';
import { useAppSelector } from '@/shared/lib/hooks/useAppSelector';
import { Input } from '@/shared/ui/input';

interface FormProps {
  username: string;
  password: string;
}

export const LoginForm = () => {
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm<FormProps>()
  const isLoading = useAppSelector((state) => state.loginSlice.login.loading)

  const onSubmit: SubmitHandler<FormProps> = ({ username, password }) => dispatch(loginThunk({ username, password }))

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-secondary text-textColor w-[90%] sm:w-full max-w-sm min-h-[sm] max-h-[60vh] rounded-md p-6">
      <h1 className="text-2xl font-[400]">Welcome to Efir</h1>
      <p className="text-sm">Please sign-in to your account and start the adventure</p>
      <div className='flex flex-col gap-y-2 mt-2'>
        <Input labelText={'Email or Username'} placeholder='Enter your username' register={register('username')} />
        <Input labelText={'Password'} placeholder='Enter your password' register={register('password')} />
      </div>
      <Button className='w-full mt-4' loading={isLoading} title={"Sign in"} />
    </form>
  );
};
