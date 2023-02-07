export default function Sitemap() {}

function addPage(page) {
  return `  <url>
    <loc>${`${process.env.NEXT_PUBLIC_FRONTEND_URL}${page.loc}`}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
}

export async function getServerSideProps({ res }) {
  const sitemaps = []

  const productsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/page-slugs/?offset=30000&limit=9999`
  )
  const { results: products } = await productsRes.json()

  products.map((product) => {
    sitemaps.push({
      loc: `/shop/${product.slug}/`,
      lastmod: new Date(product.updated_at).toISOString(),
      changefreq: 'daily',
      priority: '1.0',
    })
  })

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(addPage).join('\n')}
</urlset>`

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}
