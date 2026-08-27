import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { apiFetch } from '../../api/http';
import { useAuthStore } from '../../store/useAuthStore';

import loginBg from '../../assets/login-bg.png';
import logo from '../../assets/logo.svg';
import userIcon from '../../assets/user-icon.svg';
import eyeIcon from '../../assets/eye-icon.svg';

const registerSchema = z
  .object({
    email: z.string().min(1, 'O e-mail é obrigatório').email('E-mail inválido'),
    password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(1, 'Confirme a sua senha'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface AuthResponse {
  user: { id: string; name: string; email: string };
  token: string;
}

export function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const extractedName = data.email.split('@')[0];

      const response = await apiFetch<AuthResponse>('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          name: extractedName,
          email: data.email,
          password: data.password,
        }),
      });

      setAuth(response.user, response.token);
      toast.success('Conta criada com sucesso!');
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Falha ao cadastrar.');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row font-['Montserrat']">
      <div className="hidden lg:block w-full lg:w-[720px] shrink-0 min-h-screen">
        <img
          src={loginBg}
          alt="Furniro Interior"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 bg-white">
        <div className="w-full max-w-[490px] flex flex-col items-center">
          <img src={logo} alt="Logo" className="w-[232px] h-[148px] object-contain mb-2" />

          <h1 className="text-[34px] font-bold text-black leading-tight mb-8">
            Sign up
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center gap-5">
            <div className="w-full">
              <div className="relative w-full h-[43px]">
                <input
                  type="email"
                  placeholder="email"
                  {...register('email')}
                  className="w-full h-full bg-[#D9D9D9] px-4 pr-12 text-black font-bold text-[16px] placeholder:text-black placeholder:font-bold focus:outline-none"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 w-[27px] h-[27px] flex items-center justify-center pointer-events-none">
                  <img src={userIcon} alt="User" className="w-[27px] h-[27px]" />
                </div>
              </div>
              {errors.email && (
                <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>
              )}
            </div>

            <div className="w-full">
              <div className="relative w-full h-[43px]">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="password"
                  {...register('password')}
                  className="w-full h-full bg-[#D9D9D9] px-4 pr-12 text-black font-bold text-[16px] placeholder:text-black placeholder:font-bold focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-[27px] h-[27px] flex items-center justify-center"
                >
                  <img src={eyeIcon} alt="Toggle Password" className="w-[27px] h-[27px]" />
                </button>
              </div>
              {errors.password && (
                <span className="text-red-500 text-xs mt-1 block">{errors.password.message}</span>
              )}
            </div>

            <div className="w-full">
              <div className="relative w-full h-[43px]">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="confirm password"
                  {...register('confirmPassword')}
                  className="w-full h-full bg-[#D9D9D9] px-4 pr-12 text-black font-bold text-[16px] placeholder:text-black placeholder:font-bold focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-[27px] h-[27px] flex items-center justify-center"
                >
                  <img src={eyeIcon} alt="Toggle Password" className="w-[27px] h-[27px]" />
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs mt-1 block">{errors.confirmPassword.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-[328px] h-[43px] bg-black text-white font-bold text-[16px] tracking-wide hover:bg-neutral-800 transition-colors disabled:opacity-50 mt-2"
            >
              {isSubmitting ? 'Signing up...' : 'Sign up'}
            </button>
          </form>

          <div className="mt-6 flex items-center gap-1 text-[16px]">
            <span className="text-black/70 font-semibold">Already registered?</span>
            <Link to="/login" className="text-black font-bold hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}