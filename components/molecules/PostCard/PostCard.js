import Button from '@/components/atoms/Button'
import Date from '@/components/atoms/Date'
import GradientBorder from '@/components/atoms/GradientBorder'
import HTMLContent from '@/components/atoms/HTMLContent'
import Link from '@/components/atoms/Link'
import classNames from 'classnames'
import Background from '../Background'

export function PostCardOverlay({ post, className }) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <div
        className={classNames(
          'relative h-96 flex flex-col justify-end',
          className
        )}
      >
        <Background
          image={post.featuredImage.node.sourceUrl}
          alt={post.featuredImage.node.altText}
        />

        <div className={'p-8'}>
          <Date date={post.date} className={'text-white'} />
          <h4 className={'text-white mb-4'}>{post.title}</h4>
          <GradientBorder height={2} className={'w-36'} />
        </div>
      </div>
    </Link>
  )
}

export function PostCardHorizontal({ post, className }) {
  return (
    <div className={classNames('border flex flex-row', className)}>
      <div className={'relative w-2/5 h-72 flex flex-col justify-end'}>
        <Background
          image={post.featuredImage.node.sourceUrl}
          alt={post.featuredImage.node.altText}
        />
      </div>

      <div className={'p-6 w-3/5 flex flex-col justify-between'}>
        <div>
          <Date date={post.date} className={''} />
          <h4 className={'mb-4 line-clamp-2'}>{post.title}</h4>
          <GradientBorder height={2} className={'w-36 mb-4'} />
          <HTMLContent className={'line-clamp-3 mb-3'}>
            {post.excerpt}
          </HTMLContent>
        </div>

        <Link href={`/posts/${post.slug}`}>
          <Button color={'red'} size={'sm'}>
            Learn More
          </Button>
        </Link>
      </div>
    </div>
  )
}

export function PostCardVertical({ post, className }) {
  return (
    <div className={classNames('border', className)}>
      <div className={'relative h-56 flex flex-col justify-end'}>
        <Background
          image={post.featuredImage.node.sourceUrl}
          alt={post.featuredImage.node.altText}
        />
      </div>

      <div className={'p-4'}>
        <Date date={post.date} className={''} />
        <h4 className={'mb-4 line-clamp-2'}>{post.title}</h4>
        <GradientBorder height={2} className={'w-36 mb-4'} />
        <HTMLContent className={'line-clamp-2 mb-2'}>
          {post.excerpt}
        </HTMLContent>
        <Link href={`/posts/${post.slug}`} className={'text-lg text-red-700'}>
          Learn More
        </Link>
      </div>
    </div>
  )
}