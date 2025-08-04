'use client';

import { useVerifyResetOtpMutation } from '@/redux/auth/authApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

const VerifyResetOtpPage = () => {
  const params = useSearchParams();
  const email = params.get('email') ?? '';
  const router = useRouter();

  const [verifyOtp] = useVerifyResetOtpMutation();
  const { register, handleSubmit } = useForm<{ otp: string }>();

  const onSubmit = async ({ otp }: { otp: string }) => {
    try {
      await verifyOtp({ email, otp }).unwrap();
      router.push(`/reset-password?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.log('OTP Verification failed', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-xl font-bold mb-4">Verify OTP</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('otp')}
          placeholder="Enter 6-digit OTP"
          className="w-full px-4 py-2 border rounded"
        />
        <button className="w-full bg-green-600 text-white py-2 rounded">
          Verify OTP
        </button>
      </form>
    </div>
  );
};

export default VerifyResetOtpPage;
