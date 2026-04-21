import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { UserPlus } from 'lucide-react';

const registerSchema = z.object({
  email: z.string().email('Неверный email адрес'),
  password: z.string().min(6, 'Пароль должен быть минимум 6 символов'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Пароли не совпадают',
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setError(error.message);
    } else {
      alert('Регистрация успешна. Подтвердите email и войдите в аккаунт.');
      navigate('/login');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md z-shell p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl z-title text-[#1f1b16] mb-2" style={{ fontWeight: 500 }}>Новый аккаунт</h1>
          <p className="text-[#7c705f]">Создайте профиль клиента SOTOVIK</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-[#f9eceb] border border-[#e3b1ae] text-[#a5423e] rounded-[6px] text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#796d5d] mb-1">Email</label>
            <input
              {...register('email')}
              type="email"
              className="z-input"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-[#796d5d] mb-1">Пароль</label>
            <input
              {...register('password')}
              type="password"
              className="z-input"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-medium text-[#796d5d] mb-1">Повторите пароль</label>
            <input
              {...register('confirmPassword')}
              type="password"
              className="z-input"
            />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full z-btn-primary disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? 'Создание...' : 'Зарегистрироваться'} <UserPlus size={18} />
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-[#7a6d5c]">
          Уже есть аккаунт? <Link to="/login" className="text-[#8b6a47] hover:underline">Войти</Link>
        </p>
      </div>
    </div>
  );
}
