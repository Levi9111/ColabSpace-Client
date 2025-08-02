'use client';
import { useLoginMutation } from '@/redux/auth/authApi';
import { setAccessToken } from '@/redux/auth/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginInput = z.infer<typeof schema>;

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(schema),
  });

  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (data: LoginInput) => {
    try {
      const result = await login(data).unwrap();

      console.log(result);

      console.log(dispatch(setAccessToken(result.accessToken)));

      router.push('/dashboard');
    } catch (error) {
      console.log(`Login failed`, error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            type="email"
            {...register('email')}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>

        <div>
          <input
            type="password"
            {...register('password')}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded"
          />
          <p className="text-red-500 text-sm">{errors.password?.message}</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black text-white py-2 rounded"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {error && (
          <p className="text-red-500 text-sm">
            Invalid credentials or server error
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
