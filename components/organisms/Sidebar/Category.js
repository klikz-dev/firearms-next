import Button from '@/components/atoms/Button'
import Date from '@/components/atoms/Date'
import Link from '@/components/atoms/Link'
import Background from '@/components/molecules/Background'

export default function Category({ posts, link }) {
  return (
    <>
      {posts?.map((post, index) => (
        <Link href={`/${post.slug}`} key={index}>
          <div className={'mb-4'}>
            <div className={'relative h-56 flex flex-col justify-end z-10'}>
              <Background
                image={post.featuredImage?.node?.sourceUrl}
                alt={post.featuredImage?.node?.altText}
              />
            </div>

            <div className={'p-4'}>
              <Date date={post.date} className={''} />
              <h4 className={'mb-4 line-clamp-2'}>{post.title}</h4>
              <div className={'h-0.5 bg-zinc-400 mx-1'} />
            </div>
          </div>
        </Link>
      ))}

      <div className={'text-center pb-4 px-4'}>
        <Link href={link} className={'mb-6'}>
          <Button size={'full'} color={'red'}>
            {'View More Posts'}
          </Button>
        </Link>
      </div>
    </>
  )
}
