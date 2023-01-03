import Button from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import toCapitalize from '@/functions/toCapitalize'

export default function Subcategory({ brandSlug, subcategory, collapse }) {
  const pages = []
  subcategory?.product?.map((product) => {
    if (
      pages.filter((page) => page.slug === product.page[0]?.slug).length ===
        0 &&
      product.page[0]?.slug
    ) {
      pages.push({
        slug: product.page[0]?.slug,
        title: product.name,
        image: product.image_url,
      })
    }
  })

  return (
    <>
      {pages?.length > 0 && (
        <div className='p-8 border border-zinc-100 rounded shadow-lg mb-12'>
          {collapse && (
            <h2 className='text-2xl font-bold mb-6 underline'>
              {toCapitalize(subcategory?.name)}
            </h2>
          )}

          <div className='grid lg:grid-cols-3 gap-8 mb-8'>
            {pages
              ?.slice(0, collapse ? 3 : pages?.length)
              .map((page, index) => (
                <div key={index} className='mb-8'>
                  <h3 className='text-lg font-semibold line-clamp-2 mb-3 text-center'>
                    {toCapitalize(page.title)}
                  </h3>

                  <div className='relative w-full h-36 mb-2 '>
                    <Image src={page.image} fill={true} />
                  </div>

                  <div className='flex justify-center'>
                    <Button
                      href={`/shop/${page.slug}/`}
                      text='View Prices'
                      type='secondary'
                    />
                  </div>
                </div>
              ))}
          </div>

          {collapse && (
            <div className='flex justify-end'>
              <Link
                href={`/shop/brands/${brandSlug}/${subcategory?.slug}`}
                className='text-blue-800 font-bold underline'
              >
                View all {subcategory?.name}
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  )
}
