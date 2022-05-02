import Head from 'next/head'
import Link from 'next/link'
import useAuth from '../hooks/useAuth'
import Loader from './Loader'
import Table from './Table'
import { CheckIcon } from '@heroicons/react/solid'
import { Product } from '@stripe/firestore-stripe-payments'
import { loadCheckout } from '../lib/stripe'
import { useState } from 'react'

interface Props {
  products: Product[]
}

function Plans({ products }: Props) {
  // useAuth hook
  const { logout, user } = useAuth()
  // fir a single product, when refreshed it will be set to the 2nd product (by default)
  const [selectedPlan, setSelectedPlan] = useState<Product | null>(products[2])
  // want the use to know they are waiting for the stripe portal to showw
  const [isBillingLoading, setBillingLoading] = useState(false)

  console.log(products)

  const subscribeToPlan = () => {
    // checks if there is no user
    if (!user) return

    // providing id to this checkout session
    // the id tells the stripe portal which plan the user selected
    loadCheckout(selectedPlan?.prices[0].id!)
    setBillingLoading(true)
  }

  return (
    <div>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* img */}
      <header className="border-b border-white/10 bg-[#141414]">
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            alt="netflix"
            width={150}
            height={90}
            className="cursor-pointer object-contain"
          />
        </Link>

        {/* signout btn */}
        <button
          className="text-lg font-medium hover:underline"
          onClick={logout}
        >
          Sign Out
        </button>
      </header>

      <main className="mx-auto max-w-5xl px-5 pt-28 pb-12 transition-all md:px-10">
        <h1 className="mb-3 text-3xl font-medium">
          Choose the plan that's right for you
        </h1>

        {/* Description */}
        <ul>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Watch all you want.
            Ad-free.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Recommendations
            just for you.
          </li>
          <li className="flex items-center gap-x-2 text-lg">
            <CheckIcon className="h-7 w-7 text-[#E50914]" /> Change or cancel
            your plan anytime.
          </li>
        </ul>

        {/* List of plans */}
        <div className="mt-4 flex flex-col space-y-4">
          <div className="flex w-full items-center justify-end self-end md:w-3/5">
            {/* Mapping through the plans created in Stripe */}
            {products.map((product) => (
              <div
                key={product.id}
                className={`planBox ${
                  selectedPlan?.id === product.id ? 'opacity-100' : 'opacity-60'
                }`}
                onClick={() => setSelectedPlan(product)}
              >
                {product.name}
              </div>
            ))}
          </div>

          <Table products={products} selectedPlan={selectedPlan} />

          {/* Subscribe btn */}
          <button
            // btn disabled when there is no selected plan or if they already clicked on it
            disabled={!selectedPlan || isBillingLoading}
            className={`mx-auto w-11/12 rounded bg-[#E50914] py-4 text-xl shadow hover:bg-[#f6121d] md:w-[420px] ${
              isBillingLoading && 'opacity-60'
            }`}
            onClick={subscribeToPlan}
          >
            {isBillingLoading ? (
              <Loader color="dark:fill-gray-300" />
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
      </main>
    </div>
  )
}

export default Plans
