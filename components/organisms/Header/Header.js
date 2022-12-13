import { useQuery } from '@apollo/client'
import GET_MENU_QUERY from '@/const/schema/getMenu.graphql'

export default function Header() {
  const { data: headerMenu } = useQuery(GET_MENU_QUERY, {
    variables: {
      name: 'Footer',
    },
  })

  console.log(headerMenu)

  return <></>
}
