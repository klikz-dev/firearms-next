import { useQuery } from '@apollo/client'
import GET_MENU_QUERY from '@/const/schema/getMenu.graphql'
import Container from '@/components/atoms/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from '@/components/atoms/Link'
import Logo from '@/components/molecules/Logo'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import GradientBorder from '@/components/atoms/GradientBorder'
import Social from '@/components/molecules/Social'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import { useState } from 'react'

export default function Header() {
  const { data } = useQuery(GET_MENU_QUERY, {
    variables: {
      name: 'Header',
    },
  })
  const { menu } = data ?? {}

  const [search, setSearch] = useState('')

  return (
    <header>
      <GradientBorder height={4} />

      <Container>
        <div
          className={'flex flex-row justify-between items-center gap-2 py-3'}
        >
          <Social />

          <Logo />

          <div className={'w-80 flex flex-row items-center'}>
            <Input
              placeholder='Search'
              className={'bg-zinc-200/60 rounded-full'}
              value={search}
              setValue={setSearch}
            />
            <Button
              size='icon'
              className={'rounded-full bg-red-700 hover:bg-red-600 shrink-0'}
              href={search !== '' ? `/search?q=${search}` : undefined}
            >
              <FontAwesomeIcon icon={faSearch} className={'text-white'} />
            </Button>
          </div>
        </div>
      </Container>

      <Container>
        <div
          className={
            'flex flex-row justify-between items-center py-3 border-t border-gray-400'
          }
        >
          {menu?.menuItems?.nodes?.map((menuItem, index) => (
            <Link
              key={index}
              href={menuItem.path}
              className={'uppercase border-b border-white hover:border-red-700'}
            >
              {menuItem.label}
            </Link>
          ))}
        </div>
      </Container>
    </header>
  )
}
