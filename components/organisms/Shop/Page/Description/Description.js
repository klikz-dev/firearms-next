import { useState } from 'react'
import toCapitalize from '@/functions/toCapitalize'
import HTMLReactParser from 'html-react-parser'
import cn from 'classnames'
import Title from '@/components/molecules/Title'

export default function PageDescription({ title, description }) {
  const [collapse, setCollapse] = useState(true)

  return (
    <div className='mb-12'>
      <Title>
        <h3>About the {toCapitalize(title)}</h3>
      </Title>

      {description?.length > 340 ? (
        <>
          <p className={cn(collapse ? 'line-clamp-3' : '')}>
            {HTMLReactParser(description || '')}
          </p>

          <p className='text-right'>
            <span
              className='underline font-bold text-sm cursor-pointer'
              onClick={() => setCollapse(!collapse)}
            >
              {collapse ? '+ More' : '- Less'}
            </span>
          </p>
        </>
      ) : (
        <>
          <p>{HTMLReactParser(description || '')}</p>
        </>
      )}
    </div>
  )
}
