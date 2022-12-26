import HTMLContent from '@/components/atoms/HTMLContent'
import classNames from 'classnames'

export default function Table({ tableHeader, row }) {
  return (
    <div className={'mb-8'}>
      <table className={'table-fixed border w-full'}>
        {tableHeader && (
          <thead>
            <tr className={'bg-gradient-to-r from-red-800 to-red-500'}>
              {row?.[0]?.columns.split(', ')?.map((th, index) => (
                <th
                  key={index}
                  className={'px-3 py-2 text-sm text-white text-left'}
                >
                  {th}
                </th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {row?.slice(tableHeader ? 1 : 0, row?.length)?.map((tr, i1) => (
            <tr
              key={i1}
              className={classNames(
                i1 % 2 === 0 ? 'bg-white' : 'bg-zinc-100',
                'w-full'
              )}
            >
              {tr.columns?.split(', ').map((td, i2) => (
                <td key={i2} className={'px-3 py-2 text-sm'}>
                  <HTMLContent>{td}</HTMLContent>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
