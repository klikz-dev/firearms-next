import Link from '@/components/atoms/Link'

export default function MoreEssentials({ relatedCategories }) {
  return (
    <div className='border border-zinc-100 rounded shadow mb-8'>
      <div className='px-3 py-2 bg-dark text-white font-bold capitalize'>
        More essential lists
      </div>

      <div className='py-3 px-5'>
        {relatedCategories.map((category, index) => (
          <Link
            key={index}
            href={`/shop/categories/popular/${category.slug}`}
            className='block font-semibold hover:text-red-700 mb-1'
          >
            Most Popular {category.name}
          </Link>
        ))}
      </div>
    </div>
  )
}
