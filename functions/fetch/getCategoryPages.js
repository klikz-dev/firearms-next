import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function getCategoryPages(categorySlug) {
  const { data, error } = useSWR(
    categorySlug
      ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/pages/?category=${categorySlug}`
      : undefined,
    fetcher
  )

  return {
    data: data?.results,
    loading: !error && !data,
    error: error,
  }
}
