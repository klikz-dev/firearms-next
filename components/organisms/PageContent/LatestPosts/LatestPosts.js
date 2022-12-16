import Container from '@/components/atoms/Container'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import Title from '@/components/molecules/Title'

export default function LatestPosts({ title, category }) {
  const { name, posts, slug } = category ?? {}
  console.log(posts)
  return (
    <Container>
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
          <div key={index}>
            <Image
              src={post?.featuredImage?.node?.sourceUrl}
              width={500}
              height={500}
              alt={post?.featuredImage?.node?.altText}
            />
          </div>
        ))}
      </div>
    </Container>
  )
}
