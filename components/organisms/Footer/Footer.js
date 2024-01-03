import { useState } from 'react'
import Container from '@/components/atoms/Container'
import { about, menu } from '@/const/setting/footer'
import Social from '@/components/molecules/Social'
import Link from '@/components/atoms/Link'
import Image from '@/components/atoms/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import Title from '@/components/molecules/Title'
import Subscribe from '../Sidebar/Subscribe'
import sendEmail from '@/functions/sendEmail'
import moment from 'moment'

export default function Footer() {
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
    <footer>
      <div
        style={{
          background:
            'linear-gradient(180deg, white 0%, white 40%, #e4e4e799 40%, #e4e4e799 100%)',
        }}
      >
        <Container className={'pb-8 hidden lg:block'}>
          <div className='relative'>
            <Image
              src='/images/newsletter.png'
              width={1240}
              height={432}
              alt={'Newsletter'}
            />

            <div className={'absolute w-full h-full top-0 left-0'}>
              <p className={'mt-40 text-white text-center text-lg mb-6'}>
                Get discounts from top brands & our latest reviews!
              </p>

              <div
                className={
                  'max-w-2xl mx-auto bg-white px-6 py-4 mb-6 flex flex-row gap-2 items-center'
                }
              >
                <FontAwesomeIcon
                  icon={faEnvelopeOpenText}
                  className={'mt-1 border-r border-gray-500 p-2'}
                />
                <Input
                  placeholder={'Email address'}
                  value={email}
                  setValue={setEmail}
                  type={'email'}
                  className='px-4 py-1.5 w-full placeholder:italic placeholder:text-black/50 text-black outline-none border-none ring-0 mt-1'
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
          </div>
        </Container>
      </div>

      <div className={'lg:hidden bg-zinc-200/60'}>
        <Subscribe />
      </div>

      <div className={'bg-zinc-200/60'}>
        <Container>
          <div
            className={'flex flex-col lg:flex-row justify-between gap-4 py-4'}
          >
            <div className={'lg:w-5/12'}>
              <Title>
                <h4>About Us</h4>
              </Title>

              <p className={'mb-8'}>{about}</p>

              <Social className={'mb-6'} />
            </div>

            {menu?.map((menuItem, i1) => (
              <div key={i1} className={'lg:w-1/6'}>
                <Title>
                  <h4>{menuItem.label}</h4>
                </Title>

                {menuItem.subMenus?.map((subMenu, i2) => (
                  <div key={i2} className={'block mb-2'}>
                    <Link
                      href={subMenu.path}
                      className={
                        'border-b border-transparent hover:border-red-700'
                      }
                    >
                      {subMenu.label}
                    </Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Container>

        <Container>
          <div
            className={'border-t border-gray-500 grid grid-cols-2 gap-4 py-6'}
          >
            <p className={'text-sm font-display text-gray-600'}>
              {`Copyright © ${moment().format(
                'YYYY'
              )} American Firearms LLC. All rights reserved.`}
            </p>

            <div className='flex flex-col lg:flex-row'>
              {[
                { label: 'Terms of Use', path: '/terms-service' },
                { label: 'Privacy Policy ', path: '/privacy-policy' },
                {
                  label: 'Do Not Sell My Personal Information',
                  path: '/terms-service',
                },
                {
                  label: 'Your California Privacy Rights',
                  path: '/privacy-policy',
                },
              ].map((link, index) => (
                <div
                  key={index}
                  className={
                    'px-2 lg:border-r border-gray-500 text-sm last:border-none mb-2 lg:mb-0'
                  }
                >
                  <Link
                    href={link.path}
                    className={
                      'text-xs text-gray-600 uppercase border-b border-transparent hover:border-red-700'
                    }
                  >
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
