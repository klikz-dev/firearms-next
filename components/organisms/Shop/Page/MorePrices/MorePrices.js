import Link from '@/components/atoms/Link'

export default function MorePrices({ category, relatedPages }) {
  return (
    <div className='sticky top-10 border border-zinc-200 rounded shadow mb-8'>
      <div className='px-3 py-2 bg-zinc-700 text-white font-bold capitalize'>
        More {category.name} Prices
      </div>

      <div className='py-3 px-5'>
        {relatedPages.map((page, index) => (
          <Link
            key={index}
            href={`/shop/${page.slug}/`}
            className='block hover:text-red-700 mb-1 capitalize'
          >
            {page.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
