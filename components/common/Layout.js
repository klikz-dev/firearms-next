import Script from 'next/script'
import Footer from '@/components/organisms/Footer'
import Header from '@/components/organisms/Header'
import localFont from '@next/font/local'

const roboto = localFont({
  variable: '--font-roboto',
  subsets: ['latin'],
  display: 'swap',
  src: [
    {
      path: '../../public/fonts/Roboto-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Roboto-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Roboto-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
  ],
})

const oswald = localFont({
  variable: '--font-oswald',
  subsets: ['latin'],
  display: 'swap',
  src: [
    {
      path: '../../public/fonts/Oswald-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Oswald-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Oswald-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Oswald-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Oswald-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
})

export default function Layout({ children }) {
  return (
    <>
      <Script id='google-analytics'>
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-PZ6J7G7');
        `}
      </Script>

      <noscript>
        <iframe
          src='https://www.googletagmanager.com/ns.html?id=GTM-PZ6J7G7'
          height='0'
          width='0'
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript>

      <div className={`${roboto.variable} ${oswald.variable}`}>
        <Header />
        <main id='page-content' className='relative'>
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}
