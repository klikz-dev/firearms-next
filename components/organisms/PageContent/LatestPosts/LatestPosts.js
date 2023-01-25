import Container from '@/components/atoms/Container'
import Date from '@/components/atoms/Date'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import Title from '@/components/molecules/Title'
import classNames from 'classnames'

export default function LatestPosts({ title, category, style }) {
  const { name, posts, slug } = category ?? {}
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
      <Container>
        <div className={'flex flex-row justify-between items-center'}>
          <Title>
            <h2>{title}</h2>
          </Title>

          <Link
            href={`/category/${slug}`}
            className={'mb-4 border-b border-red-700'}
          >
            View More {name}
          </Link>
        </div>

        <div className={'grid md:grid-cols-2 lg:grid-cols-4 gap-3'}>
          {posts?.nodes?.map((post, index) => (
            <Link key={index} href={`/${post.slug}`} className={'border-b'}>
              <div className={'relative h-48 mb-3'}>
                <Image
                  src={post?.featuredImage?.node?.sourceUrl}
                  fill={true}
                  alt={post?.featuredImage?.node?.altText}
                />
              </div>

              <Date date={post.date} className={'text-gray-600'} />

              <h5 className={'line-clamp-2 mb-8'}>{post.title}</h5>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  )
}
