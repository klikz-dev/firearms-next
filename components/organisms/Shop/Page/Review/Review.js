import Button from '@/components/atoms/Button'
import Link from '@/components/atoms/Link'
import RangeSlider from '@/components/atoms/RangeSlider'
import ReCAPTCHA from '@/components/atoms/ReCAPTCHA'
import Title from '@/components/molecules/Title'
import { useState } from 'react'

export default function Review({ pageStats }) {
  const [acc, setAcc] = useState(pageStats.acc)
  const [erg, setErg] = useState(pageStats.erg)
  const [ftr, setFtr] = useState(pageStats.ftr)
  const [fit, setFit] = useState(pageStats.fit)
  const [rel, setRel] = useState(pageStats.rel)
  const [val, setVal] = useState(pageStats.val)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [review, setReview] = useState('')
  const [recaptchaResponse, setRecaptchaResponse] = useState(null)

  function handleSubmit() {
    console.log('submit')
  }

  console.log(recaptchaResponse)

  return (
    <div className='mb-12'>
      <Title>
        <h3>Rate the product</h3>
      </Title>

      <div className={'grid grid-cols-2 gap-x-8 gap-y-4'}>
        {[
          {
            value: acc,
            setValue: setAcc,
            name: pageStats.showStats ? 'Accuracy' : 'Quality',
          },
          {
            value: erg,
            setValue: setErg,
            name: pageStats.showStats ? 'Ergonomics' : 'Durability',
          },
          {
            value: ftr,
            setValue: setFtr,
            name: 'Features',
          },
          {
            value: fit,
            setValue: setFit,
            name: 'Fit & Finish',
          },
          {
            value: rel,
            setValue: setRel,
            name: pageStats.showStats ? 'Reliability' : 'Design',
          },
          {
            value: val,
            setValue: setVal,
            name: 'Value',
          },
        ].map((stat, index) => (
          <RangeSlider key={index} {...stat} />
        ))}
      </div>

      <h5 className={'mt-12'}>Tell us more about your experience</h5>

      <Link
        href={'/how-we-test-review-gear/'}
        className={'inline-block mb-6 text-red-700 hover:underline'}
      >
        Read our Guidelines for Reviewers
      </Link>

      <div className={'grid grid-cols-2 gap-4 mb-4'}>
        <input
          placeholder='Email Address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={
            'w-full outline-none ring-0 border focus:border-zinc-400 p-4 text-sm rounded shadow-lg'
          }
        />

        <input
          placeholder='Full Name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={
            'w-full outline-none ring-0 border focus:border-zinc-400 p-4 text-sm rounded shadow-lg'
          }
        />
      </div>

      <textarea
        placeholder='What did you like or dislike? What did you use this product for?'
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className={
          'w-full h-40 mb-4 outline-none ring-0 border focus:border-zinc-400 p-4 text-sm rounded shadow-lg'
        }
      />

      <div className={'flex flex-row items-center gap-4'}>
        <Button
          color='black'
          size={'lg'}
          onClick={handleSubmit}
          disabled={!recaptchaResponse?.success}
        >
          Submit
        </Button>

        <ReCAPTCHA setRecaptchaResponse={setRecaptchaResponse} />
      </div>
    </div>
  )
}
