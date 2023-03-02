import getStats from './getStats'

export default function getBulkStats(pages) {
  pages = pages?.map((page) => {
    const pageStats = getStats(page.brand, page.category, page.product_num)
    const statScore =
      pageStats.acc +
      pageStats.erg +
      pageStats.ftr +
      pageStats.fit +
      pageStats.rel +
      pageStats.val

    return {
      ...page,
      pageStats: pageStats,
      statScore: statScore,
    }
  })

  pages.sort((a, b) => {
    return a.statScore < b.statScore ? 1 : -1
  })

  return pages
}
