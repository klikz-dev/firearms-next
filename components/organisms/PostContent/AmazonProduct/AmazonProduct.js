import Button from '@/components/atoms/Button'
import GradientBorder from '@/components/atoms/GradientBorder'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import { faAmazon } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/**
 * Amazon CTA rendered from CMS fields in the standard CTA style. The link is
 * built server-side from the ASIN and partner tag (see pages/[slug].js), so
 * no Product Advertising API call is needed.
 */
export default function AmazonProduct({
  productId,
  title,
  image,
  price,
  amazonLink,
}) {
  if (!amazonLink) return null

  return (
    <div id={`amazon-${productId}`} className={'p-1 overflow-hidden mb-8'}>
      <div className={'relative border border-zinc-300'}>
        {image?.sourceUrl && (
          <Link href={amazonLink}>
            <Image
              src={image.sourceUrl}
              alt={image.altText || title}
              width={image.mediaDetails?.width}
              height={image.mediaDetails?.height}
            />
          </Link>
        )}

        {price && (
          <div
            className={
              'absolute -top-20 -right-20 w-40 h-40 p-4 flex items-end justify-center rotate-45 bg-gradient-to-r from-red-800 to-red-500'
            }
          >
            <h4 className={'text-white'}>{`$${price}`}</h4>
          </div>
        )}

        <div className={'px-4 pt-4 pb-4 text-center md:text-left'}>
          <h4 className={price && !image?.sourceUrl ? 'pr-16' : ''}>
            {title || 'See this product on Amazon'}
          </h4>
          <GradientBorder height={2} className={'w-32 my-3 mx-auto md:ml-0'} />
          <Link href={amazonLink}>
            <Button color={'red'}>
              <span className={'inline-flex flex-row items-center gap-2'}>
                <FontAwesomeIcon icon={faAmazon} />
                {'View on Amazon'}
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
