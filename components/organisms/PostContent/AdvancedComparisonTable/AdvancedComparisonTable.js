import Link from '@/components/atoms/Link'
import { getCtaId } from '@/functions/getPicks'

const AWARD_LABELS = {
  editors_choice: "Editors' Choice",
  top_pick: 'Top Pick',
  best_buy: 'Best Buy',
}

function getAwardLabel({ award, customAward }) {
  if (award === 'custom') return customAward || ''
  return AWARD_LABELS[award] ?? ''
}

/**
 * Simplified comparison table: award, product (affiliate link), price and a
 * jump link to the matching in-page CTA.
 */
export default function AdvancedComparisonTable({ item, ctas }) {
  const rows = (item ?? [])
    .map((row) => {
      const cta = ctas?.find(
        (candidate) =>
          candidate.title?.toLowerCase() === row.ctaId?.toLowerCase()
      )
      return cta ? { ...row, cta } : null
    })
    .filter(Boolean)

  if (!rows.length) return null

  return (
    <div className={'mb-8 overflow-x-auto'}>
      <table className={'w-full border border-zinc-300 text-sm'}>
        <thead>
          <tr
            className={
              'bg-zinc-100 text-left font-display uppercase text-xs tracking-wider'
            }
          >
            <th className={'p-3 hidden sm:table-cell w-40'}>Award</th>
            <th className={'p-3'}>Product</th>
            <th className={'p-3'}>Price</th>
            <th className={'p-3'}>
              <span className={'sr-only'}>Details</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => {
            const { cta } = row
            const label = getAwardLabel(row)
            const price = cta.page?.product?.[0]?.sale_price ?? cta.price
            const ctaId = getCtaId(cta)

            return (
              <tr key={index} className={'border-t border-zinc-300 align-top'}>
                <td
                  className={
                    'p-3 hidden sm:table-cell font-display font-semibold'
                  }
                >
                  {label}
                </td>

                <td className={'p-3'}>
                  {label && (
                    <p
                      className={
                        'sm:hidden text-xs font-display font-semibold uppercase text-zinc-500 mb-1'
                      }
                    >
                      {label}
                    </p>
                  )}
                  <Link
                    href={cta.link}
                    className={'text-red-700 font-semibold hover:underline'}
                  >
                    {cta.title}
                  </Link>
                </td>

                <td className={'p-3 whitespace-nowrap'}>
                  {price ? `$${price}` : ''}
                </td>

                <td className={'p-3 whitespace-nowrap text-right'}>
                  {ctaId && (
                    <Link
                      href={`#${ctaId}`}
                      className={'underline hover:text-red-700'}
                    >
                      Jump to Details
                    </Link>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
