import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'
import Head from 'next/head'

export default function Layout({ children, seo }) {
  return (
    <>
      <Head>{seo}</Head>

      <Header />
      <main id='page-content' className='min-h-screen'>
        {children}
      </main>
      <Footer />
    </>
  )
}
