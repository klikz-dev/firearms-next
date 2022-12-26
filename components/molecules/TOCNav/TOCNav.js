import Link from '@/components/atoms/Link'

export default function TOCNav({ tocNavs }) {
  return (
    <div className='mb-12'>
      <div className={'px-5 py-3 bg-gradient-to-r from-red-800 to-red-500'}>
        <h5 className={'text-white'}>{'In This Article'}</h5>
      </div>

      <div className={'px-1 py-5 border border-zinc-300 bg-zinc-100'}>
        {tocNavs?.map((tocNav, index) => (
          <div key={index} className={'mb-2 w-2/5'}>
            <Link
              href={`#${tocNav.id}`}
              className={
                'block hover:text-white hover:bg-gradient-to-r hover:from-red-800 hover:to-red-500 px-4 py-1'
              }
            >
              {`${index + 1}. ${tocNav.label}`}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
