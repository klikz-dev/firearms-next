import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import {
  faFacebookF,
  faLinkedinIn,
  faPinterestP,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faCalendarDays, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from 'next-share'

export default function PostMeta({ title, slug, author, date }) {
  return (
    <div
      className={
        'flex flex-col md:flex-row justify-between gap-4 items-start md:items-center'
      }
    >
      <div
        className={
          'flex flex-col md:flex-row gap-4 items-start md:items-center'
        }
      >
        <div className={'flex flex-row items-center gap-2'}>
          <div className={'rounded-full border-2 p-0.5 border-red-600'}>
            <div className={'relative w-6 h-6 rounded-full overflow-hidden'}>
              <Image
                fill={true}
                src={author?.node?.avatar?.url}
                alt={author?.node?.name}
                className={'object-cover'}
              />
            </div>
          </div>

          <Link href={`/author/${author?.node?.slug}`} className={'mr-4'}>
            {author?.node?.name}
          </Link>
        </div>

        <div className={'flex flex-row items-center gap-2'}>
          <div
            className={
              'p-1 bg-red-500/20 rounded-full w-6 h-6 flex items-center justify-center'
            }
          >
            <FontAwesomeIcon icon={faCalendarDays} className={'text-red-700'} />
          </div>

          <p className={'text-sm'}>{`Updated: ${moment(date).format(
            'MMMM D, YYYY'
          )}`}</p>
        </div>
      </div>

      <div className={'flex flex-row gap-2 items-center'}>
        <p>{'Share'}</p>

        <FacebookShareButton
          url={`https://www.americanfirearms.org/${slug}/`}
          quote={title}
          className={
            'w-6 h-6 rounded border border-red-800 flex flex-row justify-center items-center hover:bg-red-100'
          }
        >
          <div
            className={
              'w-6 h-6 rounded border border-red-800 flex flex-row justify-center items-center hover:bg-red-100'
            }
          >
            <FontAwesomeIcon icon={faFacebookF} className={'text-red-700'} />
          </div>
        </FacebookShareButton>

        <TwitterShareButton
          url={`https://www.americanfirearms.org/${slug}/`}
          title={title}
        >
          <div
            className={
              'w-6 h-6 rounded border border-red-800 flex flex-row justify-center items-center hover:bg-red-100'
            }
          >
            <FontAwesomeIcon icon={faTwitter} className={'text-red-700'} />
          </div>
        </TwitterShareButton>

        <LinkedinShareButton
          url={`https://www.americanfirearms.org/${slug}/`}
          title={title}
        >
          <div
            className={
              'w-6 h-6 rounded border border-red-800 flex flex-row justify-center items-center hover:bg-red-100'
            }
          >
            <FontAwesomeIcon icon={faLinkedinIn} className={'text-red-700'} />
          </div>
        </LinkedinShareButton>

        <PinterestShareButton
          url={`https://www.americanfirearms.org/${slug}/`}
          title={title}
        >
          <div
            className={
              'w-6 h-6 rounded border border-red-800 flex flex-row justify-center items-center hover:bg-red-100'
            }
          >
            <FontAwesomeIcon icon={faPinterestP} className={'text-red-700'} />
          </div>
        </PinterestShareButton>

        <EmailShareButton
          url={`https://www.americanfirearms.org/${slug}/`}
          title={title}
        >
          <div
            className={
              'w-6 h-6 rounded border border-red-800 flex flex-row justify-center items-center hover:bg-red-100'
            }
          >
            <FontAwesomeIcon icon={faEnvelope} className={'text-red-700'} />
          </div>
        </EmailShareButton>
      </div>
    </div>
  )
}
