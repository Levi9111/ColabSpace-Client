'use client';

import { useResetPasswordMutation } from '@/redux/auth/authApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

const ResetPasswordPage = () => {
  const params = useSearchParams();
  const email = params.get('email') ?? '';
  const router = useRouter();

  const [resetPassword] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<{
    newPassword: string;
    confirmPassword: string;
  }>();

  const onSubmit = async ({ newPassword }: { newPassword: string }) => {
    try {
      await resetPassword({ email, password: newPassword }).unwrap();
      router.push('/login');
    } catch (error) {
      console.log('Password Reset failed', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-xl font-bold mb-4">Reset Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('newPassword')}
          type="password"
          placeholder="New Password"
          className="w-full px-4 py-2 border rounded"
        />
        <input
          {...register('confirmPassword', {
            validate: (value) =>
              value === watch('newPassword') || 'Passwords do not match',
          })}
          type="password"
          placeholder="Confirm Password"
          className="w-full px-4 py-2 border rounded"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
        <button className="w-full bg-purple-600 text-white py-2 rounded">
          Save Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
