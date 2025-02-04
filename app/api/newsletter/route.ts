import { NewsletterAPI } from 'pliny/newsletter'
import siteMetadata from '@/data/siteMetadata'
import { NextResponse } from 'next/server'

const BUTTONDOWN_API_URL = `https://api.buttondown.email/v1`

type INewsletterOptions = {
  provider?: string
}

type INewsletterResponse = {
  message?: string
  error?: string
}

export const POST = async (req: Request) => {
  if (siteMetadata.newsletter?.provider && siteMetadata.newsletter?.provider !== 'buttondown') {
    return NewsletterAPI({
      provider: siteMetadata.newsletter?.provider,
    })
  }
  const { email } = await req.json()
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }
  try {
    // check whether the subscriber already exists
    const responseExists = await fetch(`${BUTTONDOWN_API_URL}/subscribers/${email}`, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
      },
      method: 'GET',
    })
    if (responseExists.status === 200) {
      return NextResponse.json({ message: 'subscriber exists', code: 'exists' }, { status: 200 })
    }
    const response = await fetch(`${BUTTONDOWN_API_URL}/subscribers`, {
      body: JSON.stringify({
        email_address: email,
        type: 'regular',
      }),
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
        'X-Buttondown-Collision-Behavior': 'overwrite',
      },
      method: 'POST',
    })
    const json = await response.json()
    if (response.status >= 400) {
      console.error(`error in response from Buttondown: ${json.error}`)
      return NextResponse.json({ error: json.error }, { status: response.status })
    }
    return NextResponse.json(
      { message: 'sucessfully subscribed to newsletter', code: 'created' },
      { status: 201 }
    )
  } catch (error) {
    const { message } = error as Error
    console.error(`faild to subscribe in api/newsletter: ${message}`)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export const GET = async (req: Request) => {
  if (siteMetadata.newsletter?.provider && siteMetadata.newsletter?.provider !== 'buttondown') {
    return NewsletterAPI({
      provider: siteMetadata.newsletter?.provider,
    })
  }
  const { email } = await req.json()
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }
  try {
    const response = await fetch(`${BUTTONDOWN_API_URL}/subscribers/${email}`, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`,
      },
      method: 'GET',
    })
    if (response.status === 404) {
      return NextResponse.json({ message: 'subscriber not found' }, { status: 404 })
    }
    if (response.status >= 400) {
      const json = await response.json()
      console.error(`error in response from Buttondown: ${json.error}`)
      return NextResponse.json({ error: json.error }, { status: response.status })
    }
    return NextResponse.json({ message: 'subscriber exists' }, { status: 200 })
  } catch (error) {
    const { message } = error as Error
    console.error(`failed to retrieve subscriber in api/newsletter: ${message}`)
    return NextResponse.json({ error: message }, { status: 500 })
  }
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
