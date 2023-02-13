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
        grayBackground && 'bg-zinc-200/60',
        paddingTop > 19 && `pt-10 lg:pt-20`,
        paddingTop > 9 && paddingTop < 20 && `pt-5 lg:pt-10`,
        paddingTop < 10 && `pt-2 lg:pt-4`,
        paddingBottom > 19 && `pb-10 lg:pb-20`,
        paddingBottom > 9 && paddingBottom < 20 && `pb-5 lg:pb-10`,
        paddingBottom < 10 && `pb-2 lg:pb-4`
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
                  sizes={
                    '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px'
                  }
                  alt={post?.featuredImage?.node?.altText}
                  className={'object-cover'}
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
