'use client';

import { useFormik } from 'formik';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { validateRegister } from '@/utils/validation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { ChevronsUpDown, Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import Link from 'next/link';
import { useToast } from '../ui/use-toast';
import customAxios from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'next-client-cookies';

export default function FormRegister() {
  const { toast } = useToast();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ username, email, password, referral, role }) => {
      const res = await customAxios.post('/api/auth/register', {
        username,
        email,
        password,
        referral,
        role,
      });

      return res.data;
    },
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      referralCode: '',
      role: 'USER',
    },
    validationSchema: validateRegister,
    onSubmit: ({
      username,
      email,
      password,
      confirmPassword,
      referralCode,
      role,
    }) => {
      if (password !== confirmPassword) {
        toast({
          variant: 'destructive',
          title: 'Password is not equals !',
          description: 'Password and Confirm Password must be equals.',
        });
        return;
      }

      mutate(
        { username, email, password, referral: referralCode, role },
        {
          onSuccess: () => {
            toast({
              variant: 'success',
              title: 'Register Successfully!',
              description: 'Try to sign in, Have a nice day :)',
            });

            router.push('/login');
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
    <form
      onSubmit={formik.handleSubmit}
      className="w-full flex flex-col gap-4 mt-16"
    >
      <div className="space-y-2">
        <Input
          placeholder="Enter username"
          id="username"
          type="text"
          className={`bg-blue-50 border-slate-400 ${
            formik.errors.username &&
            formik.touched.username &&
            'border-red-500'
          }`}
          {...formik.getFieldProps('username')}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-xs text-red-500">{formik.errors.username}</div>
        ) : null}
      </div>

      <div className="space-y-2">
        <Input
          placeholder="Enter Email"
          id="email"
          type="email"
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
          placeholder="Enter password"
          id="password"
          type="password"
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

      <div className="space-y-2">
        <Input
          placeholder="Enter confirmPassword"
          id="confirmPassword"
          type="password"
          className={`bg-blue-50 border-slate-400 ${
            formik.errors.confirmPassword &&
            formik.touched.confirmPassword &&
            'border-red-500'
          }`}
          {...formik.getFieldProps('confirmPassword')}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-xs text-red-500">
            {formik.errors.confirmPassword}
          </div>
        ) : null}
      </div>

      <div className="relative">
        <Collapsible className="absolute lg:static top-0 w-full">
          <CollapsibleTrigger className="w-full flex items-center justify-between text-sm font-light">
            Do you organizer or usage referral code ?
            <ChevronsUpDown className="w-4 h-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 py-4 CollapsibleContent">
            <div className="space-y-2">
              <Input
                placeholder="Enter Referral Code"
                id="referralCode"
                type="text"
                className={`bg-blue-50 border-slate-400 ${
                  formik.errors.referralCode &&
                  formik.touched.referralCode &&
                  'border-red-500'
                }`}
                {...formik.getFieldProps('referralCode')}
              />
              {formik.touched.referralCode && formik.errors.referralCode ? (
                <div className="text-xs text-red-500">
                  {formik.errors.referralCode}
                </div>
              ) : null}
            </div>
            <Select
              onValueChange={(value) => {
                formik.setFieldValue('role', value);
              }}
              className="border-slate-400"
            >
              <SelectTrigger className="border-slate-400">
                <SelectValue placeholder="Select Role (Default Customer)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CUSTOMER">Customer</SelectItem>
                <SelectItem value="ORGANIZER">Organizer</SelectItem>
              </SelectContent>
            </Select>
          </CollapsibleContent>
          <Button type="submit" className="w-full mt-4" disabled={isPending}>
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Sign Up'
            )}
          </Button>
          <p className="text-sm font-medium mt-4 lg:hidden">
            if you already have an account you can{' '}
            <Link href="/register" className="text-blue-700 font-semibold">
              login here !
            </Link>
          </p>
        </Collapsible>
      </div>
    </form>
  );
}
