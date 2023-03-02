import getStats from './getStats'

export default function getBulkStats(pages) {
  pages = pages?.map((page) => {
    const pageStats = getStats(page.brand, page.category, page.product_num, {
      acc: page.stat_acc,
      erg: page.stat_erg,
      ftr: page.stat_ftr,
      fit: page.stat_fit,
      rel: page.stat_rel,
      val: page.stat_val,
    })

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
