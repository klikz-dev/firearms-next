import convertToSlug from '@/functions/convertToSlug'

/**
 * DOM id of the in-page CTA wrapper. Jump links, the sticky rail and the
 * mobile CTA bar all rely on it.
 */
export function getCtaId(cta) {
  if (cta?.productSlug) return cta.productSlug
  return cta?.title ? `cta-${convertToSlug(cta.title)}` : ''
}

/**
 * Normalises the CTA-type blocks of a post into the list used by the sticky
 * desktop rail ("Our Top Picks") and the mobile CTA bar.
 */
export default function getPicks(contents = []) {
  return contents
    .map((content) => {
      if (
        content.__typename === 'Post_Postcontent_Contents_Cta' &&
        content.link &&
        content.title
      ) {
        return {
          id: getCtaId(content),
          title: content.title,
          link: content.link,
          image: content.image ?? null,
          price:
            content.page?.product?.[0]?.sale_price ?? content.price ?? null,
        }
      }

      if (
        content.__typename === 'Post_Postcontent_Contents_AmazonProduct' &&
        content.title &&
        content.amazonLink
      ) {
        return {
          id: `amazon-${content.productId}`,
          title: content.title,
          link: content.amazonLink,
          image: content.image ?? null,
          price: content.price ?? null,
        }
      }

      return null
    })
    .filter((pick) => pick && pick.id)
}
