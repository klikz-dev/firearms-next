import { useState } from 'react'
import toCapitalize from '@/functions/toCapitalize'
import HTMLReactParser from 'html-react-parser'
import cn from 'classnames'

export default function PageDescription({ title, description }) {
  const [collapse, setCollapse] = useState(true)

  return (
    <div className='mb-12'>
      <h3 className='text-2xl font-semibold mb-4'>
        About the {toCapitalize(title)}
      </h3>

      <p className={cn(collapse ? 'line-clamp-3' : '')}>
        {HTMLReactParser(description || '')}
      </p>

      {description?.length > 380 && (
        <p className='text-right'>
          <span
            className='underline font-bold text-sm cursor-pointer'
            onClick={() => setCollapse(!collapse)}
          >
            {collapse ? '+ More' : '- Less'}
          </span>
        </p>
      )}
    </div>
  )
}
