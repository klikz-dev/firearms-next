import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@material-tailwind/react'
import { client } from '@/lib/apollo'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import { useRouter } from 'next/router'
import '@/styles/main.scss'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false
import '@fortawesome/fontawesome-svg-core/styles.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const asPath = router ? router.asPath : '/'

  const theme = {}

  return (
    <>
      <DefaultSeo
        {...SEO}
        canonical={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${asPath}`}
      />
      <ApolloProvider client={client}>
        <ThemeProvider value={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
