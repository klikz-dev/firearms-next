import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function getPage(slug) {
  const { data, error } = useSWR(
    slug
      ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/pages/${slug}`
      : undefined,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}
