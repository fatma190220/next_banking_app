'use client'

import Link  from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2 } from 'lucide-react'
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import { authFormSchema } from '@/lib/utils'
import CustomInput from './CustomInput'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions'
import SignIn from '@/app/(auth)/sign-in/page'
import PlaidLink from './PlaidLink'

const AuthForm = ({type}: {type:string}) => {
  const formSchema = authFormSchema(type);
  const [isLoading, setIsLoading] = useState(false);
 

    const [user, setUser] = useState(null);
    const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ''
    },
  })

async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true);
   try {
  if(type === 'sign-in') {
          const response = await signIn({
            email: data.email,
            password: data.password,
          })
    if (response) router.push('/');
  } else 
  if(type === 'sign-up') {
          const userData = {
            firstName: data.firstName!,
            lastName: data.lastName!,
            address1: data.address1!,
            city: data.city!,
            state: data.state!,
            postalCode: data.postalCode!,
            dateOfBirth: data.dateOfBirth!,
            ssn: data.ssn!,
            email: data.email,
            password: data.password
          }

          const newUser = await signUp(userData);

          setUser(newUser);
        }
} catch (error) {
  console.log(error);
} finally {
  setIsLoading(false);
}
  }


  return (
    <section className="flex items-center justify-center min-h-screen w-full">
      <div className="w-full max-w-lg p-6">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2 justify-center">
          <Image
            src="/icons/logo.jpg"
            width={50}
            height={50}
            alt="Horizon logo" 
            className="brown-600"
          />
          <h1 className="text-[26px] font-ibm-plex-serif font-bold text-black-1">
            <span className='text-brown-600'>KIWI</span>BANK
          </h1>
        </Link>

         <div className="flex flex-col gap-1 md:gap-3">
            <h1 className="text-[24px] lg:text-[36px] font-semibold text-gray-900">
              {user 
                ? 'Link Account'
                : type === 'sign-in'
                  ? 'Sign In'
                  : 'Sign Up'
              }
              <p className="text-16 font-normal text-gray-600">
                {user 
                  ? 'Link your account to get started'
                  : 'Please enter your details'
                }
              </p>  
            </h1>
          </div>


      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ): (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {type === 'sign-up' && (
              <>
                <div className="flex gap-4">
                  <CustomInput control={form.control} name='firstName' label="First Name" placeholder='Enter your first name' />
                  <CustomInput control={form.control} name='lastName' label="Last Name" placeholder='Enter your last name' />
                </div>
                <CustomInput control={form.control} name='address1' label="Address" placeholder='Enter your specific address' />
                <CustomInput control={form.control} name='city' label="City" placeholder='Enter your city' />
                <div className="flex gap-4">
                  <CustomInput control={form.control} name='state' label="State" placeholder='Example: NY' />
                  <CustomInput control={form.control} name='postalCode' label="Postal Code" placeholder='Example: 11101' />
                </div>
                <div className="flex gap-4">
                  <CustomInput control={form.control} name='dateOfBirth' label="Date of Birth" placeholder='YYYY-MM-DD' />
                  <CustomInput control={form.control} name='ssn' label="SSN" placeholder='Example: 1234' />
                </div>
              </>
            )}

            <CustomInput control={form.control} name='email' label="Email" placeholder='Enter your email' />
            <CustomInput control={form.control} name='password' label="Password" placeholder='Enter your password' />

            <div className="flex flex-col gap-4">
              <Button type="submit" disabled={isLoading} className=" rounded-lg border border-bankGradient bg-bank-gradient font-semibold text-white shadow-form">
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" /> &nbsp; Loading...
                  </>
                ) : type === 'sign-in' 
                  ? 'Sign In' : 'Sign Up'}
              </Button>
            </div>
          </form>
        </Form>
      )}

          <footer className="flex justify-center gap-2 mt-6">
            <p className="text-[14px] font-normal text-gray-600">
              {type === 'sign-in'
              ? "Don't have an account?"
              : "Already have an account?"}
            </p>
            <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="font-medium text-brown-700">
              {type === 'sign-in' ? 'Sign up' : 'Sign in'}
            </Link>
          </footer>
      </div>
    </section>
  )
}

export default AuthForm
