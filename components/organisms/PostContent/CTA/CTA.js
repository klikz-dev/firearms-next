import Button from '@/components/atoms/Button'
import GradientBorder from '@/components/atoms/GradientBorder'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import { getPage } from '@/functions/fetch/getPage'
import getStats from '@/functions/getStats'
import Badge from '../../Shop/Page/Badge'
import Stats from '../../Shop/Page/Stats'
import Awards from '../../Shop/Page/Awards'
import OtherSellers from './OtherSellers'

export default function CTA({
  buttonText,
  link,
  price,
  title,
  image,
  productSlug,
}) {
  const { data: page } = getPage(productSlug)

  const pageStats =
    page && page.brand && page.category && page.product
      ? getStats(page.brand.name, page.category.name, page.product.length, {
          acc: page.stat_acc,
          erg: page.stat_erg,
          ftr: page.stat_ftr,
          fit: page.stat_fit,
          rel: page.stat_rel,
          val: page.stat_val,
        })
      : undefined

  const search =
    page?.title
      ?.split(' ')
      .reduce((accumulator, piece) => {
        if (accumulator.length === 0) {
          return piece
        } else if (accumulator.length < 30) {
          return `${accumulator} ${piece}`
        } else {
          return accumulator
        }
      }, '')
      .replace(/&+/g, 'and') ?? title

  return (
    <div className={'p-1 overflow-hidden mb-8'}>
      <div className={'relative border border-zinc-300'}>
        <Link href={link}>
          <Image
            src={image?.sourceUrl}
            alt={image?.altText}
            width={image?.mediaDetails?.width}
            height={image?.mediaDetails?.height}
          />
        </Link>

        {price && (
          <div
            className={
              'absolute -top-20 -right-20 w-40 h-40 p-4 flex items-end justify-center rotate-45 bg-gradient-to-r from-red-800 to-red-500'
            }
          >
            <h4 className={'text-white'}>{`$${price}`}</h4>
          </div>
        )}

        <div className={'flex flex-col md:flex-row justify-between'}>
          <div className={'px-4 pb-4 text-center md:text-left'}>
            <h4>{title}</h4>
            <GradientBorder
              height={2}
              className={'w-32 my-3 mx-auto md:ml-0'}
            />
            <Link href={link}>
              <Button color={'red'}>{buttonText}</Button>
            </Link>
          </div>

          <div className={'px-4 pb-4 md:w-1/2 flex flex-row justify-center'}>
            {pageStats && <Badge pageStats={pageStats} small />}
          </div>
        </div>

        <div className={'grid lg:grid-cols-2 gap-4 px-4'}>
          <Awards
            page={page}
            brandRank={page?.pre_brand_rank}
            categoryRank={page?.pre_category_rank}
            small
          />

          {pageStats && <Stats pageStats={pageStats} small />}
        </div>

        {search && <OtherSellers buttonText={buttonText} search={search} />}
      </div>
    </div>
  )
}
