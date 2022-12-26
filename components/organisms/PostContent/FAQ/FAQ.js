export default function FAQ({ qA }) {
  return (
    <div className={'border mb-8'}>
      {qA?.map((row, index) => (
        <div key={index}>
          <div className={'px-2 py-1 bg-zinc-200'}>
            <h6>{row.question}</h6>
          </div>

          <div className={'p-2 mb-2'}>{row.answer}</div>
        </div>
      ))}
    </div>
  )
}
