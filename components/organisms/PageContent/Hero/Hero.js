import Button from '@/components/atoms/Button'
import Container from '@/components/atoms/Container'
import Image from '@/components/atoms/Image'
import { faClock } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'

export default function Hero({ title, subtitle, link, background }) {
  console.log(link)
  return (
    <div className={'relative'}>
      <Image
        src={background.sourceUrl}
        width={2000}
        height={1000}
        alt={background.altText}
      />

      <div className={'absolute top-0 left-0 w-full h-full'}>
        <Container className={'py-20 h-full'}>
          <div
            className={
              'max-w-sm h-full flex flex-col justify-center items-start'
            }
          >
            {link && (
              <div
                className={
                  'flex flex-row items-center gap-2 text-white text-sm mb-2'
                }
              >
                <FontAwesomeIcon icon={faClock} />
                <p className={'text-sm'}>
                  {moment(link.date).format('MMMM DD, YYYY')}
                </p>
              </div>
            )}
            <h2 className={'text-white'}>{title}</h2>

            <div className={'h-1 bg-white w-12 my-5'} />

            <p className={'text-white mb-6'}>{subtitle}</p>

            {link && <Button href={`/posts/${link.slug}`}>Learn More</Button>}
          </div>
        </Container>
      </div>
    </div>
  )
}
