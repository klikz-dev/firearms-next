/* eslint-disable react-hooks/rules-of-hooks */
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => res.json())

export function getSearchResults(q) {
  const { data, error } = useSWR(q ? `/api/search/?q=${q}` : undefined, fetcher)

  return {
    data: data,
    loading: !error && !data,
    error: error,
  }
}
