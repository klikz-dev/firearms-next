import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function getProduct(sku) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR(
    sku
      ? `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/${sku}`
      : undefined,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}
