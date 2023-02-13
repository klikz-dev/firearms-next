import Button from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import convertRetailer from '@/functions/convertRetailer'
import { getProduct } from '@/functions/fetch/getProduct'
import toCapitalize from '@/functions/toCapitalize'
import moment from 'moment'

export default function Product({ sku }) {
  const { data: product } = getProduct(sku)

  return (
    <>
      {product && (
        <div className='p-4 border border-zinc-200 rounded shadow grid lg:grid-cols-4 gap-8 mb-12'>
          <div className='lg:col-span-1 relative h-40'>
            <Image
              src={product.image_url}
              alt={toCapitalize(product.name)}
              fill={true}
              sizes={'(max-width: 1024px) 50vw, 400px'}
              className={'object-contain'}
            />
          </div>

          <div className='lg:col-span-2 flex flex-col justify-center'>
            <h2 className='text-2xl font-bold mb-3'>
              {toCapitalize(product.name)}
            </h2>

            <p className='mb-3 font-semibold'>
              {convertRetailer(product.retailer)}
            </p>

            <p className='capitalize text-sm'>{`Condition: ${
              product.condition || 'New'
            }`}</p>
          </div>

          <div className='lg:col-span-1 flex flex-col justify-center items-center'>
            <h5 className='text-lg mb-1.5 md:mb-4 text-center'>{`Best Price: $${product?.sale_price?.toFixed(
              2
            )}`}</h5>

            <Link href={product.buy_link} urlExternal={true}>
              <Button color={'red'} className='mb-2 md:mb-4'>
                See Deal
              </Button>
            </Link>

            <h6 className='text-sm text-center'>
              {`Last Updated: ${moment(product.updated_at).format(
                'MM/DD/YYYY'
              )}`}
            </h6>
          </div>
        </div>
      )}
    </>
  )
}
