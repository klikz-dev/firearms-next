import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@material-tailwind/react'
import { client } from '@/lib/apollo'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import { useRouter } from 'next/router'
import '@/styles/main.css'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false
import '@fortawesome/fontawesome-svg-core/styles.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const asPath = router ? router.asPath : '/'

  const theme = {
    typography: {
      styles: {
        variants: {
          h1: {
            fontSize: 'text-5xl uppercase',
            fontFamily: 'font-display',
          },
          h2: {
            fontSize: 'text-4xl uppercase',
            fontFamily: 'font-display',
          },
          h3: {
            fontSize: 'text-3xl uppercase',
            fontFamily: 'font-display',
          },
          h4: {
            fontSize: 'text-2xl uppercase',
            fontFamily: 'font-display',
          },
          h5: {
            fontSize: 'text-xl uppercase',
            fontFamily: 'font-display',
          },
          h6: {
            fontSize: 'text-base uppercase',
            fontFamily: 'font-display',
          },
          lead: {
            fontSize: 'text-xl',
            fontFamily: 'font-sans',
          },
          paragraph: {
            fontSize: 'text-base',
            fontFamily: 'font-sans',
          },
          small: {
            fontSize: 'text-sm',
            fontFamily: 'font-sans',
          },
        },
      },
    },
  }

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
