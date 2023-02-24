import Button from '@/components/atoms/Button'
import Image from '@/components/atoms/Image'
import Link from '@/components/atoms/Link'
import Title from '@/components/molecules/Title'
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
        <div className='p-8 border border-zinc-200 rounded shadow-lg mb-12'>
          {collapse && (
            <Title>
              <h2>{toCapitalize(subcategory?.name)}</h2>
            </Title>
          )}

          <div className='grid lg:grid-cols-3 gap-8 mb-8'>
            {pages
              ?.slice(0, collapse ? 3 : pages?.length)
              .map((page, index) => (
                <div key={index} className='mb-8'>
                  <h5 className='line-clamp-2 mb-3 text-center'>
                    {toCapitalize(page.title)}
                  </h5>

                  <div className='relative w-full h-36 mb-2 bg-white'>
                    <Image
                      src={page.image}
                      fill={true}
                      sizes={
                        '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px'
                      }
                      className={'object-contain bg-white'}
                      alt={page.title}
                    />
                  </div>

                  <div className='flex justify-center'>
                    <Link href={`/shop/${page.slug}/`}>
                      <Button color={'red'}>View Prices</Button>
                    </Link>
                  </div>
                </div>
              ))}
          </div>

          {collapse && (
            <div className='flex justify-end'>
              <Link
                href={`/shop/brands/${brandSlug}/${subcategory?.slug}`}
                className='text-red-700 underline'
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
