import { useQuery } from '@apollo/client'
import GET_MENU_QUERY from '@/const/schema/getMenu.graphql'
import Container from '@/components/atoms/Container'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from '@/components/atoms/Link'
import Logo from '@/components/molecules/Logo'
import { IconButton, Input } from '@material-tailwind/react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import GradientBorder from '@/components/atoms/GradientBorder'
import Social from '@/components/molecules/Social'

export default function Header() {
  const { data } = useQuery(GET_MENU_QUERY, {
    variables: {
      name: 'Header',
    },
  })
  const { menu } = data ?? {}

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
            <Input label='Search' variant='standard' />
            <IconButton
              size='sm'
              className={'rounded-full bg-red-700 hover:bg-red-600 shrink-0'}
            >
              <FontAwesomeIcon icon={faSearch} className={'text-white'} />
            </IconButton>
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
            <Link key={index} href={menuItem.path} className={'uppercase'}>
              {menuItem.label}
            </Link>
          ))}
        </div>
      </Container>
    </header>
  )
}
