import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function getBrandPages(brandSlug, categorySlug) {
  const { data, error } = useSWR(
    brandSlug && categorySlug
      ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/pages/?category=${categorySlug}&brand=${brandSlug}`
      : undefined,
    fetcher
  )

  return {
    data: data?.results,
    loading: !error && !data,
    error: error,
  }
}
