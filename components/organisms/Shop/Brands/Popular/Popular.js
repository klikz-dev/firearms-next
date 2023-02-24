import Button from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'

export default function PopularBrand({ pages }) {
  return (
    <div className={'overflow-auto'}>
      <div style={{ minWidth: '1200px' }}>
        <div
          className={
            'bg-gradient-to-b from-red-500 to-red-800 text-white sticky top-0 z-10 mb-8'
          }
        >
          <div className={'font-display flex'}>
            <span className={'px-6 py-3 w-1/12'}>No.</span>
            <span className={'px-6 py-3 w-1/12'}>Images</span>
            <span className={'px-6 py-3 w-1/3'}>Models</span>
            <span className={'px-6 py-3 w-1/6'}>Conditions</span>
            <span className={'px-6 py-3 w-1/6'}>Previous Ranks</span>
            <span className={'px-6 py-3 w-1/6'}>Full View Prices</span>
          </div>
        </div>

        <div className={'my-8'}>
          {pages.map((page, index) => (
            <div
              key={index}
              className={
                'bg-white h-20 my-3 border border-zinc-300 hover:border-red-600 hover:shadow-xl flex items-center'
              }
            >
              <div className='px-6 py-2 w-1/12'>
                <div className='w-8 h-8 bg-gradient-to-r from-red-800 to-red-500 text-white rounded-full flex justify-center items-center'>
                  <h6>{index + 1 < 10 ? `0${index + 1}` : index + 1}</h6>
                </div>
              </div>

              <div className='px-6 py-2 w-1/12'>
                <div className='relative h-16 w-16 rounded-lg bg-zinc-100 border border-zinc-200 overflow-hidden flex justify-center items-center'>
                  <Image
                    src={page.thumb_url}
                    width={64}
                    height={64}
                    alt={page.title}
                  />
                </div>
              </div>

              <div className='px-6 py-2 w-1/3 capitalize'>
                <h5>{page.title.toLowerCase()}</h5>
              </div>

              <div className='px-6 py-2 w-1/6'>
                <span>New</span>
              </div>

              <div className='px-6 py-2 w-1/6'>
                <span>
                  {page.pre_brand_rank < 1
                    ? '--'
                    : page.pre_brand_rank < 10
                    ? `0${page.pre_brand_rank}`
                    : page.pre_brand_rank}
                </span>
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
