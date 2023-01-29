import HTMLContent from '@/components/atoms/HTMLContent'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function FAQ({ qA }) {
  function Row({ question, answer }) {
    const [show, setShow] = useState(false)

    return (
      <div className={'mb-3'}>
        <div
          className={
            'px-4 py-2 bg-zinc-100 border border-zinc-200 flex justify-between items-center'
          }
          onClick={() => setShow(!show)}
        >
          <h5>{question}</h5>

          {show ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </div>

        {show && (
          <HTMLContent className={'p-4 bg-zinc-50'}>{answer}</HTMLContent>
        )}
      </div>
    )
  }

  return (
    <div className={'mb-8'}>
      {qA?.map((row, index) => (
        <Row key={index} question={row.question} answer={row.answer} />
      ))}
    </div>
  )
}
