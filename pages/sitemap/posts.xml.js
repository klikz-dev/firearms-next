import { client } from '@/lib/apollo'
import GET_POST_SLUGS_QUERY from '@/const/schema/getPostSlugs.graphql'

export default function Sitemap() {}

// WPGraphQL caps a single request at 100 nodes (and the WordPress host runs
// out of memory on larger requests), so the post list is walked page by page.
const PAGE_SIZE = 100

function addPage(page) {
  return `  <url>
    <loc>${`${process.env.NEXT_PUBLIC_FRONTEND_URL}/${page.loc}/`}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
}

async function getAllPostSlugs() {
  const nodes = []
  let after = null

  do {
    const { data } = await client.query({
      query: GET_POST_SLUGS_QUERY,
      variables: { first: PAGE_SIZE, after },
      fetchPolicy: 'no-cache',
    })

    nodes.push(...(data?.posts?.nodes ?? []))
    after = data?.posts?.pageInfo?.hasNextPage
      ? data.posts.pageInfo.endCursor
      : null
  } while (after)

  return nodes
}

export async function getServerSideProps({ res }) {
  const nodes = await getAllPostSlugs()

  const sitemaps = nodes.map((node) => ({
    loc: node.slug,
    lastmod: new Date(node.modified ?? node.date).toISOString(),
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
