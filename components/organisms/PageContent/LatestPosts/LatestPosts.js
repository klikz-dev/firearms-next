import Container from '@/components/atoms/Container'
import Date from '@/components/atoms/Date'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import Title from '@/components/molecules/Title'

export default function LatestPosts({ title, category }) {
  const { name, posts, slug } = category ?? {}

  return (
    <Container className={'mb-16'}>
      <div className={'flex flex-row justify-between items-center'}>
        <Title>
          <h3>{title}</h3>
        </Title>

        <Link
          href={`/category/${slug}`}
          className={'mb-4 border-b border-red-700'}
        >
          View More {name}
        </Link>
      </div>

      <div className={'grid grid-cols-4 gap-3'}>
        {posts?.nodes?.map((post, index) => (
          <div key={index} className={'border-b-2'}>
            <div className={'relative h-48 mb-3'}>
              <Image
                src={post?.featuredImage?.node?.sourceUrl}
                fill={true}
                cover={true}
                alt={post?.featuredImage?.node?.altText}
              />
            </div>

            <Date date={post.date} className={'text-gray-600'} />

            <h5 className={'line-clamp-2 mb-8'}>{post.title}</h5>
          </div>
        ))}
      </div>
    </Container>
  )
}
