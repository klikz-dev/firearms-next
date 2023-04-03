import getStats from '@/functions/getStats'
import classNames from 'classnames'

export default function TableMenu({ page }) {
  const pageStats =
    page && page.brand && page.category && page.product
      ? getStats(page.brand.name, page.category.name, page.product.length, {
          acc: page.stat_acc,
          erg: page.stat_erg,
          ftr: page.stat_ftr,
          fit: page.stat_fit,
          rel: page.stat_rel,
          val: page.stat_val,
        })
      : undefined

  if (!page || !pageStats) {
    return null
  }

  return (
    <div className={'border-collapse'}>
      {[
        { text: '', height: 'h-36' },
        { text: 'Awards', height: 'h-20' },
        { text: 'Price', height: 'h-14' },
        { text: 'Overall Rating', height: 'h-12' },
        { text: 'Description', height: 'h-32 sm:h-36' },
        { text: 'Rating Categories', height: 'h-16' },
        { text: pageStats.showStats ? 'Accuracy' : 'Quality', height: 'h-12' },
        {
          text: pageStats.showStats ? 'Ergonomics' : 'Durability',
          height: 'h-12',
        },
        { text: 'Features', height: 'h-12' },
        { text: 'Fit & Finish', height: 'h-12' },
        {
          text: pageStats.showStats ? 'Reliability' : 'Design',
          height: 'h-12',
        },
        { text: 'Value', height: 'h-12' },
      ].map((menu, index) => (
        <div
          key={index}
          className={classNames(
            menu.height,
            'w-full flex items-center bg-zinc-50 border p-2'
          )}
        >
          <p className={'text-xs text-left'}>{menu.text}</p>
        </div>
      ))}
    </div>
  )
}
