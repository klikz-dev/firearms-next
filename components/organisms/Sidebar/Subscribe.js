import { useState } from 'react'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import sendEmail from '@/functions/sendEmail'

export default function Subscribe() {
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    sendEmail(
      `<${email}>`,
      process.env.NEXT_PUBLIC_TO_EMAIL,
      'American Firearms Email Subscription',
      `<p style='margin-top: 20px; margin-bottom: 20px;'>New email subscription from <strong>${email}</strong></p>`
    )

    setSuccess(true)
  }

  return (
    <div className='relative bg-red-700 p-8 text-center mb-16'>
      <FontAwesomeIcon
        icon={faEnvelopeOpenText}
        className={'text-white text-4xl mb-4'}
        width={60}
        height={60}
      />

      <h5 className={'text-white mb-4'}>Sign up for our newsletter</h5>

      <div className={'mx-4 bg-white h-0.5'} />

      <p className={'text-white text-center text-sm my-6'}>
        Get discounts from top brands and our latest reviews!
      </p>

      <div
        className={
          'max-w-2xl mx-auto bg-white/20 px-3 py-2 mb-6 flex flex-row gap-2 items-center'
        }
      >
        <FontAwesomeIcon
          icon={faEnvelopeOpenText}
          className={'mt-1 border-r border-white/40 pr-3 py-1 text-white'}
        />
        <Input
          placeholder={'Email address'}
          value={email}
          setValue={setEmail}
          type={'email'}
          className={
            'bg-transparent text-sm placeholder:text-white/60 text-white'
          }
        />
      </div>

      <div className={'text-center'}>
        <Button
          color='black'
          size={'lg'}
          onClick={handleSubmit}
          disabled={success}
        >
          {success ? 'Subscribed' : 'Submit'}
        </Button>
      </div>
    </div>
  )
}
