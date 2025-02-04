'use client'

import { useMemo, useState } from 'react'
import siteMetadata from '@/data/siteMetadata'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from './ui/card'
import { Spinner } from './ui/spinner'
import { toast } from 'sonner'

const BUTTONDOWN_API_URL = `https://api.buttondown.email/v1`

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

type IFormSchema = z.infer<typeof FormSchema>

interface INewsletterFormProps {
  title?: string
}

const NewsletterForm = ({
  title = 'Subsribe to receive new posts directly to your email',
}: INewsletterFormProps) => {
  const [subscribed, setSubscribed] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const form = useForm<IFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  })

  const subscribe = async (data: IFormSchema) => {
    setLoading(true)
    try {
      const res = await fetch('/api/newsletter', {
        body: JSON.stringify({
          email: data.email,
        }),
        headers: {
          'content-type': 'application/json',
        },
        method: 'POST',
      })
      const json = await res.json()
      const { error: err, code } = json
      if (err) {
        throw new Error(err)
      }
      if (code && code === 'exists') {
        toast.success('You already subscribed 🥳', {
          description:
            'You are in my mailing list already. Oh, I wish I could subscribe you twice 😋',
          duration: 5000,
          dismissible: true,
          position: 'top-right',
        })
      } else {
        toast.success("You've been successfully subscribed 🎉", {
          description:
            "Thank you for subscribing to my newsletter. You'll receive the latest updates 🥳",
          duration: 5000,
          dismissible: true,
          position: 'top-right',
        })
      }
      setSubscribed(true)
    } catch (error) {
      const { message } = error as Error
      console.error(error)
      toast.error('Failed to subscribe 😢', {
        description: message,
        duration: 5000,
        dismissible: true,
        position: 'top-right',
      })
    } finally {
      setLoading(false)
    }
  }

  const disabled = useMemo(() => {
    return subscribed || loading
  }, [subscribed, loading])

  const buttonText = useMemo(() => {
    if (loading) {
      return <Spinner className="min-h-full pl-4" />
    }
    if (subscribed) {
      return 'Thank you ❤️'
    }
    return 'Subscribe'
  }, [loading, subscribed])

  if (!siteMetadata.newsletter?.provider) {
    return null
  }

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-screen-md p-8">
        <CardContent>
          <div className="flex items-center justify-center pt-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(subscribe)}
                className="w-full max-w-screen-md space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{title}</FormLabel>
                      <div className="flex space-x-2">
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            className="w-full"
                            placeholder="Email address"
                            autoComplete="email"
                            autoCapitalize="none"
                            name="email"
                            disabled={disabled}
                          />
                        </FormControl>
                        <Button
                          type="submit"
                          variant="outline"
                          size={'default'}
                          disabled={disabled}
                          className="flex min-w-[100px] items-center justify-center px-4"
                        >
                          {buttonText}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default NewsletterForm
