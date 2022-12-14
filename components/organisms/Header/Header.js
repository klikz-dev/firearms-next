import { useQuery } from '@apollo/client'
import GET_MENU_QUERY from '@/const/schema/getMenu.graphql'
import Container from '@/components/atoms/Container'
import { socialIcons } from '@/const/setting/social'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from '@/components/atoms/Link'
import Logo from '@/components/molecules/Logo'
import { IconButton, Input } from '@material-tailwind/react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function Header() {
  const { data } = useQuery(GET_MENU_QUERY, {
    variables: {
      name: 'Header',
    },
  })
  const { menu } = data ?? {}

  return (
    <header>
      <div className={'h-1 bg-gradient-to-r from-red-800 to-red-400'}></div>

      <Container>
        <div
          className={'flex flex-row justify-between items-center gap-2 py-3'}
        >
          <div className={'flex flex-row gap-2 w-80'}>
            {socialIcons.map((social, index) => (
              <Link
                key={index}
                href={social.link}
                className={
                  'w-8 h-8 rounded border border-red-800 flex flex-row justify-center items-center hover:bg-red-50'
                }
              >
                <FontAwesomeIcon
                  icon={social.icon}
                  className={'text-red-700'}
                />
              </Link>
            ))}
          </div>

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
          className={'flex flex-row justify-between items-center py-3 border-t'}
        >
          {menu?.menuItems?.nodes?.map((menuItem, index) => (
            <Link
              key={index}
              href={menuItem.path}
              className={'uppercase font-display font-light'}
            >
              {menuItem.label}
            </Link>
          ))}
        </div>
      </Container>
    </header>
  )
}
