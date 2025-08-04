'use client';
import { useGenerateResetOtpMutation } from '@/redux/auth/authApi';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

const ForgorPasswordPage = () => {
  const { register, handleSubmit } = useForm<{ email: string }>();
  const router = useRouter();

  const [generateOtp] = useGenerateResetOtpMutation();

  const onSubmit = async ({ email }: { email: string }) => {
    try {
      await generateOtp({ email }).unwrap();

      router.push(`/verify-reset-otp?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.log(`OTP request failed`, error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-xl font-bold mb-4">Forgot Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('email')}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Send OTP
        </button>
      </form>
    </div>
  );
};

export default ForgorPasswordPage;
