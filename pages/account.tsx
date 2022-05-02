import { getProducts, Product } from '@stripe/firestore-stripe-payments'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Membership from '../components/Membership'
import useAuth from '../hooks/useAuth'
import useSubscription from '../hooks/useSubscription'
import payments from '../lib/stripe'

interface Props {
  products: Product[]
}

function Account({ products }: Props) {
  const { user, logout } = useAuth()
  const subscription = useSubscription(user)

  return (
    <div>
      <Head>
        <title>My Account</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={`bg-[#141414]`}>
        {/* logo */}
        <Link href="/">
          <img
            src="https://rb.gy/ulxxee"
            width={120}
            height={120}
            className="cursor-pointer object-contain"
          />
        </Link>

        {/* account icon */}
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </header>

      {/* Acct info */}
      <main className="mx-auto max-w-6xl px-5 pt-24 pb-12 transition-all md:px-10">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-3xl md:text-4xl">Account</h1>

          {/* when user subscribed */}
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <img src="https://rb.gy/4vfk4r" className="h-7 w-7" alt="" />
            <p className="text-xs font-semibold text-[#555]">
              Member since {subscription?.created}
            </p>
          </div>
        </div>

        {/* users membership info */}
        <Membership />

        <div className="divContainter py-4 md:pb-0">
          <h4 className="text-lg text-[gray]">Plan Details</h4>

          <div className="col-span-2 font-medium">
            {/* Finding current plan */}
            {
              products.filter(
                /** for every single product, compare the ID of prduct to that subsctiption */
                (product) => product.id === subscription?.product
              )[0]?.name
            }
          </div>
          <p className="cursor-pointer text-blue-500 hover:underline md:text-right">
            Change Plan
          </p>
        </div>

        <div className="divContainter py-4">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            className="col-span-3 cursor-pointer text-blue-500 hover:underline"
            onClick={logout}
          >
            Sign out of all devices
          </p>
        </div>
      </main>
    </div>
  )
}

export default Account

// since this is a static render, it will not update everytime
// bc the products are not going to be changing (increase/deccrease in price)
export const getStaticProps: GetStaticProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message))

  return {
    props: {
      products,
    },
  }
}
