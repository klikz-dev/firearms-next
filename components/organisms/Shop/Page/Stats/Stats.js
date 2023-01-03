export default function Stats({ header, pageStats }) {
  return (
    <div className='border border-zinc-100 rounded shadow mb-8'>
      <div className='px-3 py-2 bg-dark text-white font-bold'>{header}</div>

      <div className='py-3 px-5'>
        <div className='mb-3'>
          <div className='flex flex-row justify-between font-bold mb-1'>
            <span>Accuracy</span>
            <span>{pageStats.acc * 10}</span>
          </div>

          <div className='bg-zinc-100 w-full h-3'>
            <div
              style={{ width: `${pageStats.acc * 10}%` }}
              className='h-full bg-red-700'
            ></div>
          </div>
        </div>

        <div className='mb-3'>
          <div className='flex flex-row justify-between font-bold mb-1'>
            <span>Ergonomics</span>
            <span>{pageStats.erg * 10}</span>
          </div>

          <div className='bg-zinc-100 w-full h-3'>
            <div
              style={{ width: `${pageStats.erg * 10}%` }}
              className='h-full bg-red-700'
            ></div>
          </div>
        </div>

        <div className='mb-3'>
          <div className='flex flex-row justify-between font-bold mb-1'>
            <span>Fit & Finish</span>
            <span>{pageStats.fit * 10}</span>
          </div>

          <div className='bg-zinc-100 w-full h-3'>
            <div
              style={{ width: `${pageStats.fit * 10}%` }}
              className='h-full bg-red-700'
            ></div>
          </div>
        </div>

        <div className='mb-3'>
          <div className='flex flex-row justify-between font-bold mb-1'>
            <span>Range</span>
            <span>{pageStats.rng}</span>
          </div>

          <div className='bg-zinc-100 w-full h-3'>
            <div
              style={{ width: `${pageStats.rngVal * 10}%` }}
              className='h-full bg-red-700'
            ></div>
          </div>
        </div>

        <div className='mb-3'>
          <div className='flex flex-row justify-between font-bold mb-1'>
            <span>Recoil</span>
            <span>{pageStats.rec * 10}</span>
          </div>

          <div className='bg-zinc-100 w-full h-3'>
            <div
              style={{ width: `${pageStats.rec * 10}%` }}
              className='h-full bg-red-700'
            ></div>
          </div>
        </div>

        <div className='mb-3'>
          <div className='flex flex-row justify-between font-bold mb-1'>
            <span>Reliability</span>
            <span>{pageStats.rel * 10}</span>
          </div>

          <div className='bg-zinc-100 w-full h-3'>
            <div
              style={{ width: `${pageStats.rel * 10}%` }}
              className='h-full bg-red-700'
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}
