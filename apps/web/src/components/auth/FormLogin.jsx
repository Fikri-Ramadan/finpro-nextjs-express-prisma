'use client';

import { validateLogin } from '@/helpers/validation';
import { useFormik } from 'formik';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import customAxios from '@/lib/axios';
import { useToast } from '../ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'next-client-cookies';

export default function FormLogin() {
  const { toast } = useToast();
  const router = useRouter();
  const cookies = useCookies();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await customAxios.post('/api/auth/login', {
        email,
        password,
      });
      return res.data;
    },
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validateLogin,
    onSubmit: ({ email, password }) => {
      mutate(
        { email, password },
        {
          onSuccess: (data) => {
            toast({
              variant: 'success',
              title: 'Sign in successfully!',
              description: 'Have a nice day :)',
            });

            cookies.set('token', data.results, { secure: true, expires: 1 });

            router.push('/');
          },
          onError: (error) => {
            toast({
              variant: 'destructive',
              title: 'Failed!',
              description: error.response.data.message,
            });
          },
        },
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4">
      <div className="space-y-2">
        <Input
          placeholder="Enter Email"
          type="email"
          id="email"
          className={`bg-blue-50 border-slate-400 ${
            formik.errors.email && formik.touched.email && 'border-red-500'
          }`}
          {...formik.getFieldProps('email')}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-xs text-red-500">{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="space-y-2">
        <Input
          placeholder="Enter Password"
          type="password"
          id="password"
          className={`bg-blue-50 border-slate-400 ${
            formik.errors.password &&
            formik.touched.password &&
            'border-red-500'
          }`}
          {...formik.getFieldProps('password')}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-xs text-red-500">{formik.errors.password}</div>
        ) : null}
      </div>
      <Link href="" className="text-right text-slate-700 text-sm">
        Recover Password ?
      </Link>
      <Button className="mt-4" type="submit" disabled={isPending}>
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign In'}
      </Button>
      <p className="text-sm font-medium mt-4 lg:hidden">
        if you don&apos;t have an account you can{' '}
        <Link href="/register" className="text-blue-700 font-semibold">
          register here !
        </Link>
      </p>
    </form>
  );
}
