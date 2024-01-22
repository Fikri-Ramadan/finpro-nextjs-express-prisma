import Image from 'next/image';
import { Input } from '../ui/input';
import Link from 'next/link';
import { Button } from '../ui/button';
import FormRegister from './FormRegister';

export default function Login() {
  return (
    <div className="max-w-7xl mx-auto flex items-center justify-center h-[600px] py-24 px-12">
      <div className="hidden lg:block relative w-1/3">
        <p className="text-4xl font-bold tracking-wide mb-2">Sign in</p>
        <p className="text-4xl font-bold tracking-wide">To Ticketing App</p>
        <p className="text-sm font-medium mt-8">
          if you don&apos;t have an account
        </p>
        <p className="text-sm font-medium">
          you can{' '}
          <Link href="/register" className="text-blue-700 font-semibold">
            register here !
          </Link>
        </p>
        <div className="-z-50 absolute -top-32 w-[400px] h-[400px] p-8 bg-slate-50 rounded-full"></div>
      </div>
      <div className="hidden w-1/3 h-full lg:flex justify-start items-end">
        <Image src="/undraw_login.svg" width={300} height={300} alt="" />
      </div>
      <div className="w-full lg:w-1/3 h-full flex flex-col justify-center">
        <p className="lg:hidden text-2xl font-bold mb-8">Login</p>
        <div className="w-full flex flex-col gap-4">
          <FormRegister />
        </div>
        {/* <p className="lg:hidden text-2xl font-bold mb-8">Login</p>
        <div className="w-full flex flex-col gap-4">
          <Input
            type="email"
            placeholder="Enter Email"
            className="bg-blue-50 border-slate-400"
          />
          <Input
            type="password"
            placeholder="Enter Password"
            className="bg-blue-50 border-slate-400"
          />
        </div>
        <Link href="" className="text-right mt-2 text-slate-700 text-sm">
          Recover Password ?
        </Link>
        <Button className="mt-8">Sign In</Button>
        <p className="text-sm font-medium mt-4 lg:hidden">
          if you don&apos;t have an account you can{' '}
          <Link href="/register" className="text-blue-700 font-semibold">
            register here !
          </Link>
        </p> */}
      </div>
    </div>
  );
}
