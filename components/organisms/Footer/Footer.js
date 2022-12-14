import { useQuery } from '@apollo/client'
import GET_MENU_QUERY from '@/const/schema/getMenu.graphql'
import { Button, Input, Typography } from '@material-tailwind/react'
import Container from '@/components/atoms/Container'
import GradientBorder from '@/components/atoms/GradientBorder'
import { about } from '@/const/setting/footer'
import Social from '@/components/molecules/Social'
import Link from '@/components/atoms/Link'
import Image from '@/components/atoms/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
  const { data } = useQuery(GET_MENU_QUERY, {
    variables: {
      name: 'Footer ',
    },
  })
  const { menu } = data ?? {}

  const menuItems = menu?.menuItems?.nodes?.filter((item) => !item.parentId)
  console.log(menuItems)

  return (
    <footer>
      <Container className={'mb-8'}>
        <div className='relative'>
          <Image
            src={'/images/newsletter.png'}
            alt={'Newsletter'}
            width={1280}
            height={500}
          />

          <div className={'absolute w-full h-full top-0 left-0'}>
            <Typography
              variant={'paragraph'}
              className={'mt-40 text-white text-center text-lg mb-6'}
            >
              Get discounts from top brands & our latest reviews!
            </Typography>

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
                variant={'standard'}
                size={'lg'}
                color={'blue-gray'}
                label={'Email address'}
              />
            </div>

            <div className={'text-center'}>
              <Button variant={'filled'} color='black' size={'lg'}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </Container>

      <Container>
        <div className={'flex flex-col lg:flex-row justify-between gap-4 py-4'}>
          <div className={'w-5/12'}>
            <div className={'inline-block mb-6'}>
              <GradientBorder height={1} />
              <Typography variant={'h4'}>About Us</Typography>
              <GradientBorder height={1} />
            </div>

            <Typography variant={'paragraph'} className={'mb-8'}>
              {about}
            </Typography>

            <Social className={'mb-6'} />
          </div>

          {menuItems?.map((menuItem, i1) => (
            <div key={i1} className={'w-1/6'}>
              <div className={'inline-block mb-6'}>
                <GradientBorder height={1} />
                <Typography variant={'h4'}>{menuItem.label}</Typography>
                <GradientBorder height={1} />
              </div>

              {menuItem.childItems?.nodes?.map((child, i2) => (
                <div key={i2} className={'block mb-2'}>
                  <Link href={child.path}>{child.label}</Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Container>

      <Container>
        <div className={'border-t border-gray-500 grid grid-cols-2 gap-4 py-6'}>
          <Typography variant={'small'} color={'gray'}>
            Copyright © 2022 American Firearms LLC. All rights reserved.
          </Typography>

          <div className='flex flex-row'>
            {[
              { label: 'Terms of Use', path: '/terms-of-use' },
              { label: 'Privacy Policy ', path: '/terms-of-use' },
              {
                label: 'Do Not Sell My Personal Information',
                path: '/terms-of-use',
              },
              {
                label: 'Your California Privacy Rights',
                path: '/terms-of-use',
              },
            ].map((link, index) => (
              <div
                key={index}
                className={'px-2 border-r border-gray-500 text-sm'}
              >
                <Link href={link.path} className={'text-gray-700'}>
                  {link.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
