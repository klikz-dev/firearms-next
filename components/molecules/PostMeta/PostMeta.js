import {
  faFacebookF,
  faLinkedinIn,
  faPinterestP,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
} from 'next-share'
import Author from './Author'

export default function PostMeta({ title, slug, author, michael }) {
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
        <Author author={author.node} />

        {author.node?.slug !== 'michael-crites' && (
          <Author author={michael} headline={'Edited By'} />
        )}
      </div>

      <div>
        <h6 className={'mb-1'}>{'Share:'}</h6>

        <div className={'flex flex-row gap-2 items-center'}>
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
    </div>
  )
}
