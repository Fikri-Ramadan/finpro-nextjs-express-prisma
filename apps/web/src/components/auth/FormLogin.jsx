'use client';

import { validateLogin } from '@/helpers/validation';
import { useFormik } from 'formik';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function FormLogin() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validateLogin,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
      <Button className="mt-4" type="submit">
        Sign In
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
