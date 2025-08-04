'use client';

import { useVerifyOtpMutation } from '@/redux/auth/authApi';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface OtpInput {
  otp: string;
}

const VerifyOtpPage = () => {
  const params = useSearchParams();
  const email = params.get('email') ?? '';
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpInput>();

  const [verifyOtp] = useVerifyOtpMutation();

  const onSubmit = async (data: OtpInput) => {
    try {
      await verifyOtp({ email, otp: data.otp }).unwrap();
      router.push('/login');
    } catch (error) {
      console.log('OTP verification failed', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <h2 className="text-xl font-semibold mb-4">Verify OTP</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('otp')}
          placeholder="Enter 6-digit OTP"
          className="w-full px-4 py-2 border rounded"
        />
        <p className="text-red-500 text-sm">{errors.otp?.message}</p>

        <button className="w-full bg-green-600 text-white py-2 rounded">
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyOtpPage;
