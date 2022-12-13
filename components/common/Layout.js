import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main id='page-content' className='min-h-screen'>
        {children}
      </main>
      <Footer />
    </>
  )
}
