import seoConfig from '../next-seo.config'
import { DefaultSeo } from 'next-seo'
import '@/styles/main.scss'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const asPath = router ? router.asPath : '/'

  return (
    <>
      <DefaultSeo
        {...seoConfig}
        canonical={`${process.env.NEXT_PUBLIC_FRONTEND_URL}${asPath}`}
      />

      <Component {...pageProps} />
    </>
  )
}

export default MyApp
