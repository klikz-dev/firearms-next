import HTMLContent from '@/components/atoms/HTMLContent'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import Title from '@/components/molecules/Title'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * "Meet the Experts" block built from the author bio profiles of the writer
 * and editor of the post.
 */
export default function MeetTheExperts({ experts = [] }) {
  const people = experts.filter((expert) => expert?.author?.name)

  if (!people.length) return null

  return (
    <section
      id='meet-the-experts'
      data-section='Meet the Experts'
      className={'mb-12'}
    >
      <Title>
        <h2>Meet the Experts</h2>
      </Title>

      <div className={'grid gap-6'}>
        {people.map(({ author, headline }) => {
          const photo = author.author?.image?.sourceUrl ?? author.avatar?.url
          const credentials = author.author?.credentials ?? []

          return (
            <div
              key={`${headline}-${author.slug}`}
              className={
                'flex flex-col sm:flex-row gap-5 border border-zinc-300 p-5'
              }
            >
              <div
                className={
                  'relative w-28 h-28 shrink-0 rounded-full overflow-hidden bg-zinc-100'
                }
              >
                <Image
                  src={photo}
                  alt={author.author?.image?.altText || author.name}
                  fill={true}
                  sizes='112px'
                  className={'object-cover'}
                />
              </div>

              <div className={'min-w-0'}>
                <p
                  className={
                    'text-xs uppercase tracking-wider text-zinc-500 mb-1'
                  }
                >
                  {headline}
                </p>

                <Link href={`/author/${author.slug}/`}>
                  <h4 className={'hover:text-red-700'}>{author.name}</h4>
                </Link>

                {author.author?.position && (
                  <p className={'text-sm underline mb-2'}>
                    {author.author.position}
                  </p>
                )}

                {author.description && (
                  <HTMLContent className={'text-sm mb-3'}>
                    {author.description}
                  </HTMLContent>
                )}

                {credentials.length > 0 && (
                  <ul className={'mb-3'}>
                    {credentials.map(({ credential }, index) => (
                      <li
                        key={index}
                        className={
                          'flex flex-row gap-1.5 items-center text-sm mb-1'
                        }
                      >
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className={'text-red-700'}
                        />
                        <span>{credential}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <Link
                  href={`/author/${author.slug}/`}
                  className={'text-red-600 text-sm hover:underline'}
                >
                  Read Full Bio
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
