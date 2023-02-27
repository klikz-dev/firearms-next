import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'

export default function OtherSellers({ buttonText, search }) {
  const otherSellers = [
    {
      brand: 'guns',
      baseURL:
        'https://www.avantlink.com/click.php?tt=el&merchant_id=7486894c-de29-4e50-8d4e-87ffc84a0095&website_id=8e050264-837a-449c-93fc-952a4c1e3806&url=https%3A%2F%2Fwww.guns.com%2Fsearch%3Fkeyword%3D',
      image: '/images/brand-guns.png',
    },
    {
      brand: 'primary arms',
      baseURL:
        'https://www.avantlink.com/click.php?tt=el&merchant_id=1a498dc6-68d7-4869-a04b-fb2a535f2650&website_id=8e050264-837a-449c-93fc-952a4c1e3806&url=https%3A%2F%2Fwww.primaryarms.com%2Fsearch%3Fkeywords%3D',
      image: '/images/brand-primary-arms.png',
    },
    {
      brand: 'brownells',
      baseURL:
        'https://www.avantlink.com/click.php?tt=el&merchant_id=855e0b56-67a2-40d0-aa2b-a0764ca94489&website_id=8e050264-837a-449c-93fc-952a4c1e3806&url=https%3A%2F%2Fwww.brownells.com%2Fsearch%2Findex.htm%3Fk%3D',
      image: '/images/brand-brownells.png',
    },
    {
      brand: 'palmetto state armory',
      baseURL:
        'https://www.avantlink.com/click.php?tt=el&merchant_id=366d8fa6-2a72-4d59-bc31-583f74cfd91b&website_id=8e050264-837a-449c-93fc-952a4c1e3806&url=https%3A%2F%2Fpalmettostatearmory.com%2Fcatalogsearch%2Fresult%2F%3Fq%3D',
      image: '/images/brand-palmetto.png',
    },
  ].filter((seller) => {
    return !seller.brand?.includes(
      buttonText?.toLowerCase()?.replace('view at', '').trim()
    )
  })

  return (
    <div className={'flex flex-col lg:flex-row lg:items-center lg:gap-8 p-4'}>
      <h4 className='text-center'>Other Sellers:</h4>

      <div className={'flex-grow grid lg:grid-cols-3 lg:gap-8'}>
        {otherSellers?.map((seller) => (
          <div
            key={seller.brand}
            className={'cols-span-1 flex flex-row justify-center'}
          >
            <Link
              href={`${seller.baseURL}${search}`}
              className={'block relative col-span-1 w-40 h-16'}
            >
              <Image
                src={seller.image}
                fill={true}
                alt={seller.brand}
                className={'object-contain'}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
