import {
  onCurrentUserSubscriptionUpdate,
  Subscription,
} from '@stripe/firestore-stripe-payments'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import payments from '../lib/stripe'

function useSubscription(user: User | null) {
  const [subscription, setSubscription] = useState<Subscription | null>(null)

  useEffect(() => {
    if (!user) return

    // tracks the current users subscription
    onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
      setSubscription(
        //   filtering through subs
        snapshot.subscriptions.filter(
          // for every single subscription
          (subscription) =>
            //   checking the status
            subscription.status === 'active' ||
            subscription.status === 'trialing'
        )[0] // acccessing the first value of the subscriptions arrray
      )
    })
    // anytime the user changes
  }, [user])

  return subscription
}

export default useSubscription
