import {
  createCheckoutSession,
  getStripePayments,
} from '@stripe/firestore-stripe-payments'
import { getFunctions, httpsCallable } from '@firebase/functions'
import app from '../firebase'

// get payments
const payments = getStripePayments(app, {
  productsCollection: 'products',
  customersCollection: 'customers',
})

// loading payments
const loadCheckout = async (priceId: string) => {
  await createCheckoutSession(payments, {
    price: priceId,
    // uses actual domain vaule of yoiur origin
    success_url: window.location.origin,
    cancel_url: window.location.origin,
    // navigates to the givcen url (if its successful, navigate to stripe payment portal)
  })
    .then((snapshot) => window.location.assign(snapshot.url))
    .catch((error) => console.log(error.message))
}

// Canceling membership
const billingPortal = async () => {
  // gives us the instance of the cloud fcn
  const instance = getFunctions(app, 'us-central1')
  // retuen back a url which is a url to the stripe customer portal
  const functionRef = httpsCallable(
    instance,
    // adding the trigger
    'ext-firestore-stripe-payments-createPortalLink'
  )

  await functionRef({
    // redirect back to whatever the domain is (currentDomain/account)
    returnUrl: `${window.location.origin}/account`,
  })
    .then(({ data }: any) => window.location.assign(data.url)) // navigate to that specific url
    .catch((error) => console.log(error.message))
}

export { loadCheckout, billingPortal }
export default payments
