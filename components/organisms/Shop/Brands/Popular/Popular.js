import Button from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import getBulkStats from '@/functions/getBulkStats'
import moment from 'moment'
import Badge from '../../Page/Badge'

export default function PopularCategory({ pages }) {
  pages = getBulkStats(pages)

  return (
    <div className={'overflow-auto'}>
      <div style={{ minWidth: '1200px' }}>
        <div className={'my-8'}>
          {pages.map((page, index) => (
            <div
              key={index}
              className={
                'bg-white h-40 my-3 border border-zinc-300 hover:border-red-600 hover:shadow-xl flex items-center'
              }
            >
              <div className='px-6 py-2 w-1/6 flex justify-center items-center'>
                <Badge
                  pageStats={page.pageStats}
                  small={true}
                  reviewCount={page.product_num}
                />
              </div>

              <div className='px-6 py-2 w-1/6'>
                <div className='relative h-32 w-32 rounded-lg border border-zinc-200 overflow-hidden flex justify-center items-center'>
                  <Image
                    src={page.thumb_url}
                    width={128}
                    height={128}
                    alt={page.title}
                  />
                </div>
              </div>

              <div className='px-6 py-2 w-1/2 capitalize'>
                <h5 className={'mb-1'}>{page.title.toLowerCase()}</h5>

                <h6 className={'text-sm'}>
                  <span className={'font-semibold'}>Style: </span>
                  {page.subcategory ?? ''}
                </h6>

                <h6 className={'text-sm mb-2'}>
                  <span className={'font-semibold'}>Updated: </span>
                  {moment(page.updated_at).calendar()}
                </h6>

                <p className={'text-sm'}>
                  {`${page.description?.split(' ').slice(0, 25).join(' ')} ...`}
                </p>
              </div>

              <div className='px-6 py-2 w-1/6'>
                <Link href={`/shop/${page.slug}/`}>
                  <Button color={'white'}>View Prices</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
