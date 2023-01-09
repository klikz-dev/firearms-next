import Container from '@/components/atoms/Container'
import GradientBorder from '@/components/atoms/GradientBorder'
import HTMLContent from '@/components/atoms/HTMLContent'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'

export default function Authors({ authors }) {
  return (
    <div className={'py-20'}>
      <Container className={'max-w-6xl'}>
        {authors?.map((author, index) => (
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

              <p>{author.title}</p>

              <GradientBorder height={2} className={'w-40 my-4'} />

              <HTMLContent>{author.bio}</HTMLContent>

              <div className={'flex flex-row gap-2 mt-4'}>
                {author.facebook && (
                  <Link
                    key={index}
                    href={author.facebook}
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
                {author.twitter && (
                  <Link
                    key={index}
                    href={author.twitter}
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
              </div>
            </div>

            <div className={'lg:w-1/2'}>
              <Image
                src={author.photo?.sourceUrl}
                width={author.photo?.mediaDetails?.width}
                height={author.photo?.mediaDetails?.height}
                alt={author.photo?.altText}
              />
            </div>
          </div>
        ))}
      </Container>
    </div>
  )
}
