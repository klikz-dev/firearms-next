import { useQuery } from '@apollo/client'
import GET_MENU_QUERY from '@/const/schema/getMenu.graphql'
import { Typography } from '@material-tailwind/react'
import Container from '@/components/atoms/Container'
import GradientBorder from '@/components/atoms/GradientBorder'
import { about } from '@/const/setting/footer'
import Social from '@/components/molecules/Social'
import Link from '@/components/atoms/Link'

export default function Footer() {
  const { data } = useQuery(GET_MENU_QUERY, {
    variables: {
      name: 'Footer ',
    },
  })
  const { menu } = data ?? {}

  const menuItems = menu?.menuItems?.nodes?.filter((item) => !item.parentId)
  console.log(menuItems)

  return (
    <footer>
      <Container>
        <div className={'flex flex-col lg:flex-row justify-between gap-4 py-4'}>
          <div className={'w-5/12'}>
            <div className={'inline-block mb-6'}>
              <GradientBorder height={1} />
              <Typography variant={'h4'}>About Us</Typography>
              <GradientBorder height={1} />
            </div>

            <Typography variant={'paragraph'} className={'mb-8'}>
              {about}
            </Typography>

            <Social className={'mb-6'} />
          </div>

          {menuItems?.map((menuItem, i1) => (
            <div key={i1} className={'w-1/6'}>
              <div className={'inline-block mb-6'}>
                <GradientBorder height={1} />
                <Typography variant={'h4'}>{menuItem.label}</Typography>
                <GradientBorder height={1} />
              </div>

              {menuItem.childItems?.nodes?.map((child, i2) => (
                <div key={i2} className={'block mb-2'}>
                  <Link href={child.path}>{child.label}</Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </footer>
  )
}
