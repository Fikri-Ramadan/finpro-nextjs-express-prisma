'use client';

import { useFormik } from 'formik';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { validateRegister } from '@/helpers/validation';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { ChevronsUpDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export default function FormRegister() {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validateRegister,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4">
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

      <Collapsible>
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
          <Select className="border-slate-400">
            <SelectTrigger className="border-slate-400">
              <SelectValue placeholder="Select Role (Default Customer)" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="CUSTOMER">Customer</SelectItem>
              <SelectItem value="ORGANIZER">Organizer</SelectItem>
            </SelectContent>
          </Select>
        </CollapsibleContent>
      </Collapsible>

      <Button type="submit">Sign In</Button>
    </form>
  );
}
