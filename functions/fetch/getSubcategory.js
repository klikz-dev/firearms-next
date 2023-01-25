import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function getSubcategory(slug) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR(
    slug
      ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/subcategories/${slug}`
      : undefined,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}
