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

  const brandsRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/brand-slugs/?limit=9999`
  )
  const { results: brands } = await brandsRes.json()

  brands
    .filter((brand) => brand.slug)
    .map((brand) => {
      sitemaps.push({
        loc: `/shop/brands/${brand.slug}/`,
        lastmod: new Date(brand.updated_at).toISOString(),
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
