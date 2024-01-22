'use client';

import Image from 'next/image';
import { Input } from '../ui/input';
import Link from 'next/link';
import { Button } from '../ui/button';
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
import FormRegister from './FormRegister';

export default function Register() {
  return (
    <div className="max-w-7xl mx-auto flex items-center justify-center h-[600px] py-24 px-12">
      <div className="hidden lg:block relative w-1/3">
        <p className="text-4xl font-bold tracking-wide mb-2">Sign up</p>
        <p className="text-4xl font-bold tracking-wide">To Ticketing App</p>
        <p className="text-sm font-medium mt-8">
          if you already have an account
        </p>
        <p className="text-sm font-medium">
          you can{' '}
          <Link href="/login" className="text-blue-700 font-semibold">
            login here !
          </Link>
        </p>
        <div className="-z-50 absolute -top-32 w-[400px] h-[400px] p-8 bg-slate-50 rounded-full"></div>
      </div>

      <div className="hidden w-1/3 h-full lg:flex justify-start items-end">
        <Image src="/undraw_signup.svg" width={300} height={300} alt="" />
      </div>

      <div className="w-full lg:w-1/3 h-full flex flex-col justify-center">
        <p className="lg:hidden text-2xl font-bold mb-8">Register</p>
          <FormRegister />
        {/* <div className="w-full flex flex-col gap-4">
          <Input
            placeholder="Enter Username"
            className="bg-blue-50 border-slate-400"
          />
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
          <Input
            type="password"
            placeholder="Confirm Password"
            className="bg-blue-50 border-slate-400"
          />

          <Collapsible>
            <CollapsibleTrigger className="w-full flex items-center justify-between text-sm font-light">
              Do you organizer or usage referral code ?
              <ChevronsUpDown className="w-4 h-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 py-4 CollapsibleContent">
              <Input
                placeholder="Enter Referral Code"
                className="bg-blue-50 border-slate-400"
              />
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
        </div>
        <Button className="mt-8">Sign Up</Button> */}
        <p className="text-sm font-medium mt-4 lg:hidden">
          if you already have an account you can{' '}
          <Link href="/register" className="text-blue-700 font-semibold">
            login here !
          </Link>
        </p>
      </div>
    </div>
  );
}
