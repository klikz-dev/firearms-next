export default function getRank(page, pages) {
  let rank = 0

  pages?.length &&
    pages.map((p, index) => {
      if (p.slug === page.slug) rank = index + 1
    })

  return rank
}
