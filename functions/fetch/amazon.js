/* eslint-disable react-hooks/rules-of-hooks */
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function getAmazonProduct(productId) {
  const { data, error } = useSWR(
    productId ? `/api/amazon/${productId}` : undefined,
    fetcher
  )

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}
