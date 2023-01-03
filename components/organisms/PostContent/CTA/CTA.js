import Button from '@/components/atoms/Button'
import GradientBorder from '@/components/atoms/GradientBorder'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'

export default function CTA({ buttonText, link, price, title, image }) {
  return (
    <div className={'p-1 overflow-hidden mb-8'}>
      <div className={'relative bg-zinc-100 border border-zinc-300'}>
        <Image
          src={image?.sourceUrl}
          alt={image?.altText}
          width={image?.mediaDetails?.width}
          height={image?.mediaDetails?.height}
        />

        {price && (
          <div
            className={
              'absolute -top-20 -right-20 w-40 h-40 p-4 flex items-end justify-center rotate-45 bg-gradient-to-r from-red-800 to-red-500'
            }
          >
            <h4 className={'text-white'}>{`$${price}`}</h4>
          </div>
        )}

        <div className={'absolute left-4 bottom-4'}>
          <h4>{title}</h4>

          <GradientBorder height={2} className={'w-32 my-3'} />

          <Link href={link}>
            <Button color={'red'}>{buttonText}</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
