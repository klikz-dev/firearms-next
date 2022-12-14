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
    button: {
      defaultProps: {
        color: 'black',
      },
      valid: {
        colors: ['black'],
      },
      styles: {
        variants: {
          filled: {
            black: {
              font: 'font-display',
              background: 'bg-black',
              color: 'text-white',
              border: 'rounded-none',
            },
          },
        },
        sizes: {
          sm: {
            fontSize: 'text-base',
            padding: 'px-4 py-2',
          },
          md: {
            fontSize: 'text-lg',
            padding: 'px-8 py-3',
          },
          lg: {
            fontSize: 'text-2xl',
            width: 'px-32 py-6',
          },
        },
      },
    },
    input: {
      styles: {
        variants: {
          standard: {
            base: {
              input: {
                border: 'border-none',
              },
              label: {
                text: 'italic',
              },
            },
            sizes: {
              lg: {
                input: {
                  text: '!text-lg',
                },
              },
            },
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
