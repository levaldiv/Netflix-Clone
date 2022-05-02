import Head from 'next/head'
import Image from 'next/image'
import useAuth from '../hooks/useAuth'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface Inputs {
  email: string
  password: string
}

function login() {
  // tracking user login
  const [login, setLogin] = useState(false)
  const {signIn, signUp} = useAuth()

  // Creating form hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password)
    } else {
      await signUp(email, password)
    }
  }

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Background */}
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10 !hidden opacity-60 sm:!inline"
        objectFit="cover"
      />

      {/* Logo */}
      <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />

      {/* Login details */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-10 md:mt-0 md:max-w-md md:px-14 md:pb-32"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>

        <div className="space-y-4">
          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email or phone number"
              className="input"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Please enter a required email.
              </p>
            )}
          </label>

          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              className="input outline-none"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Password must contain between 4 to 60 characters.
              </p>
            )}
          </label>
        </div>

        {/* log in btn */}
        <button
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
          onClick={() => setLogin(true)}
        >
          Sign In
        </button>

        {/* Remember Me & need help */}
        <div className="!mt-3 flex items-center justify-between text-sm text-[#b3b3b3]">
          <div className="flex items-center">
            <input
              type="checkbox"
              className="mr-2 h-4 w-4 checked:accent-[#737373]"
            />
            <label className="mr-2 block">Remember Me</label>
          </div>

          <div>
            <a href="#" className="hover:underline">
              Need help?
            </a>
          </div>
        </div>

        {/* Facebook login */}
        <div className="!mt-14 flex cursor-pointer">
          <img
            src="https://rb.gy/rukrp6"
            width={20}
            height={20}
            className="mr-2 align-middle"
          />
          <span className="text-sm text-[#737373]">Log in with Facebook</span>
        </div>

        {/* New user create btn */}
        <div className="!mt-3 text-[gray]">
          New to Netflix?{' '}
          <button
            type="submit"
            className="text-white hover:underline"
            onClick={() => setLogin(false)}
          >
            Sign up now
          </button>
        </div>

        {/* Bot informationm */}
        <p className="!mt-3 text-sm text-[#8c8c8c]">
          This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
          <span className="cursor-pointer text-[#0071eb] hover:underline">
            Learn More.
          </span>
        </p>
      </form>
    </div>
  )
}

export default login
