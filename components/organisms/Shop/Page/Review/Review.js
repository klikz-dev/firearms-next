import Button from '@/components/atoms/Button'
import Link from '@/components/atoms/Link'
import RangeSlider from '@/components/atoms/RangeSlider'
import ReCAPTCHA from '@/components/atoms/ReCAPTCHA'
import Title from '@/components/molecules/Title'
import { submitReview } from '@/functions/fetch/submitReview'
import moment from 'moment'
import { useState } from 'react'
import Stats from '../Stats'

export default function Review({ pageSlug, pageStats, reviews }) {
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

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit() {
    setLoading(true)
    const response = await submitReview({
      page: pageSlug,
      name: name,
      email: email,
      review: review,
      stat_acc: acc,
      stat_erg: erg,
      stat_ftr: ftr,
      stat_fit: fit,
      stat_rel: rel,
      stat_val: val,
    })

    if (response?.page) {
      setSuccess(true)
      setError(false)
    } else {
      setSuccess(false)
      setError(true)
    }
    setLoading(false)
  }

  return (
    <div id='community' className='mb-12'>
      <Title>
        <h3>Community Ratings</h3>
      </Title>

      <div className='mb-12'>
        {reviews?.length < 1 && <div className='py-4 bg-zinc-50'></div>}

        {reviews?.map((review, index) => (
          <div key={index} className={'border-b py-6'}>
            <p className='font-semibold mb-3'>{`${review.name} - ${moment(
              review.created_at
            ).calendar()}`}</p>

            <div className={'grid lg:grid-cols-2'}>
              <p className={'text-zinc-600'}>{review.review}</p>

              <Stats
                small={true}
                showTitle={false}
                pageStats={{
                  acc: review.stat_acc,
                  erg: review.stat_erg,
                  ftr: review.stat_ftr,
                  fit: review.stat_fit,
                  rel: review.stat_rel,
                  val: review.stat_val,
                  showStats: pageStats.showStats,
                }}
              />
            </div>
          </div>
        ))}
      </div>

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
          disabled={success || error || loading || recaptchaResponse === null}
        >
          {loading ? 'Sending' : 'Submit'}
        </Button>

        <ReCAPTCHA setRecaptchaResponse={setRecaptchaResponse} />
      </div>

      {error && (
        <p className={'text-red-700 text-sm'}>
          {'Sorry, your review has been declined.'}
        </p>
      )}

      {success && (
        <p className={'text-sky-800 text-sm my-2'}>
          {'Thanks for your submission!'}
        </p>
      )}
    </div>
  )
}
