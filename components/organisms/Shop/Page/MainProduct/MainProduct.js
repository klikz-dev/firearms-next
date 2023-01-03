import Button from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'
import convertRetailer from '@/functions/convertRetailer'
import toCapitalize from '@/functions/toCapitalize'
import moment from 'moment'

export default function MainProduct({ product }) {
  return (
    <div className='p-4 border border-zinc-100 rounded shadow grid lg:grid-cols-4 gap-8 mb-12'>
      <div className='lg:col-span-1 relative h-40'>
        <Image
          src={product.image_url}
          alt={toCapitalize(product.name)}
          fill={true}
        />
      </div>

      <div className='lg:col-span-2 flex flex-col justify-center'>
        <h2 className='text-2xl font-bold md:mb-3'>
          {toCapitalize(product.name)}
        </h2>

        <p className='md:mb-3 font-semibold'>
          {convertRetailer(product.retailer)}
        </p>

        <p className='capitalize'>{`Condition: ${
          product.condition || 'New'
        }`}</p>
      </div>

      <div className='lg:col-span-1 flex flex-col justify-center items-center'>
        <p className='text-lg font-semibold mb-1.5 md:mb-4 text-center'>{`Best Price: $${product?.sale_price?.toFixed(
          2
        )}`}</p>

        <Button
          text='See Deal'
          href={product.buy_link}
          type='secondary'
          urlExternal={true}
          className='mb-2 md:mb-4'
        />

        {product?.updated_at && (
          <p className='text-sm font-medium text-center'>
            {`Last Updated: ${moment(product.updated_at).format('MM/DD/YYYY')}`}
          </p>
        )}
      </div>
    </div>
  )
}
