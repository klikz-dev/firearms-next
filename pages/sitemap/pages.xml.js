import { client } from '@/lib/apollo'
import GET_PAGE_SLUGS_QUERY from '@/const/schema/getPageSlugs.graphql'

export default function Sitemap() {}

function addPage(page) {
  return `  <url>
    <loc>${`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${page.loc}${
      page.loc !== '' ? '/' : ''
    }`}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
}

export async function getServerSideProps({ res }) {
  const { data } = await client.query({
    query: GET_PAGE_SLUGS_QUERY,
    variables: {
      first: 99,
    },
  })

  const sitemaps = data.pages.nodes.map((node) => ({
    loc: node.slug === 'homepage' ? '' : node.slug,
    lastmod: new Date().toISOString(node.date),
    changefreq: 'monthly',
    priority: '1.0',
  }))

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
