import Container from '@/components/atoms/Container'
import HTMLContent from '@/components/atoms/HTMLContent'
import Title from '@/components/molecules/Title'
import sendEmail from '@/functions/sendEmail'
import classNames from 'classnames'
import { useState } from 'react'
import styles from './ContactForm.module.scss'

export default function ContactForm({ content, formTitle, style }) {
  const { grayBackground, paddingBottom, paddingTop } = style ?? {}

  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    sendEmail(
      `${name} <${email}>`,
      process.env.NEXT_PUBLIC_TO_EMAIL,
      'American Firearms Customer Request',
      `
        <h3 style='font-size: 1.5em; margin-top: 20px; margin-bottom: 20px;'>
          New contact form submission from <strong>${email}</strong>
        </h3>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
      `
    )

    setSuccess('Thanks for your message!')
  }

  return (
    <div
      className={classNames(
        'py-10 lg:py-20',
        grayBackground && 'bg-zinc-200/60',
        `pt-${paddingTop / 2} lg:pt-${paddingTop} pb-${
          paddingBottom / 2
        } lg:pb-${paddingBottom}`
      )}
    >
      <Container className={'max-w-5xl'}>
        <div className={'grid lg:grid-cols-2 gap-16'}>
          <div>
            <HTMLContent>{content}</HTMLContent>
          </div>

          <div
            className={
              'flex flex-col justify-center items-center bg-zinc-100 shadow p-6 m-1 border border-zinc-200 rounded'
            }
          >
            <Title className={'mb-12'}>
              <h3>{formTitle}</h3>
            </Title>

            <form
              action='/search'
              className='mx-auto w-full max-w-sm'
              onSubmit={handleSubmit}
            >
              <input
                id='text'
                type='text'
                name='name'
                className={styles.input}
                placeholder='Your Name'
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                id='email'
                type='email'
                name='email'
                className={styles.input}
                placeholder='Your Email'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <textarea
                id='message'
                name='message'
                className={classNames(styles.input, 'h-24')}
                placeholder='Message'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />

              <input
                type='submit'
                className={classNames(
                  'text-white bg-red-700 hover:bg-red-900 rounded px-6 py-2 w-full cursor-pointer',
                  success !== '' && 'opacity-30'
                )}
                value='Send'
                disabled={success !== ''}
              />

              {success && <p className='text-blue-700 mt-2'>{success}</p>}
            </form>
          </div>
        </div>
      </Container>
    </div>
  )
}
