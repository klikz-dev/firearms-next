import Container from '@/components/atoms/Container'
import Date from '@/components/atoms/Date'
import GradientBorder from '@/components/atoms/GradientBorder'
import HTMLContent from '@/components/atoms/HTMLContent'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import Title from '@/components/molecules/Title'
import classNames from 'classnames'

export default function Taxonomy({ customLink, customTitle, tag, style }) {
  const { name, description, slug, taxonomy, posts } = tag ?? {}
  const { grayBackground, paddingBottom, paddingTop } = style ?? {}

  return (
    <div
      className={classNames(
        'py-10 lg:py-20',
        grayBackground && 'bg-zinc-200/60',
        `pt-${paddingTop / 2} lg:pt-${paddingTop} pb-${
          paddingBottom / 2
        } lg:pb-${paddingBottom}`
      )}
    >
      <Container className={'max-w-6xl'}>
        <Image
          src={taxonomy?.thumbnail?.sourceUrl}
          width={taxonomy?.thumbnail?.mediaDetails?.width || 80}
          height={taxonomy?.thumbnail?.mediaDetails?.height || 80}
          alt={taxonomy?.thumbnail?.altText}
          className={'mb-8'}
        />

        <div className={'flex flex-row justify-between items-center'}>
          <Title>
            <h3>{customTitle || name}</h3>
          </Title>

          <Link
            href={customLink || `/tag/${slug}`}
            className={'mb-4 border-b border-red-700'}
          >
            View all {customTitle || name}
          </Link>
        </div>

        {description && <p className={'mb-6'}>{description}</p>}

        <div className={'grid lg:grid-cols-3 gap-3 mb-6'}>
          {posts?.nodes?.map((post, index) => (
            <Link key={index} href={`/${post.slug}`}>
              <div className={'relative h-48 mb-3'}>
                <Image
                  src={post?.featuredImage?.node?.sourceUrl}
                  fill={true}
                  alt={post?.featuredImage?.node?.altText}
                />
              </div>

              <Date date={post.date} className={'text-gray-600'} />

              <h4 className={'line-clamp-2 mb-3'}>{post.title}</h4>

              <HTMLContent className={'line-clamp-3'}>
                {post.excerpt}
              </HTMLContent>
            </Link>
          ))}
        </div>

        <GradientBorder height={1} />
      </Container>
    </div>
  )
}
