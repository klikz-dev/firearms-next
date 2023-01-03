const seoConfig = {
  titleTemplate: '%s | American Firearms',
  openGraph: {
    type: 'website',
    locale: 'en_IE',
    url: 'https://www.americanfirearms.org/',
    site_name: 'American Firearms',
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
  robotsProps: {
    nosnippet: true,
    notranslate: true,
    noimageindex: true,
    noarchive: true,
    maxSnippet: -1,
    maxImagePreview: 'none',
    maxVideoPreview: -1,
  },
}

module.exports = seoConfig
