import Container from '@/components/atoms/Container'
import GradientBorder from '@/components/atoms/GradientBorder'
import HTMLContent from '@/components/atoms/HTMLContent'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

export default function Authors({ authors }) {
  return (
    <div className={'py-20'}>
      <Container className={'max-w-6xl'}>
        {[...authors]
          .sort((author) => (author?.slug === 'michael-crites' ? -1 : 1))
          .filter((author) => author.slug !== 'murrell')
          ?.map((author, index) => (
            <div
              key={index}
              className={classNames(
                `flex gap-8 lg:gap-32 justify-between items-center mb-12`,
                index % 2 === 0
                  ? 'flex-col-reverse lg:flex-row'
                  : 'flex-col-reverse lg:flex-row-reverse'
              )}
            >
              <div className={'lg:w-1/2'}>
                <h2 className={'mb-1'}>{author.name}</h2>

                <h6>{author.author.position}</h6>

                <GradientBorder height={2} className={'w-40 my-4'} />

                <HTMLContent>{author.description}</HTMLContent>

                <div className={'flex flex-row gap-2 mt-4'}>
                  {author.author?.website && (
                    <Link
                      href={author.author?.website}
                      className={
                        'w-8 h-8 rounded border border-red-800 flex flex-row justify-center items-center hover:bg-red-100'
                      }
                    >
                      <FontAwesomeIcon
                        icon={faLink}
                        className={'text-red-700'}
                      />
                    </Link>
                  )}
                  {author.author?.facebook && (
                    <Link
                      href={author.author?.facebook}
                      className={
                        'w-8 h-8 rounded border border-red-800 flex flex-row justify-center items-center hover:bg-red-100'
                      }
                    >
                      <FontAwesomeIcon
                        icon={faFacebookF}
                        className={'text-red-700'}
                      />
                    </Link>
                  )}
                  {author.author?.twitter && (
                    <Link
                      href={author.author?.twitter}
                      className={
                        'w-8 h-8 rounded border border-red-800 flex flex-row justify-center items-center hover:bg-red-100'
                      }
                    >
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className={'text-red-700'}
                      />
                    </Link>
                  )}
                  {author.author?.linkedin && (
                    <Link
                      href={author.author?.linkedin}
                      className={
                        'w-8 h-8 rounded border border-red-800 flex flex-row justify-center items-center hover:bg-red-100'
                      }
                    >
                      <FontAwesomeIcon
                        icon={faLinkedin}
                        className={'text-red-700'}
                      />
                    </Link>
                  )}
                  {author.author?.instagram && (
                    <Link
                      href={author.author?.instagram}
                      className={
                        'w-8 h-8 rounded border border-red-800 flex flex-row justify-center items-center hover:bg-red-100'
                      }
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className={'text-red-700'}
                      />
                    </Link>
                  )}
                  {author.author?.youtube && (
                    <Link
                      href={author.author?.youtube}
                      className={
                        'w-8 h-8 rounded border border-red-800 flex flex-row justify-center items-center hover:bg-red-100'
                      }
                    >
                      <FontAwesomeIcon
                        icon={faYoutube}
                        className={'text-red-700'}
                      />
                    </Link>
                  )}
                </div>
              </div>

              <div className={'lg:w-1/2 flex flex-row justify-center'}>
                <div className={'relative w-96 max-w-full h-96'}>
                  <Image
                    src={author.author?.image?.sourceUrl}
                    alt={author.author?.image?.altText}
                    layout={'fill'}
                    className={'object-cover'}
                  />
                </div>
              </div>
            </div>
          ))}
      </Container>
    </div>
  )
}
