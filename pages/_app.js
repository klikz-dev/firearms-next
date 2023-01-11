import { ApolloProvider } from '@apollo/client'
import { client } from '@/lib/apollo'
import seoConfig from '../next-seo.config'
import { config } from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false
import '@fortawesome/fontawesome-svg-core/styles.css'
import { DefaultSeo } from 'next-seo'
import '@/styles/main.scss'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const asPath = router ? router.asPath : '/'

  return (
    <ApolloProvider client={client}>
      <DefaultSeo
        {...seoConfig}
        canonical={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${asPath}`}
      />

      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
