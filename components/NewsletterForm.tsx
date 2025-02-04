'use client'

import { useState } from 'react'
import siteMetadata from '@/data/siteMetadata'

interface INewsletterFormProps {
  title?: string
  apiUrl?: string
}

const NewsletterForm = ({
  title = 'Subsribe to receive new posts directly to your email',
  apiUrl = '/api/newsletter',
}: INewsletterFormProps) => {
  const [subscribed, setSubscribed] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const subscribe = async (e) => {}

  if (!siteMetadata.newsletter?.provider) {
    return null
  }

  return (
    <div className="flex items-center justify-center pt-4">
      <form>
        <div>
          <label htmlFor="email-input">
            <span className="sr-only">Email address</span>
            <input
              type="email"
              autoComplete="email"
              id="email-input"
              name="email"
              required
              disabled={subscribed}
              placeholder=""
            />
          </label>
          <button type="submit" disabled={subscribed} onClick={subscribe}>
            {subscribed ? 'Thank you' : 'Subscribe'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default NewsletterForm
