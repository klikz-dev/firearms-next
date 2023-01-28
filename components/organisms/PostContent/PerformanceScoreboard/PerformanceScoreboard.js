import Rating from '@/components/molecules/Rating'

export default function PerformanceScoreboard({ board }) {
  return (
    <div
      className={
        'mb-8 flex flex-col md:flex-row gap-2 justify-between border px-2 py-4 bg-zinc-100'
      }
    >
      {board?.map((row, index) => (
        <div key={index} className={'flex flex-row items-center gap-2'}>
          <h6 className={'w-16 md:w-auto'}>{`${row.performance}:`}</h6>

          <Rating rating={row.score} />
        </div>
      ))}
    </div>
  )
}
