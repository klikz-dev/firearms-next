import Button from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import { getAmazonProduct } from '@/functions/fetch/amazon'
import { faAmazon } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function AmazonProduct({ productId }) {
  const { data: product } = getAmazonProduct(productId)

  const { DetailPageURL: link } = product || {}
  const { DisplayValue: title } = product?.ItemInfo?.Title || {}
  const { DisplayValues: features } = product?.ItemInfo?.Features || {}
  const {
    URL: imgSrc,
    Width: imgWidth,
    Height: imgHeight,
  } = product?.Images?.Primary?.Large || {}
  const { DisplayAmount: price } = product?.Offers?.Listings[0]?.Price || {}

  return (
    <div className={'p-1 overflow-hidden mb-8'}>
      <div
        className={
          'relative bg-zinc-100 border border-zinc-300 grid lg:grid-cols-2 gap-4'
        }
      >
        <div className={'flex flex-col justify-center lg:py-16'}>
          <div
            className={
              'absolute -top-20 -left-20 w-40 h-40 p-3 flex items-end justify-center -rotate-45 bg-gradient-to-r from-red-800 to-red-500'
            }
          >
            <h4 className={'text-white'}>{`${price}`}</h4>
          </div>

          <Image src={imgSrc} alt={title} width={imgWidth} height={imgHeight} />
        </div>

        <div className={'flex flex-col justify-center px-2 py-4'}>
          <h4>{title}</h4>

          <ul className='py-4'>
            {features?.map((feature, index) => (
              <li key={index} className='text-sm mb-2'>
                <span className='line-clamp-2'>{feature}</span>
              </li>
            ))}
          </ul>

          <Link href={link}>
            <Button color={'yellow'}>
              <div className={'flex flex-row items-center gap-1'}>
                <FontAwesomeIcon icon={faAmazon} />
                {'Check Price on Amazon'}
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
