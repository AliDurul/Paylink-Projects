'use client'
import React, { useCallback, useState } from 'react'
import Input from './Input'
import { signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/utils/routes'
import { useRouter, useSearchParams } from 'next/navigation'
import { login } from '../authActions'
import { toast } from 'react-toastify'


const SignInForm = () => {

  const searchParams = useSearchParams()
  const emailAddress = searchParams.get('email')
  const [email, setEmail] = useState(emailAddress || '')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [variant, setVariant] = useState('Login')
  const router = useRouter()



  const toggleVariant = useCallback(() => {
    setVariant((cv) => cv === 'Login' ? 'Register' : 'Login')
  }, [])

  const onClick = async (provider: 'google' | 'facebook') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }

  const handlelogin = async (e: any) => {
    e.preventDefault()

    login({ email, password })
      .then((data) => {
        if (data?.error) {
          toast.error(data?.error);
        } else {
          toast.success('Login successful')
          router.push('/profiles')
        }
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-center"
        });
      })

  }

  return (
    <div className="mx-auto w-full max-w-sm ">
      <div className='text-center'>
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-white ">
          {variant === 'Login' ? 'Sign in to your account' : 'Create an account'}
        </h2>
        <p className="mt-2 text-sm leading-6 text-white">
          {variant === 'Login' ? 'New to us?' : 'Already a member?'}{' '}
          <button type='button' onClick={toggleVariant} className="font-semibold text-orange-400 hover:text-orange-500">

            {variant === 'Login' ? 'Start a 7 day free trial' : 'Login to your account'}
          </button>
        </p>
      </div>

      <div className="mt-10 text-white">
        <div>
          <form className="space-y-6" onSubmit={handlelogin}>

            {variant === 'Register' && (
              <Input
                label='User Name'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setUserName(e.target.value) }}
                id='userName'
                value={userName}
                type='userName'
              />
            )}
            <Input
              label='Email'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) }}
              id='email'
              value={email}
              type='email'
            />
            <Input
              label='Password'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) }}
              id='password'
              value={password}
              type='password'
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-white">
                  Remember me
                </label>
              </div>

              <div className="text-sm leading-6">
                <a href="#" className="font-semibold text-orange-400  hover:text-orange-500">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                {variant === 'Login' ? 'Sign in' : 'Register'}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-7">
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm font-medium leading-6 ">
              <span className="bg-neutral-700 px-6 ">Or continue with</span>
            </div>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-4">
            <button
              onClick={() => onClick('google')}
              className="flex w-full items-center justify-center gap-3 rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-orange-400 hover:bg-orange-600 focus-visible:ring-transparent">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                <path
                  d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                  fill="#EA4335"
                />
                <path
                  d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                  fill="#4285F4"
                />
                <path
                  d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                  fill="#34A853"
                />
              </svg>
              <span className="text-sm font-semibold leading-6">Google</span>
            </button>

            <button
              onClick={() => onClick('facebook')}
              className="flex w-full items-center justify-center gap-3 rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold  shadow-sm ring-1 ring-inset ring-orange-400 hover:bg-orange-600 focus-visible:ring-transparent">
              <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5' viewBox="0 0 128 128"><rect width="118.35" height="118.35" x="4.83" y="4.83" fill="#3d5a98" rx="6.53" ry="6.53" /><path fill="#fff" d="M86.48 123.17V77.34h15.38l2.3-17.86H86.48v-11.4c0-5.17 1.44-8.7 8.85-8.7h9.46v-16A126.56 126.56 0 0 0 91 22.7c-13.62 0-23 8.3-23 23.61v13.17H52.62v17.86H68v45.83z" />
              </svg>
              <span className="text-sm font-semibold leading-6">Facebook</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInForm