import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function Search() {
  const [search, setSearch] = useState('')

  return (
    <form
      action='/search'
      className={'flex flex-row justify-center items-center mb-32'}
    >
      <Input
        name='q'
        placeholder='Search'
        className={'bg-zinc-200/60 rounded-full px-5 py-2 w-96 max-w-full'}
        value={search}
        setValue={setSearch}
      />

      <Button
        size='icon'
        className={'rounded-full bg-red-700 hover:bg-red-600 shrink-0'}
        type='submit'
      >
        <FontAwesomeIcon icon={faSearch} className={'text-white'} />
      </Button>
    </form>
  )
}
