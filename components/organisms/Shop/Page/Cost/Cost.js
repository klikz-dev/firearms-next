import Title from '@/components/molecules/Title'
import toCapitalize from '@/functions/toCapitalize'

export default function Estimate({ page, costs }) {
  return (
    <div className='mb-12 px-4 lg:px-8 py-8 bg-zinc-100 border border-zinc-200 rounded shadow'>
      <Title>
        <h4>How much does a {toCapitalize(page.title)} cost?</h4>
      </Title>

      <p>
        {costs.best === costs.average ? (
          <>
            Today a {toCapitalize(page.title)} will cost you an average of $
            {costs.average} which is unchanged from its 12-week average price.
          </>
        ) : (
          <>
            Today a {toCapitalize(page.title)} will cost you an average of{' '}
            <span className='font-bold'>${costs.average}</span> which is{' '}
            <span className='font-bold'>
              ${(costs.average - costs.best).toFixed(2)} lower{' '}
            </span>{' '}
            than the 12-week average price.
          </>
        )}
      </p>
    </div>
  )
}
