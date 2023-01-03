import Title from '@/components/molecules/Title'

export default function Estimate({ estimates }) {
  return (
    <div className='mb-12'>
      <Title>
        <h3>Estimated Value</h3>
      </Title>

      <h6 className='mb-6 text-red-700'>
        *Condition, Features, Barrel Length, Specific Model, & Seasonality may
        all impact value and resale price.
      </h6>

      <div>
        <table className='table-fixed w-full border-separate'>
          <thead className='bg-zinc-300'>
            <tr>
              <th className='bg-white'></th>
              <th className='py-2'>Used</th>
              <th className='py-2'>New</th>
            </tr>
          </thead>

          <tbody className='bg-blue-50 text-center text-base font-bold'>
            <tr>
              <td className='py-1'>Trade In</td>
              <td>${estimates?.usedAuction}</td>
              <td>${estimates?.newAuction}</td>
            </tr>

            <tr>
              <td className='py-1'>Retail</td>
              <td>${estimates?.usedRetail}</td>
              <td>${estimates?.newRetail}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
