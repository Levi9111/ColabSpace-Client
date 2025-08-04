'use client';
import {
  useGenerateOtpMutation,
  useRegisterMutation,
} from '@/redux/auth/authApi';
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

type FormInput = z.infer<typeof schema>;

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
  });

  const [registerUser] = useRegisterMutation();
  const [generateOtp] = useGenerateOtpMutation();
  const router = useRouter();

  const onSubmit = async (data: FormInput) => {
    console.log(data);
    try {
      const result = await registerUser(data).unwrap();
      console.log(result);
      const otpResult = await generateOtp({ email: data.email }).unwrap();
      console.log(otpResult);
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      console.log('Registrationi failed', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register('email')}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
        />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>

        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
        />
        <p className="text-red-500 text-sm">{errors.password?.message}</p>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
